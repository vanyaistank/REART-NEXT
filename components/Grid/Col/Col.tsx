import React from 'react';
import styled, { css } from 'styled-components';
import { media } from '@Styled/theme';

const singleColWidth = 100 / 12;
// const colGapMobile = 30;

type Size = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface Props {
	size: Size;
	sizeL?: Size;
	sizeMd?: Size;
	sizeSm?: Size;
	deviceOrder?: number; // flex order prop on devices other than desktop
	centered?: boolean;
	right?: boolean;
	children: React.ReactNode;
	noMobilePadding?: boolean;
	marginTop?: string;
	marginBottom?: string;
}

const StyledDiv = styled.div`
	${(props: Props) => {
		const handleWidth = param =>
			`${param ? singleColWidth * param : singleColWidth * props.size}%`;

		const handleOrder = param => `${param || 0}`;

		const noMobilePadding = props.noMobilePadding && '0px';

		return css`
			width: ${handleWidth(props.size)};
			padding-left: 20px;
			padding-right: 20px;
			flex: 0 1 auto;
			align-items: center;
			text-align: ${(props.centered && 'center') || (props.right && 'right')};
			margin-top: ${props.marginTop && props.marginTop};
			margin-bottom: ${props.marginBottom && props.marginBottom};
			${media.tablet`
				width: ${handleWidth(props.sizeL)};
				order: ${handleOrder(props.deviceOrder)};
			`}
			${media.mobile`
				width: ${handleWidth(props.sizeMd)};
				padding-left: ${noMobilePadding};
				padding-right: ${noMobilePadding};
				order: ${handleOrder(props.deviceOrder)};
			`}
			${media.small`
				width: ${handleWidth(props.sizeSm)};
				order: ${handleOrder(props.deviceOrder)};
			`}
		`;
	}};
`;

export default StyledDiv;
