import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, ArrowRight, Phone, ChevronDown } from 'lucide-react';
import { ROUTES } from '../data/routes';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import CitySelector from './CitySelector';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './Navbar.module.css';

const Navbar = ({ theme = 'dark' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { services, siteSettings } = useGlobalData();
  
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
    setServicesOpen(false);
  }, [location]);

  const servicesList = (services || []).map(s => ({
    name: s.title,
    path: `/services/${s.slug || s.id}`
  }));

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
      <header className={getHeaderClass()}>
        <div className={`container ${styles.headerContainer}`}>
          {/* LEFT: Brand Logo */}
          <Logo theme={logoTheme} onClick={() => setIsMobileOpen(false)} />

          {/* CENTER: Navigation Links */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main Navigation">
            <div className={styles.navItemWrapper}>
              <NavLink to={ROUTES.HOME} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`} end>
                <span className={styles.navLinkText}>Home</span>
              </NavLink>
            </div>
            <div className={styles.navItemWrapper}>
              <NavLink to={ROUTES.ABOUT} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                <span className={styles.navLinkText}>About Us</span>
              </NavLink>
            </div>
            <div className={styles.navItemWrapper}>
              <NavLink to={ROUTES.PACKAGES} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                <span className={styles.navLinkText}>Package</span>
              </NavLink>
            </div>
            
            {/* SERVICES DROPDOWN */}
            <div 
              className={styles.navItemWrapper}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <NavLink to={ROUTES.SERVICES} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                <span className={styles.navLinkText} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Services <ChevronDown size={14} />
                </span>
              </NavLink>
              {servicesOpen && (
                <div className={styles.dropdownMenu}>
                  {servicesList.map((service, idx) => (
                    <Link key={idx} to={service.path} className={styles.dropdownItem}>
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.navItemWrapper}>
              <NavLink to={ROUTES.PROJECTS} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                <span className={styles.navLinkText}>Projects</span>
              </NavLink>
            </div>
            <div className={styles.navItemWrapper}>
              <NavLink to={ROUTES.BLOG} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                <span className={styles.navLinkText}>Blog</span>
              </NavLink>
            </div>
            <div className={styles.navItemWrapper}>
              <NavLink to={ROUTES.CONTACT} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}>
                <span className={styles.navLinkText}>Contact</span>
              </NavLink>
            </div>
          </nav>

          {/* RIGHT: Actions row */}
          <div className={styles.actions}>
            <div className={styles.desktopOnly}>
              <CitySelector />
            </div>

            <a href={`tel:${siteSettings?.contact_phone ? siteSettings.contact_phone.replace(/\D/g, '') : '919876543210'}`} className={styles.phoneCta}>
              <Phone size={16} />
              <span className={styles.desktopOnly}>{siteSettings?.contact_phone || '+91 98765 43210'}</span>
            </a>

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

