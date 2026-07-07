import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { ModalProvider } from '@/context/ModalContext';

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
