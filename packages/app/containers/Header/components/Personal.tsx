import React from 'react';
import styled from 'styled-components';
import { colors, media } from '@Styled/theme';

import { Dropdown, HideOnMobile, Icon, Heading } from '@Components';

interface OptionProps {
	isLogout?: boolean;
	children: React.ReactNode;
	onClick?: () => void;
}

const IconWrapper = styled.div`
	margin-left: 30px;
`;

const PersonalWrapper = styled.div`
	display: flex;
	margin-right: 60px;
	${media.tablet`
		margin-right: 30px;
	`};
`;

const ListWrapper = styled.div`
	padding-top: 10px;
	padding-bottom: 10px;
	background-color: ${colors.gray};
	transition: 0.2s ease-in-out;
	overflow: hidden;
	:hover {
		background-color: ${colors.white};
		border-color: ${colors.white};
	}
}`;

const Option: React.SFC<OptionProps> = ({ children, isLogout, onClick }) => (
	<ListWrapper role="button" onClick={onClick}>
		<Heading
			mono
			centered
			bold
			white={!isLogout}
			red={isLogout}
			marginTop="0px"
			marginBottom="0px"
			size="S"
		>
			{children}
		</Heading>
	</ListWrapper>
);

interface PersonalProps {
	handleLogout: () => void;
}

const Personal: React.SFC<PersonalProps> = ({ handleLogout }) => (
	<HideOnMobile>
		<PersonalWrapper>
			<Dropdown
				renderTitle={() => (
					<IconWrapper>
						<Icon icon="Notifications" awesome />
					</IconWrapper>
				)}
			>
				NOTIFICATIONS!
			</Dropdown>
			<IconWrapper>
				<Icon icon="Chat" awesome />
			</IconWrapper>
			<Dropdown
				renderTitle={() => (
					<IconWrapper>
						<Icon icon="Account" awesome />
					</IconWrapper>
				)}
			>
				<Option onClick={() => {}}>PROFILE</Option>
				<Option onClick={() => {}}>SETTINGS</Option>
				<Option isLogout onClick={handleLogout}>
					LOGOUT
				</Option>
			</Dropdown>
		</PersonalWrapper>
	</HideOnMobile>
);

export default Personal;
