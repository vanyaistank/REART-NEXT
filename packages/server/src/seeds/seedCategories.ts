import CategoryService from '../modules/Category/CategoryService';

export const categoriesToSeed = [
	'painting',
	'sculpture',
	'jewelry',
	'clothing',
	'whatever',
	'whatever',
	'whatever',
	'whatever'
];

export const seedCategories = async () => {
	for (const name of categoriesToSeed) {
		await CategoryService.addCategory({ name });
	}
};