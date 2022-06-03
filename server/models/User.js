const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const Payment = require('./Payment')

const userSchema = new Schema ({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      },
<<<<<<< HEAD
      payments: [Payment.schema]
=======

      orderId:[{
        type: Schema.Types.ObjectId,
        ref: 'Order'
      }],
>>>>>>> 95eee6f3673fa0d3e85732d00f51ec0092726cde
    
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;