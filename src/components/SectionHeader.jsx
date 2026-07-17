import React from 'react';
import styles from './SectionHeader.module.css';

const SectionHeader = ({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  className = '',
  ...props
}) => {
  const alignClass = styles[align] || styles.center;

  return (
    <div className={`${styles.container} ${alignClass} ${className}`} {...props}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {subheading && <p className={styles.subheading}>{subheading}</p>}
    </div>
  );
};

export default SectionHeader;
