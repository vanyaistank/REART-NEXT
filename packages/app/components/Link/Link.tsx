import React from 'react';
import Link, { LinkProps } from 'next/link';
import styledProps from 'styled-props';
import styled, { css } from 'styled-components';
import {
	colors,
	colorsPartialInterface,
	fontSize,
	headingMargin,
} from '@Styled/theme';

type LinkPropsWithoutChildren = Pick<LinkProps, Exclude<keyof LinkProps, "children">>;

interface Props extends colorsPartialInterface {
	size?: string;
	marginTop?: string;
	marginBottom?: string;
	marginRight?: string;
	marginLeft?: string;
	className?: string;
	href?: string;
	prefetch?: boolean;
	onClick?: () => void;
	children: React.ReactNode;
	color?: string; // fallback for styledProps
}

const LinkComponent: React.SFC<Props & LinkPropsWithoutChildren> = ({
	onClick,
	className,
	href,
	prefetch = false,
	children,
	...rest
}) => {
	if (href) {
		return (
			<Link prefetch={prefetch} href={href} {...rest}>
				<a className={className}>
					{children}
				</a>
			</Link>
		);
	}

	return (
		<a className={className} onClick={onClick}>
			{children}
		</a>
	);
};

const StyledLink = styled(LinkComponent)`
	${(props: Props) => {
		const size: string = props.size || 'M';

		const handleSize = (param): string => param || headingMargin[size];

		return css`
			cursor: pointer;
			font-size: ${fontSize[size]};
			font-family: Source Code Pro, monospace;
			font-weight: bold;
			color: ${styledProps(colors, 'color')};
			margin-top: ${handleSize(props.marginTop)};
			margin-bottom: ${handleSize(props.marginBottom)};
			margin-left: ${handleSize(props.marginLeft)};
			margin-right: ${handleSize(props.marginRight)};
			text-decoration: underline;
			will-change: text-decoration;
			:hover {
				text-decoration: none;
			}
		`;
	}};
`;

StyledLink.defaultProps = {
	color: 'white',
};

export default StyledLink;
