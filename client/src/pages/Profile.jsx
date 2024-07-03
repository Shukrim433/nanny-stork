import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { Button, Input, Textarea, Card, CardBody, Alert } from '@material-tailwind/react';
import PostsList from '../components/PostList'
import PregnancyTrackerForm from '../components/PregnancyTrackerForm';
import PregnancyTracker from '../components/PregnancyTracker'
import { useLogInRedirect } from '../utils/log-in-redirection';


import Auth from '../utils/auth';


const Profile = () => {

  
  useLogInRedirect(); //redirects to login page if not logged in
  // state for showing form boolean
  const [showForm, setShowForm] = useState(false);

  // Toggle the visibility of the form
  const handleButtonClick = () => {
      setShowForm(!showForm);
  };


  // QUERY_USER query
  const { loading, data } = useQuery(QUERY_USER, {
    // pass the loggedin user's username
        variables: { username: Auth.getProfile().authenticatedPerson.username }
  })

  // if the "data" returned by the query is falsy, post = empty object{}
  const user = data?.user || {}

  if (loading  ) {
    return <div>Loading...</div>
  }

    return (
      <>
      <div>
        {Auth.loggedIn() ? (
          <div>
          <h2>Welcome, {Auth.getProfile().authenticatedPerson.username}!</h2>
          <div>
            {/* if user already has a tracker, display tracker, else show addPregTracker btn */}
            {user.tracker? (
              <PregnancyTracker/>
            ): (<Button 
              color="lightBlue" 
              buttonType="filled" 
              size="regular" 
              rounded={false} 
              block={false} 
              iconOnly={false} 
              ripple="light" 
              onClick={handleButtonClick}
            >
            add pregnancy tracker
            </Button>
          )}
            {/* only show pregnancy tracker when showFormstate is true */}
            {showForm && <PregnancyTrackerForm/>}
          </div>
          <div>
              <h2>Your Posts:</h2>
              <PostsList
              posts={user.posts}
              />
          </div>
            
      </div>
        ) : (
          <p>
              You need to be logged in to view your profile. Please{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}

     </div>
     </>
    );
}

  export default Profile;
