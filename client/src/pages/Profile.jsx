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
  const [showFriends, setShowFriends] = useState(false)
  const [showPosts, setShowPosts] = useState(true)

  // Toggle the visibility of the form
  const handleButtonClick = () => {
      setShowForm(!showForm);
  };

  // Toggle the visibility of friends
  const handleButtonClickFriends = () => {
    setShowFriends(!showFriends);
    setShowPosts(false);
};

// Toggle the visibility of the posts
const handleButtonClickPosts = () => {
  setShowPosts(!showPosts);
  setShowFriends(false);
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
          <h3 className=" font-bold mb-4">  
            <button className=" hover:text-gray-700 p-4">Friends: {user.friends.length}</button>  
            <button className="hover:text-gray-700">Posts: {user.posts.length} </button>
          </h3>
          <div className="pregnancy-container flex flex-row items-center justify-center flex-wrap lg:w-full mb-4">
          {/* If user already has a tracker, display tracker, else show addPregTracker btn */}
          <div className="w-full  p-4">
            {user.tracker ? (
              <PregnancyTracker />
            ) : (
              <Button onClick={handleButtonClick}> Add Pregnancy Tracker </Button>
            )}
            {/* Only show pregnancy tracker when showForm state is true */}
            {showForm && <PregnancyTrackerForm />}
          </div> 

          <div className="w-full p-4">
            <nav className="w-3/4">
              <ul className="navbar flex justify-between lg:ml-9">
                <li className="navLink text-lg font-thin hover:text-gray-700">
                  <button 
                    className={showPosts ? "flex justify-center items-center flex-col font-bold underline" : "navLink flex justify-center items-center flex-col text-lg font-thin hover:text-gray-700"} 
                    onClick={handleButtonClickPosts}>
                    POSTS
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                  </button>
                </li>
                <li className="navLink text-lg font-thin hover:text-gray-700"> 
                  <button 
                    className={showFriends ? "flex justify-center items-center flex-col font-bold underline" : "navLink flex justify-center items-center flex-col text-lg font-thin hover:text-gray-700"}  
                    onClick={handleButtonClickFriends}>
                    FOLLOWING
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                  </button> 
                </li>
              </ul>
            </nav>
          </div>
  
          <div className="w-1/2 p-4">
            {/* Only show friends when showFriends state is true */}
            { showFriends && <FriendsList friends={user.friends} />}
          </div>

        </div>

          <div className="flex flex-wrap">
            <div className="w-full mb-4">
              {/* Only show posts when showPosts state is true */}
              {showPosts && <PostsList posts={user.posts} />}
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
