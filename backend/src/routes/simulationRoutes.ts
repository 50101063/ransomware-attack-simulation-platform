import { Router } from 'express';
import { createSimulation } from '../controllers/simulationController';

const router = Router();

/**
 * @route POST /api/v1/simulations/create
 * @desc Creates a new simulation environment.
 * @access Private (requires authentication/authorization)
 */
router.post('/create', createSimulation);

export default router;
