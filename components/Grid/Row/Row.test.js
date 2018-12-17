import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Row from './Row';

it('renders Row', () => {
	const wrapper = shallow(<Row>ROW</Row>);
	expect(wrapper).toMatchSnapshot();
});
