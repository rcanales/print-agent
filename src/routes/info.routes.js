import { Router } from 'express';
import os from 'os';

import config from '../config/config.js';
import packageJson from '../../package.json' with { type: 'json' };

const router = Router();

router.get('/', (_, res) => {

    res.json({

        name: packageJson.name,

        version: packageJson.version,

        agentId: config.agentId,

        node: process.version,

        platform: process.platform,

        arch: process.arch,

        hostname: os.hostname(),

        uptime: Math.floor(process.uptime()),

        startedAt: new Date(
            Date.now() - process.uptime() * 1000
        ).toISOString()

    });

});

export default router;