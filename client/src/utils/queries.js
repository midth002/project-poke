import { gql } from '@apollo/client';

export const QUERY_STAFF_PICKS = gql `
query allStaffPicks {
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
        beverage
        price
    }
}`