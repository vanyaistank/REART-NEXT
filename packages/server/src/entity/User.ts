import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from "typeorm";
import {
    ArgsType,
    ObjectType,
    Field,
    ID,
    InputType
} from "type-graphql";
import {Product} from './Product';

@ArgsType()
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

@ArgsType()
@InputType()
export class UserInput extends SignInput {
    @Field(() => ID, { nullable: true })
    id: number;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    password: string;

    @Field({ nullable: true })
    role: string;

    @Field(() => Boolean, { nullable: true })
    verified: boolean;

    @Field({ nullable: true })
    country: string;

    @Field({ nullable: true })
    gender: string;
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

    @Field()
    @Column({ type: 'text', nullable: true })
    country: string;

    @Field()
    @Column({ type: 'text', nullable: true })
    gender: string;

    @Field(() => [Product])
    @OneToMany(() => Product, product => product.userId)
    products: Product[]
}