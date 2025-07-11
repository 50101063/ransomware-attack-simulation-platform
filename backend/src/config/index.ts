import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3001;

export const DB_USER = process.env.DB_USER;
export const DB_HOST = process.env.DB_HOST;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10);

export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

export const DOCKER_SOCKET_PATH = process.env.DOCKER_SOCKET_PATH || '/var/run/docker.sock';
export const SIMULATION_VAULT_PATH = process.env.SIMULATION_VAULT_PATH || './simulation_vault';
export const SIMULATION_DOCKER_IMAGE = process.env.SIMULATION_DOCKER_IMAGE || 'alpine/git:latest';
