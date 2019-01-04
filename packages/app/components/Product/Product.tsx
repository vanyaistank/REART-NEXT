import React from 'react';
import { Col, Link, Heading, ProductImage } from '@Components';

type Item = {
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
	item: Item;
	small?: boolean;
}

const Product: React.SFC<Props> = ({ item, small }) => (
	<Col centered size={3} sizeL={6} sizeMd={6} sizeSm={12}>
		<ProductImage
			margin
			id={item.id}
			height={small ? '220px' : '390px'}
			imageSrc={item.photoUrl}
		/>
		<Link href="/">{`@${item.author}`}</Link>
		<Heading size="M">
			{item.name}
		</Heading>
		<Heading
			size="M"
			marginBottom="50px"
			bold
		>
			{`${item.price}$`}
		</Heading>
	</Col>
);

export default Product;
