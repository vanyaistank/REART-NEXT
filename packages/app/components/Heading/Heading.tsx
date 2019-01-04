import React from 'react';
import styledProps from 'styled-props';

import styled, { css } from 'styled-components';
import {
	fontSize,
	colors,
	colorsPartialInterface,
	headingMargin,
} from '@Styled/theme';

interface Props extends colorsPartialInterface {
	size?: 'XL' | 'L' | 'M' | 'S';
	mono?: boolean;
	inline?: boolean;
	bold?: boolean;
	children: React.ReactNode;
	className?: string;
	uppercase?: boolean;
	marginTop?: string;
	marginBottom?: string;
	onClick?: () => void;
	centered?: boolean;
	color?: string; // default value for styledProps
}

const Sizes = {
	XL: 1,
	L: 2,
	M: 3,
	S: 4,
};

const Heading: React.SFC<Props> = ({
	size = 'XL',
	className,
	onClick = () => {},
	children,
}) => React.createElement(`h${Sizes[size]}`, { className, onClick }, children);

const StyledHeading = styled(Heading)`
	${(props: Props) => {
		const handleSize = (param): string => param || headingMargin[props.size];
		return css`
			display: ${props.inline && 'inline'};
			font-size: ${fontSize[props.size]};
			font-family: ${props.mono
		? 'Source Code Pro, monospace'
		: 'Lato, sans-serif'};
			font-weight: ${props.bold && 'bold'};
			color: ${styledProps(colors, 'color')};
			text-transform: ${props.uppercase && 'uppercase'};
			margin-top: ${handleSize(props.marginTop)};
			margin-bottom: ${handleSize(props.marginBottom)};
			text-align: ${props.centered && 'center'};
		`;
	}};
`;

StyledHeading.defaultProps = {
	size: 'XL',
	mono: false,
	bold: false,
	uppercase: false,
	marginTop: null,
	marginBottom: null,
	color: 'white',
};

export default StyledHeading;
