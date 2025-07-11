# Database Setup for Ransomware Attack Simulation Platform

This directory contains all the necessary SQL scripts and documentation to set up and manage the PostgreSQL database for the Ransomware Attack Simulation Platform.

## 1. Database Technology

*   **PostgreSQL**: Version 16.x

## 2. Directory Structure

*   `./migrations/`: Contains versioned SQL migration scripts.
*   `./seed_data/`: (Optional) Placeholder for future seed data scripts.

## 3. Setup Instructions

To set up the database, you will need a running PostgreSQL instance.

### 3.1. Prerequisites

*   **PostgreSQL 16.x**: Ensure PostgreSQL is installed and running.
*   **Database User**: Create a dedicated database user with appropriate permissions.
*   **Database**: Create an empty database for the application (e.g., `ransomware_sim_db`).

Example SQL to create a user and database (execute as a superuser, e.g., `postgres`):

```sql
CREATE USER ransomware_app WITH PASSWORD 'your_secure_password';
CREATE DATABASE ransomware_sim_db OWNER ransomware_app;
GRANT ALL PRIVILEGES ON DATABASE ransomware_sim_db TO ransomware_app;
```
**IMPORTANT**: Replace `'your_secure_password'` with a strong, unique password. This password should be stored securely (e.g., in environment variables for the backend application).

### 3.2. Applying Migrations

We use a simple versioned migration approach. Each `.sql` file in the `migrations/` directory represents a database schema change.

**Manual Application (for initial setup or development):**

1.  Navigate to the `database/` directory.
2.  Connect to your PostgreSQL database using `psql` or a similar client:
    ```bash
    psql -h localhost -U ransomware_app -d ransomware_sim_db
    ```
    (Replace `localhost`, `ransomware_app`, `ransomware_sim_db` with your actual connection details.)

3.  Execute the migration scripts in sequential order. For the initial setup, execute `V1__initial_schema.sql`:
    ```sql
    \i migrations/V1__initial_schema.sql
    ```
    (Ensure you are running `psql` from the `database/` directory, or provide the full path to the `.sql` file.)

**Automated Application (for production/CI/CD):**

The backend application (Node.js/TypeScript) is expected to handle database migrations programmatically on startup using a library (e.g., `node-pg-migrate` or similar custom logic) to ensure the database schema is always up-to-date. Refer to the backend's `README.md` for specific instructions on how it manages migrations.

## 4. Schema Details

The initial schema defines the following tables:

*   `users`: Stores user accounts (Administrators and Trainees).
*   `simulations`: Stores details about each simulation session.
*   `simulation_logs`: Records events during simulation for audit and reporting.

Refer to the `migrations/V1__initial_schema.sql` file for the exact DDL statements.

## 5. Maintenance

*   **Backups**: Regularly back up your `ransomware_sim_db` database.
*   **Monitoring**: Monitor database performance and resource utilization.
*   **Updates**: Keep PostgreSQL updated to the latest stable version.
