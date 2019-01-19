import gql from 'graphql-tag';
import { productFragment } from '@GraphQL/fragments/productFragment';

export const userFragment = gql`
	${productFragment}

    fragment userFragment on User {
        username
        email
        id
	    products {
            ...productFragment
	    }
    }
`;
