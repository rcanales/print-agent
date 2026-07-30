import app from './app.js';
import agent from './src/config/agent.js';
import logger from './src/config/logger.js';
import container from './src/bootstrap/container.js';

app.listen(agent.port, agent.host, () => {

    logger.info(`ERP Print Agent iniciado en ${agent.host}:${agent.port}`);

});

process.on('uncaughtException', err => {
    logger.error(err);
});

process.on('unhandledRejection', err => {
    logger.error(err);
});

container.printWorker.start();