import gql from 'graphql-tag';

export const getProductQuery = gql`
    query($id: Int!) {
        product(id: $id) {
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
