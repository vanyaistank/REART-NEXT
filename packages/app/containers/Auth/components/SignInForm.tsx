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

const SignInForm = (props: Props) => {
	const {
		toggleModal,
		showModal,
		loading,
		handleSubmit,
		handleReset,
	} = props;

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
								sign in
							</Heading>
							<Heading mono uppercase size="L">
								to re-art
							</Heading>
						</Col>
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
								SIGN IN
							</Button>
						</Col>
						<Col
							size={12}
							marginTop="30px"
						>
							<Heading size="S" lighterGray inline>
								Don't have an account?{'  '}
							</Heading>
							<Link href="/signup" size="S">
								SIGN UP
							</Link>
						</Col>
					</form>
				</Col>
			</Row>
		</Modal>
	);
}

export default SignInForm;
