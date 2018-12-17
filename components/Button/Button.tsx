import React from 'react';
import styledProps from 'styled-props';
import styled, { css } from 'styled-components';
import {
	background,
	buttonTextColor,
	borderColor,
	hoverBackground,
	activeBackground,
} from '@Styled/theme';
import { Icon } from '@Components';

interface Props {
	type?: 'button' | 'submit' | 'reset';
	invertedDark?: boolean;
	invertedPurple?: boolean;
	dark?: boolean;
	purple?: boolean;
	spaced?: boolean;
	disabled?: boolean;
	loading?: boolean;
	width?: string;
	onClick: () => any;
	theme?: any;
	className?: string;
	children: React.ReactNode;
}

const Button: React.SFC<Props> = ({
	className,
	loading,
	children,
	...rest
}) => (
	<button className={className} {...rest}>
		{loading && <Icon icon="Loading" absolute left="12px" />}
		{children}
	</button>
);

const StyledButton = styled(Button)`
	${(props: Props) => css`
		display: ${props.loading && 'flex'};
		justify-content: ${props.loading && 'center'};
		align-items: ${props.loading && 'center'};
		cursor: ${props.disabled || props.loading
		? 'no-drop !important'
		: 'pointer'};
		width: ${props.width ? props.width : 'auto'};
		background-color: ${styledProps(background)};
		color: ${styledProps(buttonTextColor)};
		border-color: ${styledProps(borderColor)};
		border-style: solid;
		border-width: 2px;
		border-radius: 10px;
		box-sizing: border-box;
		font-family: 'Lato', sans-serif;
		font-weight: 600;
		text-transform: uppercase;
		text-align: center;
		padding: 11px 30px;
		outline: none;
		font-size: 15px;
		line-height: 1;
		cursor: pointer;
		transition: 0.2s ease-in-out;
		user-select: none;
		text-decoration: none;
		white-space: nowrap;
		margin-right: ${props.spaced && '20px'};
		:hover {
			background-color: ${styledProps(hoverBackground)};
			border-color: ${styledProps(hoverBackground)};
			color: white;
		}
		:active {
			background-color: ${styledProps(activeBackground)};
			border-color: ${styledProps(activeBackground)};
			color: white;
		}
	`};
`;

export default StyledButton;
