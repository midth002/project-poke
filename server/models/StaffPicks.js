const { Schema, model } = require('mongoose')

const staffPicksSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const StaffPicks = model('StaffPicks', staffPicksSchema);

module.exports = StaffPicks;