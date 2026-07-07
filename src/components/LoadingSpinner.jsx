import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.spinnerText}>Assembling layouts</span>
    </div>
  );
};

export default LoadingSpinner;
