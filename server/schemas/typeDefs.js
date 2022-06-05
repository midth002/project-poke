const {gql} = require('apollo-server-express')

const typeDefs = gql`
type Bowl{
    _id: ID!
    size: String!
    base: String!
    protein: String!
    veggies: String!
    sauces: String
    toppings: String
}

type Order{
    _id: ID
    orderDate: String
    bowlId: [Bowl]
    staffPickId: [StaffPicks]
    sideId: [Sides]
    drinkId: [Drink]
    currentOrder: Boolean
}

type Checkout {
    session: ID
}


type Drink{
    _id: ID
    beverage: String!
    price: Int!
}

type Sides{
    _id: ID
    name: String!
    price: Int!
    description: String!
}

type StaffPicks{
    _id: ID
    name: String!
    description: String!
    price: Int!
}

type User {
    _id: ID
    userName: String!
    email: String!
    password: String!
    orderId: [Order]
}

type Auth {
    token: ID!
    user: User
}

type Payment {
    _id: ID
    purchaseDate: String
    orders: [Order]
  }

type Query{
    allBowls: [Bowl]!
    oneBowl(_id: ID): Bowl!
    allBevs: [Drink]!
    oneBev: Drink!
    allSides: [Sides]!
    oneSide: Sides!
    allStaffPicks: [StaffPicks]!
    onePick: StaffPicks!
    allOrders(currentOrder: Boolean): [Order]
    oneOrder(currentOrder: Boolean): Order
    allUsers: [User]!
    checkout(orders: [ID]!): Checkout
    
}

type Mutation {
    editBowl(orderId: ID, bowl: String): Order
    createBowl(orderId: ID, size: String!, base: String!, protein: String!, veggies: String!, sauces: String, toppings: String): Bowl
    removeBowl(orderId: ID, bowlId: ID): Order
    createOrder(orderDate: String): Order
    addBowl( orderId: ID, bowlId: ID): Order
    addStaffPick( orderId: ID, staffPickId: ID): Order
    deleteStaffPick(orderId:ID, staffPickId:ID): Order
    addSide( orderId: ID, sideId: ID): Order
    deleteSide(orderId: ID, sideId:ID): Order
    addDrink( orderId: ID, drinkId: ID): Order
    deleteDrink(orderId: ID, drinkId: ID): Order
    createBev(beverage: String!, price: Int!): Drink
    addUser(userName: String!, email: String!, password: String!): Auth
    addOrder(userId: ID, orderId: ID): User
    login(email: String!, password: String!): Auth
    addPayment(orders: [ID]!): Payment
}`

module.exports = typeDefs;