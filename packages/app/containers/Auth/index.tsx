import React, { PureComponent, Component } from 'react';
import { createPortal } from 'react-dom';
import { Formik, FormikProps } from 'formik';
import _ from 'lodash';
import { withRouter, RouterProps } from 'next/router';

import { Mutation } from 'react-apollo';
import { SignMutation } from './AuthSchema';

import { connect } from 'react-redux';
import { getUserAndLayout, getUserAndLayoutType } from '@Redux/reselect';
import { mapDispatchToProps } from '@Redux/helpers';
import { ToggleModal } from '@Redux/reducers/Layout/LayoutActions';

import { UserData } from '@Redux/reducers/User/UserReducer';
import { Authorize } from '@Redux/reducers/User/UserActions';

import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';

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
	render: (any) => React.ReactNode;
	router: RouterProps;
}

interface State extends SignFormValues {
	apiErrors: Partial<SignFormValues>; // wrong password and errors like that
	modalRoot: HTMLElement; // node for modal
}

interface SignUpResponseInterface {
	success: boolean;
	message?: string; // validation errors, etc
	data?: {
		token: string;
		user: {
			username: string;
			ID: number;
			email: string;
		};
	};
}

export class Auth extends PureComponent<Props, State> {
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

	resetErrors = (): void =>
		this.setState({ apiErrors: this.apiErrorsInitialState })

	handleSignUpResponse = (response: SignUpResponseInterface): void => {
		const { authorize, toggleModal } = this.props;

		// since optional chaining operator isn't implemented yet in ts
		if (response) {
			if (response.success === true) {
				const { data = {} } = response;

				const hasToken = _.has(data, 'token');
				const hasUser = _.has(data, 'user');

				if (hasToken && hasUser) {
					const payload = {
						...response.data.user,
						token: response.data.token,
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
					const { field = null }: Error = _.find(
						possibleApiErrorMessages,
						item => (item.error = message),
					) || {};

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
	}

	render() {
		const {
			toggleModal,
			layout: { showModal },
			router: {
				pathname,
			},
			user,
		} = this.props;
		const { apiErrors } = this.state;
		const isRegistration = pathname === '/signup';
		const initialValues: SignFormValues = {
			...(isRegistration && {
				username: '',
				firstName: '',
				lastName: '',
			}),
			email: '',
			password: '',
		};

		return (
			<Mutation
				mutation={SignMutation}
				onCompleted={({ sign }) => this.handleSignUpResponse(sign)}
			>
				{(signUpRequest, { error, loading }) => {
					// TODO: Design error component
					if (error) return <h1>Error!</h1>;

					return (
						<Formik
							initialValues={initialValues}
							onSubmit={async (variables: SignFormValues, { resetForm }) => {
								await signUpRequest({ variables });
								return resetForm();
							}}
							validate={(values: SignFormValues) =>
								validateSignForm(values, isRegistration)
							}
							render={({
								handleChange,
								...rest
							}: FormikProps<SignFormValues>) => (
								this.props.render({
									apiErrors,
									toggleModal,
									showModal,
									loading,
									user,
									handleChange: (e) => {
										this.resetErrors();
										return handleChange(e);
									},
									...this.state,
									...rest,
								})
							)}
						/>
					);
				}}
			</Mutation>
		);
	}
}

const actionCreators = {
	toggleModal: ToggleModal,
	authorize: Authorize,
};

// @ts-ignore
const ConnectedAuth = withRouter(connect(
	getUserAndLayout,
	mapDispatchToProps(actionCreators),
)(Auth));

export default class AuthContainer extends Component
	<{ modal: boolean}, { modalRoot: HTMLElement }> {
	static defaultProps = {
		modal: true,
	};
	state = {
		modalRoot: null,
	};

	componentDidMount(): void {
		const modalRoot = document.getElementById('modal-root') as HTMLElement;
		if (modalRoot) {
			this.setState({ modalRoot });
		}
	}

	render() {
		const { modal } = this.props;
		const { modalRoot } = this.state;
		return (
			<ConnectedAuth
				render={(props) => {
					if (modal && modalRoot) {
						return createPortal(
							<SignInForm {...props} />,
							modalRoot,
						);
					}

					return <SignUpForm {...props} />;
				}}
			/>
		);
	}
}
