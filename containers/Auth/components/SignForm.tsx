import React, { PureComponent } from 'react';
import { FormikProps } from 'formik';
import styled from 'styled-components';

import { SignFormValues, oneOfFields } from '../../Auth';

import {
	Row,
	Col,
	Heading,
	Input,
	Icon,
	Button,
	Link,
	Modal,
} from '@Components';

interface Props extends FormikProps<SignFormValues> {
	apiErrors: Partial<SignFormValues>;
	isLogin: boolean;
	showModal: boolean;
	toggleModal: () => void;
	switchScreen: () => void; // switch between sign in and sign up screens
	loading: boolean;
}

const StyledErrorWrapper = styled.div`
	max-width: 300px;
`;

const ColWithMargin = ({ children, ...rest }) => (
	<Col size={12} marginBottom="30px" {...rest}>
		{children}
	</Col>
);

export default class SignForm extends PureComponent<Props> {
	renderConditionalBottomPart = (isLogin, switchScreen) => {
		if (isLogin) {
			return (
				<ColWithMargin marginTop="15px">
					<Button width="100%" invertedDark onClick={switchScreen}>
						SIGN UP
					</Button>
				</ColWithMargin>
			);
		}

		return (
			<ColWithMargin marginTop="30px">
				<Heading size="S" lighterGray inline>
					Already have an account?{'  '}
				</Heading>
				<Link onClick={switchScreen} size="S">
					SIGN IN
				</Link>
			</ColWithMargin>
		);
	};

	renderError = (field: oneOfFields) => {
		const { apiErrors, errors, touched } = this.props;

		if (apiErrors[field] || (errors[field] && touched[field])) {
			return (
				<StyledErrorWrapper>
					<Heading size="S" red>
						{apiErrors[field] || errors[field]}
					</Heading>
				</StyledErrorWrapper>
			);
		}
	};

	renderInput = (field: oneOfFields) => {
		const { values, handleChange, handleBlur } = this.props;

		const inputType: { [key: string]: 'email' | 'password' | 'text' } = {
			email: 'email',
			password: 'password',
			username: 'text',
		};

		return (
			<ColWithMargin>
				<Input
					key={field}
					name={field}
					value={values[field]}
					onChange={handleChange}
					onBlur={handleBlur}
					label={field}
					type={inputType[field]}
					placeholder={field}
				/>
				{this.renderError(field)}
			</ColWithMargin>
		);
	};

	render() {
		const {
			switchScreen,
			toggleModal,
			showModal,
			isLogin,
			loading,
			handleSubmit,
			handleReset,
		} = this.props;
		const heading = `sign ${isLogin ? 'in' : 'up'}`;

		return (
			<Modal
				handleReset={handleReset}
				toggleModal={toggleModal}
				showModal={showModal}
			>
				<Icon onClick={toggleModal} icon="Cancel" absolute top="5" right="5" />
				<Row justifyContent="center">
					<Col size={12}>
						<form onSubmit={handleSubmit}>
							<Col size={12} centered marginBottom="50px">
								<Heading mono uppercase size="L">
									{heading}
								</Heading>
								<Heading mono uppercase size="L">
									to re-art
								</Heading>
							</Col>
							{this.renderInput('email')}
							{!isLogin && this.renderInput('username')}
							{this.renderInput('password')}
							<Col size={12}>
								<Button
									type="submit"
									loading={loading}
									width="100%"
									dark={!loading}
									onClick={() => {}}
								>
									{isLogin ? 'SIGN IN' : 'SIGN UP'}
								</Button>
							</Col>
							{this.renderConditionalBottomPart(isLogin, switchScreen)}
						</form>
					</Col>
				</Row>
			</Modal>
		);
	}
}
