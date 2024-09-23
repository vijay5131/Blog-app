import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import { useAuth } from '../context/AuthContext';

const CreateEditPost = () => {
  const { id } = useParams();
  // const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  // Fetch post data if we're editing (id is present)
  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/posts/${id}`);
          const post = response.data;
          setTitle(post.title); // Set title to the existing post title
          setSummary(post.summary); // Set summary to the existing post summary
          setContent(post.content); // Set content to the existing post content
        } catch (err) {
          console.error('Failed to fetch the post:', err);
        }
      };

      fetchPost();
    }
  }, [id]); // Run this effect only when the `id` changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, summary, content };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/posts/${id}`, newPost , {
            
            headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        // console.log("edit");
        
      } else {
        // console.log("new 1");
        await axios.post('http://localhost:5000/posts', newPost, {
            
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });
        // console.log("new 2");
        
      }
      navigate('/');
    } catch (err) {
      // Handle unauthorized (401) errors
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message); // Set the error message from the server
      } else {
        console.error(err);
        setError('An error occurred while submitting the post.');
      }
    }
    console.log("createpost");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{id ? 'Edit Post' : 'Create Post'}</h1>
      {/* Display error message if exists */}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <textarea
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {id ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreateEditPost;
