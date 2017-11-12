function authenticateUser(token){
  localStorage.setItem('auth-token', token);
}

function isUserAuthenticated() {
  return localStorage.getItem('auth-token') !== null;
}

function deauthenticateUser() {
  localStorage.removeItem('auth-token');
}

function getAuthToken() {
  return localStorage.getItem('auth-token');
}


export {
  authenticateUser,
  deauthenticateUser,
  isUserAuthenticated,
  getAuthToken,
};
