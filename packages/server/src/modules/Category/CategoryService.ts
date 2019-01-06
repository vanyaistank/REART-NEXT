import { Category, CategoryInput } from '../../entity/Category';



export default class CategoryService {
	public static async addCategory(input: CategoryInput): Promise<Category> {
		const category = await Category.create(input);
		await category.save();

		return category;
	}

	public static async getCategories(): Promise<Array<Category>> {
		return await Category.find();
	}

	public static async deleteCategory(id: number): Promise<boolean> {
		try {
			await Category.delete(id);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}