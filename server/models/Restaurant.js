const { Schema, model } = require('mongoose');


const restaurantSchema = new Schema({
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
});

const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;