import { SignFormValues } from '../../containers/Auth';

export const possibleApiErrorMessages = [
	{
		error:
			'The email address and username you have entered is already registered.',
		field: 'email',
	},
	{
		error: 'The email address you have entered is already registered.',
		field: 'email',
	},
	{
		error: 'No such user found.',
		field: 'email',
	},
	{
		error: 'The username you have entered is already registered.',
		field: 'username',
	},
	{
		error: 'The password you have entered is wrong.',
		field: 'password',
	},
];

export const validateSignForm = (values: SignFormValues, isLogin?: boolean) => {
	const errors: any = {};

	const requiredField = (field: string): string => `${field} is required`;
	const minimumLength = (field: string, num?: number): string =>
		`${field} must contain minimum ${num || 8} characters`;
	const maximumLength = (field: string, num?: number): string =>
		`${field} must contain maximum ${num || 24} characters`;

	if (!isLogin) {
		if (!values.username) {
			errors.username = requiredField('Username');
		} else if (!/^[0-9a-zA-Z]+$/.test(values.username)) {
			errors.username = 'Username must contain only letters and numbers';
		} else if (values.username.length < 8) {
			errors.username = minimumLength('Username');
		} else if (values.username.length > 24) {
			errors.username = maximumLength('Username');
		}
	}

	if (!values.email) {
		errors.email = requiredField('E-mail');
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Please provide a valid E-mail';
	}

	if (!values.password) {
		errors.password = requiredField('Password');
	} else if (
		!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
			values.password
		)
	) {
		errors.password = `${minimumLength(
			'Password'
		)}, at least 1 letter, 1 number and 1 special character`;
	} else if (values.password.length > 24) {
		errors.password = maximumLength('Password');
	}

	return errors;
};
