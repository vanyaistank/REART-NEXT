import React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { Provider } from 'react-redux';
import createStore from '@Redux/store';
import withRedux from 'next-redux-wrapper';

import withApollo from '@GraphQL/withApollo';

import globalStyle from '@Styled/globalStyle';
import { colors } from '@Styled/theme';

import App, { Container } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';


const GlobalStyle = createGlobalStyle`${globalStyle}`;

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps
			? await Component.getInitialProps(ctx)
			: {};

		return { pageProps};
	}

	render () {
		const { Component, pageProps, store } = this.props;
		return (
			<Container>
				<Provider store={store}>
					<GlobalStyle />
					<ThemeProvider theme={colors}>
						<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
							<Component {...pageProps} />
						</PersistGate>
					</ThemeProvider>
				</Provider>
			</Container>
		);
	}
}

// since next-redux-wrapper expects func
// const makeStore = (initialState) => {
// 	const { store } = createStore(initialState);
// 	return store;
// };

export default withApollo(withRedux(createStore, { debug: true })(MyApp));