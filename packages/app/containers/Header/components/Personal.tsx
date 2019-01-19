import React from 'react';
import styled from 'styled-components';

import { Dropdown, HideOnMobile, Icon } from '@Components';

interface PersonalProps {
	handleLogout: () => void;
}

const IconWrapper = styled.div`
	margin-left: 30px;
`;

const PersonalWrapper = styled.div`
	display: flex;
`;

const Personal: React.SFC<PersonalProps> = ({ handleLogout }) => {
	const options = [
		{
			title: 'My Profile',
			icon: 'Account',
		},
		{
			title: 'Edit Profile',
			icon: 'EditAccount',
		},
		{
			title: 'Settings',
			icon: 'Settings',
		},
		{
			title: 'Sign out',
			icon: 'SignOut',
			isLogout: true,
			onClick: handleLogout,
		},
	];

	return (
		<HideOnMobile>
			<PersonalWrapper>
				<Dropdown
					renderTitle={() => (
						<IconWrapper>
							<Icon icon="Notifications" awesome />
						</IconWrapper>
					)}
				/>
				<IconWrapper>
					<Icon icon="Chat" awesome />
				</IconWrapper>
				<Dropdown
					renderTitle={() => (
						<IconWrapper>
							<Icon icon="Account" awesome />
						</IconWrapper>
					)}
					options={options}
				/>
			</PersonalWrapper>
		</HideOnMobile>
	);
};

export default Personal;
