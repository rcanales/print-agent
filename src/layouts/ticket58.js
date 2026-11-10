export default {

    width: 32,

    separator: '-',

    logo: {
        enabled: true,
        width: 300,
    },

    qr: {
        cellSize: 4,
        correction: 'M'
    },

    columns: {

        quantity: {
            start: 0,
            width: 3
        },

        description: {
            start: 4,
            width: 15
        },

        price: {
            start: 20,
            width: 5
        },

        amount: {
            start: 26,
            width: 6
        }

    },

    margins: {
        left: 0,
        right: 0
    },

    fonts: {
        title: 'double',
        subtitle: 'bold'
    }

};
