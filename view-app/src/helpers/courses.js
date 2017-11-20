import fetch from 'isomorphic-fetch';
import config from '../config';
import { currentUser } from './auth';

const apiUrl = `http://${config.API_HOST}:${config.API_PORT}`;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function courses(departmentId) {
  headers.Authorization = currentUser().token;
  return fetch(`${apiUrl}/courses`, {
    method: 'POST',
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


export default courses;
