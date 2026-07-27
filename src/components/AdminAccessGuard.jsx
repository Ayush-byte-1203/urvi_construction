import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminAccessGuard = ({ children }) => {
  const isUnlocked = sessionStorage.getItem('admin_access_unlocked') === 'true';

  if (!isUnlocked) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminAccessGuard;
