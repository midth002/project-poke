import { gql } from '@apollo/client';

export const CREATE_BOWL = gql`
    mutation createBowl($size: String, $base: String, $protein: String, $veggies: String, $sauces: String, $toppings: String) {
        createBowl(size: $size, base: $base, protein: $protein, veggies: $veggies, sauces: $sauces, toppings: $toppings) {
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
