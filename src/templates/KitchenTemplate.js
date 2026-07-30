import BaseTemplate from './BaseTemplate.js';

export default class KitchenTemplate extends BaseTemplate {

    print(data = {}) {

        this.header(data);

        this.document(data);

        this.products(data);

        this.footer(data);

    }

}