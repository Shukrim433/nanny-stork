import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
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
                        <p className='font-bold underline'>
                        <Link to={`/profiles/${comment.commentAuthor}`} > 
                        {comment.commentAuthor}
                         </Link>
                            </p> 
                            <p>{comment.commentText}</p>
                        </div>
                        <div className='flex flex-col items-end'>
                        <span> <ReactTimeAgo date={new Date(parseInt(comment.createdAt))} locale="en-US" /> </span>
                        <div style={{ backgroundColor: '#f5f5f5' }} className="post-heading-line w-full h-[2px] mb-4"></div>
                        </div>
            
                    </div>        
                 ))}

            </div>
        </div>
    )
}

export default CommentList