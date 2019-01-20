import { getRepository, SelectQueryBuilder } from 'typeorm';
import { InputType, Field, Int } from 'type-graphql';
import { Product, ProductInput } from '../../entity/Product';
import { getByIdsInput } from './Resolver';
import { User } from '../../entity/User';
import { Category } from '../../entity/Category';

@InputType()
export class SearchProductInput {
	@Field({ nullable: true })
	searchValue?: string;

	@Field({ nullable: true })
	orderBy?: string;

	@Field(() => String, { nullable: true })
	orderDirection?: 'DESC' | 'ASC' | undefined;

	@Field(() => Int, { nullable: true })
	id?: number;
}

export default class ProductService {
	public static async getProducts({
		searchValue = '',
		orderBy = 'id',
		orderDirection = 'DESC',
		id,
	}: SearchProductInput): Promise<Array<Product>> {
		const search = '%' + searchValue + '%';

		let products = await getRepository(Product)
			.createQueryBuilder('products');
		if (id) {
			products = await products.innerJoinAndSelect('products.user', 'user', 'user.id = :id', { id });
		} else {
			products = await products.leftJoinAndSelect('products.user', 'user')
		}

		products = await products.leftJoinAndSelect('products.category', 'category')
			.where('products.name like :search', { search })
			.orWhere('products.description like :search', { search })
			// @ts-ignore
			.orderBy(`products.${orderBy}`, `${orderDirection}`)
			.getMany();
		// @ts-ignore
		return products || [];
	}

	public static async getProductByUserId(userId: number): Promise<Product | undefined> {
		return Product.findOne({ where: { userId } }) || undefined;
	}

	public static async getById(id: number): Promise<Product | undefined> {
		return Product.findOne({ where: { id } }) || undefined;
	}

	public static async getByIds(ids: getByIdsInput): Promise<SelectQueryBuilder<Product>> {
		const products = await getRepository(Product)
			.createQueryBuilder('products')
			.where("products.userId in :ids", { ids });

		return products || [];
	}

	public static async getByCategory(categoryId: number): Promise<Array<Product>> {
		return Product.find({ where: { categoryId }}) || [];
	}

	public static async create(input: ProductInput & { user: User }): Promise<Product> {
		const createdAt = Date.now().toString();

		const { category: categoryInput, ...rest } = input;
		const category = Category.create(categoryInput);

		const product = Product.create({
			...rest,
			category,
			createdAt,
		});
		console.log(product, 'PRODUCT!!!');
		await product.save();

		return product;
	}

	public static async update({ id, ...rest }: ProductInput): Promise<boolean> {
		try {
			await Product.update(id, { ...rest });
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	public static async delete(id: number): Promise<boolean> {
		try {
			await Product.delete(id);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}