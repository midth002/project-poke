const mongoose = require('mongoose');

const { Schema } = mongoose;

const paymentSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order'
    }
  ]
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;