import React from 'react';
import { Row, Col, Heading } from '@Components';

const Title = ({ children }) => (
	<Row>
		<Col size={12}>
			<Heading bold size="L" marginTop="50px" white marginBottom="50px">
				{children}
			</Heading>
		</Col>
	</Row>
);

export default Title;
