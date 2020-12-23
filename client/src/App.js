import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar"
import Landing from "./components/layout/Landing"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import CreateProfil from "./components/profile/CreateProfil"
import EditProfile from "./components/profile/EditProfile"
import Profile from "./components/profile/Profile"
import Posts from "./components/posts/Posts"
import Post from "./components/posts/Post"
import PrivateRoute from "./components/routing/PrivateRoute"
import "./css/Main.sass"
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth"
import setAuthToken from "./utils/setAuthToken"

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
        <Fragment>
          <Navbar />  
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/create-profil" component={CreateProfil} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
    </Router>
  </Provider>
  )};

export default App;
