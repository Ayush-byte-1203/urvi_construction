import React from 'react';
import styles from './TrustStrip.module.css';
const TrustStrip = () => {
  return (
    <div className={styles.stripWrapper}>
      <div className={`container ${styles.stripContainer}`}>
        <div className={styles.qualityCheckWrapper}>
          <h3 className={styles.qualityText}>QASCON Quality Check</h3>
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
