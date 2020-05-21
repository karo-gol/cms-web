import React, { useEffect, useState } from 'react';

import { setAccessToken } from '#root/helpers/accessToken';
import Routes from './Routes';

const Root = (props) => {  
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