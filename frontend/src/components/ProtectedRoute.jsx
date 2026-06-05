import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, fallback = null }) => {
  const { isAuthenticated, authReady } = useAuth();

  if (!authReady) {
    return <div className="loadingstate">Loading...</div>;
  }

  if (!isAuthenticated) {
    if (fallback) return fallback;
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
