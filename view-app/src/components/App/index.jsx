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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signed_in: isUserAuthenticated(),
    };
    this.authenticateUser = this.authenticateUser.bind(this);
  }

  authenticateUser() {
    this.setState({ signed_in: isUserAuthenticated() });
  }

  render() {
    return (
      <div>
        <Navbar renderLogOut={this.state.signed_in} authenticateUser={this.authenticateUser} />
        <Router>
          <div>
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  if (this.state.signed_in) {
                    return (<Department />);
                  }
                  return (<Redirect to="/login" />);
                }}
              />
              <Route
                exact
                path="/login"
                render={() => {
                  if (this.state.signed_in) {
                    return (<Redirect to="/" />);
                  }
                  return (<Home authenticateUser={this.authenticateUser} />);
                }}
              />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
