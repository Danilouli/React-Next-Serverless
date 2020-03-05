/*
 * NICE HEADER
 * File: _document.jsx
 * Project: React-Next-Serverless Template
 * File Created: Thursday, 5th March 2020 9:24:15 am
 * Author: dyod (Daniel Saadia) (me@dyod.io)
 * -----
 * dyod
 */

import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="icon" type="image/x-icon" href="#"/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
export default MyDocument;