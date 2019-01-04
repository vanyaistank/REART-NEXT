import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import sinon from 'sinon';
import Heading from './Heading';

const sizes = ['XL', 'L', 'M', 'S'];

for (let i = 0; i < sizes.length; i++) {
	const currentSize = sizes[i];

	it(`renders black ${currentSize} Heading`, () => {
		const wrapper = shallow(
			<Heading black size={currentSize}>
				$
				{currentSize}
			</Heading>
		);
		expect(wrapper).toMatchSnapshot();
	});
}

it('simulates click events', () => {
	const onHeadingClick = sinon.spy();
	const wrapper = shallow(<Heading onClick={onHeadingClick}>CLICK!</Heading>);
	wrapper.find('Heading').simulate('click');
	expect(onHeadingClick.calledOnce).toEqual(true);
});
