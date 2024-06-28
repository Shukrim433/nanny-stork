import { Link } from 'react-router-dom';
import './postList.css';

const PostList = ({ posts, title}) => {
    
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return(
        <div className="posts-card-body">
            <h2>{title}</h2>
            {posts &&
                posts.map((post) => (
                    <div key={post._id} className="single-post">
                        <h4>
                            {/* click on username it takes u to the user's profile page */}
                            <Link to={`/profiles/${post.postAuthor}`} > 
                            {post.postAuthor}
                            </Link> <br/>
                            {/* click on post title it take you to the posts individual page */}
                            <span>
                                <Link to={`/posts/${post._id}`}>
                                {post.postTitle}
                                </Link>
                            </span>
                        </h4>
                        <div className="single-post-body">
                            <p> {post.postText} </p>
                        </div>
                        <div className="single-post-footer">
                            <span> posted on {post.createdAt} </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostList