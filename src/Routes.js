import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import SignUp from './components/SignUp';
import Users from './components/Users';
import Test from './components/Test';
import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/shared/ErrorBoundary';

const Routes = () => {   

    return (  
        <BrowserRouter> 
            <ErrorBoundary>       
            <Switch>
                <Route exact path='/' component={ SignUp } />            
                <AppLayout path='/users' component={ Users } />
                <AppLayout path='/test' component={ Test } />
            </Switch>   
            </ErrorBoundary>          
        </BrowserRouter>  
    );
};

export default Routes;