import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import { getProductsQuery } from './ProductsQueries';
import { Row, Product } from '@Components';

export default class ProductsContainer extends PureComponent {
	renderProducts = products => (
		<Row>{products.map(item => <Product key={item.id} item={item} />)}</Row>
	);

	render() {
		return (
			<Query query={getProductsQuery}>
				{({ data, loading, error }) => {
					if (error) return <h1>Error!</h1>;
					if (loading) return <h1>Loading...</h1>;

					const { products } = data;

					return this.renderProducts(products);
				}}
			</Query>
		);
	}
}
