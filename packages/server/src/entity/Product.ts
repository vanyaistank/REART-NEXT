import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	ManyToOne
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
import { Category } from './Category';

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
	author: string;

	@Field()
	photoUrl: string;

	@Field(() => Int)
	userId: number;

	@Field(() => Int)
	categoryId: number;
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

	@Field(() => Float)
	@Column({ type: 'float', nullable: true })
	price?: number;

	@Field()
	@Column({ type: 'text'})
	author: string;

	@Field()
	@Column({ type: 'text'})
	photoUrl: string;

	@Field()
	@Column({ type: 'text' })
	createdAt: string;

	@Field(() => Int)
	@ManyToOne(() => User, user => user.products)
	userId: number;

	@Field(() => Int)
	@ManyToOne(() => Category, category => category.products)
	categoryId: number;
}