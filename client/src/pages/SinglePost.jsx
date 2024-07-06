import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { QUERY_SINGLE_POST } from '../utils/queries';
import ReactTimeAgo from 'react-time-ago';
import Auth from '../utils/auth';
import QuoteContainer from '../components/quote-container';
import Footer from '../components/Footer';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../utils/ThemeContext';

const SinglePost = () => {
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId }
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  const { pinkTheme } = useTheme();
  const themeStyles = pinkTheme
    ? { background: '#f48fb1', transitionProperty: 'background-color', transitionDuration: '300ms' }
    : { background: '#90caf9', transitionProperty: 'background-color', transitionDuration: '300ms' };

  return (
    <>
      <QuoteContainer />
      {Auth.loggedIn() ? (
        <div className='post-container flex items-center justify-center w-full'>
          <div className="single-post-card">
            <h2 className='post-title'>{post.postTitle}</h2>
            <div style={themeStyles} className="post-heading-line w-full h-[2px] my-4"></div>
            <div className='whitespace-pre-wrap'>
              <ReactMarkdown>{post.postText}</ReactMarkdown>
            </div>
            <div className='post-bottom flex flex-col items-end'>
              <p className="font-bold underline">
                <Link to={post.postAuthor === Auth.getProfile().authenticatedPerson.username ? `/me` : `/profiles/${post.postAuthor}`}>
                  {post.postAuthor}
                </Link>
              </p>
              <p> posted <ReactTimeAgo date={new Date(parseInt(post.createdAt))} locale="en-US" /></p>
              <div style={themeStyles} className="post-heading-line w-full h-[2px] my-4"></div>
            </div>
            <CommentList comments={post.comments} post={post} />
            <CommentForm postId={post._id} />
          </div>
        </div>
      ) : (
        <div className='post-container flex items-center justify-center w-full'>
          <div className="single-post-card">
            <h2 className='post-title'>{post.postTitle}</h2>
            <div style={themeStyles} className="post-heading-line w-full h-[2px] my-4"></div>
            <div className='whitespace-pre-wrap'>
              <ReactMarkdown>{post.postText}</ReactMarkdown>
            </div>
            <div className='post-bottom flex flex-col items-end'>
              <p className="font-bold underline">
                <Link to={`/profiles/${post.postAuthor}`}>
                  {post.postAuthor}
                </Link>
              </p>
              <p> posted <ReactTimeAgo date={new Date(parseInt(post.createdAt))} locale="en-US" /></p>
              <div style={themeStyles} className="post-heading-line w-full h-[2px] my-4"></div>
            </div>
            <CommentList comments={post.comments} post={post} />
            <CommentForm postId={post._id} />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default SinglePost;