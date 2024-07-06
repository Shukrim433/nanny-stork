import { Link } from 'react-router-dom';
import './postList.css';
import ReactTimeAgo from 'react-time-ago'
import Auth from '../../utils/auth';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../../utils/ThemeContext';

const PostList = ({ posts}) => {
    
    if (!posts.length) {
        return <div> </div>
    }

    const { pinkTheme, toggleTheme } = useTheme(); // theme changung functionality
  const themeStyles = pinkTheme
  ? { background: '#f48fb1', transitionProperty: 'background-color', transitionDuration: '300ms' }
  : { background: '#90caf9', transitionProperty: 'background-color', transitionDuration: '300ms' };

    return(
        <>
        {/* if youre logged in you can click on the postAuthor to go to their profile,*/}
        {Auth.loggedIn() ? (
        <div className="posts-card-body">
            
            {posts &&
                posts.map((post) => (
                    <div key={post._id} className="single-post-card">
                        
                        {/* click on post title it take you to the posts individual page */}
                        <h2 className='post-title'>
                            <Link to={`/posts/${post._id}`}>
                            {post.postTitle}
                            </Link>
                            <div style={themeStyles} className="post-heading-line w-full h-[2px] "></div>
                        </h2>
                        
                         <br/>
                        <div className='post-bottom flex flex-col items-end'>
                        <p className="font-bold underline">
                            {/* click on username it takes u to the user's profile page, if the username is the logged in user's then ur redirect to /me */}
                            <Link to={ post.postAuthor === Auth.getProfile().authenticatedPerson.username ? (`/me`) : (`/profiles/${post.postAuthor}`)} > 
                            {post.postAuthor}
                            </Link>
                        </p>
                        <p> posted <ReactTimeAgo date={new Date(parseInt(post.createdAt))} locale="en-US" /> </p>
                        </div>
                        
                        {/* <div className='whitespace-pre-wrap'> optional styling for the post text,
                            <ReactMarkdown>{post.postText}</ReactMarkdown>
                        </div> */}
                        
                        
                    </div>
                ))
            }
        </div>
        ) : ( // if youre not logged in you cant click on the postAuthor to got to their profile:
            <div className="posts-card-body">
            
            {posts &&
                posts.map((post) => (
                    <div key={post._id} className="single-post-card">
                        
                        {/* click on post title it take you to the posts individual page */}
                        <h2 className='post-title'>
                            <Link to={`/posts/${post._id}`}>
                            {post.postTitle}
                            </Link>
                            <div style={themeStyles} className="post-heading-line w-full h-[2px] "></div>
                        </h2>
                        
                         <br/>
                        <div className='post-bottom flex flex-col items-end'>
                        <p className="font-bold underline">
                            {/* click on username it takes u to the user's profile page, if the username is the logged in user's then ur redirect to /me */}
                            <Link to={ (`/profiles/${post.postAuthor}`)} > 
                            {post.postAuthor}
                            </Link>
                        </p>
                        <p> posted <ReactTimeAgo date={new Date(parseInt(post.createdAt))} locale="en-US" /> </p>
                        </div>
                        
                        {/* <div className='whitespace-pre-wrap'> optional styling for the post text,
                            <ReactMarkdown>{post.postText}</ReactMarkdown>
                        </div> */}
                        
                        
                    </div>
                ))
            }
        </div>

        )}
        </>
    )
}

export default PostList