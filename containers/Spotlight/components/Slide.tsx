import React from 'react';

import { Heading, ProductImage, HideOnMobile, ShowOnMobile } from '@Components';
import styled from 'styled-components';
import { media } from '@Styled/theme';

type SlideItem = {
	id: number;
	url: string;
	type?: string;
	title: string;
};

interface Props {
	item: SlideItem;
}

const StyledSlide = styled.div`
	position: absolute;
	bottom: 50px;
	left: 50px;
	${media.mobile`
		bottom: 20px;
		left: 20px;
	`};
`;

const Slide: React.SFC<Props> = ({ item }) => (
	// There's an issue typing components that return arrays without Fragments
	// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26890
	<ProductImage hideLink imageSrc={item.url}>
		<StyledSlide>
			<Heading white uppercase mono size="M">
				{item.type}
			</Heading>
			<ShowOnMobile>
				<Heading white uppercase mono size="L" marginTop="25px">
					{item.title}
				</Heading>
			</ShowOnMobile>
			<HideOnMobile>
				<Heading white uppercase mono size="XL" marginTop="25px">
					{item.title}
				</Heading>
			</HideOnMobile>
		</StyledSlide>
	</ProductImage>
);

export default Slide;
