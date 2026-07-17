import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { appConfig } from '../data/appConfig';
import { HeaderThemeContext } from '../components/Layout';

const TermsConditions = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);
  return (
    <div className="terms-page">
      <Helmet>
        <title>Terms & Conditions | {appConfig.company.name}</title>
        <meta name="description" content="General terms and conditions regarding estimation agreements." />
      </Helmet>

      <section className="subpage-header">
        <div className="container">
          <span className="accent-text">Legal Department</span>
          <h1 className="title-large mb-3">Terms & Conditions</h1>
          <p className="subtitle">Last updated: June 30, 2026. General terms governing structural contracts, site inspections, and billing estimates.</p>
        </div>
      </section>

      <section className="subpage-content container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>1. Structural Estimates Validity</h2>
        <p className="mb-6">
          Any BOQ (Bill of Quantities) and cost tables prepared by our automated estimators are valid specifically for 30 calendar days from issue.
          Raw steel, cement, and electrical cabling prices vary with market triggers, and adjustments are logged accordingly.
        </p>

        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>2. Site Clearances & Legal Permits</h2>
        <p className="mb-6">
          Clients are responsible for providing clear, undisputed land boundaries and deed documents. 
          BuildCraft manages civil submissions for permits, but the owner remains liable for local zoning violations.
        </p>

        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>3. Payment Schedules Strictness</h2>
        <p className="mb-6">
          Construction schedules depend directly on timely payment advances. Delaying milestone checks for more than 10 banking days 
          gives BuildCraft the right to pause site operations to prevent layout supply disruptions.
        </p>
      </section>
    </div>
  );
};

export default TermsConditions;
