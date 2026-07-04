import React, { useEffect, useState, createContext } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/layout/Footer';
import AnnouncementBar from '../../components/navigation/AnnouncementBar';
import CookieConsent from '../../components/common/CookieConsent';

export const HeaderThemeContext = createContext({
  headerTheme: 'dark',
  setHeaderTheme: () => {}
});

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const [headerTheme, setHeaderTheme] = useState('dark'); // 'dark' | 'light' | 'none'

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

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <AnnouncementBar />
        <Navbar theme={headerTheme} />
        <main id="main-content" style={{ flexGrow: 1, width: '100%' }}>
          {children ?? <Outlet />}
        </main>
        <CookieConsent />
        <Footer />
      </div>
    </HeaderThemeContext.Provider>
  );
};

export default Layout;



