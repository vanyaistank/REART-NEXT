import gql from 'graphql-tag';

export const productFragment = gql`
	fragment productFragment on Product {
        id
        name
        unique
        description
        user {
            id
            verified
            username
            role
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
