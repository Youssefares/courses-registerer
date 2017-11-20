import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';
import { currentUser, deauthenticateUser } from '../../helpers/auth';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    deauthenticateUser();
    this.props.authenticateUser();
  }

  render() {
    if (this.props.renderLogOut) {
      return (
        <div className="navbar">
          <ul>
            <li><button className="active" onClick={this.logOut}>log out</button></li>
            <li><button id="loggedIn"> Logged in as {currentUser().username}</button></li>
            <div id="title">
              <h2> courses registerer </h2>
            </div>
          </ul>
        </div>
      );
    }
    return (
      <div className="navbar">
        <ul>
          <div id="title">
            <h2> courses registerer </h2>
          </div>
        </ul>
      </div>
    );
  }
}
Navbar.propTypes = {
  renderLogOut: PropTypes.bool.isRequired,
  authenticateUser: PropTypes.func.isRequired,
};
export default Navbar;
