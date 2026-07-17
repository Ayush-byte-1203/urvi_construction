import React from 'react';
import styles from './TrustStrip.module.css';
import qualityImage from '../Images/Quality check.png';

const TrustStrip = () => {
  return (
    <div className={styles.stripWrapper}>
      <div className={`container ${styles.stripContainer}`}>
        <div className={styles.qualityCheckWrapper}>
          <img src={qualityImage} alt="QASCON Quality Check" className={styles.qualityImage} />
          <h3 className={styles.qualityText}>QASCON Quality Check</h3>
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
