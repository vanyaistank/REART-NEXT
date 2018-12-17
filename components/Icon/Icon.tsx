import React from 'react';
import styled, { css } from 'styled-components';

import {
	Account,
	Cart,
	Cancel,
	Chat,
	Hamburger,
	Search,
	Logo,
	Logout,
	Loading,
	Notifications,
	Plus,
	Question,
} from './icons';

const icons = {
	Account,
	Cancel,
	Chat,
	Hamburger,
	Search,
	Loading,
	Logout,
	Notifications,
	Plus,
	Question,
	Logo, // Temporary
	Cart, // Temporary
};

export type ListOfIcons =
	| 'Account'
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
	| 'Cancel';

// TODO: add medium, large etc props
interface Props {
	small?: boolean;
	icon: ListOfIcons;
	onClick?: () => void;
	pointer?: boolean; // cursor: pointer
	absolute?: boolean;
	// props for absolute positioning
	left?: string;
	top?: string;
	right?: string;
	bottom?: string;
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
			width: ${size};
			height: ${size};
			cursor: ${props.pointer ? 'pointer' : 'default'};
		`;
	}};
`;

const Icon: React.SFC<Props> = ({ icon, onClick, ...rest }) => {
	const SelectedIcon = icons[icon];

	return (
		<IconWrapper icon={icon} onClick={onClick} {...rest}>
			<SelectedIcon />
		</IconWrapper>
	);
};

Icon.defaultProps = {
	small: true,
	onClick: () => {},
	pointer: true,
};

export default Icon;
