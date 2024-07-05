import React, { useState } from 'react';
import { useParams, } from 'react-router-dom';
import { useQuery, useMutation, } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import PostsList from '../components/PostList'
import FriendsList from '../components/FriendsList'
import { Button } from "@material-tailwind/react";
import OtherPregnancyTracker from '../components/OtherPregnancyTracker'
import QuoteContainer from '../components/quote-container';
import Footer from '../components/Footer';
import Auth from '../utils/auth';


const OtherProfile = () => {
    // use useParams() hook to get the value of the route param in the url `/profiles/:username`
    const { username } = useParams()

    // QUERY_USER and QUERY_ME query
    const { loading: pregnancyTrackerLoading, data } = useQuery(QUERY_USER, {
    // pass the URL parameter(the username) to the query
        variables: { username: username }
    })
    const { loading: myLoading, data: myData } = useQuery(QUERY_ME);

    const [showFriends, setShowFriends] = useState(false)
    const [showPosts, setShowPosts] = useState(true)

    const [addFriend, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_FRIEND);
    const [removeFriend, { loading: removeLoading, error: removeError }] = useMutation(REMOVE_FRIEND);

    const user = data?.user || {};
    const me = myData?.me || {};
    console.log('Current user data:', me);
    // access current user if it exists and check if the current user is friends with the user
    const isFriend = me?.friends?.some(friend => friend.username === user.username) ?? false;

    
    const useAddFriend = async () => {
        try {
            const friendName = user.username; 
            console.log(`Adding friend: ${friendName}`); 
            await addFriend({
                variables: { friendName: friendName }
            });
        } catch (err) {
            console.error("Error adding friend:", err);
            if (err.networkError) {
                console.log(`Network error: ${err.networkError.message}`);
            }
            if (err.graphQLErrors) {
                err.graphQLErrors.forEach(e => console.log(`GraphQL error: ${e.message}`));
            }
        }
    };

    const useRemoveFriend = async () => {
        try {
            const friendName = user.username; 
            console.log(`Removing friend: ${friendName}`); 
            await removeFriend({
                variables: { friendName: friendName }
            });
        } catch (err) {
            console.error("Error removing friend:", err);
            if (err.networkError) {
                console.log(`Network error: ${err.networkError.message}`);
            }
            if (err.graphQLErrors) {
                err.graphQLErrors.forEach(e => console.log(`GraphQL error: ${e.message}`));
            }
        }
    }
    
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
   

    if (pregnancyTrackerLoading|| myLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
        <QuoteContainer />
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{user.username}'s Profile</h1>
                
                <h3 className=" font-bold mb-4">  
                    <button className=" hover:text-gray-700 p-4">Friends: {user.friends.length}</button>  
                    <button className="hover:text-gray-700">Posts: {user.posts.length} </button>
                    <span className="p-4">
                        {Auth.loggedIn() ? (
                        !isFriend ? (
                            <Button onClick={useAddFriend} className='flex flex-row justify-center ml-3'>Follow <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                          </svg>
                          </Button>
                        ) : (
                            <Button onClick={useRemoveFriend} className='flex flex-row justify-center ml-3'>Unfollow <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                          </svg>
                          </Button>
                        )) : (<></>)}
                    </span>
                </h3>

                <div>
                { user.tracker && <OtherPregnancyTracker user={user} />}
                </div>

          <div className="w-full p-4" >
            <nav className="lg:mx-14">
            <ul className="navbar flex justify-between">
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

                <div className="flex flex-row items-center justify-center flex-wrap lg:w-full mb-4">
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
        </div>
        <Footer />
        </>
    )
    

}


export default OtherProfile