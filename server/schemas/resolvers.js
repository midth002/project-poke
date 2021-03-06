const { Bowl, Order, Drink, Sides, StaffPicks, User, Payment }= require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST);

const resolvers = {
    Query: {
        allBowls: async () => {
            return await Bowl.find({});

        },
        oneBowl: async (parent, {bowlId}) => {
            return await Bowl.findOne({_id: bowlId})

        },
        allBevs: async () => {
            return await Drink.find({});
        },
        oneBev: async (parent, {drinkId}) => {
            return await Drink.findOne({_id: drinkId})
        },
        allSides: async () => {
            return await Sides.find({});
        },
        oneSide: async (parent, {sidesId}) => {
            return await Sides.findOne({_id: sidesId});
        },
        allStaffPicks: async () => {
            return await StaffPicks.find({});
        },
        onePick: async (parents, {staffPicksId}) => {
            return await StaffPicks.findOne({_id: staffPicksId})
        },
        allOrders: async () => {
            return await Order.find({}).populate(["drinkId", "sideId", "staffPickId", "bowlId"])
        },
        oneOrder: async (parents, {orderId}) => {
            return await Order.findOne({_id: orderId}).populate("drinkId")
        },
        allUsers: async () => {
            return User.find({})
        },

        // checkout: async (parent, args, context) => {
        //     const url = new URL(context.headers.referer).origin;
        //     const order = new Order({ bowl: args.bowlId, staffPick: args.staffPickId, side: args.sideId, drink: args.drinkId });
        //     const line_items = [];
    
        //     const { bowls, staffPicks, drinks, sides } = await order.populate('bowlId', 'staffPickId', 'sideId', 'drinkId').execPopulate();
    
        //     for (let i = 0; i < bowls.length; i++) {
        //       const bowl = await stripe.products.create({
        //         size: bowls[i].size,
        //         base: bowls[i].base,
        //         protein: bowls[i].protein,
        //         veggies: bowls[i].veggies,
        //         sauces: bowls[i].sauces,
        //         toppings: bowls[i].toppings
        //       });
    
        //       const price = await stripe.prices.create({
        //         product: product.id,
        //         unit_amount: products[i].price * 100,
        //         currency: 'usd',
        //       });
    
        //       line_items.push({
        //         price: price.id,
        //         quantity: 1
        //       });
      //     }
    
        //     const session = await stripe.checkout.sessions.create({
        //       payment_method_types: ['card'],
        //       line_items,
        //       mode: 'payment',
        //       success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        //       cancel_url: `${url}/`
        //     });
    
        //     return { session: session.id };
        //   }

        // authMe: async (parent, args, context) => {
        //     if (context.user) {
        //       return User.findOne({ _id: context.user._id });
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        //   },
    },

    Mutation: {
        // editBowl: async (parent, { bowls }) => {
        //     return await Order.findOneAndUpdate(
        //         {_id},
        //         {$set: { bowls: bowl }},
        //         {new: true}
        //     );

        // },
        createBowl: async(parent, {orderId, size, base, protein, veggies, sauces, toppings}) => {
            // console.log('resolver.js', args)
            const newBowl = await Bowl.create({
                size, 
                base,
                protein,
                veggies,
                sauces,
                toppings
            })
                await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {bowlId: newBowl._id}},
                {new: true}
            )
            return newBowl
        },
        createOrder: async (parent, args) => {
            return Order.create(args)
        },

        removeBowl: async (parent, {orderId, bowlId})=> {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$pull: {bowlId: bowlId}},
                {new: true}
            ).populate("bowlId")
        },
        // addBowl: async (parent, {orderId, bowlId}) => {
        //     return await Order.findOneAndUpdate(
        //         {_id: orderId},
        //         {$push: {bowlId: bowlId}},
        //         {new: true}
        //     ).populate("bowlId")
        // },
        addStaffPick: async (parent, {orderId, staffPickId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {staffPickId: staffPickId}},
                {new: true}
            ).populate("staffPickId")
        },
        deleteStaffPick: async (parent, {orderId, staffPickId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$pull: {staffPickId: staffPickId}},
                {new: true}
            ).populate("staffPickId")
        },
        addSide: async (parent, {orderId, sideId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {sideId: sideId}},
                {new: true}
            ).populate("sideId")
        },
        deleteSide: async (parent, {orderId, sideId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$pull: {sideId: sideId}},
                {new: true}
            ).populate("sideId")
        },
        addDrink: async (parent, {orderId, drinkId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {drinkId: drinkId}},
                {new: true}
            ).populate("drinkId")
        },
        deleteDrink: async (parent, {orderId, drinkId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$pull: {drinkId: drinkId}},
                {new: true}
            ).populate("drinkId")
        },
        addUser: async (parent, { userName, email, password }) => {
            const user = await User.create({ userName, email, password });
            const token = signToken(user);
            return { token, user };
        },
        addOrder: async(parent, {userId, orderId})=>{
            return await User.findOneAndUpdate(
                {_id: userId},
                {$push: {orderId: orderId}},
                {new: true}
            ).populate("orderId")
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No profile with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
            },
        addPayment: async (parent, { orders }, context) => {
           
                  const payment = new Payment({ orders });
          
                  await User.findByIdAndUpdate(context.user._id, { $push: { payments: payment } });
          
                  return payment;
          
              },
        updateCurrentOrderToFalse: async (parent, {orderId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {currentOrder: false}
            )
        }
    }
}


module.exports = resolvers;