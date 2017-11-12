import React from 'react'
import './Home.css';
import { register } from '../../helpers/sessions';
import { authenticateUser } from '../../helpers/auth';

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirm_password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    register(this.state.username, this.state.email, this.state.password)
    .then((response) => {
      authenticateUser(response.token);
      this.setState({logInSuccessful: true});
    }).catch((error) => {
      alert(error);
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
          <input type="email" name="email" placeholder="email" id="emailField" onChange={this.handleChange}/>
          <input type="password" name="password" placeholder="password" id="passwordField" onChange={this.handleChange}/>
          <input type="password" name="confirm password" placeholder="confirm password" id="confirmPasswordField" onChange={this.handleChange}/>
          <div class="row">
            <button class= "button-clear float-right" type= "button">register with facebook</button>
            <input class="button float-right" type="submit" value="register"/>
          </div>
        </fieldset>
      </form>
    );
  }
}
export default SignUp;
