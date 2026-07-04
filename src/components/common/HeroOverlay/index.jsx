import React from 'react';
import styles from './styles.module.css';

const HeroOverlay = ({ type = 'gradient' }) => {
  // Map type to class
  const getOverlayClass = () => {
    switch (type) {
      case 'video':
        return styles.overlayVideo;
      case 'dark':
        return styles.overlayDark;
      case 'medium':
        return styles.overlayMedium;
      case 'bright':
      case 'light':
        return styles.overlayBright;
      case 'gradient':
      default:
        return styles.overlayGradient;
    }
  };

  return <div className={`${styles.overlay} ${getOverlayClass()}`} />;
};

export default HeroOverlay;
