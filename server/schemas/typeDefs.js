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

type Drink{
    beverage: String!
    price: Int!
}

type Sides{
    name: String!
    price: Int!
    description: String!
}

type StaffPicks{
    name: String!
    description: String!
    price: Int!
}

type Query{
    allBowls: [Bowl]!
    oneBowl: Bowl!
    allBevs: [Drink]!
    oneBev: Drink!
    allSides: [Sides]!
    oneSide: Sides!
    allStaffPicks: [StaffPicks]!
    onePick: StaffPicks!
}

type Mutation {
    editBowl(orderId: ID, bowl: String): Order
    createBowl(size: String!, base: String!, protein: String!, veggies: String, sauces: String, toppings: String): Bowl
    removeBowl(bowl: String!): Order
    createBev(beverage: String!, price: Int!): Drink
}`

module.exports = typeDefs;