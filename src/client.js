import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ensureReady, After } from "@jaredpalmer/after";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { AppRegistry } from "react-native";

import { createApolloClient } from "./apollo";
import theme from "./theme";
import routes from "./routes";

(async () => {
  const data = await ensureReady(routes);
  const client = createApolloClient({ initialState: window.__APOLLO_STATE__ });
  const App = () => (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <After data={data} routes={routes} />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
  AppRegistry.registerComponent("App", () => App);
  AppRegistry.runApplication("App", { initialProps: {}, rootTag: document.getElementById("root") });
})();

if (module.hot) {
  module.hot.accept();
}
