const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    // total: {

    // },
    // location: {

    // },
    // user:[  
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     }

    // ],
    bowl:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Bowl'
        }
    ]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Order = model('Order', orderSchema);
module.exports = Order
