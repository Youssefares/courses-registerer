import fetch from 'isomorphic-fetch';
import config from '../config';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function apiAuth(token) {
  return fetch(`${apiUrl}/auth`, {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify({
      token,
    }),
  });
}

function currentUser() {
  if (localStorage.getItem('currentUser') == null) {
    return null;
  }
  return JSON.parse(localStorage.getItem('currentUser'));
}

function authenticateUser(token, onSuccess) {
  apiAuth(token).then((response) => {
    return response.json();
  }).then((response) => {
    if (response != null) {
      localStorage.setItem('currentUser', JSON.stringify(response));
      onSuccess();
    }
  });
}

function isUserAuthenticated() {
  if (currentUser() === null) {
    return Promise.resolve({ status: 401 });
  }
  return apiAuth(currentUser().token).then((response) => {
    response.json().then((response) => {
      if (response != null) {
        localStorage.setItem('currentUser', JSON.stringify(response));
      }
    });
    return response;
  });
}

function deauthenticateUser() {
  localStorage.removeItem('currentUser');
}


export {
  authenticateUser,
  deauthenticateUser,
  isUserAuthenticated,
  currentUser,
};
