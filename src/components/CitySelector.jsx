import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { citiesData } from '../data/citiesData';
import styles from './CitySelector.module.css';

const CitySelector = () => {
  return (
    <div className={styles.selectorWrapper}>
      <MapPin size={16} className={styles.pinIcon} />
      <span className={styles.selectInput} style={{ padding: '8px 0', border: 'none', background: 'transparent' }}>
        Vadodara, Gujarat
      </span>
    </div>
  );
};

export default CitySelector;
