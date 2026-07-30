import { Router } from 'express';
import StatusController from '../controllers/StatusController.js';

const router = Router();
const controller = new StatusController();

router.get('/', (req, res) => controller.index(req, res));

export default router;