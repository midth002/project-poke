const { Bowl, Order, Drink, Sides, StaffPicks, User }= require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        allBowls: async () => {
            return Bowl.find({});

        },
        oneBowl: async (parent, {bowlId}) => {
            return Bowl.findOne({_id: bowlId})

        },
        allBevs: async () => {
            return Drink.find({});
        },
        oneBev: async (parent, {drinkId}) => {
            return Drink.findOne({_id: drinkId})
        },
        allSides: async () => {
            return Sides.find({});
        },
        oneSide: async (parent, {sidesId}) => {
            return Sides.findOne({_id: sidesId});
        },
        allStaffPicks: async () => {
            return StaffPicks.find({});
        },
        onePick: async (parents, {staffPicksId}) => {
            return StaffPicks.findOne({_id: staffPicksId})
        },
        allUsers: async () => {
            return User.find({})
        },

        // authMe: async (parent, args, context) => {
        //     if (context.user) {
        //       return User.findOne({ _id: context.user._id });
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        //   },
    },

    Mutation: {
        editBowl: async (parent, { bowls }) => {
            return await Order.findOneAndUpdate(
                {_id},
                {$set: { bowls: bowl }},
                {new: true}
            );

        },
        createBowl: async(parent, args) => {
            return Bowl.create(args);
        },

        removeBowl: async (parent, {bowl})=> {
            return Order.findOneAndUpdate(
                {_id},
                {$pull: {bowls: bowl}},
                {new: true}
            )
        },
        createBev: async (parent, args) => {
            return Drink.create(args);
        },
        addUser: async (parent, { userName, email, password }) => {
            const user = await User.create({ userName, email, password });
            const token = signToken(user);
            return { token, user };
          },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
    
            if (!user) {
              throw new AuthenticationError('No User with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
          },

        //   removeUser: async (parent, args, context) => {
        //     if (context.user) {
        //       return User.findOneAndDelete({ _id: context.user._id });
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        //   },
    }
}

module.exports = resolvers;