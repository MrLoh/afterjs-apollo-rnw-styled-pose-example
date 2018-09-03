import React from "react";
import express from "express";
import { render } from "@jaredpalmer/after";
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "styled-components";
import { ApolloProvider, getDataFromTree } from "react-apollo";

import { createApolloClient } from "./apollo";
import theme from "./theme";
import routes from "./routes";
import document from "./Document";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", async (req, res) => {
    console.log("requested:", req.url);
    try {
      const customRenderer = node => {
        try {
          const client = createApolloClient({ ssrMode: true });
          const App = (
            <ApolloProvider client={client}>
              <ThemeProvider theme={theme}>{node}</ThemeProvider>
            </ApolloProvider>
          );
          return getDataFromTree(App).then(() => ({
            html: renderToString(App),
            apolloState: client.extract()
          }));
        } catch (e) {
          console.log("error in renderer", e);
        }
      };
      const html = await render({
        req,
        res,
        routes,
        assets,
        document,
        customRenderer
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
