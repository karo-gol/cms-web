import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { setAccessToken, getAccessToken } from '#root/helpers/accessToken';
import Home from './components/Home';
import Login from './components/Login';
import Routes from './Routes';

// const query = gql`
//   {
//     me {
//       userId
//       login
//     }
//   }
// `;

const Root = (props) => {  
  //  const { data } = useQuery(query);
  //  console.log(`I am in root + ${data && data.me ? data.me.userId : data}`); 

  const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(process.env.SERVICES_URI + '/refresh_token', { method: 'POST', credentials: 'include' })
            .then(async x => {               
                const { accessToken } = await x.json();               
                setAccessToken(accessToken); 
                setLoading(false);
            });
    }, []);

    if(loading) {
        return <div>loading...</div>
    }

    return (       
        <Routes />       
    );
};

export default Root;