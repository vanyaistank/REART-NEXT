import React from 'react';
import styled, { css } from 'styled-components';
import { media } from '@Styled/theme';
import {
	TAlignItems,
	TGridSize,
	TJustifyContent,
} from '@Types';

const singleColWidth = 100 / 12;
// const colGapMobile = 30;

interface Props {
	size: TGridSize;
	sizeL?: TGridSize;
	sizeMd?: TGridSize;
	sizeSm?: TGridSize;
	deviceOrder?: number; // flex order prop on devices other than desktop
	justifyContent?: TJustifyContent;
	flexDirection?: 'column';
	alignItems?: TAlignItems;
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
			display: flex;
			justify-content: ${props.justifyContent || 'flex-start'};
			flex-direction: ${props.flexDirection || 'row'};
			align-items: ${props.alignItems || 'stretch'};
			width: ${handleWidth(props.size)};
			padding-left: 20px;
			padding-right: 20px;
			flex: 0 1 auto;
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
