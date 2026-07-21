import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, CheckCircle2, HelpCircle, ShieldCheck
} from 'lucide-react';
import { appConfig } from '../data/appConfig';
import { usePageData } from '../hooks/usePageData';
import { useGlobalData } from '../context/GlobalDataContext';
import SectionHeader from '../components/SectionHeader';
import QuoteWizard from '../components/QuoteWizard';
import MotionWrapper from '../components/MotionWrapper';
import Button from '../components/Button';
import HeroOverlay from '../components/HeroOverlay';
import PackageComparisonTable from '../components/PackageComparisonTable';

import { HeaderThemeContext } from '../components/Layout';
import styles from './Packages.module.css';

const Packages = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { pageData, isLoading: pageLoading } = usePageData('packages');
  const globalData = useGlobalData();
  const globalLoading = globalData.isLoading;
  const [activePackage, setActivePackage] = useState(0); 
  const [openCategory, setOpenCategory] = useState('Design & Drawings');


  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  // Use dynamic packages from the backend
  const packageTiers = globalData.packages || [];
  
  if (packageTiers.length === 0) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No packages available. Please add them in the admin panel.</div>;
  }
  
  // Make sure activePackage is in bounds
  const currentActiveIdx = activePackage < packageTiers.length ? activePackage : 0;
  const activeData = packageTiers[currentActiveIdx];
  
  // Pre-process material specs for easy accordion rendering
  // Backend returns: [{category_name: 'Design & Drawings', brand: '...', spec: '...'}, ...]
  // We want: { 'Design & Drawings': { brand: '...', spec: '...', ... } }
  const materialSpecs = {};
  packageTiers.forEach(tier => {
    materialSpecs[tier.id] = {};
    if (tier.material_specs) {
      tier.material_specs.forEach(spec => {
         if (!materialSpecs[tier.id][spec.category_name]) {
           materialSpecs[tier.id][spec.category_name] = [];
         }
         materialSpecs[tier.id][spec.category_name].push(spec);
      });
    }
  });



  return (
    <div className="packages-page">
      <Helmet>
        <title>Interactive Pricing Packages | {appConfig.company.name}</title>
        <meta name="description" content={pageData?.subtitle || "Explore and compare Standard, Premium, and Luxury packages"} />
        <link rel="canonical" href={`${appConfig.seo.siteUrl}/packages`} />
      </Helmet>

      {/* Hero Section */}
      <section className={styles.heroSection}>
                {pageData?.hero_video && (
          <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
            <source src={pageData.hero_video} type="video/mp4" />
          </video>
        )}
        {pageData?.hero_image && !pageData?.hero_video && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${pageData.hero_image})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        )}

        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Interactive Packages</span>
          </div>
          <h1 className={styles.heroTitle}>{pageData?.title || 'Premium Construction Packages'}</h1>
          <p className={styles.heroDesc}>
            {pageData?.subtitle || 'Choose a package tier to explore categorized material specifications, cost transparency charts, advantages, and dynamic estimator comparisons.'}
          </p>
        </div>
      </section>

      {/* 1. Interactive Package Selector */}
      <section className="section container">
        <SectionHeader
          eyebrow="Explore Tiers"
          heading="Select Your Specifications Package"
          subheading="Click on a package to update details, material standards, advantages, and calculation metrics across the entire page."
        />

        <div className={styles.selectorGrid} style={{ marginTop: '2.5rem' }}>
          {packageTiers.map((tier, idx) => {
            const isActive = idx === activePackage;
            return (
              <div
                key={tier.id}
                onClick={() => setActivePackage(idx)}
                className={`${styles.selectorCard} ${isActive ? styles.selectorCardActive : ''}`}
              >
                <div className={styles.selectorCardHeader}>
                  <h4>{tier.name}</h4>
                  <div className={styles.selectorCardPrice}>
                    <strong>₹{tier.price}</strong>
                    <span>/ sq.ft. onwards</span>
                  </div>
                </div>
                <p className={styles.selectorCardTagline}>{tier.tagline}</p>
                {isActive && <div className={styles.activeIndicator} />}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Dynamic Package Details Panel */}
      <section className={`section ${styles.detailsSection}`}>
        <div className="container">
          <div className={styles.detailsPanel}>
            <div className={styles.detailsPanelLeft}>
              <span className={styles.panelBadge}>Active Details Panel</span>
              <h2>{activeData.name} Overview</h2>
              <p className={styles.panelDesc}>{activeData.description}</p>

              <div className={styles.panelTagGroup}>
                <div className={styles.panelTag}>
                  <strong>Best For:</strong>
                  <span>{activeData.best_for}</span>
                </div>
                <div className={styles.panelTag}>
                  <strong>Warranty:</strong>
                  <span>{activeData.warranty}</span>
                </div>
                <div className={styles.panelTag}>
                  <strong>Timeline:</strong>
                  <span>{activeData.timeline}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailsPanelRight}>
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span>Construction Grade</span>
                  <strong>{activeData.grade}</strong>
                </div>
                <div className={styles.metricItem}>
                  <span>Suitable Plot Sizes</span>
                  <strong>{activeData.plot_size}</strong>
                </div>
                <div className={styles.metricItem}>
                  <span>Recommended Floors</span>
                  <strong>{activeData.floors}</strong>
                </div>
                <div className={styles.metricItem}>
                  <span>Project Types</span>
                  <strong>{activeData.project_type}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 5. Interactive Comparison Table */}
      <section className={`section ${styles.compareSection}`}>
        <div className="container">
          <PackageComparisonTable packageTiers={packageTiers} />
        </div>
      </section>

      {/* 8 & 9. Advantages & "Why Choose This Package" */}
      <section className="section container">
        <SectionHeader
          eyebrow="Core Strengths"
          heading={`Why Choose the ${activeData.name}`}
          subheading="Advantages, ideal client profiles, recommended plot sizes, and limitations to ensure complete transparency."
        />

        <div className="grid-3" style={{ marginTop: '3rem' }}>
          <div className={styles.advantageCard}>
            <h4>Key Advantages</h4>
            <ul>
              {activeData.advantages && activeData.advantages.map((adv, idx) => (
                <li key={idx}><CheckCircle2 size={16} /> <span>{adv.text}</span></li>
              ))}
            </ul>
          </div>

          <div className={styles.advantageCard}>
            <h4>Ideal Customer & Value</h4>
            <div className={styles.advantageMetric}>
              <strong>Recommended Budget:</strong>
              <span>{activeData.recommended_budget}</span>
            </div>
            <div className={styles.advantageMetric}>
              <strong>Plot Sizes:</strong>
              <span>{activeData.plot_size}</span>
            </div>
            <p className={styles.advantageText}>{activeData.ideal_customer}</p>
          </div>

          <div className={styles.advantageCard}>
            <h4>Limitations & Upgrades</h4>
            <p><strong>Limitations:</strong> {activeData.limitations}</p>
            <p style={{ marginTop: '1rem' }}><strong>Upgrades Available:</strong> {activeData.upgrades}</p>
            <p style={{ marginTop: '1rem' }}><strong>Maintenance Notes:</strong> {activeData.maintenance}</p>
          </div>
        </div>

        
        <div className={styles.ctaRow} style={{ marginTop: '3rem' }}>
          <Link to="/contact" className="btn btn-primary">Book Consultation</Link>
          <a href="tel:+919428694361" className="btn btn-secondary">Talk to Expert</a>
        </div>
      </section>

      {/* 11. Dynamic FAQs */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Common Inquiries"
            heading={`${activeData.name} FAQs`}
            subheading="Frequently asked questions configured dynamically for your active package selection."
          />

          <div className={styles.faqList} style={{ marginTop: '3rem' }}>
            {activeData.faqs && activeData.faqs.map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <HelpCircle size={18} className={styles.faqIcon} />
                <div className={styles.faqText}>
                  <h4>{faq.question}</h4>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      
      
    </div>
  );
};

export default Packages;
