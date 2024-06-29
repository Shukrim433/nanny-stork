import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList'
import { QUERY_SINGLE_POST } from '../utils/queries';

import Auth from '../utils/auth'; 



const SinglePost = () => {
  // use useParams() hook to get the value of the route param in the url `/posts/:postId`
  const { postId } = useParams()

  // QUERY_SINGLE_POST query
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    // pass the URL parameter(the postId) to th query
    variables: { postId: postId }
  })

  // if the "data" returned by the query is falsy, post = empty object{}
  const post = data?.post || {}

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="single-post-card">
      <p>
        {/* click on username it takes u to the user's profile page, if the username is the logged in user's then ur redirect to /me */}
      <Link to={ post.postAuthor === Auth.getProfile().authenticatedPerson.username ? (`/me`) : (`/profiles/${post.postAuthor}`)} > 
        {post.postAuthor}
        </Link>
      </p>
      <h2>{post.postTitle}</h2>
      <div>
        <p>{post.postText}</p>
      </div>
      <p> posted on {post.createdAt}</p> <br/>

      <div>
      <CommentList comments={post.comments} post={post}/>
      </div>

      <div>
        <CommentForm postId={post._id} />
      </div>

    </div>

  )
}

export default SinglePost;