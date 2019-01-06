import {Resolver, Mutation, Query, Arg, InputType, ID, Field} from 'type-graphql';
import { Product, ProductInput } from '../../entity/Product';
import ProductService, { SearchProductInput } from './ProductService';

@InputType()
export class getByIdsInput {
	@Field(() => [ID])
	ids: [number]
}

@Resolver(Product)
export class ProductResolver {
	@Query(() => [Product])
	async getProducts(
		@Arg('input') input: SearchProductInput
	) {
		return await ProductService.getProducts(input);
	}

	@Query(() => Product)
	async getByUserId(
		@Arg('input') userId: number
	) {
		return await ProductService.getByUserId(userId);
	}

	@Query(() => Product)
	async getById(
		@Arg('input') id: number
	) {
		return await ProductService.getById(id);
	}

	@Query(() => [Product])
	async getByIds(
		@Arg('input') ids: getByIdsInput
	) {
		return await ProductService.getByIds(ids);
	}

	@Query(() => [Product])
	async getByCategory(
		@Arg('input') categoryId: number
	) {
		return await ProductService.getByCategory(categoryId);
	}

	@Mutation(() => Product)
	async addProduct(
		@Arg('input') input: ProductInput
	) {
		return await ProductService.save(input);
	}

	@Mutation(() => Product)
	async updateProduct(
		@Arg('input') input: ProductInput
	) {
		return await ProductService.update(input);
	}

	@Mutation(() => Product)
	async deleteProduct(
		@Arg('input') id: number
	) {
		return await ProductService.delete(id);
	}
}