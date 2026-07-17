import React from 'react';
import AppRouter from './AppRouter';
import ErrorBoundary from './components/ErrorBoundary';
import AppProviders from './context/AppProviders';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
