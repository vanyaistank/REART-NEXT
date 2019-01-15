import gql from 'graphql-tag';
import { productFragment } from '@GraphQL/fragments/productFragment';


export const getProductQuery = gql`
	${productFragment}
    query($id: Float!) {
        getProductById(id: $id) {
            ...productFragment
        }
    }
`;
