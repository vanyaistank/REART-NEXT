import styled from 'styled-components';
import { colors, media } from '@Styled/theme';

const FormWrapper = styled.div`
	padding: 20px;
	background: #fff;
	display: inline-block;
	width: inherit;
	min-width: 500px;
	min-height: 500px;
	margin: 1rem;
	position: relative;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	border: 1px solid ${colors.border};
	border-radius: 3px;
	justify-self: center;
	background: ${colors.lighterMain};
	${media.tablet`
		min-width: 300px;
	`};
	${media.mobile`
		min-width: 200px;
	`};
`;

export default FormWrapper;
