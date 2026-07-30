import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {

    res.json({
        status: 'ok',
        service: 'Print Agent',
        timestamp: new Date().toISOString()
    });

});

export default router;