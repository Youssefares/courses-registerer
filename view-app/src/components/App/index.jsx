import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.css';
import Home from '../Home';
import Department from '../Department';
import Navbar from '../Navbar';
import { isUserAuthenticated } from '../../helpers/auth';

const App = () => (
  <div>
    <Navbar renderLogOut={isUserAuthenticated()} />
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (isUserAuthenticated()) {
                return (<Department />);
              }
              return (<Redirect to="/login" />);
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              if (isUserAuthenticated()) {
                return (<Redirect to="/" />);
              }
              return (<Home />);
            }}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
