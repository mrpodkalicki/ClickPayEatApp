import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  { Routes } from "./Routes";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import { AppContext } from "./contex";



ReactDOM.render(
  <React.Fragment>
      <Provider store={store}>
          <BrowserRouter>
              <Routes />
          </BrowserRouter>
      </Provider>
  </React.Fragment>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
