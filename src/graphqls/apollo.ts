import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError, ErrorResponse } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { readAuthFromLocalStorage } from '../store/helper';
import { appState } from '../store';
import { swap } from '@libre/atom';

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

const httpLink = new HttpLink({ uri: 'http://localhost:3999' });

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, errorLink, httpLink])
});
