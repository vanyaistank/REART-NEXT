import React from 'react';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowUp,
	faShoppingCart,
	faBars,
	faComments,
	faBell,
	faUser,
	faUserEdit,
	faCog,
	faSignOutAlt,
	faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';

import {
	Cancel,
	Search,
	Logo,
	Logout,
	Loading,
	Plus,
	Question,
} from './icons';

const icons = {
	Cancel,
	Search,
	Loading,
	Logout,
	Plus,
	Question,
	Logo, // Temporary
};

const faIcons = {
	Account: faUser,
	EditAccount: faUserEdit,
	Cart: faShoppingCart,
	Chat: faComments,
	Hamburger: faBars,
	Notifications: faBell,
	Settings: faCog,
	SignOut: faSignOutAlt,
	Geo: faMapMarkerAlt,
	Upload: faArrowUp,
};

export type ListOfIcons =
	| 'Account'
	| 'EditAccount'
	| 'Settings'
	| 'Hamburger'
	| 'Search'
	| 'Logo'
	| 'Logout'
	| 'Cart'
	| 'Loading'
	| 'Notifications'
	| 'Plus'
	| 'Question'
	| 'Chat'
	| 'Cancel'
	| 'SignOut'
	| 'Geo'
	| 'Upload';

// TODO: add medium, large etc props
interface Props {
	small?: boolean;
	icon: ListOfIcons;
	awesome?: boolean; // use FontAwesome
	size?: 'xs' | 'lg'; // size for FontAwesome's icons
	color?: string;
	onClick?: () => void;
	pointer?: boolean; // cursor: pointer
	absolute?: boolean;
	// props for absolute positioning
	left?: string;
	top?: string;
	right?: string;
	bottom?: string;
	style?: object;
}

const IconWrapper = styled.div`
	${(props: Props) => {
		const size = props.small ? '32px' : '64px';
		const handlePosition = param => (props.absolute && param ? `${param}px` : 'auto');

		return css`
			position: ${props.absolute ? 'absolute' : 'relative'};
			${props.absolute && (
				`left: ${handlePosition(props.left)};
				top: ${handlePosition(props.top)};
				right: ${handlePosition(props.right)};
				bottom: ${handlePosition(props.bottom)};`
			)};
			// let fontawesome handle icon's size
			${!props.awesome && (
				`width: ${size};
				height: ${size};`
			)};
			cursor: ${props.pointer ? 'pointer' : 'default'};
		`;
	}};
`;

const Icon: React.SFC<Props> = ({ icon, onClick, awesome, color, size, ...rest }) => {
	const iconsMap = awesome ? faIcons : icons;
	const SelectedIcon = iconsMap[icon];

	if (!SelectedIcon) {
		throw Error(`there's no such icon: ${icon}`);
	}

	return (
		<IconWrapper
			icon={icon}
			awesome={awesome}
			onClick={onClick}
			{...rest}
		>
			{awesome
				? <FontAwesomeIcon icon={SelectedIcon} size={size} color={color} />
				: <SelectedIcon />
			}
		</IconWrapper>
	);
};

Icon.defaultProps = {
	small: true,
	onClick: () => {},
	pointer: true,
	awesome: false,
	size: 'lg',
	color: 'white',
};

export default Icon;
