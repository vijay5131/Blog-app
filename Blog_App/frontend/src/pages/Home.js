import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);
// ///
  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
    
  );
};

export default Home;
