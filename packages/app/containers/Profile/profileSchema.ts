import gql from 'graphql-tag';
import { userFragment } from '@GraphQL/fragments/userFragment';

export const getUserByUsername = gql`
	${userFragment}
    query ($username: String!) {
        getUserByUsername(username: $username) {
            ...userFragment
        }
    }
`;
