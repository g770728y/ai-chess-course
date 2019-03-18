import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError, ErrorResponse } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { readAuthFromLocalStorage } from '../store/helper';
import { appState } from '../store';
import { swap } from '@libre/atom';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { PORT, HOST } from '../constant';

const errorLink = onError((err: ErrorResponse) => {
  const { graphQLErrors, networkError, operation, forward } = err;
  if (graphQLErrors && graphQLErrors.length > 0) {
    const errorMessage = graphQLErrors[0].message;
    swap(appState, s => ({
      ...s,
      errors: [errorMessage]
    }));
  }
});

const authLink = setContext((_: any, args: any) => {
  const { headers } = args;
  const auth = readAuthFromLocalStorage();
  const token = auth && auth.token;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const httpLink = new HttpLink({ uri: `http://${HOST}:${PORT}/graphql` });

const wsLink = new WebSocketLink({
  uri: `ws://${HOST}:${PORT}/graphql`,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink, link])
});
