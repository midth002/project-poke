const { Bowl, Order }= require('../models');

const resolvers = {
    Query: {
        allBowls: async () => {
            return Bowl.find({});

        },
        oneBowl: async (parent, {bowlId}) => {
            return Bowl.findOne({_id: bowlId})

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
        }
    }
}

module.exports = resolvers;