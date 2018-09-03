import fetch from "cross-fetch";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

export const createApolloClient = options => {
  const cache = new InMemoryCache();
  if (options.initialState) {
    cache.restore(options.initialState);
  }
  const link = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    createHttpLink({ uri: "https://api.cinuru.com", fetch })
  ]);
  return new ApolloClient({ link, cache, ...options });
};
