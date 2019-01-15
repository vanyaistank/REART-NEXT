import React from 'react';
import {
	Button,
	Row,
	Col,
	Icon,
	Heading,
	FormWrapper,
	FormInput,
} from '@Components';
import { FormikProps } from 'formik';
import Router from 'next/router';
import { SignFormValues } from '../index';
import { UserData } from '@Redux/reducers/User/UserReducer';

interface Props extends FormikProps<SignFormValues> {
	apiErrors: Partial<SignFormValues>;
	isLogin: boolean;
	showModal: boolean;
	loading: boolean;
	user: UserData;
}

const SignUpForm = (props: Props) => {
	const { handleSubmit, user } = props;
	// if user is already authorized, redirect him to the main page
	// TODO: consider a few steps authorization, e.g. select whether you are an artist or a fan
	if (user.token) {
		Router.push('/');
	}
	return (
		<Row justifyContent="center">
			<Col marginTop="50px" justifyContent="center" size={12}>
				<Icon small={false} icon="Logo" />
			</Col>
			<Col justifyContent="center" size={12}>
				<Heading white>Sign Up</Heading>
			</Col>
			<Col justifyContent="center" size={12}>
				<Heading lighterGray size="L">Join the emerging art platform</Heading>
			</Col>
			<Col
				justifyContent="center"
				size={9}
				sizeMd={12}
				sizeSm={12}
			>
				<FormWrapper>
					<form style={{ width: '100%' }} onSubmit={handleSubmit}>
						<Row>
							<FormInput
								size={6}
								field="firstName"
								label="First Name"
								{...props}
							/>
							<FormInput
								size={6}
								field="lastName"
								label="Last Name"
								{...props}
							/>
						</Row>
						<Row>
							<FormInput
								size={12}
								field="username"
								label="Username"
								{...props}
							/>
							<FormInput
								size={12}
								field="email"
								label="Email"
								{...props}
							/>
							<FormInput
								size={12}
								field="password"
								label="Password"
								{...props}
							/>
						</Row>
						<Row>
							<Col justifyContent="center" size={12}>
								<Button
									purple
									type="submit"
									onClick={() => {}}
								>
									SIGN UP
								</Button>
							</Col>
						</Row>
					</form>
				</FormWrapper>
			</Col>
		</Row>
	);
};

export default SignUpForm;
