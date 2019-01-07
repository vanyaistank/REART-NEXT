import { Resolver, Mutation, Query, Arg, Ctx } from 'type-graphql';
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
			console.log('response.success');
			if (req.session) {
				console.log(req.session);
				req.session.userId = response!.data!.user!.id;
				console.log(req.session, 'userId???');
			}
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
	async me(
		@Ctx()
			ctx: MyContext
	) {
		const { userId } = ctx.req.session!;
		return userId ? User.findOne(userId) : null;
	}

	@Query(() => User, { nullable: true })
	async getUserByEmail(@Arg('email') email: string) {
		return UserService.getUser({ email });
	}

	@Query(() => User, { nullable: true })
	async getUserByUsername(@Arg('username') username: string) {
		return UserService.getUser({ username });
	}
}
