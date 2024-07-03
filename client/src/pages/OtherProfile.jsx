import { useParams, } from 'react-router-dom';
import { useQuery, useMutation, } from '@apollo/client';
import { ADD_FRIEND, REMOVE_FRIEND } from '../utils/mutations';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import PostsList from '../components/PostList'
import { Button } from "@material-tailwind/react";
import OtherPregnancyTracker from '../components/OtherPregnancyTracker'


const OtherProfile = () => {
    // use useParams() hook to get the value of the route param in the url `/profiles/:username`
    const { username } = useParams()

    // QUERY_USER and QUERY_ME query
    const { loading, data } = useQuery(QUERY_USER, {
    // pass the URL parameter(the username) to the query
        variables: { username: username }
    })
    const { loading: myLoading, data: myData } = useQuery(QUERY_ME);

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
    
   

    if (loading|| myLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{user.username}'s Profile</h1>
            {!isFriend ? (
                <Button onClick={useAddFriend}>Add Friend</Button>
            ) : (
                <Button onClick={useRemoveFriend}>Remove Friend</Button>
            )}
            <div>
               <OtherPregnancyTracker username={username} />
            </div>

            <div>
                <h2>{user.username}'s posts:</h2>
                <PostsList
                posts={user.posts}
                />
            </div>
        </div>
    )
    

}


export default OtherProfile