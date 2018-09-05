import React from 'react';
import express from 'express';
import { render } from '@jaredpalmer/after';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { AppRegistry } from 'react-native';

import RouteTransitioner from './RouteTransitioner';
import { createApolloClient } from './apollo';
import theme from './theme';
import routes from './routes';
import document from './Document';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const app = express()
	.disable('x-powered-by')
	.use(express.static(process.env.RAZZLE_PUBLIC_DIR))
	.get('/*', async (req, res) => {
		console.log('serving:', req.url);
		// define custom renderer
		const customRenderer = async (node) => {
			try {
				const client = createApolloClient({ ssrMode: true });
				const location = req.url;
				const App = () => (
					<ApolloProvider client={client}>
						<ThemeProvider theme={theme}>
							<RouteTransitioner location={location}>{node}</RouteTransitioner>
						</ThemeProvider>
					</ApolloProvider>
				);
				AppRegistry.registerComponent('App', () => App);
				const { element, getStyleElement } = AppRegistry.getApplication('App', {});
				const html = await renderToStringWithData(element);
				const styleElement = getStyleElement();
				const apolloState = client.extract();
				return { html, apolloState, styleElement };
			} catch (e) {
				console.log('error in customRenderer', e);
			}
		};
		// render
		try {
			const html = await render({
				req,
				res,
				routes,
				assets,
				document,
				customRenderer,
			});
			res.send(html);
		} catch (error) {
			console.log('error in render', error);
			res.json(error);
		}
	});

export default app;
