import gql from 'graphql-tag';

export const categorySchema = gql`
    query{
        getCategories{
            id
            name
        }
    }
`;
