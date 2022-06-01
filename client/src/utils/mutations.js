import { gql } from "@apollo/client";

export const CREATE_ORDER = gql `
mutation CreateOrder($orderDate: String) {
  createOrder(orderDate: $orderDate) {
    _id
    drinkId {
      _id
      beverage
      price
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
mutation addStaffPick($orderId: ID, $staffPickId: ID) {
    addStaffPick(orderId: $orderId, staffPickId: $staffPickId) {
      _id
      orderDate
      bowlId
    }
}
`;

export const ADD_SIDE = gql `
mutation addSide($orderId: ID, $sideId: ID) {
    addSide(orderId: $orderId, sideId: $sideId) {
      _id
      orderDate
      bowlId
    }
}
`;

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
import { gql } from '@apollo/client';
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
