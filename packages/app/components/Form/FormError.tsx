import React from 'react';
import { Heading } from '@Components';
import styled from 'styled-components';

const StyledErrorWrapper = styled.div`
	max-width: 300px;
`;

const FormError = ({ field, apiErrors, errors, touched }) => {
	// TODO: add animation
	if (apiErrors[field] || (errors[field] && touched[field])) {
		return (
			<StyledErrorWrapper>
				<Heading size="S" red>
					{apiErrors[field] || errors[field]}
				</Heading>
			</StyledErrorWrapper>
		);
	}

	return null;
};

export default FormError;
