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
	background-color: ${colors.lighterMain};
	color: ${colors.white};
	padding: 40px;
	border: 1px solid ${colors.border};
	border-radius: 3px;
	transition: border, color, 0.2s ease-in-out;
	will-change: border, color;
	user-select: none;
	margin-bottom: 20px;
	:hover {
		border: 1px solid ${colors.lightenBorder};
		color: ${colors.white};
	}
`;

export default StyledCard;
