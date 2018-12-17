import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import {mapDispatchToProps} from '@Redux/helpers';
import { AddToCart } from '@Redux/reducers/Cart/CartActions';
import { getCart } from '@Redux/reselect';
import { getProductQuery } from './ProductSchema';
import InnerProduct from './components/InnerProduct';

class ProductContainer extends PureComponent<any> {
	render() {
		const {
			match: {
				params: { id },
			},
			addToCart,
		} = this.props;

		console.log(this.props, 'PROPS IN PRODUCTCONTAINER');
		return (
			<Query
				query={getProductQuery}
				variables={{
					id,
				}}
			>
				{({ data, error, loading }) => {
					if (error) return <h1>ERROR!</h1>;
					if (loading) return <h1>LOADING...</h1>;

					const { product } = data;
					return (
						<InnerProduct
							addToCart={addToCart}
							item={product}
						/>
					);
				}}
			</Query>
		);
	}
}

const actionCreators = {
	addToCart: AddToCart,
};

export default connect(getCart, mapDispatchToProps(actionCreators))(ProductContainer);
