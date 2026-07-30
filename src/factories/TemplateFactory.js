import SaleTicket from '../templates/SaleTicket.js';
import FcfTemplate from '../templates/FcfTemplate.js';
import CcfTemplate from '../templates/CcfTemplate.js';
import KitchenTemplate from '../templates/KitchenTemplate.js';
import RestaurantTemplate from '../templates/RestaurantTemplate.js';
import CashClosingTemplate from '../templates/CashClosingTemplate.js';

const templates = {

    fcf: FcfTemplate,

    ccf: CcfTemplate,

    saleticket: SaleTicket,

    kitchen: KitchenTemplate,

    restaurant: RestaurantTemplate,

    cashclosing: CashClosingTemplate,

};

export default class TemplateFactory {

    static create(name, ticket) {

        const Template = templates[name];

        if (!Template) {

            throw new Error(
                `Plantilla no soportada: ${name}`
            );

        }

        return new Template(ticket);

    }

}