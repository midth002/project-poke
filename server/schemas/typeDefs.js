const {gql} = require('apollo-server-express')

const typeDefs = gql`
type Bowl{
    _id: ID!
    size: String!
    base: String!
    protein: String!
    veggies: String
    sauces: String
    toppings: String
}

type Order{
    _id: ID
    bowl:[Bowl]
}

type Query{
    allBowls: [Bowl]!
    oneBowl: Bowl!
}

type Mutation {
    editBowl(orderId: ID, bowl: String): Order
    createBowl(size: String!, base: String!, protein: String!, veggies: String, sauces: String, toppings: String): Bowl
    removeBowl(bowl: String!): Order
}`

module.exports = typeDefs;