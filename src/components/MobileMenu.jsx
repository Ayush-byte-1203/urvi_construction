import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { ROUTES } from '../data/routes';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './MobileMenu.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const [servicesOpen, setServicesOpen] = useState(false);
  const { services } = useGlobalData();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navItems = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'About Us', path: ROUTES.ABOUT },
    { name: 'Packages', path: ROUTES.PACKAGES },
    { name: 'Services', path: ROUTES.SERVICES, hasChildren: true },
    { name: 'Completed Projects', path: ROUTES.PROJECTS },
    { name: 'Blog', path: ROUTES.BLOG }
  ];

  const servicesList = (services || []).map(s => ({
    name: s.title,
    path: `/services/${s.slug || s.id}`
  }));

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
        onClick={onClose}
      />

      {/* Slide-in drawer container */}
      <div id="mobile-menu" className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <span className={styles.menuLabel}>Navigation Menu</span>
          <button 
            className={styles.closeButton} 
            onClick={onClose} 
            aria-label="Close Mobile Navigation Drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className={styles.navList} role="navigation">
          {navItems.map((link) => (
            <React.Fragment key={link.path}>
              {link.hasChildren ? (
                <div className={styles.navAccordionWrapper}>
                  <div
                    className={`${styles.navLink} ${servicesOpen ? styles.navLinkActive : ''}`}
                    onClick={() => setServicesOpen(!servicesOpen)}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className={`${styles.chevron} ${servicesOpen ? styles.chevronOpen : ''}`} style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </div>
                  {servicesOpen && (
                    <div className={styles.accordionContent}>
                      <NavLink
                        to={link.path}
                        className={({ isActive }) => `${styles.subNavLink} ${isActive ? styles.subNavLinkActive : ''}`}
                        onClick={onClose}
                      >
                        Overview
                      </NavLink>
                      {servicesList.map((service, idx) => (
                        <NavLink
                          key={idx}
                          to={service.path}
                          className={({ isActive }) => `${styles.subNavLink} ${isActive ? styles.subNavLinkActive : ''}`}
                          onClick={onClose}
                        >
                          {service.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) => 
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  onClick={onClose}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={14} className={styles.chevron} />
                </NavLink>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Contact Info and primary actions */}
        <div className={styles.drawerFooter}>
          
          <Link 
            to={ROUTES.CONTACT}
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', padding: '0.85rem' }}
            onClick={onClose}
          >
            Get Free Quote
          </Link>

          {/* Contact Button */}
          <Link 
            to={ROUTES.CONTACT}
            className="btn btn-secondary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0.85rem' }}
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;

