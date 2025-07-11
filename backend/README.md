# Ransomware Attack Simulation Platform - Backend

This directory contains the backend services for the Ransomware Attack Simulation Platform. It is built with Node.js, Express.js, and TypeScript, and interacts with the Docker Engine to create isolated simulation environments.

## Technologies Used

*   **Node.js**: 20.x LTS
*   **Express.js**: 4.x
*   **TypeScript**: 5.x
*   **Dockerode**: For Docker Engine API interaction
*   **pg (node-postgres)**: For PostgreSQL database connectivity
*   **bcrypt.js**: For password hashing
*   **jsonwebtoken**: For JWT-based authentication

## Setup and Installation

1.  **Prerequisites**:
    *   Node.js (v20.x or higher) and npm installed.
    *   Docker Desktop or Docker Engine installed and running on your machine. Ensure the Docker daemon is accessible.
    *   A PostgreSQL database instance accessible from your environment.

2.  **Clone the Repository**:
    ```bash
    git clone https://github.com/50101063/ransomware-attack-simulation-platform.git
    cd ransomware-attack-simulation-platform/backend
    ```

3.  **Install Dependencies**:
    ```bash
    npm install
    ```

4.  **Environment Variables**:
    Create a `.env` file in the `backend/` directory based on the `.env.example` file.

    ```
    # .env
    PORT=3000
    DATABASE_URL="postgresql://user:password@host:port/database"
    JWT_SECRET="your_jwt_secret_key_here"
    ```
    *   `PORT`: The port on which the Express server will run.
    *   `DATABASE_URL`: Connection string for your PostgreSQL database.
    *   `JWT_SECRET`: A strong, random secret key for signing JWTs.

5.  **Database Setup**:
    Ensure your PostgreSQL database is running and accessible. The application will attempt to connect to it. Database migrations (if any) will be handled separately. For initial setup, ensure the database specified in `DATABASE_URL` exists.

## Running the Application

### Development Mode

To run the backend in development mode with live reloading:

```bash
npm run dev
```

The server will typically run on `http://localhost:3000` (or the port specified in your `.env` file).

### Production Mode

To build and run the backend for production:

```bash
npm run build
npm start
```

## API Endpoints (Initial)

*   `POST /api/v1/auth/register`: Register a new user (placeholder for future implementation).
*   `POST /api/v1/auth/login`: User login (placeholder for future implementation).
*   `POST /api/v1/simulations/create`: Trigger the creation of a simulated environment (demonstrates Docker interaction).

## Code Structure

```
backend/
├── src/
│   ├── app.ts                  # Main Express application setup
│   ├── routes/                 # API route definitions
│   │   ├── index.ts            # Aggregates all routes
│   │   └── simulationRoutes.ts # Routes related to simulation management
│   ├── controllers/            # Request handlers for routes
│   │   └── simulationController.ts
│   ├── services/               # Business logic and external integrations (e.g., Docker)
│   │   └── dockerService.ts    # Handles Docker API interactions
│   ├── db/                     # Database connection setup
│   │   └── index.ts
│   └── types/                  # TypeScript custom type definitions (if any)
├── .env.example                # Example environment variables
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # This file
```

## Contributing

Please adhere to the architectural guidelines and coding standards outlined in the main repository's `architecture/README.md`.
