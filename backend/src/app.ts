import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import simulationRoutes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Database Connection (Placeholder)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Database connected successfully:', result.rows[0].now);
    });
});

// Routes
app.use('/api/v1', simulationRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.status(200).send('Ransomware Attack Simulation Platform Backend is running!');
});

// Error handling middleware (placeholder)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access it at http://localhost:${PORT}`);
});
