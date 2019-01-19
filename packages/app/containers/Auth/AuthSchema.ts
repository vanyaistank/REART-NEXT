import gql from 'graphql-tag';
import { userFragment } from '@GraphQL/fragments/userFragment';

export const SignMutation = gql`
    mutation(
        $email: String!,
        $username: String,
        $password: String!
    ) {
        sign(input: {
            email: $email,
            username: $username,
            password: $password
        }){
            data {
                token
                user {
                    ...userFragment
                }
            }
            message
            success
        }
    }
`;

export type SignUpVariables = {
	email: string;
	username?: string;
	password: string;
	firstName?: string;
	lastName?: string;
};
