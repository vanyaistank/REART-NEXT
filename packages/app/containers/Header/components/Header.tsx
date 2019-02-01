import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import Router from 'next/router';

import { colors, media } from '@Styled/theme';
import { Link, Icon } from '@Components';
import { Authorization, Personal, TopMenu } from '../components';

interface Props {
	toggleModal: () => void;
	toggleMenu: () => void;
	handleLogout: () => void;
	showMenu: boolean;
	token?: string; // user's token
	noBottomMargin?: boolean;
}

interface StyledHeaderProps {
	noBottomMargin: boolean;
}

const StyledHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: ${colors.main};
	border-bottom: 1px solid ${colors.border};
	padding-left: 24px;
	padding-right: 24px;
	height: 82px;
	margin-bottom: ${(props: StyledHeaderProps) => !props.noBottomMargin && '50px'};
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
			height: 100%;
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

const UploadWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Header: React.SFC<Props> = ({
	showMenu,
	toggleModal,
	toggleMenu,
	handleLogout,
	noBottomMargin,
	token,
}) => (
	<Fragment>
		<StyledHeader noBottomMargin={noBottomMargin}>
			<FlexWrapper flex="start">
				<Icon icon="Hamburger" onClick={toggleMenu} awesome />
			</FlexWrapper>
			<LogoWrapper>
				<Link href="/">
					<Icon small={false} icon="Logo" />
				</Link>
			</LogoWrapper>
			<FlexWrapper flex="end">
				{token && (
					<UploadWrapper onClick={() => Router.push('/upload')}>
						<Icon icon="Upload" awesome />
						<Link marginLeft="10px">UPLOAD</Link>
					</UploadWrapper>
				)}
				{/*<Icon awesome icon="Cart" />*/}
				{token ? (
					<Personal handleLogout={handleLogout} />
				) : (
					<Authorization toggleModal={toggleModal} />
				)}
			</FlexWrapper>
		</StyledHeader>
		<TopMenu showMenu={showMenu}>
			<h1>HELLO WORLD</h1>
		</TopMenu>
	</Fragment>
);

export default Header;
