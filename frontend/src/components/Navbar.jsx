import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/feed" className="brand">
          <span className="brand__dot" />
          Mini Social
        </Link>

        <nav className="navbar__actions">
          <Link to="/feed" className="navlink">
            Feed
          </Link>
          {isAuthenticated ? (
            <>
              <span className="userchip">Hi, {user?.name}</span>
              <button className="btn btn--ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
