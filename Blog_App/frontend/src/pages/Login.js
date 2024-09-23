import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] =useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      // console.log(email,password);
      navigate('/');
    } catch (err) {
      // console.error(err);
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message); // Set the error message from the server
      } else {
        console.error(err);
        setError('An error occurred while login.');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
    {/* Display error message if exists */}
    {error && <div className="text-red-500 mb-4">{error}</div>}
      <h1 className="text-3xl font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)
          }
          className="border border-gray-300 rounded p-2 w-full mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
