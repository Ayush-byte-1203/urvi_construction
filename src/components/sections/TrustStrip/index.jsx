import React from 'react';
import { Award, Compass, ShieldCheck, ThumbsUp } from 'lucide-react';
import Counter from '../../common/Counter';
import styles from './styles.module.css';

const TrustStrip = () => {
  const stats = [
    {
      icon: <Award size={20} className={styles.icon} />,
      end: 15,
      suffix: '+',
      label: 'Years Experience'
    },
    {
      icon: <Compass size={20} className={styles.icon} />,
      end: 150,
      suffix: '+',
      label: 'Landmarks Delivered'
    },
    {
      icon: <ThumbsUp size={20} className={styles.icon} />,
      end: 98,
      suffix: '%',
      label: 'Client Satisfaction'
    },
    {
      icon: <ShieldCheck size={20} className={styles.icon} />,
      end: 100,
      suffix: '%',
      label: 'Quality Checks Audit'
    }
  ];

  return (
    <div className={styles.stripWrapper}>
      <div className={`container ${styles.stripContainer}`}>
        {stats.map((item, idx) => (
          <div key={idx} className={styles.statItem}>
            <div className={styles.visualRow}>
              {item.icon}
              <span className={styles.number}>
                <Counter end={item.end} suffix={item.suffix} />
              </span>
            </div>
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustStrip;
