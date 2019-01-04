import { getRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { User, SignInput } from '../../entity/User';

type UserResult = Promise<User | null | undefined>;

export default class UserService {
	public static async getUsers () {
		return await getRepository(User)
			.createQueryBuilder('users')
			.getMany();
	}

	// dry but i guess these will come in handy later
	public static async getByEmail(email: string): UserResult {
		return User.findOne({ where: { email } }) || null;
	}

	public static async getByUsername(username: string): UserResult {
		return User.findOne({ where: { username } }) || null;
	}

	public static async save({ email, username, password, firstName, lastName }: SignInput) {
		// @ts-ignore
		// since username is nullable
		const isUserExists = await this.isUserExists(email, username);

		if (isUserExists) {
			throw new Error('User with email: ' + email + ' already exists');
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = User.create({
			password: encryptedPassword,
			username,
			email,
			firstName,
			lastName
		});
		await user.save();

		return user;
	}

	private static async isUserExists (email: string, username: string): Promise<boolean> {
		const isEmailExists = await this.getByEmail(email);
		const isUserExists = await this.getByUsername(username);

		return !!(isEmailExists && isUserExists);
	}
}