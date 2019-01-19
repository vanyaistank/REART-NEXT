import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';
import { getUserByUserId } from './profileSchema';

class ProductContainer extends PureComponent<any> {
	render() {
		const {
			router: {
				query: { username },
			},
		} = this.props;

		return (
			<Query
				query={getUserByUserId}
				variables={{
					username,
				}}
			>
				{({ data, error, loading }) => {
					if (error) return <h1>ERROR!</h1>;
					if (loading) return <h1>LOADING...</h1>;

					const { getUserByUsername } = data;
					console.log(getUserByUsername, 'getUserByUsername');
					return <h1>HELLO WORLD</h1>;
				}}
			</Query>
		);
	}
}

export default withRouter(ProductContainer);
