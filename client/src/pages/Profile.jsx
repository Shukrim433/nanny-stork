import { useQuery } from '@apollo/client';
import { QUERY_ME, QUERY_USER } from '../utils/queries';

import PostsList from '../components/PostList'

import Auth from '../utils/auth';


const Profile = () => {

  // QUERY_USER query
  const { loading, data } = useQuery(QUERY_USER, {
    // pass the loggedin user's username
        variables: { username: Auth.getProfile().authenticatedPerson.username }
  })

  // if the "data" returned by the query is falsy, post = empty object{}
  const user = data?.user || {}

  if (loading) {
    return <div>Loading...</div>
  }

    return (
      <div>
        {Auth.loggedIn() ? (
          <div>
          <h1>{user.username}'s Profile</h1>

          <div>
              <h2>{user.username}'s posts:</h2>
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
    );
}

  export default Profile;
