import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { NotificationProvider } from './NotificationContext';
import { ModalProvider } from './ModalContext';
import { GlobalDataProvider } from './GlobalDataContext';

export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ModalProvider>
          <GlobalDataProvider>
            {children}
          </GlobalDataProvider>
        </ModalProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default AppProviders;
