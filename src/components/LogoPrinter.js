
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

import {
    logoPath,
    resolveProjectPath,
} from '../config/paths.js';

export default class LogoPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    async print(options = {}) {

        const config = {
            ...(this.ticket.layout.logo ?? {}),
            ...options,
        };

        if (config.enabled === false) {
            return;
        }

        const imagePath = config.path
            ? resolveProjectPath(config.path)
            : logoPath;

        if (!fs.existsSync(imagePath)) {
            console.warn(`No se encontró el logo: ${imagePath}`);
            return;
        }

        const width = config.width ?? 300;

        const tempPath = path.join(
            path.dirname(imagePath),
            `${path.basename(imagePath, path.extname(imagePath))}-print.png`
        );

        const printer = this.ticket.printer;

        try {
            await sharp(imagePath)
                .resize({
                    width,
                    withoutEnlargement: true,
                })
                .png()
                .toFile(tempPath);

            printer.alignCenter();

            await printer.printImage(tempPath);

            printer.newLine();
        } catch (error) {
            console.error('Error al imprimir el logo:', error);
            throw error;
        } finally {
            printer.alignLeft();
        }
    }
}
