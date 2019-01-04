import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ObjectType, Field } from "type-graphql";
import UserService from './UserService';
import { SignInput, User } from '../../entity/User';

@ObjectType()
class SignData {
	@Field({ nullable: true })
	token?: string;

	@Field({ nullable: true })
	user?: User;
}

@ObjectType()
export class SignResponse {
	@Field()
	success: boolean;

	@Field()
	message: string;

	@Field()
	data: SignData
}

export default class AuthService {
	public static async signIn({ email, password }: SignInput): Promise<SignResponse> {
		try {
			const user = await UserService.getByEmail(email);

			if (!user) {
				return this.createErrorResponse('No such user found.')
			}

			const valid = await bcrypt.compare(password, user.password);

			if (!valid) {
				return this.createErrorResponse('Incorrect password.')
			}

			const token = AuthService.createToken(user);
			return AuthService.createSuccessResponse(token, user);

		} catch (e) {
			return AuthService.createErrorResponse(e);
		}
	}

	public static async signUp(input: SignInput): Promise<SignResponse> {
		try {
			const user = await UserService.save(input);
			const token = AuthService.createToken(user);

			return AuthService.createSuccessResponse(token, user);
		} catch (e) {
			return AuthService.createErrorResponse(e);
		}
	}

	private static createToken(user: User) {
		if (!process.env.JWT_SECRET) {
			throw Error('process.env.JWT_SECRET is missing, check ur .env');
		}

		return jsonwebtoken.sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1y' }
		);
	}

	private static createSuccessResponse(token: string, user: User) {
		return {
			success: true,
			message: '',
			data: {
				token,
				user,
			}
		}
	}

	private static createErrorResponse(error: any) {
		console.log(error);

		return {
			success: false,
			message: typeof error !== 'string' && error.message || error,
			data: {}
		}
	}
}