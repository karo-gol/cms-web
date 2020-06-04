import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, Observable } from 'apollo-link';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { onError } from 'apollo-link-error';
import jwtDecode from 'jwt-decode';

import { setAccessToken, getAccessToken } from '#root/helpers/accessToken';

export const cache = new InMemoryCache();

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(operation => {
        const accessToken = getAccessToken();        
        if(accessToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            });           
        }
      })
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
        const token = getAccessToken();      

        if(!token) {
            return true;
        }

        try {
            const { exp } = jwtDecode(token);
            if (Date.now() >= exp * 1000) {
                return false;
            } else {
                return true;
            }
        } catch {
            return false;
        }
    },
    fetchAccessToken: () => {
        return fetch(process.env.SERVICES_URI + '/refresh_token', { method: 'POST', credentials: 'include' });
    },
    handleFetch: accessToken => {       
        setAccessToken(accessToken);    
    },        
    handleError: err => {            
        console.warn('Your refresh token is invalid. Try to relogin.');
        console.error(err);    
    }
});


const client = new ApolloClient({
    link: ApolloLink.from([
        tokenRefreshLink,
        onError(({ graphQLErrors, networkError }) => {
            console.log(graphQLErrors);
            console.log(networkError);
        }),
        requestLink,
        new HttpLink({
            credentials: 'include',
            uri: process.env.SERVICES_URI + '/graphql'
        })
    ]),
    cache,
    connectToDevTools: true   
});

export default client;