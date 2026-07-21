import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useAdminAuth();
  if (loading) return <div>Loading...</div>;
  return token ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
