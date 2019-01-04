import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import sinon from 'sinon';

import { AuthContainer } from '../Auth';

it('handles sign response successfully, then triggers toggleModal and authorize actions', () => {
	const fakeResponse = {
		success: true,
		message: null,
		data: {
			sign: {
				token: 'token',
			},
			user: {
				username: 'username!',
			},
		},
	};

	const onAuthorize = sinon.spy();
	const onToggleModal = sinon.spy();

	const wrapper = shallow(
		<AuthContainer
			toggleModal={onToggleModal}
			authorize={onAuthorize}
			user={{}}
			layout={{}}
		/>
	);

	wrapper.instance().handleSignUpResponse(fakeResponse);
	expect(onAuthorize.calledOnce).toEqual(true);
	expect(onToggleModal.calledOnce).toEqual(true);
});

it('handles error from sign response', () => {
	const fakeResponse = {
		success: false,
		message:
			'The email address and username you have entered is already registered.',
	};

	const onAuthorize = sinon.spy();
	const onToggleModal = sinon.spy();

	const wrapper = shallow(
		<AuthContainer
			toggleModal={onToggleModal}
			authorize={onAuthorize}
			user={{}}
			layout={{}}
		/>
	);

	wrapper.instance().handleSignUpResponse(fakeResponse);

	const errors = wrapper.state().apiErrors;
	expect(errors).toMatchSnapshot();
});
