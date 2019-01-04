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
    mutation(
        $email: String!, 
        $username: String, 
        $password: String!, 
        $firstName: String, 
        $lastName: String
    ) {
        sign(signInput: { 
            email: $email, 
            username: $username, 
            password: $password, 
            firstName: $firstName, 
            lastName: $lastName 
        }){
            data {
                sign
                user {
                    id
                    email
                    username
	                firstName
	                lastName
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
