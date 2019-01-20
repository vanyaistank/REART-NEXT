import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { Row, Col, Card, Title } from '@Components';
import { categorySchema } from './categorySchema';

type Category = {
	id: number;
	name: string;
};

export default class Categories extends PureComponent {
	renderCards = (categories: Category[]) =>
		categories.map(item => (
			<Col key={item.id} size={3} sizeL={6} sizeMd={6} sizeSm={6}>
				<Card>{item.name.toUpperCase()}</Card>
			</Col>
		))

	render() {
		return (
			<Row>
				<Title>Browse Categories</Title>
				<Query
					query={categorySchema}
				>
					{({ data, loading, error }) => {
						if (error) return <h1>Error!</h1>;
						if (loading) return <h1>Loading...</h1>;

						const { getCategories = [] } = data;

						if (getCategories.length === 0) return null;

						return this.renderCards(getCategories);
					}}
				</Query>
			</Row>
		);
	}
}
