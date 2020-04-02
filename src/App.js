import React, { useState, useEffect} from 'react';
import Posts from './componenets/Posts';
import Pagination from './componenets/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] =useState([]);
  const [loading, setLoading] = useState([false]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage ] = useState(10);

  useEffect(() => {
     const fetchPosts = async () => {
       setLoading(true);
       const res = await axios.get('http://jsonplaceholder.typicode.com/posts');
       setPosts(res.data);
       setLoading(false);
     }

     fetchPosts();
  }, [])

  // Get current posts
  const indexOfLastPosts = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPosts - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPosts)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(posts)
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My blog</h1>
      <Posts posts={currentPosts} loading={loading}/>
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>
    </div>
  );
}

export default App;
