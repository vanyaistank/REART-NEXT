import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';

import { getProductsQuery } from './ProductsQueries';
import { Row, Product } from '@Components';

interface Props {
	userId?: number; // fetch user's products
}

interface QueryVariables {
	searchValue?: string;
	orderBy?: string;
	orderDirection?: string;
	id?: number;
}

export default class ProductsContainer extends PureComponent<Props> {
	renderProducts = products => (
		<Row>{products.map(item => <Product key={item.id} item={item} />)}</Row>
	)

	render() {
		const { userId } = this.props;
		console.log(userId, 'userId???');
		const variables: QueryVariables = {};
		if (userId) variables.id = +userId;

		return (
			<Query
				query={getProductsQuery}
				variables={variables}
			>
				{({ data, loading, error }) => {
					if (error) return <h1>Error!</h1>;
					if (loading) return <h1>Loading...</h1>;

					const { getProducts: products } = data;

					return this.renderProducts(products);
				}}
			</Query>
		);
	}
}
