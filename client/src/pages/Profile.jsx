import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import { Button, Input, Textarea, Card, CardBody, Alert } from '@material-tailwind/react';
import PostsList from '../components/PostList'
import PregnancyTrackerForm from '../components/PregnancyTrackerForm';
import PregnancyTracker from '../components/PregnancyTracker'

import Auth from '../utils/auth';


const Profile = () => {
  
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
      <div>
        {Auth.loggedIn() ? (
          <div>
            <Button 
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
            
          {/* only show pregnancy tracker when showFormstate is true */}
          {showForm && <PregnancyTrackerForm/>}

          <h1>Your Profile</h1>
          <div>
              <h2>Your Posts:</h2>
              <PostsList
              posts={user.posts}
              />
          </div>
          <div>
            
          </div>
      </div>
        ) : (
          <p>
              You need to be logged in to view your profile. Please{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}

     </div>
    );
}

  export default Profile;
