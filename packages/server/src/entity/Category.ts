import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToMany
} from 'typeorm';
import {
	Field,
	ID,
	InputType,
	ObjectType
} from 'type-graphql';
import { Product } from './Product';

@InputType()
export class CategoryInput {
	@Field()
	name: string;
}

@InputType()
export class AddCategoryToInput extends CategoryInput {
	@Field(() => ID)
	id: number;
}

@Entity('categories')
@ObjectType()
export class Category extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id: number;

	@Field()
	@Column({ type: 'text' })
	name: string;

	@Field(() => [Product])
	@OneToMany(() => Product, product => product.category)
	products: Product[]
}