import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";

import { createApolloClient } from "./apollo";
import theme from "./theme";
import routes from "./routes";

const client = createApolloClient({ initialState: window.__APOLLO_STATE__ });

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <After data={data} routes={routes} />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
  )
);

if (module.hot) {
  module.hot.accept();
}
