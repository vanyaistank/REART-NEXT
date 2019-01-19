import * as bcrypt from 'bcrypt';
import { User, SignInput, UserInput } from '../../entity/User';

type UserResult = Promise<User | null | undefined>;

type oneOfArgs = 'email' | 'username' | 'id';

// https://github.com/Microsoft/TypeScript/issues/5683
type whereArg = {
	[key in oneOfArgs]: string | number;
}

export default class UserService {
	public static async getUsers () {
		return User.find();
	}

	public static async getUser(arg: Partial<whereArg>): UserResult {
		return User.findOne({ where: arg }) || null;
	}

	public static async create({ email, username, password }: SignInput) {
		// @ts-ignore
		// since username is nullable
		const isUserExists = await this.isUserExists(email, username);

		if (isUserExists) {
			throw new Error(`A user is already registered with this email address: ${email}`);
		}

		const encryptedPassword = await bcrypt.hash(password, 10);

		const user = User.create({
			password: encryptedPassword,
			username,
			email,
		});
		await user.save();

		return user;
	}

	public static async update({ id, ...rest }: UserInput): Promise<boolean> {
		try {
			await User.update(id, { ...rest });
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	private static async isUserExists (email: string, username: string): Promise<boolean> {
		const isEmailExists = await this.getUser({ email });
		const isUserExists = await this.getUser({ username });

		return !!(isEmailExists && isUserExists);
	}
}