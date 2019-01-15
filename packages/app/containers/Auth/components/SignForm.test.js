import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import { Formik } from 'formik';
import { validateSignForm } from '@Helpers/validation/SignValidation';

import SignInForm from './SignInForm';

const noop = () => console.log('noop');

const initialValues = isLogin => {
	const values = {
		email: '',
		password: '',
	};

	if (!isLogin) {
		values.username = '';
	}

	return values;
};

const apiErrors = {
	username: null,
	email: null,
	password: null,
};

it('renders Sign In Form with no values', () => {
	const wrapper = shallow(
		<Formik
			initialValues={initialValues(true)}
			onSubmit={noop}
			validate={values => validateSignForm(values, true)}
			render={({ handleChange, ...rest }) => (
				<SignInForm
					apiErrors={apiErrors}
					handleChange={noop}
					toggleModal={noop}
					switchScreen={noop}
					showModal={noop}
					loading={false}
					{...rest}
				/>
			)}
		/>
	).dive();

	expect(wrapper).toMatchSnapshot();
});

it('renders Sign Up Form with no values', () => {
	const wrapper = shallow(
		<Formik
			initialValues={initialValues(false)}
			onSubmit={noop}
			validate={values => validateSignForm(values, false)}
			render={({ handleChange, ...rest }) => (
				<SignInForm
					apiErrors={apiErrors}
					handleChange={noop}
					toggleModal={noop}
					switchScreen={noop}
					showModal={noop}
					loading={false}
					{...rest}
				/>
			)}
		/>
	).dive();

	expect(wrapper).toMatchSnapshot();
});
