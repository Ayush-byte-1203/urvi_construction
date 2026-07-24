import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import MotionWrapper from './MotionWrapper';
import styles from './CTASection.module.css';

const CTASection = ({ 
  title = "Ready to Build Your Vision?", 
  description = "Partner with us for end-to-end structural excellence, premium materials, and absolute transparency from blueprint to handover.",
  primaryText = "Request a Free Quote",
  primaryLink = "/contact",
  secondaryText = "Call Us Now",
  secondaryLink = "tel:+918320978291"
}) => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaBackground} />
      <div className={`container ${styles.ctaContainer}`}>
        <MotionWrapper variant="slideUp">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          
          <div className={styles.buttonGroup}>
            <Link to={primaryLink} className={styles.primaryButton}>
              {primaryText} <ArrowRight size={18} />
            </Link>
            <a href={secondaryLink} className={styles.secondaryButton}>
              <Phone size={18} /> {secondaryText}
            </a>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default CTASection;
