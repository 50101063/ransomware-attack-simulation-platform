# Ransomware Attack Simulation Platform - Backend

This directory contains the backend services for the Ransomware Attack Simulation Platform. The backend is responsible for:

*   User and Role Management (Administrator, Trainee)
*   Orchestrating isolated simulation environments using Docker
*   Managing sample files for simulations and ensuring their safe restoration
*   Handling "fake encryption" logic (file renaming, ransom note generation)
*   Logging simulation events and generating reports
*   Providing a RESTful API for the frontend

## Technology Stack

*   **Language**: TypeScript (Node.js 20.x LTS)
*   **Framework**: Express.js 4.x
*   **Database Client**: `pg` (node-postgres) for PostgreSQL 16.x
*   **Docker Interaction**: `dockerode`
*   **Authentication**: `bcrypt.js` for password hashing, `jsonwebtoken` for JWTs

## Getting Started

Follow these instructions to set up and run the backend locally.

### Prerequisites

*   Node.js (v20.x LTS or higher)
*   npm (comes with Node.js)
*   Docker Desktop (or Docker Engine) installed and running
*   PostgreSQL database instance (can be run via Docker Compose as part of the overall application stack)

### 1. Navigate to the Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

Install all required Node.js packages:

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend/` directory based on the `.env.example` provided. This file will contain sensitive information and environment-specific variables.

```
# Example .env content
PORT=3000
DATABASE_URL="postgresql://user:password@host:port/database_name"
JWT_SECRET="your_jwt_secret_key_here"
# Add any other necessary environment variables
```

**Important**: Do not commit your `.env` file to version control. It is already excluded by `.gitignore`.

### 4. Database Setup

Ensure your PostgreSQL database is running and accessible. You will need to create the necessary tables as defined by the Solution Architect's schema. Database migration scripts will be provided in a later stage.

### 5. Build the TypeScript Code

Compile the TypeScript source code into JavaScript:

```bash
npm run build
```

This will output compiled JavaScript files to the `dist/` directory.

### 6. Run the Application

#### Development Mode (with hot-reloading)

For development, you can use `ts-node-dev` for automatic restarts on code changes:

```bash
npm run dev
```

#### Production Mode

To run the compiled application:

```bash
npm start
```

The backend API will typically run on `http://localhost:3000` (or the port specified in your `.env` file).

## Project Structure

```
backend/
├── src/
│   ├── app.ts                 # Main Express application setup
│   ├── config/                # Environment configuration
│   ├── controllers/           # API request handlers
│   ├── middleware/            # Express middleware
│   ├── models/                # Database models/interfaces
│   ├── routes/                # API route definitions
│   ├── services/              # Business logic and service layer
│   ├── utils/                 # Utility functions (e.g., Docker interaction, password hashing)
│   └── index.ts               # Application entry point
├── .env.example               # Example environment variables
├── package.json               # Project dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── .gitignore                 # Files/directories to ignore in Git
└── README.md                  # This file
```

## API Endpoints (Planned)

*   `POST /api/v1/auth/register`
*   `POST /api/v1/auth/login`
*   `GET /api/v1/users`
*   `POST /api/v1/simulations`
*   `GET /api/v1/simulations/:id`
*   `POST /api/v1/simulations/:id/trigger`
*   `POST /api/v1/simulations/:id/recover`
*   `GET /api/v1/simulations/:id/report`

Further details on specific endpoints, request/response formats, and authentication will be documented as development progresses.
