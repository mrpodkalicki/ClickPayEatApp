import React from 'react';
import {Switch, Route, Redirect, Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import  HomePage  from './pages/Home.page/home.page';
import DashboardPage from './pages/Dashboard.page/dashboard.page';
import Restaurants from "./pages/Restaurants.page/restaurant.page";
import SideBar from "./components/SideBar/sideBar";
import SignIn from "./components/Form/signIn.component/signIn.component";

const history = createBrowserHistory();
export const Routes = () => (
    <Router history={history}>
        <Switch>
            <Redirect  exact from="/" to="/signIn" />
            <Route exact path="/signIn"   component={SignIn} />
            <SideBar>
                <Route exact path="/dashboard" component={HomePage} />
                <Route exact path="/restaurants" component={Restaurants} />
            </SideBar>
        </Switch>
    </Router>

);