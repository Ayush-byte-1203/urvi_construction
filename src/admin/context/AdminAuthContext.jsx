import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../services/api';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Determine the base domain from API_URL by removing /api at the end
    const baseURL = API_URL.replace(/\/api\/?$/, '');
    
    // Add request interceptor to prepend the correct backend base URL
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (config.url && config.url.startsWith('/api')) {
        config.baseURL = baseURL;
      }
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
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
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const fetchCurrentUser = async (currentToken) => {
    try {
      setLoading(true);
      const res = await axios.get('/api/me/', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user permissions', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/admin/token/', { username: email, password });
      const { access } = response.data;
      setToken(access);
      localStorage.setItem('adminToken', access);
      await fetchCurrentUser(access);
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
    sessionStorage.removeItem('admin_access_unlocked');
    window.location.href = '/';
  };

  const hasPermission = (moduleKey, action = 'view') => {
    if (!token) return false;
    if (!user) return true; // Fallback while loading
    if (user.is_superuser) return true;
    if (!user.permissions) return false;
    const mod = user.permissions[moduleKey];
    if (!mod) return false;
    return Boolean(mod[action]);
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout, loading, hasPermission }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return context;
};
