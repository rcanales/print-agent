import sleep from '../utils/sleep.js';
import logger from '../utils/logger.js';

export default class PrintWorker {

    constructor(printJobsApi, printService) {

        this.printJobsApi = printJobsApi;
        this.printService = printService;

        this.running = false;

        this.emptyQueueDelay = 5000;
        this.processDelay = 3000;
        this.errorDelay = 5000;

    }

    async start() {

        if (this.running) {
            return;
        }

        this.running = true;

        logger.log(
            'Servidor de impresión iniciado...'
        );

        while (this.running) {

            try {

                await this.processJobs();

            } catch (error) {

                logger.error?.(error) ??
                    logger.log(error.message);

                await sleep(this.errorDelay);

            }

        }

    }

    stop() {

        this.running = false;

        logger.log(
            'Servidor de impresión detenido.'
        );

    }

    async processJobs() {

        const jobs = await this.printJobsApi.getPendingJobs();

        if (!jobs.length) {

            await sleep(this.emptyQueueDelay);

            return;

        }

        for (const job of jobs) {

            await this.processJob(job);

        }

        await sleep(this.processDelay);

    }

    async processJob(job) {

        try {

            await this.printService.print(job.payload);

            await this.printJobsApi.markPrinted(
                job.job_id
            );

            logger.log(
                `Trabajo ${job.job_id} impreso correctamente.`
            );

        }
        catch (error) {

            logger.error?.(error) ??
                logger.log(error.message);

            await this.printJobsApi.markFailed(
                job.job_id,
                error.message
            );

        }

    }

}