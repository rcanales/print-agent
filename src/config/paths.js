import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = path.dirname(
    fileURLToPath(import.meta.url)
);

export const projectRoot = path.resolve(
    currentDir,
    '../..'
);

export const logoPath = path.join(
    projectRoot,
    'storage',
    'logos',
    'supertienda-guadalupe.png'
);

export function resolveProjectPath(filePath) {
    return path.isAbsolute(filePath)
        ? filePath
        : path.resolve(projectRoot, filePath);
}
