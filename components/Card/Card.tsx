import styled from 'styled-components';
import { colors } from '@Styled/theme';

const StyledCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Lato', sans-serif;
	font-weight: 600;
	outline: none;
	font-size: 15px;
	line-height: 1;
	cursor: pointer;
	width: 100%;
	background-color: ${colors.white};
	color: ${colors.darkGray};
	padding: 40px;
	border: 1px solid ${colors.darkGray};
	transition: 0.2s ease-in-out;
	user-select: none;
	margin-bottom: 20px;
	:hover {
		background-color: ${colors.darkGray};
		color: ${colors.white};
	}
`;

export default StyledCard;
