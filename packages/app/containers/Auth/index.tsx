import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { Formik, FormikProps } from 'formik';
import _ from 'lodash';

import { Mutation } from 'react-apollo';
import { SignMutation } from './AuthSchema';

import { connect } from 'react-redux';
import { getUserAndLayout, getUserAndLayoutType } from '@Redux/reselect';
import { mapDispatchToProps } from '@Redux/helpers';
import { ToggleModal } from '@Redux/reducers/Layout/LayoutActions';

import { UserData } from '@Redux/reducers/User/UserReducer';
import { Authorize } from '@Redux/reducers/User/UserActions';

import SignForm from './components/SignForm';
import {
	validateSignForm,
	possibleApiErrorMessages,
} from '@Helpers/validation/SignValidation';

export type SignFormValues = {
	email: string;
	username?: string;
	password: string;
	firstName?: string;
	lastName?: string;
};

export type oneOfFields = 'username' | 'email' | 'password' | 'firstName' | 'lastName';

interface Props extends getUserAndLayoutType {
	toggleModal: () => void;
	authorize: (data: UserData) => void; // log in user
}

interface State extends SignFormValues {
	isLogin: boolean; // whether or not show login page
	apiErrors: Partial<SignFormValues>; // wrong password and errors like that
	modalRoot: HTMLElement; // node for modal
}

interface SignUpResponseInterface {
	success: boolean;
	message?: string; // validation errors, etc
	data?: {
		sign: string;
		user: {
			username: string;
			ID: number;
			email: string;
		};
	};
}

export class AuthContainer extends PureComponent<Props, State> {
	// I will pass this to resetErrors handler when onChange event occurs to reset errors,
	// cause formik doesn't handle these
	apiErrorsInitialState: Partial<SignFormValues> = {
		username: null,
		email: null,
		password: null,
		firstName: null,
		lastName: null,
	};

	state = {
		isLogin: true,
		username: '',
		email: '',
		password: '',
		apiErrors: this.apiErrorsInitialState,
		modalRoot: null,
	};

	componentDidMount(): void {
		const modalRoot = document.getElementById('modal-root') as HTMLElement;
		this.setState({ modalRoot });
	}

	// switch between sign in and sign up screens
	switchScreen = (): void =>
		this.setState(state => ({ isLogin: !state.isLogin }));

	resetErrors = (): void =>
		this.setState({ apiErrors: this.apiErrorsInitialState });

	handleSignUpResponse = (response: SignUpResponseInterface): void => {
		const { authorize, toggleModal } = this.props;

		// since optional chaining operator isn't implemented yet in ts
		if (response) {
			if (response.success === true) {
				const { data = {} } = response;

				const hasToken = _.has(data, 'sign');
				const hasUser = _.has(data, 'user');

				if (hasToken && hasUser) {
					const payload = {
						...response.data.user,
						token: response.data.sign,
					};

					authorize(payload);
					return toggleModal();
				}
			} else if (response.success === false) {
				const { message = null } = response;

				if (message) {
					type Error = {
						error: string;
						field: oneOfFields;
					};

					// get field containing error message, e.g. "email"
					const { field = null }: Error = ({} = _.find(
						possibleApiErrorMessages,
						item => (item.error = message)
					));

					if (field) {
						this.setState(state => ({
							apiErrors: {
								...state.apiErrors,
								[field]: message,
							},
						}));
					}
				}
			}
		}
	};

	render() {
		const {
			toggleModal,
			layout: { showModal },
		} = this.props;

		const { isLogin, apiErrors, modalRoot } = this.state;

		const initialValues: SignFormValues = {
			...(isLogin === false && {
				username: '',
				firstName: '',
				lastName: '',
			}),
			email: '',
			password: '',
		};

		if (modalRoot) {
			return createPortal(
				<Mutation
					mutation={SignMutation}
					onCompleted={({ sign }) => this.handleSignUpResponse(sign)}
				>
					{(SignUpRequest, { error, loading }) => {
						// TODO: Design error component
						if (error) return <h1>Error!</h1>;

						return (
							<Formik
								initialValues={initialValues}
								onSubmit={async (variables: SignFormValues, { resetForm }) => {
									await SignUpRequest({ variables });
									return resetForm();
								}}
								validate={(values: SignFormValues) =>
									validateSignForm(values, isLogin)
								}
								render={({
									handleChange,
									...rest
								}: FormikProps<SignFormValues>) => (
									<SignForm
										apiErrors={apiErrors}
										handleChange={e => {
											this.resetErrors();
											return handleChange(e);
										}}
										toggleModal={toggleModal}
										switchScreen={this.switchScreen}
										showModal={showModal}
										loading={loading}
										{...this.state}
										{...rest}
									/>
								)}
							/>
						);
					}}
				</Mutation>,
				modalRoot
			);
		}

		return null;
	}
}

const actionCreators = {
	toggleModal: ToggleModal,
	authorize: Authorize,
};

export default connect(
	getUserAndLayout,
	mapDispatchToProps(actionCreators)
)(AuthContainer);
