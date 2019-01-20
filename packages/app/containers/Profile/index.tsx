import React, { PureComponent, Fragment } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'next/router';
import { getUserByUsername } from './profileSchema';

import ProfileHead from './components/ProfileHead';
import {Products} from '@Containers';

class ProfileContainer extends PureComponent<any> {
	render() {
		const {
			router: {
				query: { username },
			},
		} = this.props;

		return (
			<Query
				query={getUserByUsername}
				variables={{
					username,
				}}
			>
				{({ data, error, loading }) => {
					if (error) return <h1>ERROR!</h1>;
					if (loading) return <h1>LOADING...</h1>;

					const { getUserByUsername: user } = data;
					console.log(user, 'getUserByUsername');
					return (
						<Fragment>
							<ProfileHead user={user} />
							<Products userId={user.id} />
						</Fragment>
					);
				}}
			</Query>
		);
	}
}

export default withRouter(ProfileContainer);
