import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';
import PostsList from '../components/PostList'
import FriendsList from '../components/FriendsList'
import PregnancyTrackerForm from '../components/PregnancyTrackerForm';
import PregnancyTracker from '../components/PregnancyTracker'
import { Button } from "@material-tailwind/react";
import { useLogInRedirect } from '../utils/log-in-redirection';
import QuoteContainer from '../components/quote-container';
import Footer from '../components/Footer';


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
      <QuoteContainer />
      <div className="container mx-auto p-4">
      {Auth.loggedIn() ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            Welcome, {Auth.getProfile().authenticatedPerson.username}!
          </h2>
          <h3 className=" font-bold mb-4">  <span className="p-4">Friends: {user.friends.length}</span>  Posts: {user.posts.length}</h3>
          <div className="pregnancy-container flex flex-row flex-wrap lg:w-full mb-4">
  {/* If user already has a tracker, display tracker, else show addPregTracker btn */}
  <div className="w-1/2">
    {user.tracker ? (
      <PregnancyTracker />
    ) : (
      <Button onClick={handleButtonClick}> Add Pregnancy Tracker </Button>
    )}
    {/* Only show pregnancy tracker when showForm state is true */}
    {showForm && <PregnancyTrackerForm />}
  </div>
  
  <div className="w-1/2">
    <FriendsList friends={user.friends} />
  </div>
</div>

          <div className="flex flex-wrap">
            <div className="w-full mb-4">
              <PostsList posts={user.posts} />
            </div>
          </div>

        </div>
      ) : (
        <p className="text-center mt-5">
          You need to be logged in to view your profile. Please{' '}
          <Link to="/login" className="text-blue-500 underline">
            login
          </Link>{' '}
          or{' '}
          <Link to="/signup" className="text-blue-500 underline">
            signup.
          </Link>
        </p>
      )}
    </div>
    <Footer />
    </>
  );
};
  export default Profile;
