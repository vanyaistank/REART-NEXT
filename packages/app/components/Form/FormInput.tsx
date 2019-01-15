import React from 'react';
import { FormikProps } from 'formik';
import { Col, Input, FormError } from '@Components';
import { TGridSize } from '@Types';
import { oneOfFields, SignFormValues } from '../../containers/Auth';

interface Props extends FormikProps<SignFormValues>{
	apiErrors: Partial<SignFormValues>;
	field: oneOfFields;
	label?: string;
	size?: TGridSize;
	placeholder?: string;
	requirements?: string[];
}

const FormInput = (props: Props) => {
	const {
		field,
		label,
		size,
		values,
		handleChange,
		handleBlur,
		apiErrors,
		errors,
		touched,
		placeholder,
	} = props;

	const inputType: { [key: string]: 'email' | 'password'} = {
		email: 'email',
		password: 'password',
	};

	// TODO: create FormRequirements component and map errors to it

	return (
		<Col
			size={size || 12}
			flexDirection="column"
			marginBottom="30px"
		>
			<Input
				key={field}
				name={field}
				value={values[field]}
				onChange={handleChange}
				onBlur={handleBlur}
				label={label || field}
				type={inputType[field]}
				placeholder={placeholder || label || field}
			/>
			<FormError
				field={field}
				apiErrors={apiErrors}
				errors={errors}
				touched={touched}
			/>
		</Col>
	);
};

export default FormInput;
