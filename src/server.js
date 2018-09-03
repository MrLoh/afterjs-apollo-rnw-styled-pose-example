import React from "react";
import express from "express";
import { render } from "@jaredpalmer/after";
import { renderToString } from "react-dom/server";

import Provider from "./Provider";
import routes from "./routes";
import document from "./Document";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get("/*", async (req, res) => {
    try {
      const customRenderer = node => {
        const App = <Provider>{node}</Provider>;
        return { html: renderToString(App) };
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
