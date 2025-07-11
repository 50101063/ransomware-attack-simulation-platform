import { Router } from 'express';
import simulationRoutes from './simulationRoutes';

const router = Router();

// Mount simulation routes
router.use('/simulations', simulationRoutes);

// Placeholder for auth routes
router.post('/auth/register', (req, res) => {
    res.status(200).send('Register endpoint (placeholder)');
});

router.post('/auth/login', (req, res) => {
    res.status(200).send('Login endpoint (placeholder)');
});

export default router;
