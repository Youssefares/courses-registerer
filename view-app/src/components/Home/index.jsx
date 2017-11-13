import React from 'react';
import { Redirect } from 'react-router-dom';

import './Home.css';
import SignUp from './SignUp';
import SignIn from './SignIn';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authSuccess: false,
    };
  }

  render() {
    const { authSuccess } = this.state;
    if (authSuccess) {
      // TODO: render other component
      return (<Redirect to="/" />);
    }
    return (
      <div className="row">
        <div className="column column-33 column-offset-10">
          <h2>log in</h2>
          <SignIn onAuthSuccess={() => this.setState({ authSuccess: true })} />
        </div>
        <div className="column column-33 column-offset-10">
          <h2>register</h2>
          <SignUp onAuthSuccess={() => this.setState({ authSuccess: true })} />
        </div>
      </div>
    );
  }
}

export default Home;
