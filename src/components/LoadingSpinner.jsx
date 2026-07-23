import React from 'react';
import styles from './LoadingSpinner.module.css';
import logoImg from '../Images/logo.png';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <img src={logoImg} alt="Company Logo" className={styles.logoSpinner} />
      <span className={styles.spinnerText}>Paramarsh Construction</span>
    </div>
  );
};

export default LoadingSpinner;
