import fetch from 'isomorphic-fetch';
import config from '../config';
import { currentUser } from './auth';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  Authorization: currentUser().token,
  'Content-Type': 'application/json',
};

function enroll(departmentId) {
  return fetch(`${apiUrl}/enroll`, {
    method: 'PUT',
    headers,
    mode: 'cors',
    body: JSON.stringify({
      department_id: departmentId,
    }),
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
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
