import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = (props) => {
  if (props.renderLogOut) {
    return (
      <div className="navbar">
        <ul>
          <li><a className="active">log out</a></li>
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
};

Navbar.propTypes = {
  renderLogOut: PropTypes.bool.isRequired,
};
export default Navbar;
