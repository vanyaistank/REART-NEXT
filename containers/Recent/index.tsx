import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';

import { Row, Title, Product } from '@Components';

// temporary
import { getProductsQuery } from '../ListOfProducts/ProductsQueries';

export default class Categories extends PureComponent {
	renderSlides = slides => (
		<Row>{slides.map(item => <Product small key={item.id} item={item} />)}</Row>
	);

	render() {
		return (
			<Query query={getProductsQuery}>
				{({ data, loading, error }) => {
					if (error) return <h1>Error!</h1>;
					if (loading) return <h1>Loading...</h1>;

					const { getProducts } = data;

					if (Array.isArray(getProducts) && getProducts.length >= 4) {
						const lastFourItems = getProducts.slice(0, 4);

						return (
							<Fragment>
								<Title>Recently Dropped</Title>
								<Row>{this.renderSlides(lastFourItems)}</Row>
							</Fragment>
						);
					}

					return null;
				}}
			</Query>
		);
	}
}
