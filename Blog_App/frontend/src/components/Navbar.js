import React ,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  // Trigger a re-render when the user changes
  useEffect(() => {
    console.log('Navbar user state updated:', user);
  }, [user]); 

  return (
    <nav className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white text-xl font-bold ">Byte Blog</Link>
        
        <div>
          {user ? (
            <>
              <span className="text-white mr-4 font-bold">Welcome {user.username}</span>
              <Link to="/create" className="text-white mr-4">Create Post</Link>
              <button onClick={logout} className="text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
