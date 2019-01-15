import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne,
	JoinTable
} from 'typeorm';
import {
	Float,
	Int,
	ObjectType,
	Field,
	ID,
	InputType
} from 'type-graphql';
import { User } from './User';
import { AddCategoryToInput, Category } from './Category';

@InputType()
export class ProductInput {
	@Field(() => ID, { nullable: true })
	id: number;

	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => Boolean, { nullable: true, defaultValue: true })
	unique: boolean;

	@Field(() => Float)
	price: number;

	@Field()
	photoUrl: string;

	@Field(() => AddCategoryToInput)
	category: Category;
}

@Entity('products')
@ObjectType()
export class Product extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	@Field()
	@Column({ type: 'text' })
	name: string;

	@Field()
	@Column({ type: 'text' })
	description: string;

	@Field(() => Boolean)
	@Column({ type: 'bool', default: true })
	unique: boolean;

	@Field(() => Int)
	@Column({ type: 'int', default: 0 })
	price: number;

	@Field()
	@Column({ type: 'text'})
	photoUrl: string;

	@Field()
	@Column({ type: 'text' })
	createdAt: string;

	@Field(() => User)
	@ManyToOne(() => User, user => user.products, { eager: true })
	@JoinTable()
	user: User;

	@Field(() => Category)
	@ManyToOne(() => Category, category => category.products, { eager: true })
	@JoinTable()
	category: Category;
}