import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '@Styled/theme';
import { Avatar, Heading, Row, Icon } from '@Components';

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

const defaultBg = 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/YYrb1C5/gothic-castle-at-night-with-full-moon_sbraimvf__F0000.png';

const Wrapper = styled.div`
	${(props: Props) => {
		const bgImage = props.background ? props.background : defaultBg;

		return css`
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			align-items: center;
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
	if (!user) {
		// DESIGN 404 USER COMPONENT
		return <h1>404</h1>;
	}

	const getHeight = async () => {
		const { height } = await getMeta(defaultBg);
		setHeight(height);
	};

	const [imgHeight, setHeight] = useState('');
	useEffect(() => {
		getHeight();
	},        []);

	const {
		username,
	} = user;
	return (
		<Wrapper height={imgHeight}>
			<Avatar large src="https://cdna.artstation.com/p/users/avatars/001/012/538/large/d68895c262b7882be940c42b933d0f46.jpg?1544640675"/>
			<Heading size="L">@{username}</Heading>
			<Heading size="S">Artist</Heading>
			<Row justifyContent="center">
				<Icon
					pointer={false}
					icon="Geo"
					awesome
				/>
				<Heading size="S">Moscow, Russia</Heading>
			</Row>
		</Wrapper>
	);
};

export default ProfileHead;
