import React from 'react';
import Head from 'next/head';

import styled from 'styled-components';
import { Header, Auth } from '@Containers';

const StyledCanvas = styled.div`
	position: relative;
	min-height: 100vh;
	background: ${props => props.theme.main};
`;

interface Props {
	children: React.ReactNode;
	className?: string;
	title?: string;
	modal?: boolean;
	hideHeader?: boolean;
	fullWidth?: boolean;
}

const Main: React.SFC<Props> = ({
	className,
	title,
	children,
	modal,
	hideHeader = false,
}) => (
	<StyledCanvas>
		{!hideHeader && <Header />}
		<main className={className}>
			<Head>
				<title>{title}</title>
			</Head>
			{children}
		</main>
		<Auth modal={modal} />
	</StyledCanvas>
);

Main.defaultProps = {
	title: 'RE:ART',
};

const StyledMain = styled(Main)`
	max-width: ${props => !props.fullWidth && '1200px'};
	margin: 0 auto;
`;

export default StyledMain;
