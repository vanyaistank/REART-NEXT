import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';
import { User, SignInput } from '../../entity/User';
import UserService from './UserService';
import AuthService, { SignResponse } from './AuthService';

import { MyContext } from '../../types/Context';

@Resolver(User)
export class UserResolver {
	@Mutation(() => SignResponse)
	async sign(
		@Arg('input') input: SignInput,
		@Ctx() ctx: MyContext
	) {
		let response = null;
		if (input.username == null) {
			response = await AuthService.signIn(input);
		} else {
			response = await AuthService.signUp(input);
		}
		
		if (response.success) {
			// @ts-ignore
			ctx.req.session.user = {
				...response.data.user
			};
		}
		return response;
	}

	@Query(() => [User], { nullable: true })
	async getUsers() {
		return UserService.getUsers();
	}

	// @Query(() => User, { nullable: true })
	// async me(
	// 	@Ctx()
	// 		ctx: MyContext
	// ) {
	// 	console.log(ctx.req.session, 'session?');
		// const { id } = ctx.req.session!;
		// return id ? User.findOne(id) : null;
	// }

	@Query(() => User, { nullable: true })
	async getUserByEmail(@Arg('email') email: string) {
		return UserService.getByEmail(email);
	}

	@Query(() => User, { nullable: true })
	async getUserByUsername(@Arg('username') username: string) {
		return UserService.getByUsername(username);
	}
}
