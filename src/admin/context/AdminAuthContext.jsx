import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const isLoginRequest = error.config && error.config.url && error.config.url.includes('/api/admin/token/');
        if (error.response && error.response.status === 401 && !isLoginRequest) {
          // Token expired or invalid
          setToken(null);
          setUser(null);
          localStorage.removeItem('adminToken');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/admin/token/', { username: email, password });
      const { access } = response.data;
      setToken(access);
      localStorage.setItem('adminToken', access);
      setUser({ email });
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
};
