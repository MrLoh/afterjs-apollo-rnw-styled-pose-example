// executed by server
import React from 'react';
import { AfterData, AfterRoot } from '@jaredpalmer/after';

const globalCss = `
	html, body, #root {
		height: 100%; 
		overflow: hidden;
	}
	#root {
		display: flex;
	}
`;

export default class Document extends React.Component {
	static async getInitialProps({ assets, data, renderPage }) {
		const page = await renderPage();
		return { assets, data, ...page };
	}

	render() {
		const { helmet, assets, data, styleElement, apolloState } = this.props;
		// get attributes from React Helmet
		const htmlAttrs = helmet.htmlAttributes.toComponent();
		const bodyAttrs = helmet.bodyAttributes.toComponent();
		// set server apollo state
		const serializedApolloState = (JSON.stringify(apolloState) || '').replace(/</g, '\\u003c');
		const setApolloStateScript = `window.__APOLLO_STATE__ = ${serializedApolloState};`;
		return (
			<html {...htmlAttrs}>
				<head>
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>Cinuru</title>
					{helmet.title.toComponent()}
					{helmet.meta.toComponent()}
					{helmet.link.toComponent()}
					<style>{globalCss}</style>
					{styleElement}
					<script dangerouslySetInnerHTML={{ __html: setApolloStateScript }} />
				</head>
				<body {...bodyAttrs}>
					<AfterRoot />
					<AfterData data={data} />
					<script type="text/javascript" src={assets.client.js} defer crossOrigin="anonymous" />
				</body>
			</html>
		);
	}
}
