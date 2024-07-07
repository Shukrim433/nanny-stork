import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const PostForm = () => {
  // holds post form state
  const [postText, setPostText] = useState("");

  //holds character count state
  const [characterCount, setCharacterCount] = useState(0);

  // ADD_POST and QUERY_ME mutations
  const [addPost, { error }] = useMutation(ADD_POST, {
    refetchQueries: [
      // refetches all posts to include created post
      QUERY_POSTS,
      "getPosts",
      QUERY_ME,
      "me",
    ],
  });

  // OnSubmit create Post, using ADD_POST and postText state
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addPost({
        variables: {
          postText,
          postAuthor: Auth.getProfile().authenticatedPerson.username,
        },
      });

      // clear/reset postText state
      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  // OnChange update the characterCount to the length of the value being input into postText (function executed every time a character is added )
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 280) {
      setPostText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className="post-form-container">
      <h3>Create Blog Post!</h3>
      {/*check if user is logged in, if yes, show post form*/}
      {Auth.loggedIn() ? (
        <div className="post-form-card">
          <p className="post-character-count">{characterCount}/280</p>
          <form onSubmit={handleFormSubmit}>
            <div className="post-form-card-body">
              <textarea
                name="postText"
                placeholder="enter post here..."
                value={thoughtText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="post-form-btn-container">
              <button className="btn " type="submit">
                Post
              </button>
            </div>
          </form>
        </div>
      ) : (
        // else if youre not logged in you see this message
        <p>
          You need to be logged in to create a post. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default PostForm;
