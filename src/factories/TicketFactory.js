import Ticket58 from '../core/Ticket58.js';
import Ticket80 from '../core/Ticket80.js';

const tickets = {
    58: Ticket58,
    80: Ticket80
};

export default class TicketFactory {

    static create(printer, width = 58) {

        width = Number(width);

        const TicketClass = tickets[width];

        if (!TicketClass) {
            throw new Error(
                `Ancho de ticket no soportado: ${width} mm`
            );
        }

        return new TicketClass(printer);

    }

}