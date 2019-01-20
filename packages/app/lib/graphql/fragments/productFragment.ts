import gql from 'graphql-tag';
import { userFragment } from '@GraphQL/fragments/userFragment';

export const productFragment = gql`
    ${userFragment}
	fragment productFragment on Product {
        id
        name
        unique
        description
        user {
            ...userFragment
        }
        price
        createdAt
        category {
            id
            name
        }
        photoUrl
	}
`;
