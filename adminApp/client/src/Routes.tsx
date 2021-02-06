import React, { useContext,useState, createContext} from 'react';
import {Switch, Route, Redirect, Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import  HomePage  from './pages/Home.page/home.page';
import DashboardPage from './pages/Dashboard.page/dashboard.page';
import Restaurants from "./pages/Restaurants.page/restaurant.page";
import SideBar from "./components/SideBar.component/sideBar.component";
import SignIn from "./components/Form/signIn.component/signIn.component";

function useProvideAuth() {
    const [user, setUser] = useState<string>('');
    const signin = () => {
        setUser('user');
         return true;
    };
    const signout = () => {
        setUser('');
         return false;
    }
    return {
        user,
        signin,
      signout
    };
  }



const authContext = createContext({});
function ProvideAuth({ children }: any) {
    const auth = useProvideAuth();
    return (
      <authContext.Provider value={auth}>
        {children}
      </authContext.Provider>
    );
  }

export function useAuth() {
    return useContext(authContext);
  }

  const ProtectedRoute = ({ component: Component, ...rest }: any) => {
    let auth: any = useAuth();
    console.log(auth)
    return (
    <Route {...rest} render={(props) => (
        auth.user
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }} />
    )} />
  )};



const history = createBrowserHistory();
export const Routes = () => {
    return (  
    <ProvideAuth>
        <Router history={history}>
            <Switch>
                <Route exact path="/"  component={SignIn} />
                    <SideBar>
                        <ProtectedRoute exact path="/dashboard" component={HomePage}/> 
                        <ProtectedRoute exact path="/restaurants" component={Restaurants}/>
                    </SideBar>
            </Switch>
        </Router>
    </ProvideAuth>
)};