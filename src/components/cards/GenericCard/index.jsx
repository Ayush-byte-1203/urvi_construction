import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './styles.module.css';

const GenericCard = ({
  image,
  badge,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  icon,
  onClick,
  meta = [],
  className = ''
}) => {
  const CardWrapper = onClick ? 'button' : (ctaLink ? Link : 'div');
  const wrapperProps = onClick 
    ? { onClick, type: 'button' } 
    : (ctaLink ? { to: ctaLink } : {});

  return (
    <CardWrapper 
      className={`${styles.card} ${className}`} 
      {...wrapperProps}
    >
      {/* Image Block */}
      {image && (
        <div className={styles.imageWrapper}>
          <img 
            src={image} 
            alt={title} 
            className={styles.image}
            loading="lazy"
          />
          {badge && <span className={styles.badge}>{badge}</span>}
        </div>
      )}

      {/* Content Block */}
      <div className={styles.content}>
        {icon && <div className={styles.iconWrapper}>{icon}</div>}
        
        {title && <h4 className={styles.title}>{title}</h4>}
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {description && <p className={styles.description}>{description}</p>}
        
        {/* Meta items checklist */}
        {meta.length > 0 && (
          <div className={styles.metaList}>
            {meta.map((m, idx) => (
              <span key={idx} className={styles.metaItem}>
                {m}
              </span>
            ))}
          </div>
        )}

        {/* Call to action arrow link */}
        {ctaText && !onClick && (
          <div className={styles.ctaWrapper}>
            <span className={styles.ctaLink}>
              {ctaText} <ArrowRight size={16} />
            </span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default GenericCard;
