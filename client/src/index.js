import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { Provider } from 'react-redux';
import { reducers } from "./redux/reducers"
import thunk from "redux-thunk"
import { BrowserRouter } from "react-router-dom"
import { createStore, applyMiddleware, compose } from "redux"
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SearchContextProvider } from './context/SearchContext';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <SearchContextProvider>
          <GoogleOAuthProvider clientId={`641466764873-he3foed6lqms8jfcfq0isp8p6de61pe6.apps.googleusercontent.com`}>
            <App />
          </GoogleOAuthProvider>
        </SearchContextProvider>
      </AuthContextProvider>
      </Provider>

  </React.StrictMode>
);
