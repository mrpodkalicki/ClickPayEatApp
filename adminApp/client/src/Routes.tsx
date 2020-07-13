import React from 'react';
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import  Home  from './pages/Home.page/home';
import Dashboard from './pages/Dashboard.page/dashboard';
import Restaurants from "./pages/Restaurants.page/restaurant";
import SideBar from "./components/SideBar.component/sideBar";
import Login from "./components/Form/login.component";

const history = createBrowserHistory();
export const Routes = () => (
    <Router history={history}>
        <Switch>
            <Redirect  exact from="/" to="/signIn" />
            <Route exact path="/signIn"   component={Login} />
            <SideBar>
                <Route exact path="/dashboard" component={Home} />
                <Route exact path="/restaurants" component={Restaurants} />
            </SideBar>
        </Switch>
    </Router>

);