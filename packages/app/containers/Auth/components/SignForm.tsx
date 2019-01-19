import React from 'react';
import { FormikProps } from 'formik';

import { SignFormValues } from '../index';

import {
	Row,
	Col,
	Heading,
	Icon,
	Button,
	Link,
	Modal,
} from '@Components';
import FormInput from '../../../components/Form/FormInput';

interface Props extends FormikProps<SignFormValues> {
	apiErrors: Partial<SignFormValues>;
	isLogin: boolean;
	showModal: boolean;
	toggleModal: () => void;
	switchScreen: () => void; // switch between sign in and sign up screens
	loading: boolean;
}

const ConditionalBottomPart = ({ isLogin, switchScreen }) => {
	const heading = isLogin
		? 'Already have an account?'
		: 'Don\'t have an account?';

	const linkText = isLogin ? 'SIGN UP' : 'SIGN IN';

	return (
		<Col
			size={12}
			marginTop="30px"
		>
			<Heading size="S" lighterGray inline>
				{heading}
			</Heading>
			<Link onClick={switchScreen} size="S">
				{linkText + ' '}
			</Link>
		</Col>
	);
};

const SignForm = (props: Props) => {
	const {
		isLogin,
		switchScreen,
		toggleModal,
		showModal,
		loading,
		handleSubmit,
		handleReset,
	} = props;

	const heading = isLogin ? 'SIGN IN' : 'SIGN UP';

	return (
		<Modal
			handleReset={handleReset}
			toggleModal={toggleModal}
			showModal={showModal}
		>
			<Icon
				onClick={toggleModal}
				icon="Cancel"
				absolute
				top="5"
				right="5"
				style={{
					fill: 'white',
				}}
			/>
			<Row justifyContent="center">
				<Col justifyContent="center" size={12}>
					<form style={{ width: '100%' }} onSubmit={handleSubmit}>
						<Col
							centered
							flexDirection="column"
							size={12}
							marginBottom="30px"
						>
							<Heading mono uppercase size="L">
								{heading}
							</Heading>
							<Heading mono uppercase size="L">
								to re-art
							</Heading>
						</Col>
						{!isLogin && (
							<FormInput
								field="username"
								label="Username"
								{...props}
							/>
						)}
						<FormInput
							field="email"
							label="Email"
							{...props}
						/>
						<FormInput
							field="password"
							label="Password"
							{...props}
						/>
						<Col size={12}>
							<Button
								type="submit"
								loading={loading}
								width="100%"
								purple={!loading}
								onClick={() => {}}
							>
								{heading}
							</Button>
						</Col>
						<ConditionalBottomPart
							isLogin={isLogin}
							switchScreen={switchScreen}
						/>
					</form>
				</Col>
			</Row>
		</Modal>
	);
};

export default SignForm;
