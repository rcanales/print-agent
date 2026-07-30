export default class WrapHelper {

    /**
     * Divide un texto en múltiples líneas respetando un ancho máximo.
     *
     * Si una palabra supera el ancho permitido,
     * se divide automáticamente.
     *
     * Siempre devuelve un arreglo de líneas.
     *
     * @param {string} text
     * @param {number} width
     * @returns {string[]}
     */
    static wrap(text = '', width = 32) {

        // Normalizar parámetros
        text = String(text ?? '').trim();
        width = Math.max(1, Number(width) || 1);

        if (!text.length) {
            return [''];
        }

        const words = text.split(/\s+/);

        const lines = [];

        let current = '';

        for (const word of words) {

            // La palabra sola es más larga que el ancho
            if (word.length > width) {

                if (current) {
                    lines.push(current);
                    current = '';
                }

                let remaining = word;

                while (remaining.length > width) {
                    lines.push(remaining.slice(0, width));
                    remaining = remaining.slice(width);
                }

                if (remaining.length) {
                    current = remaining;
                }

                continue;
            }

            const candidate = current
                ? `${current} ${word}`
                : word;

            if (candidate.length <= width) {
                current = candidate;
            } else {
                lines.push(current);
                current = word;
            }

        }

        if (current) {
            lines.push(current);
        }

        return lines;
    }

}