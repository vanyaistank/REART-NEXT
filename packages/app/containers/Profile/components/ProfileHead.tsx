import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@Styled/theme';

interface Props {
	background?: string;
	height?: string;
}

const getMeta = async (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = url;
	});
};

const defaultBg = 'https://cdnb.artstation.com/p/users/covers/000/336/387/default/8834176e72db4d35a721294646777fe2.jpg?1524659966';

const Wrapper = styled.div`
	${(props: Props) => {
		const bgImage = props.background ? props.background : defaultBg;

		return css`
			display: flex;
			justify-content: center;
			align-items: flex-end;
			position: relative;
			background-color: ${colors.main};
			background-size: cover;
			background-position: bottom, center;
			background-image: url(${bgImage});
			width: 100%;
			height: ${props.height}px;
			min-height: 340px;
			max-height: 600px;
			padding-top: 40px;
			padding-bottom: 20px;
		`;
	}}
`;

const ProfileHead = ({ user }) => {
	const getHeight = async () => {
		const { height } = await getMeta(defaultBg);
		setHeight(height);
	};

	const [imgHeight, setHeight] = useState('');
	useEffect(() => {
		getHeight();
	},        []);

	console.log(user, 'user???');
	return (
		<Wrapper height={imgHeight}>
			<h1>Hello</h1>
		</Wrapper>
	);
};

export default ProfileHead;
