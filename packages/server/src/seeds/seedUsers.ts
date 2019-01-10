import UserService from '../modules/User/UserService';
import { SignInput } from '../entity/User';

const users = ['randy01', 'randy02', 'randy03'];

export const seedUsers = async () => {
	const usersToSeed = users.reduce((acc: Array<SignInput>, curr: string) => {
		const randyUser = {
			email: curr,
			username: curr,
			password: curr,
			firstName: curr,
			lastName: curr,
		};
		acc.push(randyUser);

		return acc;
	}, []);

	for (const user of usersToSeed) {
		await UserService.create(user);
	}
};