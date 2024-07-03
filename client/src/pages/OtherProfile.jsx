import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';
import PostsList from '../components/PostList'
import OtherPregnancyTracker from '../components/OtherPregnancyTracker'


const OtherProfile = () => {
    // use useParams() hook to get the value of the route param in the url `/profiles/:username`
    const { username } = useParams()

    // QUERY_USER query
    const { loading, data } = useQuery(QUERY_USER, {
    // pass the URL parameter(the username) to the query
        variables: { username: username }
    })

    // if the "data" returned by the query is falsy, post = empty object{}
    const user = data?.user || {}

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{user.username}'s Profile</h1>

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