import React from 'react'
import './Home.css';
import { logIn } from '../../helpers/sessions'
import { authenticateUser } from '../../helpers/auth';

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    logIn(this.state.username, this.state.password).then((response) => {
      authenticateUser(response.token);
      this.setState({logInSuccessful: true});
    }).catch((error) => {
      alert(error.message);
    });
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <input type="text" name="username" placeholder="username" id="usernameField" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="password" id="passwordField" onChange={this.handleChange}/>
          <div class="row">
            <button class= "button-clear float-right" type= "button">forgot your password?</button>
            <input class="button float-right" type="submit" value="log in"/>
          </div>
        </fieldset>
      </form>
    );
  }
}
export default SignIn;
