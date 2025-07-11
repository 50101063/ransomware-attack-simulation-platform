# Integration Guide: Ransomware Attack Simulation Platform

This guide provides comprehensive instructions for setting up, running, and interacting with the integrated Ransomware Attack Simulation Platform. This platform combines the Frontend (React), Backend (Node.js/Express), and Database (PostgreSQL) services into a cohesive system using Docker and Docker Compose.

## 1. Overview

The `docker-compose.yml` file at the root of this repository orchestrates the entire application. It defines three main services:

-   **`frontend`**: The React-based user interface, accessible via a web browser.
-   **`backend`**: The Node.js/Express API service that handles business logic, user management, and orchestrates the simulation sandboxes.
-   **`database`**: The PostgreSQL database instance for persistent data storage.

## 2. Prerequisites

Before you begin, ensure you have the following installed on your system:

-   **Git**: For cloning the repository.
-   **Docker Desktop** (or Docker Engine and Docker Compose standalone): This includes Docker Engine and Docker Compose, which are essential for running the containerized application.
    -   Verify installation:
        ```bash
        docker --version
        docker compose version
        ```

## 3. Setup Instructions

1.  **Clone the Repository**:
    First, clone the project repository to your local machine:
    ```bash
    git clone https://github.com/50101063/ransomware-attack-simulation-platform.git
    cd ransomware-attack-simulation-platform
    ```

2.  **Environment Variables**:
    The `backend` service requires environment variables for database connection and JWT secret.
    -   Navigate to the `backend/` directory:
        ```bash
        cd backend
        ```
    -   Create a `.env` file by copying the provided example:
        ```bash
        cp .env.example .env
        ```
    -   Edit the `.env` file and replace placeholder values. Ensure `DATABASE_URL` and `JWT_SECRET` match the values defined in `docker-compose.yml` or are updated accordingly.
        ```
        # backend/.env
        PORT=8080
        DATABASE_URL=postgresql://user:password@database:5432/ransomware_sim
        JWT_SECRET=your_jwt_secret_key # IMPORTANT: Use a strong, unique secret in production
        ```
    -   Return to the root directory:
        ```bash
        cd ..
        ```

    *Note: The `docker-compose.yml` itself contains default values for the database credentials for simplicity in this setup. For production, these should be managed more securely (e.g., Docker secrets or external secret management).*

## 4. Execution Instructions

To start the entire integrated system, run the following command from the root of the `ransomware-attack-simulation-platform` directory:

```bash
docker compose up --build -d
```

-   `--build`: This flag tells Docker Compose to build the images for the `frontend` and `backend` services from their respective Dockerfiles before starting the containers.
-   `-d`: This flag runs the containers in detached mode, allowing them to run in the background.

**First-time setup might take a few minutes** as Docker downloads base images and builds the application images.

### Verifying Services

You can check the status of your running services:

```bash
docker compose ps
```

You should see `frontend`, `backend`, and `database` services listed with a `healthy` or `running` status.

## 5. Accessing the Application

Once all services are up and running:

-   **Frontend**: Open your web browser and navigate to:
    ```
    http://localhost:3000
    ```
    You should see the React application.

-   **Backend API**: The backend API will be accessible internally by the frontend at `http://backend:8080` within the Docker network. For direct testing from your host machine (e.g., using Postman or curl), you can access it at:
    ```
    http://localhost:8080
    ```

## 6. Stopping and Cleaning Up

To stop the running services without removing their data (e.g., database data):

```bash
docker compose stop
```

To stop and remove all services, networks, and volumes (including persistent database data):

```bash
docker compose down -v
```

-   `-v`: This flag removes named volumes declared in the `volumes` section of the `docker-compose.yml`, which includes our `db_data` volume, effectively resetting the database.

## 7. Troubleshooting

-   **Container Logs**: If a service isn't starting correctly, check its logs:
    ```bash
    docker compose logs <service_name>
    # Example: docker compose logs backend
    ```
-   **Port Conflicts**: Ensure ports `3000`, `8080`, and `5432` are not already in use by other applications on your host machine.
-   **Database Healthcheck**: The `database` service has a healthcheck. If it's not healthy, check its logs for PostgreSQL errors.
-   **Rebuild**: If you make changes to the `Dockerfile`s or encounter build issues, try rebuilding:
    ```bash
    docker compose up --build -d
    ```
