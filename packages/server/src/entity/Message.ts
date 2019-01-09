import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@Entity()
@ObjectType()
export class Message extends BaseEntity{
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id: string;

	@Field()
	@Column()
	text: string;

	@Field()
	@Column({ type: 'text'})
	createdAt: string;

	@Field({ description: 'type of message, eg business/personal' })
	@Column({ type: 'text', default: 'personal' })
	type: string;

	@Field(() => User)
	@ManyToOne(() => User, user => user.messages)
	user: User
}