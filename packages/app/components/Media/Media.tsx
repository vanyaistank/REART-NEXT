import styled from 'styled-components';
import { media } from '@Styled/theme';

export const HideOnTablet = styled.div`
	display: flex;
	${media.tablet`
		display: none;
	`};
`;

export const HideOnMobile = styled.div`
	display: flex;
	${media.mobile`
		display: none;
	`};
`;

export const ShowOnMobile = styled.div`
	display: none;
	${media.mobile`
		display: flex;
		color: white;
		padding-right: 20px;
	`};
`;

export const ShowOnTablet = styled.div`
	display: none;
	${media.tablet`
		display: flex;
		color: white;
		padding-right: 20px;
	`};
`;
