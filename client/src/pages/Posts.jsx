import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import PostList from '../components/PostList';
import { QUERY_POSTS, SEARCH_POSTS } from '../utils/queries';

const Posts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { loading: searchLoading, error: searchError, data: searchData } = useQuery(SEARCH_POSTS, {
        variables: {query: searchTerm},
        skip: searchTerm === ''
    })
    const searchedPosts = searchData?.posts || []

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };
    // get all posts (array of posts)
    const { loading, data } = useQuery(QUERY_POSTS);
    // if data return from query is falsy posts = empty array
    const posts = data?.posts || []

    return (
        <div className="page-div">
            <div className="search-div">
                <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for posts..."
                />
            </div>
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
        </div>
    )
}

export default Posts
  