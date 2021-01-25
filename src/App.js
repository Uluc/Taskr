import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/navbars/Navbar";
import TodoList from "./components/TodoList";
import CreateTodo from "./components/create-todo.components";
import EditTodo from "./components/edit-todo.components"

import Landing from "./components/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar/>

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Switch>

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/list" component={TodoList} />
            <PrivateRoute exact path="/edit/:id" component={EditTodo} />
            <PrivateRoute exact path="/create" component={CreateTodo} />
          </Switch>
          
      </Router>
    </Provider>
  );
}

export default App;
