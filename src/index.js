import React, { useEffect, useState } from 'react';
import '@babel/polyfill';
import { render } from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import CssBaseline from '@material-ui/core/CssBaseline';

import graphqlClient from '#root/graphql/graphqlClient';
import theme from './theme';
import Root from './Root';
import store from './store';


render(   
    <Provider store={store}>
        <ApolloProvider client={graphqlClient}> 
            <ThemeProvider theme={theme}> 
                <CssBaseline />              
                <Root />           
            </ThemeProvider>
        </ApolloProvider>
    </Provider>,   
    document.getElementById('app')
);