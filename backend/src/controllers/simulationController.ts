import { Request, Response } from 'express';
import * as dockerService from '../services/dockerService';

export const createSimulation = async (req: Request, res: Response) => {
    try {
        // In a real scenario, you would get traineeId and fileSet from req.body
        // and perform validation and authorization checks.
        const traineeId = req.body.traineeId || 'test-trainee-123'; // Placeholder
        const fileSet = req.body.fileSet || ['sample1.txt', 'sample2.pdf']; // Placeholder

        console.log(`Received request to create simulation for trainee: ${traineeId}`);

        const containerInfo = await dockerService.createSimulationContainer(traineeId, fileSet);

        // Here, you would typically save simulation details to the database
        // For now, just return the container info
        res.status(201).json({
            message: 'Simulation environment created successfully',
            simulationId: containerInfo.id, // Using container ID as simulation ID for now
            status: 'ready',
            containerDetails: containerInfo,
        });
    } catch (error: any) {
        console.error('Error creating simulation:', error);
        res.status(500).json({ error: error.message || 'Failed to create simulation environment' });
    }
};
