import BaseTemplate from './BaseTemplate.js';

export default class RestaurantTemplate extends BaseTemplate {

    print(data = {}) {

        this.header(data);

        this.document(data);

        this.customer(data);

        this.products(data);

        this.totals(data);

        this.footer(data);

    }

}