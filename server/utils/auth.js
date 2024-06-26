const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
    // throws an error if user is not logged in
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    
    // function that intercepts every API call to check if the token is in the header object of that request
    authMiddleware: function ({ req }) {
        //checks to see if the http request has the jwt in the req body, the request query or the request header, (for us its the header check front end app.jsx)
        let token = req.body.token || req.query.token || req.headers.authorization; 
    
        // if its in the header, then extract the token from the header objects authorization property
        if (req.headers.authorization) { 
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          return req;  
        }
    
        try { // else if a token is found, verify it
          const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });  // Extract the authenticatedPerson from the token payload (contains user data like ID and username)
          req.user = authenticatedPerson; // Attach the authenticated user information to the request object's user field (is it creating a user property or was it already there doesnt matter)
        } catch {
          console.log('Invalid token'); 
        }
    
        return req; // Return the modified request object
    },

    // function that takes a users details as the jwt payload and creates a jwt token for them (used in signup and login)
    signToken: function ({ email, username, _id }) { // extracts only the username email id from the user object passed to this function from the addUser Resolver
        const payload = { email, username, _id };  // Create a payload with the user's email, username, and ID
        return jwt.sign({ authenticatedPerson: payload }, secret, { expiresIn: expiration }); // Sign the token with the payload, secret, and expiration time
      },
      
}