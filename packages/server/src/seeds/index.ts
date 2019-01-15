import chalk from 'chalk';
import { seedCategories } from './seedCategories';
import { seedUsers } from './seedUsers';
import { seedProducts } from './seedProducts';
import createConnection from '../createTypeORMconn';
(async () => {
	try {
		await createConnection();

		await seedCategories();
		console.log(chalk.green.bold('CATEGORIES SEEDED'));
		await seedUsers();
		console.log(chalk.green.bold('USERS SEEDED'));
		await seedProducts();
		console.log(chalk.green.bold('PRODUCTS SEEDED'));
	} catch (e) {
		throw Error(`error while seeding db: ${e}`);
	}
})();
