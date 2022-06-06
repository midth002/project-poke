import { gql } from "@apollo/client";

export const CREATE_ORDER = gql `
mutation createOrder($orderDate: String) {
  createOrder(orderDate: $orderDate) {
    _id
    bowlId {
      _id
      size
    }
    staffPickId {
      _id
      name
    }
    sideId {
      _id
      name
    }
    drinkId {
      _id
      beverage
    }
    currentOrder
  }
}
`;
export const ADD_BOWL = gql`
mutation addBowl($orderId: ID, $bowlId: ID) {
    addBowl(orderId: $orderId, bowlId: $bowlId) {
      _id
      orderDate
      bowlId
    }
}
`;

export const ADD_STAFF_PICK = gql `
mutation AddStaffPick($orderId: ID, $staffPickId: ID) {
  addStaffPick(orderId: $orderId, staffPickId: $staffPickId) {
    _id
    staffPickId {
      _id
      name
      description
      price
    }
  }
}
`;

export const DELETE_STAFF_PICK = gql `
mutation deleteStaffPick($orderId: ID, $staffPickId: ID) {
  deleteStaffPick(orderId: $orderId, staffPickId: $staffPickId) {
    _id
    staffPickId {
      _id
      name
    }
  }
}
`

export const ADD_SIDE = gql `
mutation addSide($orderId: ID, $sideId: ID) {
  addSide(orderId: $orderId, sideId: $sideId) {
    _id
    sideId {
      _id
      name
      price
      description
    }
  }
}
`;
export const DELETE_SIDE = gql`
mutation deleteSide($orderId: ID, $sideId: ID) {
  deleteSide(orderId: $orderId, sideId: $sideId) {
    _id
    sideId {
      _id
      name
    }
  }
}
`

export const ADD_DRINK = gql `
mutation addDrink($orderId: ID, $drinkId: ID) {
  addDrink(orderId: $orderId, drinkId: $drinkId) {
    _id
    drinkId {
      _id
      beverage
      price
    }
  }
}
`;
export const DELETE_DRINK = gql `
mutation deleteDrink($orderId: ID, $drinkId: ID) {
  deleteDrink(orderId: $orderId, drinkId: $drinkId) {
    _id
    drinkId {
      _id
      beverage
    }
  }
}
`;

export const DELETE_BOWL = gql `
mutation removeBowl($bowlId: ID, $orderId: ID) {
  removeBowl(bowlId: $bowlId, orderId: $orderId) {
    _id
    bowlId {
      _id
      size
      base
      protein
      veggies
      sauces
      toppings
    }
  }
}
`;

export const CREATE_BOWL = gql`
mutation createBowl($orderId: ID, $size: String!, $base: String!, $protein: String!, $veggies: String!, $sauces: String, $toppings: String) {
  createBowl(orderId: $orderId, size: $size, base: $base, protein: $protein, veggies: $veggies, sauces: $sauces, toppings: $toppings) {
    _id
    size
    base
    protein
    veggies
    sauces
    toppings
  }
}
`;

export const ADD_USER = gql`
    mutation addUser($userName: String!, $email: String!, $password: String!) {
        addUser(userName: $userName, email: $email, password: $password) {
        token
        user {
            _id
            userName
        }
        }
    }
    `;
export const ADD_ORDER = gql `
mutation addOrder($userId: ID, $orderId: ID) {
  addOrder(userId: $userId, orderId: $orderId) {
    _id
    orderId {
      _id
      currentOrder
    }
  }
}
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            userName
        }
        }
    }
    `;

export const COMPLETE_ORDER = gql`
mutation completeOrder($orderId: ID!) {
  updateCurrentOrderToFalse(orderId: $orderId) {
    _id
    currentOrder
  }
}`;
