import decode from 'jwt-decode';
// methods in this class are all going to be used in the components, and data from there will be passed to these functions, where necessary
class AuthService {
  getProfile() {  // Retrieves the JWT using this.getToken().
    return decode(this.getToken()); // Decodes the JWT using decode.
  } // Returns the decoded payload which contains the user's profile information.  // When you call decode on a JWT, it parses and decodes the payload part of the token, returning the claims as a JavaScript object. such as user information (e.g., user ID, username, email).

  loggedIn() { // checks if user is still logge in by seeing in their token has expired yet
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {  // USED IN THE loggedIn() method above
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token'); // simply gets the jwt from local storage, used in the getProfile() method above
  }

  login(idToken) { // JWT returned by addUser and loginUser mutations, is passed in here
    localStorage.setItem('id_token', idToken); // saves newly created jwt to local storage under the key id_token
    window.location.assign('/me'); // Redirect the user to the home page when they login 
  }

  logout() {
    localStorage.removeItem('id_token'); // remove jwt from local storage when user loggs out, new one will be created when they log in, with any updated data if the paylod, ie usernae changed since they were last logged in, check notebook
    window.location.reload(); // reload page when they logout, should probs change to / for homepage
  }
}

export default new AuthService();
