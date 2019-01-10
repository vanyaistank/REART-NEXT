import { categoriesToSeed } from './seedCategories';
import userLoader from '../loaders/userLoader';
import ProductService from '../modules/Product/ProductService';

const getUser1 = async () => await userLoader().load('1');
const getUser2 = async () => await userLoader().load('2');

const product1 = {
	name: 'Damn Son',
	unique: true,
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
	price: 777,
	photoUrl: 'https://pp.userapi.com/c630117/v630117754/2d72d/fBdlOlnOvUk.jpg',
	category: {
		id: 1,
		name: categoriesToSeed[0],
	},
};

const product2 = {
	name: 'Whered you find this',
	unique: true,
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
	price: 666,
	photoUrl: 'https://pp.userapi.com/c630117/v630117754/2d72d/fBdlOlnOvUk.jpg',
	category: {
		id: 2,
		name: categoriesToSeed[1]
	},
};

export const seedProducts = async () => {
	const user1 = await getUser1();
	const user2 = await getUser2();

	// @ts-ignore
	product1.user = user1;
	// @ts-ignore
	product2.user = user2;

	const productsToSeed: Array<any> = Array(32);
	productsToSeed.fill(product1, 0, 16);
	productsToSeed.fill(product2, 16, 32);

	for (const product of productsToSeed) {
		await ProductService.create(product);
	}
};