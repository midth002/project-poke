const {Schema, model} = require('mongoose');

const bowlSchema = new Schema({
    size:{
        type: String,
        required: true,
    },
    base:{
        type: String,
        required: true,   
    },
    protein:
        {
            type: String,
            required: true,
        }
    ,
    veggies:[
        {
            type: String,
            required: true,
        }
    ],
    sauces:[{
            type: String,
    }],
    toppings:[{
            type: String,
    }],
});

const Bowl = model('Bowl', bowlSchema);
module.exports = Bowl