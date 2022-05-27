const { Bowl, Order, Drink, Sides, StaffPicks }= require('../models');

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
        }
    }
}

module.exports = resolvers;