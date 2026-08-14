import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import styles from './CTASection.module.css';
import { useGlobalData } from '../context/GlobalDataContext';

const CTASection = ({ title, subtitle, btnText, btnLink, eyebrow }) => {
  const { siteSettings } = useGlobalData();

  const finalTitle = title || siteSettings?.cta_title || "Ready to Bring Your Vision to Life?";
  const finalSubtitle = subtitle || siteSettings?.cta_subtitle || "Contact our team of experts today for a free site visit and project estimation.";
  const finalBtnText = btnText || siteSettings?.cta_btn_text || "Get a Free Consultation";
  const finalBtnLink = btnLink || siteSettings?.cta_btn_link || "/contact";
  const ctaPhoneRaw = siteSettings?.cta_phone || "+91 98765 43210";
  const ctaPhoneClean = ctaPhoneRaw.replace(/\D/g, '');

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        {eyebrow && <span className="text-overline" style={{ marginBottom: '1rem', display: 'block' }}>{eyebrow}</span>}
        <h2 className={styles.title}>
          {finalTitle}
        </h2>
        <p className={styles.description}>
          {finalSubtitle}
        </p>
        <div className={styles.buttonGroup}>
          <Link to={finalBtnLink} className={styles.primaryButton}>
            {finalBtnText} <ArrowRight size={16} />
          </Link>
          <a href={`tel:+${ctaPhoneClean}`} className={styles.secondaryButton}>
            {ctaPhoneRaw} <Phone size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
