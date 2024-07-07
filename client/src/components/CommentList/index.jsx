import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import Auth from "../../utils/auth";
// comments = [] is a default value - if the comments prop is not provided or is undefined when the CommentList component is called,
// comments will default to an empty array [].

const CommentList = ({ comments = [], post }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div>
      <h2>Comments:</h2>
      <div>
        {comments &&
          comments.map((comment) => (
            <div className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 w-full mb-1 ">
              <div>
                <p className="font-bold underline">
                  {Auth.loggedIn() ? (
                    <Link
                      to={
                        comment.commentAuthor ===
                        Auth.getProfile().authenticatedPerson.username
                          ? `/me`
                          : `/profiles/${comment.commentAuthor}`
                      }
                    >
                      {comment.commentAuthor}
                    </Link>
                  ) : (
                    <Link to={`/profiles/${comment.commentAuthor}`}>
                      {comment.commentAuthor}
                    </Link>
                  )}
                </p>
                <p>{comment.commentText}</p>
              </div>
              <div className="flex flex-col items-end">
                <span>
                  {" "}
                  <ReactTimeAgo
                    date={new Date(parseInt(comment.createdAt))}
                    locale="en-US"
                  />{" "}
                </span>
                <div
                  style={{ backgroundColor: "#f5f5f5" }}
                  className="post-heading-line w-full h-[2px] mb-4"
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
