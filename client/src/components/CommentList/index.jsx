import { Link } from 'react-router-dom';
// comments = [] is a default value - if the comments prop is not provided or is undefined when the CommentList component is called, 
// comments will default to an empty array [].

const CommentList = ({comments = [], post}) => {

    if(!comments.length) {
        return <h3>No Comments Yet</h3>
    }

    return (
        <div>
            <h2>Comments:</h2>
            <div>
                
                {comments &&
                comments.map((comment) => (
                    <div>
                        <div>
                        <p>
                        <Link to={`/profiles/${comment.commentAuthor}`} > 
                        {comment.commentAuthor}
                         </Link>
                            </p> commented{' '}
                        <span> on {comment.createdAt}</span>
                        </div>
                        <div>
                            <p>{comment.commentText}</p>
                        </div>
                    </div>        
                 ))}

            </div>
        </div>
    )
}

export default CommentList