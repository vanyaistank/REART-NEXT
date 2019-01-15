import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';
import { getProductQuery } from './ProductSchema';
import InnerProduct from './components/InnerProduct';

class ProductContainer extends PureComponent<any> {
	render() {
		const {
			router: {
				query: { id },
			},
		} = this.props;

		return (
			<Query
				query={getProductQuery}
				variables={{
					id: +id,
				}}
			>
				{({ data, error, loading }) => {
					if (error) return <h1>ERROR!</h1>;
					if (loading) return <h1>LOADING...</h1>;

					const { getProductById: product } = data;

					return (
						<InnerProduct
							item={product}
						/>
					);
				}}
			</Query>
		);
	}
}

export default withRouter(ProductContainer);
