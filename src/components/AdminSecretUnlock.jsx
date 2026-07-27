import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSecretUnlock = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('admin_access_unlocked', 'true');
    navigate('/admin', { replace: true });
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      fontFamily: 'sans-serif'
    }}>
      Redirecting to Admin Portal...
    </div>
  );
};

export default AdminSecretUnlock;
