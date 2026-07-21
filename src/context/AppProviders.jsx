import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GlobalDataProvider } from './GlobalDataContext';

const AppProviders = ({ children }) => {
  return (
    <HelmetProvider>
      <GlobalDataProvider>
        {children}
      </GlobalDataProvider>
    </HelmetProvider>
  );
};

export default AppProviders;
