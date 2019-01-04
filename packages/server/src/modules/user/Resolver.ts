import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { User, SignInput } from '../../entity/User';
import UserController from './Controller';
// import { MyContext } from "../../types/Context";

@Resolver(User)
export class UserResolver {
	@Mutation(() => User)
	async CreateUser(@Arg('input') input: SignInput) {
		return UserController.save(input);
	}

	@Query(() => [User], { nullable: true })
	async getUsers() {
		return UserController.getUsers();
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
		return UserController.getByEmail(email);
	}

	@Query(() => User, { nullable: true })
	async getUserByUsername(@Arg('username') username: string) {
		return UserController.getByUsername(username);
	}
}
