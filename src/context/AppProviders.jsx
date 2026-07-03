import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { NotificationProvider } from './NotificationContext';
import { ModalProvider } from './ModalContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
