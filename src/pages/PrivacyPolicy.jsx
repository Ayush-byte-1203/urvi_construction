import React, { useEffect, useContext } from 'react';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import styles from './Legal.module.css';

const PrivacyPolicy = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  return (
    <div className="page-wrapper">
      <SEO title="Privacy Policy" description="Our privacy policy and data handling practices." />

      <div className={styles.pageHeader}>
        <div className="container">
          <SectionHeader
            heading="Privacy Policy"
            subheading="Last updated: October 2026"
            center
          />
        </div>
      </div>

      <section className={`section container ${styles.legalSection}`}>
        <div className={styles.content}>
          <h3>1. Information We Collect</h3>
          <p>
            When you interact with our website, we may collect personal information such as your name, email address, phone number, and project requirements. We also collect non-personal data through cookies to improve our website experience.
          </p>

          <h3>2. How We Use Your Information</h3>
          <p>
            The information we collect is strictly used to provide and improve our construction and architectural services, process your inquiries, and send you relevant updates regarding your project.
          </p>

          <h3>3. Data Security</h3>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no internet-based service can guarantee 100% security.
          </p>

          <h3>4. Sharing Your Information</h3>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share data with trusted subcontractors who assist us in delivering our services, provided they agree to keep this information confidential.
          </p>

          <h3>5. Your Rights</h3>
          <p>
            You have the right to request access to the personal data we hold about you and to ask for it to be corrected or deleted.
          </p>

          <h3>6. Cookies Policy</h3>
          <p>
            We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h3>7. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us at hello@premiumbuilder.in.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
