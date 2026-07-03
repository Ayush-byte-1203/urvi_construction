import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import styles from './styles.module.css';

const AdminStatCard = ({ label, value, unit = '', trend, icon: Icon, color = '#3b82f6' }) => {
  const isPositive = trend >= 0;
  const displayValue = typeof value === 'number' && value >= 1000
    ? value.toLocaleString()
    : value;

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <div className={styles.iconWrap} style={{ background: `${color}18`, color }}>
          <Icon size={20} />
        </div>
        <span className={`${styles.trend} ${isPositive ? styles.trendUp : styles.trendDown}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(trend)}%
        </span>
      </div>
      <div className={styles.value}>
        {displayValue}
        {unit && <span className={styles.unit}>{unit}</span>}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default AdminStatCard;
