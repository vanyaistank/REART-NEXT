import React from 'react';
import { darken } from 'polished';
import styled, { css } from 'styled-components';
import { colors } from '@Styled/theme';

interface Props {
	showMenu: boolean;
}

// TODO: add media queries for width
const StyledSideMenu = styled.div`
	${(props: Props) =>
		css`
			position: absolute;
			visibility: ${props.showMenu ? 'visible' : 'hidden'};
			background-color: ${darken(0.05, colors.darkGray)};
			top: 82px;
			left: 0;
			height: ${props.showMenu ? '320px' : '0px'};
			width: 100%;
			z-index: 777;
			transition: 0.3s ease-in-out all;
		`};
`;

const Wrapper = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;

const TopMenu: React.SFC<Props> = ({ children, showMenu }) => (
	<StyledSideMenu showMenu={showMenu}>
		<Wrapper>{children}</Wrapper>
	</StyledSideMenu>
);

export default TopMenu;
