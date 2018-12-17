import React from 'react';
import { Button, Row, Col, Heading, Swiper, Link, ProductImage } from '@Components';

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
	addToCart: (number, boolean) => void;
}

const InnerProduct: React.SFC<Props> = ({ item, addToCart }) => {
	const {
		id,
		name,
		author,
		description,
		price,
		photoUrl,
	} = item;

	// temporary function, cause there's single image in the response yet
	const renderSlides = () => (
		<div key={id} className="swiper-slide">
			<ProductImage hideLink id={id} imageSrc={photoUrl} />
		</div>
	);

	const isUnique = false; // temporary: is this item unique? (you can't increase its quantity)

	console.log(item, 'ITEM IN INNERPRODUCT');

	return (
		<Row>
			<Col size={6} sizeL={12} sizeMd={12} sizeSm={12} marginBottom="50px">
				<Swiper>{renderSlides()}</Swiper>
			</Col>
			<Col size={6} sizeL={12} sizeMd={12} sizeSm={12}>
				<Col size={12}>
					<Heading darkGray size="L">
						{name}
					</Heading>
				</Col>
				<Col size={12}>
					<Heading inline bold size="S">
						{'by' + ' '}
					</Heading>
					<Link darkGray href="/">
						@{author}
					</Link>
				</Col>
				<Col size={12}>
					<Heading size="L">{price} $</Heading>
				</Col>
				<Col size={12} marginBottom="20px">
					<Button
						width="100%"
						onClick={() => addToCart(id, isUnique)}
						dark
					>
						ADD TO CART
					</Button>
				</Col>
				<Col size={12} marginBottom="50px">
					<Button
						width="100%"
						onClick={() => {}}
						invertedDark
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
