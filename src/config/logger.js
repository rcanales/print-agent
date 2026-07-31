import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDir = path.resolve('logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({

    level: process.env.LOG_LEVEL || 'debug',

    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.json()
    ),

    transports: [

        new winston.transports.Console(),

        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),

        new winston.transports.File({
            filename: 'logs/agent.log'
        })

    ]

});

// Método auxiliar
logger.logError = function (error, context = '') {

    this.error({
        context,
        message: error.message,
        stack: error.stack
    });

};

export default logger;