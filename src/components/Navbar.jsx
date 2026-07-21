import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, ArrowRight } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { ROUTES } from '../data/routes';
import Logo from './Logo';
import MegaMenu from './MegaMenu';
import MobileMenu from './MobileMenu';
import styles from './Navbar.module.css';

const Navbar = ({ theme = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaItem, setActiveMegaItem] = useState(null);
  
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMegaItem(null);
  }, [location]);

  const navItems = [
    { name: 'Home', path: ROUTES.HOME, key: 'home' },
    { name: 'About', path: ROUTES.ABOUT, key: 'about' },
    { name: 'Services', path: ROUTES.SERVICES, key: 'services' },
    { name: 'Projects', path: ROUTES.PROJECTS, key: 'projects' },
    { name: 'Blog', path: ROUTES.BLOG, key: 'blog' },
    { name: 'Contact', path: ROUTES.CONTACT, key: 'contact' }
  ];

  // Determine header visibility classes based on scroll state and active theme
  const getHeaderClass = () => {
    let classes = `${styles.header} `;
    if (theme === 'none' || isScrolled) {
      classes += `${styles.headerScrolled} `;
    } else if (theme === 'light') {
      classes += `${styles.headerTransparentLight} `;
    } else {
      classes += `${styles.headerTransparentDark} `;
    }
    return classes;
  };

  const logoTheme = (theme === 'none' || isScrolled || theme === 'light') ? 'light' : 'dark';

  return (
    <>
      <header 
        className={getHeaderClass()} 
        onMouseLeave={() => setActiveMegaItem(null)}
      >
        <div className={`container ${styles.headerContainer}`}>
          {/* LEFT: Brand Logo */}
          <Logo theme={logoTheme} onClick={() => { setIsMobileOpen(false); setActiveMegaItem(null); }} />

          {/* CENTER: Navigation Links */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main Navigation">
            {navItems.map((item) => (
              <div 
                key={item.key} 
                className={styles.navItemWrapper}
                onMouseEnter={() => {
                  if (item.key !== 'home') {
                    setActiveMegaItem(item.key);
                  } else {
                    setActiveMegaItem(null);
                  }
                }}
              >
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  end={item.path === '/'}
                >
                  <span className={styles.navLinkText}>{item.name}</span>
                </NavLink>
              </div>
            ))}
          </nav>

          {/* RIGHT: Actions row */}
          <div className={styles.actions}>
            
            <Link 
              to={ROUTES.CONTACT}
              className={`btn btn-primary ${styles.btnNav}`}
            >
              Get Free Quote
              <ArrowRight size={13} style={{ marginLeft: '4px' }} />
            </Link>

            {/* Hamburger Toggle */}
            <button 
              className={styles.menuToggle} aria-expanded={isMobileOpen} aria-controls="mobile-menu"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Navigation Drawer"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Hover Mega Menu Overlay */}
        <AnimatePresence>
          {activeMegaItem && (
            <MegaMenu 
              activeItem={activeMegaItem}
              isOpen={!!activeMegaItem} 
              onClose={() => setActiveMegaItem(null)} 
            />
          )}
        </AnimatePresence>
      </header>

      {/* Slide-in Mobile Drawer */}
      <MobileMenu 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
      />
    </>
  );
};

export default Navbar;

