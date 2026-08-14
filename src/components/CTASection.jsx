import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import styles from './CTASection.module.css';

const CTASection = ({ title, subtitle, btnText = "Get a Free Consultation", btnLink = "/contact", eyebrow }) => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        {eyebrow && <span className="text-overline" style={{ marginBottom: '1rem', display: 'block' }}>{eyebrow}</span>}
        <h2 className={styles.title}>
          {title || "Ready to Bring Your Vision to Life?"}
        </h2>
        <p className={styles.description}>
          {subtitle || "Contact our team of experts today for a free site visit and project estimation."}
        </p>
        <div className={styles.buttonGroup}>
          <Link to={btnLink} className={styles.primaryButton}>
            {btnText} <ArrowRight size={16} />
          </Link>
          <a href="tel:+91 98980 12345" className={styles.secondaryButton}>
            Call Us Now <Phone size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
