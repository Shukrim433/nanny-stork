import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import { Button, Input, Textarea, Card, CardBody, Alert } from '@material-tailwind/react';
import Auth from '../../utils/auth';

const CommentForm = ({postId}) => {
    // holds comment form state
    const [commentText, setCommentText] = useState('');
    // holds character count state
    const [characterCount, setCharacterCount] = useState(0);
    // ADD_COMMENT mutation
    const [addComment, { loading, error }] = useMutation(ADD_COMMENT);

    // onSubmit add comment to post using ADD_COMMENT, postId and commentText
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        try {
            const {data} = await addComment({
                variables: {
                    postId,
                    commentText,
                    commentAuthor: Auth.getProfile().authenticatedPerson.username
                }
            })

            // clear form and state once done
            setCommentText('');
            setCharacterCount(0)
        } catch(error) {
            console.log(error)
        }
    }

    // onChange, setCommentText and characheterCount
    const handleChange = (event) => {
        // event.target.name + event.target.value
        const { name, value } = event.target;

        // only setCommentText and characterCount if the comment text is <=280 (if its over it wont set)
        if (name === 'commentText' && value.length <=280){
            setCommentText(value);
            setCharacterCount(value.length);
        }
    }

    return (
        <div>
            {Auth.loggedIn() ? (
                <Card>
                    <CardBody>
                    <p className="character-count">
                    {characterCount}/280
                    </p> <br/>
                    <p>Comment:</p> <br/>
                    <form onSubmit={handleFormSubmit}>
                        <Input
                        color="lightBlue" 
                        size="large" 
                        outline={true} 
                        placeholder="comment here..." 
                        name="commentText"
                        value={commentText} 
                        onChange={handleChange} 
                        required 
                        /> <br/>
                        <Button 
                        color="lightBlue" 
                        buttonType="filled" 
                        size="regular" 
                        rounded={false} 
                        block={false} 
                        iconOnly={false} 
                        ripple="light" 
                        type="submit" 
                        disabled={loading}
                        >
                            {loading ? 'Posting...' : 'Post'}
                        </Button>
                        {error && <Alert color="red" dismissible>{error.message}</Alert>}
                    </form>
                    </CardBody>
                </Card>
            ) : (
                <p>
                You need to be logged in to comment Please{' '}
                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    )

}

export default CommentForm;