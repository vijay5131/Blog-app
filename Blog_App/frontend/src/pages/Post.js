import React, { useEffect, useState } from 'react';
import { useParams ,Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth(); // Get the current user from AuthContext
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      });
      alert('Post deleted successfully');
      navigate('/'); // Redirect to homepage or any other route after deletion
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred while deleting the post');
      }
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
    {error && <div className="text-blue-500 mb-4">{error}</div>}
      <h1 className="text-4xl text-black-500 font-bold mt-4 mx-10">{post.title}</h1>
      <h3 className="text-2xl text-blue-500 font-bold indent-4 mt-4 mx-10">{post.summary}</h3>
      <div className="text-gray-800 mt-4 leading-loose text-balance indent-8 mx-10" style={{ whiteSpace: 'pre-wrap', fontFamily: 'roboto' }}>{post.content}</div>
      <div>
      <small className="text-blue-400 mt-4 mx-10">Published on {new Date(post.createdAt).toLocaleDateString()}</small>
      </div><div>
      <small className="text-pink-400 mt-4 mx-10">Auther {post.author.username}</small>
      {user && user.username === post.author.username && (
      <div className="mt-4 mb-10">
      <Link to={`/edit/${post._id}`} className="text-blue-500 mx-12">Edit</Link>
      <button onClick={handleDelete} className="text-red-500 mx-12">Delete</button>
      </div>
      )}
      </div>
    </div>
  );
};

export default Post;
