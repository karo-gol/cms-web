import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

import graphqlClient from "#root/graphql/graphqlClient";

const query = gql`
    {
        users {
            userId
            login
            email
        }
    }
`;

const Root = () => {    
    const { data, loading } = useQuery(query);

    if(loading) return "Loading....";

    return (        
        <div>
            {data.users.map(user => (
                <div>{`${user.userId} - ${user.login} - ${user.email}`}</div>
            ))}            
        </div>
    );
};

render(   
    <ApolloProvider client={graphqlClient}> 
        <Root />
    </ApolloProvider>,   
    document.getElementById("app")
);