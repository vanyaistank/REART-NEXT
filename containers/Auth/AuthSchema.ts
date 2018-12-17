import gql from 'graphql-tag';

export const SignMutation = gql`
#	mutation($email: String!, $username: String, $password: String!) {
#		Sign(input: { email: $email, username: $username, password: $password }) {
#			success
#			message
#			data {
#				sign {
#					token
#				}
#				user {
#					username
#					ID
#					email
#				}
#			}
#		}
#	}
    mutation($email: String!, $username: String, $password: String!) {
        sign(signInput: { email: $email, username: $username, password: $password }){
            data {
                sign
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
};
