import { useQuery } from '@apollo/client';
import PostList from '../components/PostList';
import { QUERY_POSTS } from '../utils/queries';

const Posts = () => {
    // get all posts (array of posts)
    const { loading, data } = useQuery(QUERY_POSTS);
    // if data return from query is falsy posts = empty array
    const posts = data?.posts || []

    return (
        <div className="container">

            <div className="posts-card">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <PostList
                            posts={posts}
                            title="Recent Posts..."
                        />
                    )}
            </div>

        </div>
    )
}

export default Posts
  