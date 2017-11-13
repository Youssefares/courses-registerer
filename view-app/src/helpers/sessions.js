import fetch from 'isomorphic-fetch';
import ExtendableError from 'es6-error';
import config from '../config';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

class ValidationError extends ExtendableError {}
class WrongPasswordError extends ExtendableError {}
class WrongUsernameError extends ExtendableError {}


function register(username, email, password) {
  return fetch(`${apiUrl}/signup`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }).then((response) => {
    if (response.status === 201) {
      response.json();
    } else if (response.status === 422) {
      throw new ValidationError('unable to create user with given data');
    }
  });
}

function logIn(username, password) {
  return fetch(`${apiUrl}/signin`, {
    method: 'POST',
    mode: 'cors',
    headers,
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => {
    if (response.ok) {
      response.json();
    } else if (response.status === 401) {
      throw new WrongPasswordError('wrong password for user');
    } else if (response.status === 400) {
      throw new WrongUsernameError('username does not exist');
    }
  });
}

export { register, logIn, ValidationError, WrongUsernameError, WrongPasswordError };
