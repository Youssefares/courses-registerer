function authenticateUser(username, token){
  localStorage.setItem('username', username);
  localStorage.setItem('auth-token', token);
}

function isUserAuthenticated() {
  return localStorage.getItem('auth-token') !== null;
}

function deauthenticateUser() {
  localStorage.removeItem('auth-token');
}

function currentUser() {
  return {
    username: localStorage.getItem('username'),
    token: localStorage.getItem('auth-token'),
  };
}


export {
  authenticateUser,
  deauthenticateUser,
  isUserAuthenticated,
  currentUser,
};
