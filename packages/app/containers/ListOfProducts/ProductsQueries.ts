import gql from 'graphql-tag';
import { productFragment } from '@GraphQL/fragments/productFragment';

export const getProductsQuery = gql`
    ${productFragment}
    query($searchValue: String, $orderBy: String, $orderDirection: String) {
      getProducts(input: { 
        searchValue: $searchValue, 
        orderBy: $orderBy, 
        orderDirection: $orderDirection 
      }) {
        ...productFragment
      }
    }
`;
