import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="bg-red shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-black-600">{post.summary}</p>
      <div>
      <small className="text-yellow-400">Published on {new Date(post.createdAt).toLocaleDateString()}</small>
      </div><div>
      <small className="text-yellow-400">Auther {post.author.username}</small>
      </div>
      <div className="mt-4">
        <Link to={`/posts/${post._id}`} className="text-blue-500">Read more</Link>
      </div>
    </div>
  );
};

export default PostCard;
