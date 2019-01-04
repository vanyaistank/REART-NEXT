import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Col from './Col';

for (let i = 0; i < 12; i++) {
	it(`renders Col ${i}`, () => {
		const wrapper = shallow(
			<Col size={i}>
				$
				{i}
			</Col>
		);
		expect(wrapper).toMatchSnapshot();
	});
}

it('renders centered Col', () => {
	const wrapper = shallow(
		<Col size={12} centered>
			CENTERED
		</Col>
	);
	expect(wrapper).toMatchSnapshot();
});
