import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList'
import { QUERY_SINGLE_POST } from '../utils/queries';
import ReactTimeAgo from 'react-time-ago'
import Auth from '../utils/auth'; 
import QuoteContainer from '../components/quote-container';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../utils/ThemeContext';



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

  const { pinkTheme, toggleTheme } = useTheme(); // theme changung functionality
  const themeStyles = pinkTheme
  ? { background: '#f48fb1', transitionProperty: 'background-color', transitionDuration: '300ms' }
  : { background: '#90caf9', transitionProperty: 'background-color', transitionDuration: '300ms' };

  return (
    <>
    <QuoteContainer />
    {/* if youre logged in you can click on the postAuthor to go to another users profile or your own,*/}
    {Auth.loggedIn() ? (
      <div className="single-post-card">
        <p>
          {/* click on username it takes u to the user's profile page, if the username is the logged in user's then ur redirect to /me */}
        <Link to={ post.postAuthor === Auth.getProfile().authenticatedPerson.username ? (`/me`) : (`/profiles/${post.postAuthor}`)} > 
          {post.postAuthor}
          </Link>
        </p>
        <p> posted <ReactTimeAgo date={new Date(parseInt(post.createdAt))} locale="en-US" /> </p> <br/>
        <h2>{post.postTitle}</h2>
        <div className='whitespace-pre-wrap'> optional styling for the post text,
                            <ReactMarkdown>{post.postText}</ReactMarkdown>
                        </div>
        
        

        <div>
        <CommentList comments={post.comments} post={post}/>
        </div>

        <div>
          <CommentForm postId={post._id} />
        </div>

      </div>
    ) : ( // if youre not logged in you can click on the postAuthor and it will take you to that user's profile
      <div className='post-container flex items-center justify-center w-full'>
      <div className="single-post-card  ">
       

        <h2 className='post-title' >{post.postTitle}</h2> <br/>
        <div className='whitespace-pre-wrap'>
                            <ReactMarkdown>{post.postText}</ReactMarkdown>
                        </div> <br/>
                        <div className='post-bottom flex flex-col items-end'>
                        <p className="font-bold underline">
                            {/* click on username it takes u to the user's profile page, if the username is the logged in user's then ur redirect to /me */}
                            <Link to={ (`/profiles/${post.postAuthor}`)} > 
                            {post.postAuthor}
                            </Link>
                        </p>
                        <p> posted <ReactTimeAgo date={new Date(parseInt(post.createdAt))} locale="en-US" /> </p>
                        <div style={themeStyles} className="post-heading-line w-full h-[2px] my-4"></div>
                        </div>

        <div>
        <CommentList comments={post.comments} post={post}/>
        </div>

        <div>
          <CommentForm postId={post._id} />
        </div>

    </div>
    </div>
    )}
    <Footer />
    </>

  )
}

export default SinglePost;