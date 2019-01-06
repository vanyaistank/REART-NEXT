import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { Category, CategoryInput } from '../../entity/Category';
import CategoryService from './CategoryService';

@Resolver(Category)
export class CategoryResolver {
	@Mutation(() => Category)
	async addCategory(
		@Arg('input') input: CategoryInput
	) {
		return await CategoryService.addCategory(input);
	}

	@Query(() => [Category])
	async getCategories() {
		return await CategoryService.getCategories();
	}

	@Mutation(() => Boolean)
	async deleteCategory(
		@Arg('input') id: number
	) {
		return await CategoryService.deleteCategory(id);
	}
}