import Docker from 'dockerode';
import path from 'path';
import fs from 'fs/promises';
import { SIMULATION_VAULT_PATH, SIMULATION_DOCKER_IMAGE } from '../config';

const docker = new Docker({
  socketPath: process.env.DOCKER_SOCKET_PATH || '/var/run/docker.sock'
});

// Function to create and start a simulation container
export const createSimulationContainer = async (simulationId: string): Promise<string> => {
  const containerName = `simulation-${simulationId}`;
  const containerPath = `/app/simulation_data`; // Path inside the container for simulation files

  try {
    // Ensure the vault path exists on the host
    await fs.mkdir(SIMULATION_VAULT_PATH, { recursive: true });

    // Create a temporary directory for this simulation's files on the host
    const simulationHostPath = path.join(SIMULATION_VAULT_PATH, simulationId);
    await fs.mkdir(simulationHostPath, { recursive: true });

    // TODO: Copy sample files from a predefined set to simulationHostPath
    // For now, let's create a dummy file
    await fs.writeFile(path.join(simulationHostPath, 'sample_document.txt'), 'This is a sample document.');
    console.log(`Created dummy sample_document.txt in ${simulationHostPath}`);

    const container = await docker.createContainer({
      Image: SIMULATION_DOCKER_IMAGE,
      name: containerName,
      Tty: true, // Allocate a pseudo-TTY
      OpenStdin: true, // Keep stdin open even if not attached
      Cmd: ['/bin/sh'], // Start a shell to keep container running
      HostConfig: {
        NetworkMode: 'none', // Crucial for isolation (NFR-1)
        Binds: [`${simulationHostPath}:${containerPath}`], // Mount the simulation data
      },
      Labels: {
        'simulationId': simulationId,
      },
      WorkingDir: containerPath, // Set working directory inside container
    });

    await container.start();
    console.log(`Container ${containerName} started.`);
    return container.id;
  } catch (error) {
    console.error(`Error creating simulation container for ${simulationId}:`, error);
    throw error;
  }
};

// Function to simulate file 'encryption' inside the container
export const simulateEncryption = async (containerId: string) => {
  try {
    const container = docker.getContainer(containerId);
    // This command renames all files by adding .locked extension
    // and creates a RANSOM_NOTE.txt
    const exec = await container.exec({
      Cmd: [
        '/bin/sh',
        '-c',
        'for f in *; do [ -f \"$f\" ] && [ \"$f\" != \"RANSOM_NOTE.txt\" ] && mv \"$f\" \"$f\".locked; done && echo \"THIS IS A SIMULATION. Your files are not encrypted.\nFor educational purposes only.\n\nAttack Vector: Phishing\" > RANSOM_NOTE.txt'
      ],
      AttachStdout: true,
      AttachStderr: true,
    });

    const stream = await exec.start({});
    await new Promise((resolve, reject) => {
      docker.modem.demuxStream(stream, process.stdout, process.stderr);
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    console.log(`Simulated encryption in container ${containerId}`);
  } catch (error) {
    console.error(`Error simulating encryption in container ${containerId}:`, error);
    throw error;
  }
};

// Function to stop and remove a simulation container
export const removeSimulationContainer = async (containerId: string) => {
  try {
    const container = docker.getContainer(containerId);
    await container.stop();
    await container.remove();
    console.log(`Container ${containerId} stopped and removed.`);

    // Clean up the host-side simulation vault directory
    const simulationHostPath = path.join(SIMULATION_VAULT_PATH, containerId.substring(0, 12)); // Assuming containerId is long, use first 12 chars for directory name
    await fs.rm(simulationHostPath, { recursive: true, force: true });
    console.log(`Cleaned up host path: ${simulationHostPath}`);

  } catch (error) {
    console.error(`Error removing container ${containerId}:`, error);
    // Do not throw error here, as we want to ensure cleanup attempts even if stop fails
  }
};
