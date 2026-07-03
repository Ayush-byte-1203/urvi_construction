import React from 'react';
import { Link } from 'react-router-dom';
import { Database } from 'lucide-react';
import Button from '../Button';
import styles from './styles.module.css';

const EmptyState = ({
  title = 'No Data Found',
  message = 'We could not find any elements matching your filters or search keywords.',
  ctaText,
  ctaLink,
  onClick,
  icon: Icon = Database
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Icon size={48} className="anim-float" />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      
      {ctaText && (
        <>
          {ctaLink ? (
            <Link to={ctaLink}>
              <Button variant="primary">{ctaText}</Button>
            </Link>
          ) : (
            <Button variant="primary" onClick={onClick}>{ctaText}</Button>
          )}
        </>
      )}
    </div>
  );
};

export default EmptyState;
