import {Resolver, Mutation, Query, Arg, Ctx, Authorized} from 'type-graphql';
import { User, SignInput, UserInput } from '../../entity/User';
import UserService from './UserService';
import AuthService, { SignResponse } from './AuthService';

import { MyContext } from '../../types/Context';

@Resolver(User)
export class UserResolver {
	@Mutation(() => SignResponse)
	async sign(
		@Arg('input') input: SignInput,
		@Ctx() { req }: MyContext
	) {
		let response = null;
		if (input.username == null) {
			response = await AuthService.signIn(input);
		} else {
			response = await AuthService.signUp(input);
		}

		if (response.success) {
			const { token } = response.data;
			// @ts-ignore
			req.token = token;
		}

		return response;
	}

	@Mutation(() => Boolean)
	async updateUser(
		@Arg('input') input: UserInput
	) {
		return await UserService.update(input);
	}

	@Query(() => [User], { nullable: true })
	async getUsers() {
		return UserService.getUsers();
	}

	@Query(() => User, { nullable: true })
	@Authorized()
	async me(
		@Ctx()
			ctx: MyContext
	) {
		if (ctx.req.decodedToken) {
			// @ts-ignore
			const { id } = ctx.req.decodedToken.id;
			if (id) {
				return User.findOne(id);
			}
		}

		return null;
	}

	@Query(() => User, { nullable: true })
	async getUserByEmail(@Arg('email') email: string) {
		return UserService.getUser({ email });
	}

	@Query(() => User, { nullable: true })
	async getUserByUsername(@Arg('username') username: string) {
		return UserService.getUser({ username });
	}

	@Query(() => User, { nullable: true })
	async getUserByUserId(@Arg('userId') id: number) {
		return UserService.getUser({ id });
	}
}
