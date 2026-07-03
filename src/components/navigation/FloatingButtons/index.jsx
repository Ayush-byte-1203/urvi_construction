import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageSquare, Plus, X, Calculator, Calendar, ArrowUp } from 'lucide-react';
import { appConfig } from '../../../config/appConfig';
import { ROUTES } from '../../../constants/routes';
import styles from './styles.module.css';

const FloatingButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const scrollPercent = (window.scrollY / totalHeight) * 100;
        setIsVisible(scrollPercent >= 25);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const whatsappUrl = `https://wa.me/${appConfig.company.phoneFormatted.replace(/[^0-9]/g, '')}?text=Hi%20BuildCraft,%20I'd%20like%20to%20discuss%20a%20construction%20project.`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* DESKTOP: Expandable Floating Action Button Menu (bottom-right) */}
      <div className={styles.desktopContainer}>
        {isOpen && (
          <div className={styles.actionMenu}>
            {/* Scroll to Top */}
            <button 
              onClick={scrollToTop} 
              className={`${styles.actionItem} ${styles.top}`}
              title="Scroll to Top"
            >
              <ArrowUp size={16} />
            </button>

            {/* Request Quote */}
            <Link 
              to="/packages#wizard" 
              className={`${styles.actionItem} ${styles.calc}`}
              title="Quote Wizard"
              onClick={() => setIsOpen(false)}
            >
              <Calculator size={16} />
            </Link>

            {/* Book Consultation */}
            <Link 
              to="/contact" 
              className={`${styles.actionItem} ${styles.calendar}`}
              title="Book Consult"
              onClick={() => setIsOpen(false)}
            >
              <Calendar size={16} />
            </Link>

            {/* WhatsApp */}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.actionItem} ${styles.whatsapp}`}
              title="WhatsApp Chat"
            >
              <MessageSquare size={16} />
            </a>

            {/* Call */}
            <a 
              href={appConfig.company.phoneFormatted} 
              className={`${styles.actionItem} ${styles.phone}`}
              title="Call Helpline"
            >
              <Phone size={16} />
            </a>
          </div>
        )}

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={styles.fabMain}
          aria-label="Toggle contact action menu"
        >
          {isOpen ? <X size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {/* MOBILE: Sticky Bottom Bar (Call, WhatsApp, Quote) */}
      <div className={styles.mobileBar}>
        <a href={appConfig.company.phoneFormatted} className={styles.mobileItem}>
          <Phone size={18} />
          <span>Call</span>
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${styles.mobileItem} ${styles.mobileActive}`}>
          <MessageSquare size={18} />
          <span>WhatsApp</span>
        </a>
        <Link to="/packages#wizard" className={styles.mobileItem}>
          <Calculator size={18} />
          <span>Estimate Quote</span>
        </Link>
      </div>
    </>
  );
};

export default FloatingButtons;
