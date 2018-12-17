import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import 'jest-styled-components';

import Button from './Button';

it('simulates click events', () => {
	const onButtonClick = sinon.spy();
	const wrapper = shallow(<Button onClick={onButtonClick}>TEST</Button>);
	wrapper.simulate('click');
	expect(onButtonClick.calledOnce).toEqual(true);
});
