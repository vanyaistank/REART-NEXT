import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { colors, media } from '@Styled/theme';

import { Link, Icon } from '@Components';
import { Authorization, Personal, TopMenu } from '../components';

interface Props {
	toggleModal: () => void;
	toggleMenu: () => void;
	handleLogout: () => void;
	showMenu: boolean;
	token?: string; // user's token
}

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.darkGray};
	padding-left: 24px;
	padding-right: 24px;
	height: 82px;
	margin-bottom: 50px;
	${media.mobile`
		padding-left: 12px;
		padding-right: 12px;
	`};
`;

interface FlexWrapperProps {
	flex: 'start' | 'end';
}

const FlexWrapper = styled.div`
	${(props: FlexWrapperProps) =>
		css`
			display: flex;
			width: 100%;
			flex: 1;
			align-items: center;
			justify-content: ${props.flex === 'start' ? 'flex-start' : 'flex-end'};
		`};
`;

const LogoWrapper = styled.div`
	display: flex;
	width: 100%;
	flex: 2;
	align-items: center;
	justify-content: center;
`;

const Header: React.SFC<Props> = ({
	showMenu,
	toggleModal,
	toggleMenu,
	handleLogout,
	token,
}) => (
	<Fragment>
		<StyledHeader>
			<FlexWrapper flex="start">
				<Icon icon="Hamburger" onClick={toggleMenu} />
			</FlexWrapper>
			<LogoWrapper>
				<Link href="/">
					<Icon small={false} icon="Logo" />
				</Link>
			</LogoWrapper>
			<FlexWrapper flex="end">
				{token ? (
					<Personal handleLogout={handleLogout} />
				) : (
					<Authorization toggleModal={toggleModal} />
				)}
				<Icon icon="Cart" />
			</FlexWrapper>
		</StyledHeader>
		<TopMenu showMenu={showMenu}>
			<h1>HELLO WORLD</h1>
		</TopMenu>
	</Fragment>
);

export default Header;
