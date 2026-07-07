import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = ({ onClick, theme = 'dark' }) => {
  return (
    <Link to="/" className={styles.logo} onClick={onClick} aria-label="Paramarsh Construction Home">
      <div className={styles.box}>P</div>
      <span className={`${styles.text} ${styles.textLight}`}>Paramarsh Construction</span>
    </Link>
  );
};

export default Logo;
