import React, { useEffect, useState } from "react";
import "@babel/polyfill";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ThemeProvider } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { Provider } from "react-redux";

import graphqlClient from "#root/graphql/graphqlClient";
import theme from "./theme";
import Root from "./Root";
import store from "./store";


render(   
    <Provider store={store}>
        <ApolloProvider client={graphqlClient}> 
            <ThemeProvider theme={theme}>           
                <Root />           
            </ThemeProvider>
        </ApolloProvider>
    </Provider>,   
    document.getElementById("app")
);