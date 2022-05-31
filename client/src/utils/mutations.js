import { gql } from '@apollo/client';

export const CREATE_BOWL = gql`
    mutation createBowl($size: String!, $base: String!, $protein: String!, $veggies: String, $sauces: String, $toppings: String) {
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
