import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import SignUp from './components/SignUp';
import Users from './components/Users';
import Test from './components/Test';
import AppBarRoute from './components/AppBarRoute';
import ErrorBoundary from './components/shared/ErrorBoundary';

const Routes = () => {   

    return (  
        <BrowserRouter> 
            <ErrorBoundary>       
            <Switch>
                <Route exact path='/' component={ SignUp } />            
                <AppBarRoute path='/users' component={ Users } />
                <AppBarRoute path='/test' component={ Test } />
            </Switch>   
            </ErrorBoundary>          
        </BrowserRouter>  
    );
};

export default Routes;