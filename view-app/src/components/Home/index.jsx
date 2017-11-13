import React from 'react';
import PropTypes from 'prop-types';

import './Home.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Home = props => (
  <div className="row">
    <div className="column column-33 column-offset-10">
      <h2>log in</h2>
      <SignIn onAuthSuccess={props.authenticateUser} />
    </div>
    <div className="column column-33 column-offset-10">
      <h2>register</h2>
      <SignUp onAuthSuccess={props.authenticateUser} />
    </div>
  </div>
);

Home.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
};
export default Home;
