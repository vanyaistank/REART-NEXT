import React from 'react';
import Head from 'next/head'

import styled from 'styled-components';
import { Header, Auth } from '@Containers';

const StyledCanvas = styled.div`
	position: relative;
	min-height: 100vh;
`;

interface Props {
	children: React.ReactNode;
	className?: string;
	title?: string;
}
// TODO: move this component out of this folder
const Main: React.SFC<Props> = ({ className, title, children }) => (
	<StyledCanvas>
		<Header />
		<main className={className}>
			<Head>
				<title>{title}</title>
			</Head>
			{children}
		</main>
		<Auth />
	</StyledCanvas>
);

Main.defaultProps = {
	title: 'RE:ART',
};

const StyledMain = styled(Main)`
	max-width: 1200px;
	margin: 0 auto;
`;

export default StyledMain;
