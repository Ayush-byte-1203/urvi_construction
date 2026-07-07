import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { appConfig } from '@config/appConfig';
import { HeaderThemeContext } from '@/layouts/Layout';

const PrivacyPolicy = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);
  return (
    <div className="privacy-page">
      <Helmet>
        <title>Privacy Policy | {appConfig.company.name}</title>
        <meta name="description" content="Review our privacy policies regarding structural files and drawings." />
      </Helmet>

      <section className="subpage-header">
        <div className="container">
          <span className="accent-text">Legal Department</span>
          <h1 className="title-large mb-3">Privacy Policy</h1>
          <p className="subtitle">Last updated: June 30, 2026. Review how BuildCraft Constructions protects your blueprints and data files.</p>
        </div>
      </section>

      <section className="subpage-content container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>1. Data Collection</h2>
        <p className="mb-6">
          We collect technical blueprints, plot layout coordinates, email queries, and phone details provided to us during the project estimation phase.
          This ensures we prepare accurate estimates matching zoning laws.
        </p>

        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>2. Technical Drawings Protections</h2>
        <p className="mb-6">
          All architectural drawings and structural layouts are treated as intellectual property assets. 
          We store designs on secure cloud servers with active firewalls and do not share blueprints with unauthorized third-party suppliers.
        </p>

        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>3. Digital Analytics Tracking</h2>
        <p className="mb-6">
          Our website systems use minor cookies to analyze traffic patterns and optimize landing speeds. 
          You can toggle browser settings to decline tracking without degrading your base page browsing experience.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
