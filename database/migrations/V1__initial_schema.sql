-- V1__initial_schema.sql

-- Create the 'users' table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('Administrator', 'Trainee')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'simulations' table
CREATE TABLE simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    administrator_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    trainee_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    docker_container_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'running', 'finished', 'aborted')),
    started_at TIMESTAMP WITH TIME ZONE,
    finished_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on trainee_id for faster lookups
CREATE INDEX idx_simulations_trainee_id ON simulations(trainee_id);

-- Create the 'simulation_logs' table
CREATE TABLE simulation_logs (
    id BIGSERIAL PRIMARY KEY,
    simulation_id UUID NOT NULL REFERENCES simulations(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    details JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on simulation_id for faster lookups
CREATE INDEX idx_simulation_logs_simulation_id ON simulation_logs(simulation_id);

-- Create an index on timestamp for time-based queries
CREATE INDEX idx_simulation_logs_timestamp ON simulation_logs(timestamp);
