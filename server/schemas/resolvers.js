const { Bowl, Order, Drink, Sides, StaffPicks }= require('../models');

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
        }
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
            return Bowl.create(args);
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
                {$set: {bowlId: bowlId}},
                {new: true}
            )
        },
        addStaffPick: async (parent, {orderId, staffPickId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$set: {staffPickId: staffPickId}},
                {new: true}
            )
        },
        addSide: async (parent, {orderId, sideId}) => {
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$set: {sideId: sideId}},
                {new: true}
            )
        },
        addDrink: async (parent, {orderId, drinkId}) => {
            console.log("resolver.js", orderId, drinkId)
            return await Order.findOneAndUpdate(
                {_id: orderId},
                {$push: {drinkId: drinkId}},
                {new: true}
            ).populate("drinkId")
        },
    }
}

module.exports = resolvers;