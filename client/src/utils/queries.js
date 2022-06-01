import { gql } from '@apollo/client';

export const QUERY_STAFF_PICKS = gql `
query staffPicks {
    allStaffPicks {
        name
        description
        price
    }
}
`;

export const QUERY_SIDES = gql`
query allSides {
    allSides {
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
  query allOrders {
    allOrders {
      drinkId {
        _id
        beverage
        price
      }
      _id
      currentOrder
    }
  }
  `;
