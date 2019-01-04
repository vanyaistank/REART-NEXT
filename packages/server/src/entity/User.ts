import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@InputType()
export class SignInput {
    @Field()
    email: string;

    @Field()
    password: string;

    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;
}

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ type: 'text' })
    username: string;

    @Field()
    @Column({ type: 'text' })
    email: string;

    @Field()
    @Column({ type: 'text' })
    password: string;

    @Field()
    @Column({ type: 'text' })
    firstName: string;

    @Field()
    @Column({ type: 'text' })
    lastName: string;

    @Field()
    @Column({ type: 'text', default: 'fan' })
    role: string;

    @Field(() => Boolean)
    @Column({ type: 'boolean', default: false })
    verified: boolean;
}
