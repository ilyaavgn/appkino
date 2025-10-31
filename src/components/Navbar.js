import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      {user && (
        <Link to="/favorites" style={{ marginLeft: '1rem' }}>
          Favorites
        </Link>
      )}
      {/* Subscription link removed */}
      {!user && (
        <>
          <Link to="/login" style={{ marginLeft: '1rem' }}>
            Login
          </Link>
          <Link to="/register" style={{ marginLeft: '1rem' }}>
            Register
          </Link>
        </>
      )}
      {user && (
        <button onClick={logout} style={{ marginLeft: '1rem' }}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
