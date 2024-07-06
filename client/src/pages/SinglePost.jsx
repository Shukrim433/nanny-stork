import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { QUERY_SINGLE_POST } from "../utils/queries";
import ReactTimeAgo from "react-time-ago";
import Auth from "../utils/auth";
import QuoteContainer from "../components/quote-container";
import Footer from "../components/Footer";
import ReactMarkdown from "react-markdown";
import DeleteModal from "../components/DeleteModal";
import { useTheme } from "../utils/ThemeContext";

const SinglePost = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
     pollInterval: 500 
  });

  const post = data?.post || {};
  console.log(data, "comment polling");
  // Toggle the visibility of the delete post modal
  const handleButtonClick = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const { pinkTheme } = useTheme();
  const themeStyles = pinkTheme
    ? {
        background: "#f48fb1",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      }
    : {
        background: "#90caf9",
        transitionProperty: "background-color",
        transitionDuration: "300ms",
      };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <QuoteContainer />
      {Auth.loggedIn() ? (
        <div className="post-container flex items-center justify-center w-full">
          {showDeleteModal && <DeleteModal postId={post._id} />}
          <div className="single-post-card">
            <div className="flex justify-between">
            <h2 className="post-title">{post.postTitle}</h2>
            {post.postAuthor ===
              Auth.getProfile().authenticatedPerson.username && (
              <button onClick={handleButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            )}
            </div>
            <div
              style={themeStyles}
              className="post-heading-line w-full h-[2px] my-4"
            ></div>
            <div className="whitespace-pre-wrap">
              <ReactMarkdown>{post.postText}</ReactMarkdown>
            </div>
            <div className="post-bottom flex flex-col items-end">
              <p className="font-bold underline">
                <Link
                  to={
                    post.postAuthor ===
                    Auth.getProfile().authenticatedPerson.username
                      ? `/me`
                      : `/profiles/${post.postAuthor}`
                  }
                >
                  {post.postAuthor}
                </Link>
              </p>
              <p>
                {" "}
                posted{" "}
                <ReactTimeAgo
                  date={new Date(parseInt(post.createdAt))}
                  locale="en-US"
                />
              </p>
              <div
                style={themeStyles}
                className="post-heading-line w-full h-[2px] my-4"
              ></div>
            </div>
            <CommentList comments={post.comments} post={post} />
            <CommentForm postId={post._id} />
          </div>
        </div>
      ) : (
        <div className="post-container flex items-center justify-center w-full">
          <div className="single-post-card">
            <h2 className="post-title">{post.postTitle}</h2>
            <div
              style={themeStyles}
              className="post-heading-line w-full h-[2px] my-4"
            ></div>
            <div className="whitespace-pre-wrap">
              <ReactMarkdown>{post.postText}</ReactMarkdown>
            </div>
            <div className="post-bottom flex flex-col items-end">
              <p className="font-bold underline">
                <Link to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor}
                </Link>
              </p>
              <p>
                {" "}
                posted{" "}
                <ReactTimeAgo
                  date={new Date(parseInt(post.createdAt))}
                  locale="en-US"
                />
              </p>
              <div
                style={themeStyles}
                className="post-heading-line w-full h-[2px] my-4"
              ></div>
            </div>
            <CommentList comments={post.comments} post={post} />
            <CommentForm postId={post._id} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SinglePost;
