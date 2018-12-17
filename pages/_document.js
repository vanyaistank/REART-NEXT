import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps (ctx) {
		const sheet = new ServerStyleSheet();

		const originalRenderPage = ctx.renderPage
		ctx.renderPage = () => originalRenderPage({
			enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
		});

		const initialProps = await Document.getInitialProps(ctx);

		return {
			...initialProps,
			styles: [...initialProps.styles, ...sheet.getStyleElement()]
		};
	}

	render() {
		return (
			<html>
				<Head>
					<link
						href="https://fonts.googleapis.com/css?family=Lato|Source+Code+Pro"
						rel="stylesheet"
					/>
					<link
						href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/css/swiper.min.css"
						rel="stylesheet"
					/>
					<link
						href="https://unpkg.com/react-select@1.2.1/dist/react-select.css"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<div id="modal-root" />
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}