const { Bowl, Order, Drink, Sides, StaffPicks, User }= require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

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
            return await Order.find({}).populate("drinkId")
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
        createBowl: async(parent, args) => {
            // console.log('resolver.js', args)
            return await Bowl.create(args);
        },
        createOrder: async (parent, args) => {
            return Order.create(args)
        },

        removeBowl: async (parent, {bowl})=> {
            return Order.findOneAndUpdate(
                {_id},
                {$pull: {bowls: bowl}},
                {new: true}
            )
        },
        addBowl: async (parent, {orderId, bowlId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {bowlId: bowlId}},
                {new: true}
            ).populate("bowlId")
        },
        addStaffPick: async (parent, {orderId, staffPickId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {staffPickId: staffPickId}},
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
        addDrink: async (parent, {orderId, drinkId}) => {
            console.log("resolver.js", orderId, drinkId)
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {drinkId: drinkId}},
                {new: true}
            ).populate("drinkId")
        },
        addUser: async (parent, { userName, email, password }) => {
            const user = await User.create({ userName, email, password });
            const token = signToken(user);
            return { token, user };
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
    }
}

module.exports = resolvers;