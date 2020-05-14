import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import Test from "./components/Test";
import AppBarRoute from "./components/shared/AppBarRoute";
import ErrorBoundary from './components/shared/ErrorBoundary';

const Routes = () => {   

    return (  
        <BrowserRouter> 
            <ErrorBoundary>       
            <Switch>
                <Route exact path="/" component={ Login } />            
                <AppBarRoute path="/home" component={ Home } />
                <AppBarRoute path="/test" component={ Test } />
            </Switch>   
            </ErrorBoundary>          
        </BrowserRouter>  
    );
};

export default Routes;