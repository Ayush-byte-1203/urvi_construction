import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { citiesData } from '../data/citiesData';
import styles from './CitySelector.module.css';

const CitySelector = ({ selectedCityId, onChangeCity }) => {
  return (
    <div className={styles.selectorWrapper}>
      <MapPin size={16} className={styles.pinIcon} />
      <select
        value={selectedCityId}
        onChange={(e) => onChangeCity(e.target.value)}
        className={styles.selectInput}
        aria-label="Select construction city"
      >
        {citiesData.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className={styles.chevronIcon} />
    </div>
  );
};

export default CitySelector;
