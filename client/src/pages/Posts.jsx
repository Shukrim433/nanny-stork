import { useQuery } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import { QUERY_POSTS, SEARCH_POSTS } from '../utils/queries';
import { Button, Input } from '@material-tailwind/react';

const Posts = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchedPosts, setSearchedPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
    /* const { loading: searchLoading, error: searchError, data: searchData } = useQuery(SEARCH_POSTS, {
        variables: {query: searchTerm},
        skip: searchTerm === ''
    }) */

    const [getSearchResults, { loading: searchLoading, error: searchError, data: searchData }] = useLazyQuery(SEARCH_POSTS);

    

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        try {
            await getSearchResults( {variables: { query: searchTerm}})
            setLoading(false)
            setError(null)
        } catch(error) {
            setLoading(false)
            setError(error.message)
        }
    }
    
    const handleChange = (event) => {
        setSearchTerm(event.target.value)
    };
    // get all posts (array of posts)
    const { loading: postsLoading, error: postsError, data: postsData } = useQuery(QUERY_POSTS);
    // if data return from query is falsy posts = empty array
   // const posts = searchTerm ? (searchData?.searchPosts || []) : (postsData?.posts || [])
   const posts = postsData?.posts || []

   // set searchedPosts state whenever data returned by SEARCH_POSTS query changes
    useEffect(() => {
    if(searchData?.searchPosts) {
        console.log(searchData)
        setSearchedPosts(searchData.searchPosts)
        
    }
   }, [searchData]) 

   return (
    <div className="page-div">
        <div className="search-div flex justify-center items-center my-4">
            <form onSubmit={handleSubmit} className="flex">
            <div className="relative flex w-full max-w-[24rem]">
  <Input
    type="search"
    label="search for posts..."
    value={searchTerm}
    onChange={handleChange}
    placeholder="Search for posts..."
    className="pr-20"
    containerProps={{
      className: "min-w-0",
    }}
  />
  <Button
    type="submit"
    color={searchTerm ? "gray" : "blue-gray"}
    disabled={!searchTerm}
    className="!absolute right-1 top-1 rounded"
    size="sm"
    ripple={true}
  >
    Search
  </Button>
</div>
            </form>
        </div>
        <div className="container w-100">
            <div className="posts-card w-100">
                {loading || searchLoading ? (
                    <div>Loading...</div>
                ) : error || searchError ? (
                    <div>Error: {error || searchError}</div>
                ) : (
                    <PostList
                        posts={searchTerm ? searchedPosts : posts}
                        title={searchTerm ? "Search Results" : "Recent Posts..."}
                    />
                )}
            </div>
        </div>
    </div>
)
}

export default Posts 
  

