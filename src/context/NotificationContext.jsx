import React, { createContext, useState, useContext, useCallback } from 'react';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const NotificationContext = createContext({
  showNotification: () => {},
  hideNotification: () => {}
});

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const hideNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now().toString();
    const newNotification = { id, message, type, duration };
    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      hideNotification(id);
    }, duration);
  }, [hideNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}

      {/* Global Notifications Container UI Overlay */}
      <div 
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 300, // Matching THEME.zIndex.notification
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '380px',
          width: '100%'
        }}
      >
        {notifications.map((n) => {
          let bg = 'rgba(18, 19, 22, 0.95)';
          let border = '1px solid var(--border)';
          let icon = <Info size={18} style={{ color: 'var(--accent)' }} />;

          if (n.type === 'success') {
            border = '1px solid rgba(75, 181, 67, 0.4)';
            icon = <CheckCircle size={18} style={{ color: '#4BB543' }} />;
          } else if (n.type === 'error') {
            border = '1px solid rgba(255, 51, 51, 0.4)';
            icon = <AlertCircle size={18} style={{ color: '#FF3333' }} />;
          }

          return (
            <div 
              key={n.id}
              className="glass-panel anim-fade-in"
              style={{
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: bg,
                border: border,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                boxShadow: 'var(--shadow-md)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {icon}
                <span>{n.message}</span>
              </div>
              <button 
                onClick={() => hideNotification(n.id)}
                style={{ color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                aria-label="Dismiss Notification"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
export default NotificationContext;
