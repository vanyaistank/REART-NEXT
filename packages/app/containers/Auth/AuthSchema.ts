import gql from 'graphql-tag';

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
                    id
                    email
                    username
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
