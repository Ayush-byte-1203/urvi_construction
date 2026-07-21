import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logoImg from '../Images/logo.png';

import { useGlobalData } from '../context/GlobalDataContext';
import { appConfig } from '../data/appConfig';

const Logo = ({ onClick, theme = 'dark' }) => {
  const { siteSettings } = useGlobalData();
  const companyName = siteSettings?.site_name || appConfig.company.name;
  const currentLogo = siteSettings?.logo || logoImg;
  return (
    <Link to="/" className={styles.logo} onClick={onClick} aria-label={`${companyName} Home`}>
      <div className={styles.box}><img src={currentLogo} alt={`${companyName} Logo`} className={styles.logoImage} /></div>
      <span className={`${styles.text} ${styles.textLight}`}>{companyName}</span>
    </Link>
  );
};

export default Logo;
