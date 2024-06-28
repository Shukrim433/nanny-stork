import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../utils/mutations';
import { Button, Input, Textarea, Card, CardBody, Alert } from '@material-tailwind/react';

export default function NewPost() {
    const [postText, setPostText] = useState('');
    const [addPost, { loading, error }] = useMutation(ADD_POST);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPost({ variables: { postText } });
            setPostText(''); // Clear the textarea after successful post submission
        } catch (err) {
            console.error("Error adding post:", err);
        }
    };

    return (
        <Card>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <Textarea 
                        color="lightBlue" 
                        size="regular" 
                        outline={true} 
                        placeholder="What's on your mind?" 
                        value={postText} 
                        onChange={(e) => setPostText(e.target.value)} 
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
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                    {error && <Alert color="red" dismissible>{error.message}</Alert>}
                </form>
            </CardBody>
        </Card>
    );
}