import React from "react";
import { ServerStyleSheet, injectGlobal } from "styled-components";
import { AfterRoot, AfterData } from "@jaredpalmer/after";

export default class Document extends React.Component {
  static async getInitialProps({ assets, data, renderPage }) {
    const sheet = new ServerStyleSheet();
    injectGlobal`body, html { margin: 0 }`;
    const page = await renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { assets, data, ...page, styleTags };
  }

  render() {
    const { helmet, assets, data, styleTags } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

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
          {styleTags}
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data} />
          <script
            type="text/javascript"
            src={assets.client.js}
            defer
            crossOrigin="anonymous"
          />
        </body>
      </html>
    );
  }
}
