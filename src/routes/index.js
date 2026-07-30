import { Router } from 'express';

import infoRoutes from './info.routes.js';
import healthRoutes from './health.routes.js';
import statusRoutes from './status.routes.js';

const router = Router();

router.use('/info', infoRoutes);
router.use('/health', healthRoutes);
router.use('/status', statusRoutes);

export default router;