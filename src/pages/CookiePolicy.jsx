import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { appConfig } from '../config/appConfig';
import { HeaderThemeContext } from '../layouts/Layout';

const CookiePolicy = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);
  return (
    <div className="cookie-page">
      <Helmet>
        <title>Cookie Policy | {appConfig.company.name}</title>
        <meta name="description" content="Read our cookie usage policy." />
      </Helmet>

      <section className="subpage-header">
        <div className="container">
          <span className="accent-text">Legal Department</span>
          <h1 className="title-large mb-3">Cookie Policy</h1>
          <p className="subtitle">Last updated: June 30, 2026. Understanding how cookies optimize loading speeds and layout routing.</p>
        </div>
      </section>

      <section className="subpage-content container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>1. What Are Cookies?</h2>
        <p className="mb-6">
          Cookies are tiny text script files stored inside your device storage when you visit webpages. 
          They store temporary variables like active language configurations and menu toggles so you do not have to reset them on every route transition.
        </p>

        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>2. How We Classify Cookies</h2>
        <p className="mb-6">
          - **Essential Cookies**: Necessary to load dynamic elements, routing structures, and media overlays.
          - **Analytical Cookies**: Help us monitor which pages are popular (e.g. Services, Projects) to adjust design weights. We do not link these logs to names or telephone parameters.
        </p>

        <h2 className="mb-3" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>3. Customizing Cookie Logs</h2>
        <p className="mb-6">
          You can toggle browser configurations to block cookies, though doing so might cause high-definition video loops on the Hero section to load slower.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
