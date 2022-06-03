import { gql } from '@apollo/client';

export const QUERY_STAFF_PICKS = gql `
query allStaffPicks {
    allStaffPicks {
        _id
        name
        description
        price
    }
}
`;

export const QUERY_SIDES = gql`
query allSides {
    allSides {
        _id
        name
        description
        price
    }
}
`;

export const QUERY_BEVS = gql `
query allBevs {
    allBevs {
        _id
        beverage
        price
    }
}`;

export const QUERY_ONE_ORDER = gql `
query OneOrder($orderId: ID) {
    oneOrder(orderId: $orderId) {
      _id
      bowlId
      staffPickId
      sideId
      drinkId {
        _id
        beverage
        price
      }
    }
  }`;

  export const QUERY_ALL_ORDERS = gql`
  query Query {
    allOrders {
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
      staffPickId {
        _id
        name
        description
        price
      }
      sideId {
        _id
        price
        name
        description
      }
      drinkId {
        _id
        beverage
        price
      }
      currentOrder
    }
  }
  `;

export const QUERY_USER = gql`
  query allUsers {
    users {
      _id
      userName
    }
  }
`;
export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      userName
    }
  }
`;
export const QUERY_ME = gql`
  query authMe {
    authMe {
      _id
      userName
    }
  }
`;
