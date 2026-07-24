import React, { useEffect, useState, createContext } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import QuotePopup from './QuotePopup';
import LoadingSpinner from './LoadingSpinner';
import { useGlobalData } from '../context/GlobalDataContext';


import FloatingWhatsApp from './FloatingWhatsApp';

export const HeaderThemeContext = createContext({
  headerTheme: 'dark',
  setHeaderTheme: () => {}
});

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const [headerTheme, setHeaderTheme] = useState('dark'); // 'dark' | 'light' | 'none'
  const { isLoading } = useGlobalData();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    // Default theme state reset on page navigation
    setHeaderTheme('dark');
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children ?? <Outlet />}</>;
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-primary, #ffffff)' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AnnouncementBar />
        <Navbar theme={headerTheme} />
        <main id="main-content" style={{ flexGrow: 1, width: '100%' }}>
          {children ?? <Outlet />}
        </main>
        <Footer />
        <QuotePopup />
        <FloatingWhatsApp />
      </div>
    </HeaderThemeContext.Provider>
  );
};

export default Layout;




