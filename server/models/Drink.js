const { Schema, model } = require('mongoose');

const drinkSchema = new Schema({
    size: {
        type: String,
        required: true,
    },
    beverage: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Drink = model('Drink', drinkSchema);

module.exports = Drink;