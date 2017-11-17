import fetch from 'isomorphic-fetch';
import ExtendableError from 'es6-error';
import config from '../config';
import { currentUser } from './auth';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  Authorization: currentUser().token,
  'Content-Type': 'application/json',
};

function enroll(department_id) {
  // body...
}

function departments() {
  return fetch(`${apiUrl}/departments`, {
    method: 'GET',
    headers,
    mode: 'cors',
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
}

export {
  enroll,
  departments,
};
