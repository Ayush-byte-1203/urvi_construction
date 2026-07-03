import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, ChevronRight, Phone, Mail, Clock, Globe, Share2, Send, MapPin, MessageSquare } from 'lucide-react';
import { appConfig } from '../../../config/appConfig';
import { ROUTES } from '../../../constants/routes';
import CitySelector from '../../common/CitySelector';
import styles from './styles.module.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'vadodara');

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

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    window.dispatchEvent(new Event('cityChanged'));
  };

  const navItems = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'About Us', path: ROUTES.ABOUT },
    { name: 'Services', path: ROUTES.SERVICES },
    { name: 'Construction Packages', path: ROUTES.PACKAGES },
    { name: 'Completed Projects', path: ROUTES.PROJECTS },
    { name: 'Build Process', path: ROUTES.PROCESS },
    { name: 'Knowledge Center', path: ROUTES.BLOG },
    { name: 'FAQ Queries', path: ROUTES.FAQ },
    { name: 'Careers Desk', path: ROUTES.CAREERS },
    { name: 'Contact Us', path: ROUTES.CONTACT }
  ];

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`} 
        onClick={onClose}
      />

      {/* Slide-in drawer container */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
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

        {/* City Selector */}
        <div className={styles.citySelectorContainer}>
          <span className={styles.sectionLabel}>Active City Location</span>
          <CitySelector selectedCityId={selectedCity} onChangeCity={handleCityChange} />
        </div>

        {/* Navigation list */}
        <nav className={styles.navList} role="navigation">
          {navItems.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
              onClick={onClose}
            >
              <span>{link.name}</span>
              <ChevronRight size={14} className={styles.chevron} />
            </NavLink>
          ))}
        </nav>

        {/* Contact Info and Social links */}
        <div className={styles.drawerFooter}>
          {/* Phone call widget */}
          <a 
            href={appConfig.company.phoneFormatted}
            className={styles.phoneBadge}
            aria-label={`Call BuildCraft at ${appConfig.company.phone}`}
          >
            <div className={styles.phoneIcon}>
              <Phone size={14} />
            </div>
            <div>
              <span className={styles.phoneText}>{appConfig.company.phone}</span>
              <span className={styles.phoneLabel}>Working Shifts: {appConfig.company.businessHours}</span>
            </div>
          </a>

          {/* Quick links & Address */}
          <div className={styles.footerDetails}>
            <div className={styles.footerItem}>
              <Mail size={12} style={{ color: 'var(--accent)' }} />
              <a href={appConfig.company.emailLink}>{appConfig.company.email}</a>
            </div>
            <div className={styles.footerItem}>
              <MapPin size={12} style={{ color: 'var(--accent)' }} />
              <span>{appConfig.company.address}</span>
            </div>
          </div>

          {/* Primary CTA button */}
          <Link 
            to={ROUTES.CONTACT}
            className="btn btn-primary"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.75rem' }}
            onClick={onClose}
          >
            Get Free Quote
          </Link>

          {/* Social Links Row */}
          <div className={styles.socials}>
            <a href={appConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook Page"><Globe size={16} /></a>
            <a href={appConfig.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter Profile"><MessageSquare size={16} /></a>
            <a href={appConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Profile"><Share2 size={16} /></a>
            <a href={appConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"><Send size={16} /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
