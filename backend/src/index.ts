import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Ransomware Attack Simulation Backend Service is running!');
});

// TODO: Implement API routes and controllers
// import authRoutes from './routes/authRoutes';
// app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
