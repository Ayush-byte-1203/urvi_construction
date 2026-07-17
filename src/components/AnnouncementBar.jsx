import React, { useState, useEffect } from 'react';
import { X, Clock, ShieldAlert } from 'lucide-react';
import { appConfig } from '../data/appConfig';
import styles from './AnnouncementBar.module.css';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = localStorage.getItem('buildcraft-announcement-dismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('buildcraft-announcement-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <div className={styles.item}>
          <Clock size={14} className={styles.icon} />
          <span>Business Hours: {appConfig.company.businessHours}</span>
        </div>
        <div className={styles.item}>
          <ShieldAlert size={14} className={styles.icon} />
          <span>Premium Construction Audits. <a href="#consultation" className={styles.link}>Request Free Estimate</a></span>
        </div>
      </div>
      <button
        className={styles.closeButton}
        onClick={handleDismiss}
        aria-label="Dismiss Announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
