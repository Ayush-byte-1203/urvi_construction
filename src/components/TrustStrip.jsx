import React from 'react';
import { ShieldCheck, Award, HardHat } from 'lucide-react';
import styles from './TrustStrip.module.css';

const TrustStrip = () => {
  return (
    <div className={styles.stripWrapper}>
      <div className={`container ${styles.stripContainer}`}>
        
        <div className={styles.trustItem}>
          <ShieldCheck size={20} className={styles.trustIcon} />
          <span className={styles.trustText}>ISO 9001:2015 Certified</span>
        </div>

        <div className={styles.trustDivider} />

        <div className={styles.trustItem}>
          <Award size={20} className={styles.trustIcon} />
          <span className={styles.trustText}>Govt. Approved Contractors</span>
        </div>

        <div className={styles.trustDivider} />

        <div className={styles.trustItem}>
          <HardHat size={20} className={styles.trustIcon} />
          <span className={styles.trustText}>Zero-Incident Safety Record</span>
        </div>

      </div>
    </div>
  );
};

export default TrustStrip;
