import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if a user is logged in by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .get('http://localhost:5000/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login user and store token in localStorage
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      const {token,user} =response.data;
      localStorage.setItem('authToken', token);
      setUser(user);
      navigate('/');
      window.location.reload();
      
    } catch (error) {
      throw new Error('Login failed');
      
    }
  };

  // Register user and store token in localStorage
  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('authToken', response.data.token);
      setUser(response.data.user);
      navigate('/');
      window.location.reload();
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  // Logout user by removing token from localStorage
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  // Authentication state and functions
  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
