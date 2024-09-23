import React from 'react';
import { BrowserRouter as router , Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import CreateEditPost from './pages/CreateEditPost';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div>
    <router>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/create" element={<CreateEditPost />} />
        <Route path="/edit/:id" element={<CreateEditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </router>
    </div>
  );
}

export default App;

