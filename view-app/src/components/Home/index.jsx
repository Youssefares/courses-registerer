import React from 'react';
import './Home.css';
import SignUp from './SignUp'
import SignIn from './SignIn'
import { isUserAuthenticated } from '../../helpers/auth'

class Home extends React.Component{
  render(){
  if(isUserAuthenticated()){
    //TODO: render other component
    return(<h1>welcome</h1>)
  }
  return (<div class="row">
    <div class= "column column-33 column-offset-10">
      <h2>register</h2>
      <SignUp />
    </div>
    <div class= "column column-33 column-offset-10">
      <h2>log in</h2>
      <SignIn />
    </div>
  </div>)
  }
  
};

export default Home;
