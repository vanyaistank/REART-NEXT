import { Resolver, Mutation, Query, Arg, InputType, ID, Field, Ctx, Authorized } from 'type-graphql';
import { Product, ProductInput } from '../../entity/Product';
import ProductService, { SearchProductInput } from './ProductService';
import { MyContext } from '../../types/Context';

@InputType()
export class getByIdsInput {
	@Field(() => [ID])
	ids: [number];
}

@Resolver(Product)
export class ProductResolver {
	@Query(() => [Product])
	async getProducts(
		@Arg('input') input: SearchProductInput,
	) {
		return await ProductService.getProducts(input);
	}

	@Query(() => Product)
	async getProductByUserId(
		@Arg('userId') userId: number,
	) {
		return await ProductService.getProductByUserId(userId);
	}

	@Query(() => Product)
	async getProductById(
		@Arg('id') id: number,
	) {
		return await ProductService.getById(id);
	}

	@Query(() => [Product])
	async getProductsByIds(
		@Arg('ids') ids: getByIdsInput,
	) {
		return await ProductService.getByIds(ids);
	}

	@Query(() => [Product])
	async getByCategory(
		@Arg('categoryId') categoryId: number,
	) {
		return await ProductService.getByCategory(categoryId);
	}

	@Mutation(() => Product)
	@Authorized()
	async addProduct(
		@Arg('input') input: ProductInput,
		@Ctx() { req, userLoader }: MyContext,
	) {
		if (req.decodedToken) {
			// @ts-ignore
			const user = await userLoader.load(req!.decodedToken!.id);

			return await ProductService.create({ ...input, user });
		}

		return null;
	}

	@Mutation(() => Product)
	async updateProduct(
		@Arg('input') input: ProductInput,
	) {
		return await ProductService.update(input);
	}

	@Mutation(() => Boolean)
	async deleteProduct(
		@Arg('id') id: number,
	) {
		return await ProductService.delete(id);
	}
}
