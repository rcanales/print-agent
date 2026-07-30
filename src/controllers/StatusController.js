import os from 'os';
import agent from '../config/agent.js';

export default class StatusController {

    index(req, res) {

        res.json({
            name: 'ERP Print Agent',
            version: process.env.npm_package_version,
            agentId: agent.id,
            node: process.version,
            platform: process.platform,
            hostname: os.hostname(),
            uptime: process.uptime(),
        });

    }

}