import {
	Resolver,
	// Authorized,
	Mutation,
	Arg,
	Ctx,
	PubSub,
	Publisher,
	Subscription,
	Root,
	InputType,
	Field
} from 'type-graphql';
import { Message } from '../../entity/Message';
import { MyContext } from '../../types/Context';

const NEW_MESSAGE = 'NEW_MESSAGE';

@InputType()
class MessageInput {
	@Field()
	text: string;

	@Field({ nullable: true })
	type: string;
}

@Resolver(Message)
export class MessageResolver {
	// @Authorized()
	@Mutation(() => Message)
	async sendMessage(
		@Arg('input') input: MessageInput,
		@Ctx() { req, userLoader }: MyContext,
		@PubSub(NEW_MESSAGE) publish: Publisher<Message>
	) {
		const createdAt = Date.now().toString();
		if (req.decodedToken) {
			// @ts-ignore
			console.log(req.decodedToken.id, 'ID???');
			// @ts-ignore
			const user = await userLoader.load(req!.decodedToken!.id);
			const message = Message.create({
				createdAt,
				user,
				...input,
			});

			await Message.save(message);
			await publish(message);

			return message;
		}

		throw Error('User is not authorized');
	}

	// @Authorized()
	@Subscription({ topics: NEW_MESSAGE})
	showMessages(
		@Root() msgPayload: Message
	): Message {
		return msgPayload
	}
}