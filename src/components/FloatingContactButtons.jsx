import React from 'react';
import { Phone } from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './FloatingContactButtons.module.css';

const FloatingContactButtons = () => {
  const { siteSettings } = useGlobalData();

  const rawPhone = siteSettings?.contact_phone?.replace(/\D/g, '') || '919876543210';
  const whatsappNumber = rawPhone;
  const message = "Hi! I am looking for construction services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const phoneUrl = `tel:+${rawPhone}`;

  return (
    <div className={styles.floatingContainer}>
      <a
        href={phoneUrl}
        className={`${styles.floatingBtn} ${styles.callBtn}`}
        aria-label="Call us"
      >
        <Phone size={24} />
      </a>
    </div>
  );
};

export default FloatingContactButtons;
