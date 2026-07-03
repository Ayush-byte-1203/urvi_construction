import React, { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/layout/Footer';
import AnnouncementBar from '../../components/navigation/AnnouncementBar';
import ScrollProgress from '../../components/navigation/ScrollProgress';
import FloatingButtons from '../../components/navigation/FloatingButtons';
import ScrollToTop from '../../components/navigation/ScrollToTop';
import CookieConsent from '../../components/common/CookieConsent';

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children ?? <Outlet />}</>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" style={{ flexGrow: 1, width: '100%' }}>
        {children ?? <Outlet />}
      </main>
      <FloatingButtons />
      <ScrollToTop />
      <CookieConsent />
      <Footer />
    </div>
  );
};

export default Layout;


