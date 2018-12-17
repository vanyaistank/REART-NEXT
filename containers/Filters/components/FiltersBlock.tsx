import React from 'react';
import { Row, Col } from '@Components';
// import Select from 'react-select';

interface Props {}

const FiltersBlock: React.SFC<Props> = () => (
	<Row marginBottom="50px">
		<Col size={3}>HELLO!</Col>
		<Col size={6}>LOREM IPSUM</Col>
		<Col right size={3}>
			SORT BY
		</Col>
	</Row>
);

export default FiltersBlock;
