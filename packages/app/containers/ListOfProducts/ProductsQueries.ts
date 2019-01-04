import gql from 'graphql-tag';

export const getProductsQuery = gql`
	query {
        products(productsQueryOptions: {}) {
            id
            user_id
            category_id
            name
            description
            code
            price
            author
            photoUrl
            creation_date
        }
    }
`;
