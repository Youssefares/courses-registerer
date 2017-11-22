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
import Courses from '../Courses';
import Navbar from '../Navbar';
import { isUserAuthenticated, currentUser } from '../../helpers/auth';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signed_in: currentUser() != null,
      enrolled: currentUser().department_id,
    };

    isUserAuthenticated().then((response) => {
      this.setState({ signed_in: response.status === 200 });
      if (response.status === 200) {
        response.json().then((response) => {
          if (this.state.signed_in) {
            this.setState({ enrolled: response.department_id });
          }
        });
      }
    });
    this.authenticateUser = this.authenticateUser.bind(this);
    this.enroll = this.enroll.bind(this);
  }

  authenticateUser() {
    isUserAuthenticated().then((response) => {
      this.setState({ signed_in: response.status === 200 });
      if (response.status === 200) {
        response.json().then((response) => {
          if (this.state.signed_in) {
            this.setState({ enrolled: response.department_id });
          }
        });
      }
    });
  }

  enroll() {
    this.authenticateUser();
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
                path="/courses"
                render={() => {
                  if (!this.state.signed_in) {
                    return (<Redirect to="/login" />);
                  }
                  if (this.state.enrolled) {
                    return (<Courses departmentId={this.state.enrolled} />);
                  }
                  return (<Redirect to="/" />);
                }}
              />
              <Route
                exact
                path="/"
                render={() => {
                  if (this.state.signed_in && this.state.enrolled) {
                    return (<Redirect to="/courses" />);
                  }
                  if (this.state.signed_in) {
                    return (<Department enroll={this.enroll} />);
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
