const {Schema, model} = require('mongoose')

const orderSchema = new Schema({
    orderDate: {
      type: String,
      default: Date.now(),
    },
    // total: {
    //   type: Number,
    //   required:true,
    // },
    // location: {
    //   type: String,
    //   required: true,
    // },
    // user:[  
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     }

    // ],
    bowlId:[{
      type: Schema.Types.ObjectId,
      ref: 'Bowl'
    }],
    staffPickId: [{
      type: Schema.Types.ObjectId,
      ref: "StaffPicks"
    }],

    sideId: [{
      type: Schema.Types.ObjectId,
      ref: "Sides"
    }],
    drinkId: [{
      type: Schema.Types.ObjectId,
      ref: "Drink"
    }],
    currentOrder: {
      type: Boolean,
      default: true
    }
    
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Order = model('Order', orderSchema);
module.exports = Order;
