import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import 'jest-styled-components';

import Link from './Link';

it('simulates click events', () => {
	const onButtonClick = sinon.spy();
	const wrapper = shallow(<Link onClick={onButtonClick}>TEST</Link>);
	wrapper.simulate('click');
	expect(onButtonClick.calledOnce).toEqual(true);
});
