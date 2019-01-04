import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Header, { Personal, Authorization } from '../components';

const noop = () => {};

it('renders Authorization block', () => {
	const wrapper = shallow(<Authorization toggleModal={noop} />);
	expect(wrapper).toMatchSnapshot();
});

it('renders Personal block', () => {
	const wrapper = shallow(<Personal handleLogout={noop} />);
	expect(wrapper).toMatchSnapshot();
});

it('renders Header for an unauthorized user', () => {
	const wrapper = shallow(
		<Header showMenu={false} toggleModal={noop} toggleMenu={noop} />
	);
	expect(wrapper).toMatchSnapshot();
});

it('renders Header for an authorized user', () => {
	const wrapper = shallow(
		<Header
			showMenu={false}
			toggleModal={noop}
			toggleMenu={noop}
			token="token"
		/>
	);
	expect(wrapper).toMatchSnapshot();
});

it('renders Top Menu', () => {
	const wrapper = shallow(
		<Header showMenu toggleModal={noop} toggleMenu={noop} token="token" />
	);
	expect(wrapper).toMatchSnapshot();
});
