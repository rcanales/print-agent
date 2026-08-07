export default class FooterPrinter {

    constructor(ticket) {
        this.ticket = ticket;
    }

    /**
     * Imprime el pie del documento.
     *
     * @param {Object} data
     */
    print(data = {}) {

        const footer = data.footer ?? {};

        if (!this.hasContent(footer)) {
            return;
        }

        this.ticket.sectionTitle('INFORMACIÓN ADICIONAL');

        this.printLegends(footer);

        this.printResolution(footer);

        this.printWebsite(footer);

        this.printMessage(footer);

        this.printQr(footer);

    }

    /**
     * Determina si existe información para imprimir.
     */
    hasContent(footer) {

        return (
            (footer.legends?.length ?? 0) > 0 ||
            footer.resolution ||
            footer.website ||
            footer.message ||
            footer.qr
        );

    }

    /**
     * Leyendas.
     */
    printLegends(footer) {

        (footer.legends ?? []).forEach(text => {

            this.ticket.left(text);

        });

    }

    /**
     * Resolución.
     */
    printResolution(footer) {

        if (!footer.resolution) {
            return;
        }

        this.ticket.blank();

        this.ticket.block(
            'Resolución',
            footer.resolution
        );

    }

    /**
     * Sitio web.
     */
    printWebsite(footer) {

        if (!footer.website) {
            return;
        }

        this.ticket.block(
            'Consulta',
            footer.website
        );

    }

    /**
     * Mensaje final.
     */
    printMessage(footer) {

        if (!footer.message) {
            return;
        }

        if (footer.cashier) {
            this.ticket.center(
                `Cajero: ${footer.cashier}`
            )
        }

        if (footer.branch) {
            this.ticket.center(
                `Sucursal: ${footer.branch}`
            )
        }

        this.ticket.blank();

        this.ticket.center(
            footer.message
        );

    }

    /**
     * Código QR.
     */
    printQr(footer) {

        if (!footer.qr) {
            return;
        }

        this.ticket.qr(
            footer.qr
        );

    }

}