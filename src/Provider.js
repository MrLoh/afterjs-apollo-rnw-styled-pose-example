import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

const Provider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

Provider.theme = theme;
Provider.client = client;

export default Provider;
