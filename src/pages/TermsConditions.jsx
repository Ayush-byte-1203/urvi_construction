import React, { useEffect, useContext } from 'react';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import styles from './Legal.module.css';

const TermsConditions = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  return (
    <div className="page-wrapper">
      <SEO title="Terms & Conditions" description="Terms and conditions for using our services." />

      <div className={styles.pageHeader}>
        <div className="container">
          <SectionHeader
            heading="Terms & Conditions"
            subheading="Last updated: October 2026"
            center
          />
        </div>
      </div>

      <section className={`section container ${styles.legalSection}`}>
        <div className={styles.content}>
          <h3>1. Agreement to Terms</h3>
          <p>
            By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access the service.
          </p>

          <h3>2. Intellectual Property</h3>
          <p>
            The website and its original content, features, functionality, architectural designs, and floor plans are owned by the Company and are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h3>3. Service Estimates</h3>
          <p>
            Any cost estimates provided on this website or via preliminary consultation are indicative. Final binding costs are only established upon signing a formal construction agreement and BOQ (Bill of Quantities).
          </p>

          <h3>4. User Responsibilities</h3>
          <p>
            Users agree to provide accurate information when requesting quotes. The Company is not responsible for delays caused by inaccurate site details or unverified property ownership claims provided by the client.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            In no event shall the Company, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the website or our general services.
          </p>

          <h3>6. Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Jurisdiction shall lie exclusively with the courts in Bengaluru.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
