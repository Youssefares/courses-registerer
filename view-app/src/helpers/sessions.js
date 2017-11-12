import fetch from 'isomorphic-fetch';
import config from '../config';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

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
    if (response.ok) {
      response.json();
    } else {
      throw new Error(response);
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
      return response.json();
    }
    throw new Error(response);
  });
}

export { register, logIn };
