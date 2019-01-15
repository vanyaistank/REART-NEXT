import React from 'react';
import {
	Button,
	Row,
	Col,
	Heading,
	Swiper,
	Link,
	ProductImage,
} from '@Components';
// TODO: export types
import { useCart } from 'react-ecommerce-hook';

type Product = {
	id: number;
	user_id: number;
	category_id: number;
	name: string;
	description: string;
	code: string;
	price: number;
	author: string;
	photoUrl: string;
	creation_date: Date;
};

interface Props {
	item: Product;
}
const InnerProduct: React.SFC<Props> = ({ item }) => {
	const {
		id,
		name,
		description,
		price,
		photoUrl,
		user: {
			username,
		},
	} = item;

	// temporary function, cause there's single image in the response yet
	const renderSlides = () => (
		<div key={id} className="swiper-slide">
			<ProductImage hideLink id={id} imageSrc={photoUrl} />
		</div>
	);

	const { addToCart } = useCart();

	// const isUnique = false; // temporary: is this item unique? (you can't increase its quantity)

	return (
		<Row>
			<Col size={6} sizeL={12} sizeMd={12} sizeSm={12} marginBottom="50px">
				<Swiper>{renderSlides()}</Swiper>
			</Col>
			<Col flexDirection="column" size={6} sizeL={12} sizeMd={12} sizeSm={12}>
				<Col size={12}>
					<Heading white size="L">
						{name}
					</Heading>
				</Col>
				<Col size={12} alignItems="center">
					<Heading inline bold size="S">
						{`by  `}
					</Heading>
					<Link white href="/">
						{`@${username}`}
					</Link>
				</Col>
				<Col size={12}>
					<Heading size="L">{`${price} $`} </Heading>
				</Col>
				<Col size={12} marginBottom="20px">
					<Button
						width="100%"
						onClick={() => {
							addToCart({ id });
						}}
						purple
					>
						ADD TO CART
					</Button>
				</Col>
				<Col size={12} marginBottom="50px">
					<Button
						width="100%"
						onClick={() => {}}
						invertedPurple
					>
						SEND A MESSAGE
					</Button>
				</Col>
				<Col size={12}>
					<Heading size="M">{description}</Heading>
				</Col>
			</Col>
		</Row>
	);
};

export default InnerProduct;
