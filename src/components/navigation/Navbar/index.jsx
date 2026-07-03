import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, Search, Phone, ArrowRight, ChevronDown, Clock } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { appConfig } from '../../../config/appConfig';
import { ROUTES } from '../../../constants/routes';
import { useScrollDirection } from '../../../hooks/useScrollDirection';
import Logo from '../Logo';
import MegaMenu from '../MegaMenu';
import MobileMenu from '../MobileMenu';
import SearchModal from '../SearchModal';
import CitySelector from '../../common/CitySelector';
import styles from './styles.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeMegaItem, setActiveMegaItem] = useState(null);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'vadodara');
  
  const location = useLocation();
  const scrollDirection = useScrollDirection();

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
    setIsSearchOpen(false);
  }, [location]);

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    window.dispatchEvent(new Event('cityChanged'));
  };

  const navItems = [
    { name: 'Home', path: ROUTES.HOME, key: 'home' },
    { name: 'About', path: ROUTES.ABOUT, key: 'about' },
    { name: 'Services', path: ROUTES.SERVICES, key: 'services' },
    { name: 'Packages', path: ROUTES.PACKAGES, key: 'packages' },
    { name: 'Projects', path: ROUTES.PROJECTS, key: 'projects' },
    { name: 'Process', path: ROUTES.PROCESS, key: 'process' },
    { name: 'Knowledge', path: ROUTES.BLOG, key: 'blog' },
    { name: 'FAQ', path: ROUTES.FAQ, key: 'faq' },
    { name: 'Careers', path: ROUTES.CAREERS, key: 'careers' },
    { name: 'Contact', path: ROUTES.CONTACT, key: 'contact' }
  ];

  // Determine header visibility classes based on scroll direction
  const getHeaderClass = () => {
    let classes = `${styles.header} `;
    if (isScrolled) classes += `${styles.headerScrolled} `;
    if (scrollDirection === 'down' && isScrolled) {
      classes += `${styles.headerHidden} `;
    }
    return classes;
  };

  return (
    <>
      <header 
        className={getHeaderClass()} 
        onMouseLeave={() => setActiveMegaItem(null)}
      >
        <div className={`container ${styles.headerContainer}`}>
          {/* LEFT: Brand Logo */}
          <Logo onClick={() => { setIsMobileOpen(false); setActiveMegaItem(null); }} />

          {/* CENTER: Navigation Links */}
          <nav className={styles.desktopNav} role="navigation" aria-label="Main Navigation">
            {navItems.map((item) => (
              <div 
                key={item.key} 
                className={styles.navItemWrapper}
                onMouseEnter={() => setActiveMegaItem(item.key)}
              >
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  end={item.path === '/'}
                >
                  <span className={styles.navLinkText}>{item.name}</span>
                  <ChevronDown size={10} className={styles.navChevron} />
                </NavLink>
              </div>
            ))}
          </nav>

          {/* RIGHT: Actions row */}
          <div className={styles.actions}>
            {/* Search Trigger */}
            <button 
              className={styles.actionButton}
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open Site Search"
            >
              <Search size={18} />
            </button>

            {/* City Selector */}
            <div className={styles.citySelectorWrapper}>
              <CitySelector selectedCityId={selectedCity} onChangeCity={handleCityChange} />
            </div>

            {/* Compact Phone Widget */}
            <div className={styles.phoneWidget}>
              <a 
                href={appConfig.company.phoneFormatted}
                className={styles.phoneLink}
                aria-label={`Call BuildCraft at ${appConfig.company.phone}`}
              >
                <div className={styles.phoneIconCircle}>
                  <Phone size={13} />
                </div>
                <div className={styles.phoneTexts}>
                  <span className={styles.phoneNum}>{appConfig.company.phone}</span>
                  <span className={styles.phoneHours}>
                    <Clock size={8} style={{ marginRight: '2px' }} /> {appConfig.company.businessHours}
                  </span>
                </div>
              </a>
            </div>

            {/* Primary CTA */}
            <Link 
              to={ROUTES.CONTACT}
              className={`btn btn-primary ${styles.btnNav}`}
            >
              Get Free Quote
              <ArrowRight size={13} style={{ marginLeft: '4px' }} />
            </Link>

            {/* Hamburger Toggle */}
            <button 
              className={styles.menuToggle}
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

      {/* Fullscreen Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
};

export default Navbar;
