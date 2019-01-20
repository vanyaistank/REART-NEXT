import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
	large?: boolean;
	src: string;
}

const Wrapper = styled.div`
	${(props: { large?: boolean }) => {
		const size = props.large ? '120px' : '30px';
		return css`
			width: ${size};
			height: ${size};
		`;
	}}
`;

const Image = styled.img`
	width: 100%;
	height: auto;
	border-radius: 50%;
`;

const Avatar = ({ src, large = false }: Props) => (
	<Wrapper large={large}>
		<Image src={src} />
	</Wrapper>
);

export default Avatar;
