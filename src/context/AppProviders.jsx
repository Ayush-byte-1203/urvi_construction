import React from 'react';
import { GlobalDataProvider } from './GlobalDataContext';

const AppProviders = ({ children }) => {
  return (
    <GlobalDataProvider>
      {children}
    </GlobalDataProvider>
  );
};

export default AppProviders;
