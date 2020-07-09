import React from 'react';
import { Switch, Route } from 'react-router-dom';

import  Home  from './pages/home';
import Dashboard from "./pages/dashboard";

export const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
);