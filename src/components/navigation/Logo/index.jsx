import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const Logo = ({ onClick }) => {
  return (
    <Link to="/" className={styles.logo} onClick={onClick} aria-label="BuildCraft Home">
      <div className={styles.box}>B</div>
      <span className={styles.text}>BuildCraft</span>
    </Link>
  );
};

export default Logo;
