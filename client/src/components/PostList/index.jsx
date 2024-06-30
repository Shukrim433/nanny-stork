import { Link } from 'react-router-dom';
import './postList.css';
import Auth from '../../utils/auth';

const PostList = ({ posts, title}) => {
    
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return(
        <div className="posts-card-body">
            <h2>{title}</h2>
            {posts &&
                posts.map((post) => (
                    <div key={post._id} className="single-post-card">
                        <p>
                            {/* click on username it takes u to the user's profile page, if the username is the logged in user's then ur redirect to /me */}
                            <Link to={ post.postAuthor === Auth.getProfile().authenticatedPerson.username ? (`/me`) : (`/profiles/${post.postAuthor}`)} > 
                            {post.postAuthor}
                            </Link>
                        </p> 
                        {/* click on post title it take you to the posts individual page */}
                        <h2>
                            <Link to={`/posts/${post._id}`}>
                            {post.postTitle}
                            </Link>
                        </h2>
                        
                        <div>
                            <p>{post.postText}</p>
                        </div>

                        <p> posted on {post.createdAt}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default PostList