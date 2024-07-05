import { useState,  } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { Button, Input, Textarea, Card, CardBody, Alert } from '@material-tailwind/react';
import { useLogInRedirect } from '../utils/log-in-redirection';
import QuoteContainer from '../components/quote-container';

export default function NewPost() {
    useLogInRedirect(); //redirects to login page if not logged in
    //holds character count state
    const [characterCount, setCharacterCount] = useState(0);
    const [formState, setFormState] = useState({ postTitle: '', postText: '', postCategory: '' });
    const [addPost, { loading, error }] = useMutation(ADD_POST);

    // update formState based on what user inputs (OnChange event)
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        // Only setFormState for postText as long as postText <= 280 characters. once its over 280, the formState.postText will not be updated
        if (name === 'postText') {
            if (value.length <= 280) {
                setCharacterCount(value.length)
                setFormState({
                    ...formState,
                    [name]: value,
                });
            }
        } else {
            // for the postTitle field, update the formState.postTitle without the length check
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    };

    // onSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost({ variables: { ...formState } });
             
            // Clear the textarea after successful post submission
            setFormState({
                postTitle: '',
                postText: '',
                postCategory: ''
            });
        } catch (err) {
            console.error("Error adding post:", err);
        }
    };

    // when you click post button it redirects you to the posts page
    const handleClick = () => {  
        window.location.assign('/posts')
    }


    return (
        <>
        <QuoteContainer />
        <Card>
            <CardBody>
                <p className="character-count">
                    {characterCount}/280
                </p>
                <form onSubmit={handleSubmit}>
                    <Input
                     color="lightBlue" 
                     size="large" 
                     outline={true} 
                     placeholder="Title..." 
                     name="postTitle"
                     value={formState.postTitle} 
                     onChange={handleChange} 
                     required 
                    /> <br/>   {/* the placeholder wont show up in the input area */} {/* put the br for a line break */}
                    <div>
                        <select
                        name="postCategory"
                        value={formState.postCategory}
                        onChange={handleChange}
                        >
                            <option value="">category</option>
                            <option value="Health and Development">Health and Development</option>
                            <option value="Sleep and Routine">Sleep and Routine</option>
                            <option value="Feeding and Nutrition">Feeding and Nutrition</option>
                            <option value="Parental Well-being">Parental Well-being</option>
                            <option value="Education">Education</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div> <br/>
                    <Textarea 
                        color="lightBlue" 
                        size="regular" 
                        outline={true} 
                        placeholder="What's on your mind?" 
                        name="postText"
                        value={formState.postText} 
                        onChange={handleChange} 
                        required 
                    />
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
                        onClick={handleClick}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                    {error && <Alert color="red" dismissible>{error.message}</Alert>}
                </form>
            </CardBody>
        </Card>
        </>
    );
}