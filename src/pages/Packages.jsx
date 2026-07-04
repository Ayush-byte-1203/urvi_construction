import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronDown, CheckCircle2, XCircle, Info, HelpCircle, ArrowRight, Star, HardHat, ShieldCheck, Clock, Layers, Package 
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { packagesData } from '../data/packagesData';
import { faqData } from '../data/faqData';

import SectionHeader from '../components/sections/SectionHeader';
import QuoteWizard from '../components/sections/QuoteWizard';
import CitySelector from '../components/common/CitySelector';
import MotionWrapper from '../components/common/MotionWrapper';
import Button from '../components/common/Button';
import Accordion from '../components/ui/Accordion';
import HeroOverlay from '../components/common/HeroOverlay';
import CTA from '../components/sections/CTA';
import { HeaderThemeContext } from '../layouts/Layout';
import styles from './Packages.module.css';

const Packages = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'vadodara');

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);
  const [activeMaterialTab, setActiveMaterialTab] = useState(0);
  const [materialDropdownOpen, setMaterialDropdownOpen] = useState(false);
  const [selectedComparePackage, setSelectedComparePackage] = useState(0);
  const [showFullComparison, setShowFullComparison] = useState(false);
  const [compareDropdownOpen, setCompareDropdownOpen] = useState(false);
  const [selectedCardIdx, setSelectedCardIdx] = useState(null);

  // Recommendation Quiz state
  const [quizBudget, setQuizBudget] = useState('executive');
  const [quizPlot, setQuizPlot] = useState(1500);
  const [recommendedPackage, setRecommendedPackage] = useState(null);

  // Sync city updates from Navbar CitySelector
  useEffect(() => {
    const syncCity = () => {
      setSelectedCity(localStorage.getItem('selectedCity') || 'vadodara');
    };
    window.addEventListener('cityChanged', syncCity);
    return () => window.removeEventListener('cityChanged', syncCity);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Check if click was outside any dropdown container
      if (!e.target.closest(`.${styles.dropdownContainer}`)) {
        setMaterialDropdownOpen(false);
        setCompareDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    window.dispatchEvent(new Event('cityChanged'));
  };

  const cityPackages = packagesData[selectedCity] || [];

  const comparisonRows = [
    { label: 'Construction Cost', key: 'constructionCost' },
    { label: 'Material Quality', key: 'materialQuality' },
    { label: 'Steel Brand', key: 'steelBrand' },
    { label: 'Cement Brand', key: 'cementBrand' },
    { label: 'Electrical Brand', key: 'electricalBrand' },
    { label: 'Paint Brand', key: 'paintBrand' },
    { label: 'Flooring Spec', key: 'flooring' },
    { label: 'Doors Spec', key: 'doors' },
    { label: 'Windows Spec', key: 'windows' },
    { label: 'Sanitary Fittings', key: 'sanitary' },
    { label: 'Kitchen Fittings', key: 'kitchen' },
    { label: 'False Ceiling', key: 'ceiling' },
    { label: 'Waterproofing', key: 'waterproofing' },
    { label: 'Structure Warranty', key: 'warranty' },
    { label: 'Maintenance Support', key: 'support' },
    { label: 'Completion Timeline', key: 'timeline' }
  ];

  // Material specs list
  const materialsList = [
    { name: 'UltraTech Cement', desc: 'Certified Grade-53 cement for maximum pillar load capacities.', benefit: 'Prevents cracks formation during setting.', app: 'Foundation & Pillars RCC casting.', quality: 'Ultra High Strength', tier: 'All Packages' },
    { name: 'TATA Tiscon Steel', desc: 'Fe 550D TMT reinforcement rebars with premium flexibility.', benefit: 'Protects structure against earthquake shakes.', app: 'Slab structural grid rebar work.', quality: 'Super Ductile', tier: 'Executive & Signature' },
    { name: 'Kajaria Floor Tiles', desc: 'Luxury vitrified floor tiles with anti-scratch coating.', benefit: 'Sleek surface texture easy to clean.', app: 'Living area & bedroom floor layouts.', quality: 'Luxury Finish', tier: 'Signature Elite' },
    { name: 'Asian Paints Ultima', desc: 'Weather-proof exterior protective acrylic emulsion paints.', benefit: 'Guards walls against damp patches and sun peeling.', app: 'Facade coating layers.', quality: 'Weather Shield', tier: 'All Packages' },
    { name: 'Jaquar Fittings', desc: 'Premium sanitary fittings and luxury basin taps.', benefit: 'Anti-leak ceramic valves with smooth flows.', app: 'Bathroom plumbing systems.', quality: 'Premium Finish', tier: 'Executive & Signature' }
  ];


  // Included / Excluded mocks
  const includedList = [
    'Complete structural design & plans drawings',
    'Excavation & soil geotech laboratory tests',
    'RCC structural block frames casting work',
    'Government permits filing fees clearances'
  ];

  // Recommendations logic
  const handleRecommendation = () => {
    if (quizBudget === 'basic') {
      setRecommendedPackage('Core Shell Build');
    } else if (quizBudget === 'executive') {
      setRecommendedPackage('Executive Smart Build');
    } else {
      setRecommendedPackage('Signature Elite Build');
    }
  };

  const faqItems = faqData.slice(0, 6).map((f) => ({
    title: f.q,
    content: f.a
  }));

  const activeMaterial = materialsList[activeMaterialTab];

  return (
    <div className="packages-page">
      <Helmet>
        <title>Packages & Estimator | {appConfig.company.name}</title>
        <meta name="description" content="Transparent construction package tiers detailing concrete foundation parameters, TMT reinforcement rebars steel types and MEP scopes." />
        <link rel="canonical" href={`${appConfig.seo.siteUrl}/packages`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Packages & Pricing | ${appConfig.company.name}`} />
        <meta property="og:description" content="Compare construction packages and calculate building estimates transparently." />
        <meta property="og:url" content={`${appConfig.seo.siteUrl}/packages`} />
        <meta property="og:image" content={appConfig.seo.ogImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Packages & Pricing | ${appConfig.company.name}`} />
        <meta name="twitter:description" content="Calculate construction estimates using our transparent estimation matrix." />
      </Helmet>

      {/* 1. Packages Hero */}
      <section className={styles.heroSection}>
        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Packages & Estimator</span>
          </div>

          <h1 className={styles.heroTitle}>Transparent Construction Pricing Packages</h1>
          <p className={styles.heroDesc}>
            Verify rebar steel specifications, concrete foundation load limits, interior finishes specs, and timelines up front. Zero hidden margin markups.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn-primary">Book Consultation Call</Link>
            <a href="#wizard" className={`btn btn-secondary ${styles.btnSecOutline}`}>Launch Calculator</a>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={14} />
              <span>15-Year Frame Warranty</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckCircle2 size={14} />
              <span>Lab Verified Materials Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Package Cards Grid */}
      <section className="section container">
        <div className="grid-3" style={{ marginTop: '2.5rem' }}>
          {cityPackages.map((plan, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCardIdx(idx)}
              style={{ cursor: 'pointer' }}
            >
              <MotionWrapper
                variant="slideUp"
                delay={idx * 0.1}
                className={`${styles.planCard} ${selectedCardIdx === idx ? styles.activePlanCard : ''}`}
              >
                <div className={styles.cardImageWrapper}>
                  <img 
                    src={idx === 0 ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' : idx === 1 ? 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80' : 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80'} 
                    alt={plan.name} 
                    className={styles.cardImg} 
                  />
                </div>

                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{plan.name}</h3>
                  <span className={styles.cardTag}>{plan.tagline}</span>
                  <div className={styles.priceRow}>
                    <strong className={styles.priceText}>{plan.price}</strong>
                    <span className={styles.unitText}>{plan.unit}</span>
                  </div>
                </div>

                <div className={styles.cardSpecs}>
                  <div className={styles.specItem}>
                    <Clock size={12} className={styles.specIcon} />
                    <span>Timeline: {plan.timeline}</span>
                  </div>
                  <div className={styles.specItem}>
                    <CheckCircle2 size={12} className={styles.specIcon} />
                    <span>Cement: {plan.cementBrand}</span>
                  </div>
                  <div className={styles.specItem}>
                    <CheckCircle2 size={12} className={styles.specIcon} />
                    <span>Steel: {plan.steelBrand}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                  <a href="#comparison" className="btn btn-primary" onClick={(e) => { e.stopPropagation(); setSelectedComparePackage(idx); }}>Compare Details</a>
                  <Link to="/contact" className={`btn btn-secondary ${styles.btnCardSec}`} onClick={(e) => e.stopPropagation()}>Book Consult</Link>
                </div>
              </MotionWrapper>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comparison Matrix Table */}
      <section className={`section ${styles.compareSection}`} id="comparison">
        <div className="container">
          <SectionHeader
            eyebrow="Tiers Comparison"
            heading="Dynamic Specifications Comparison"
            subheading="Review rebar steel grades, concrete foundation strengths, electrical conduits, and warranty terms side-by-side."
          />

          {cityPackages.length > 0 ? (
            <div style={{ marginTop: '3rem' }}>
              {/* Dropdown Selector above the table */}
              <div className={styles.dropdownContainer}>
                <button 
                  className={styles.dropdownBtn}
                  onClick={() => setCompareDropdownOpen(!compareDropdownOpen)}
                >
                  <span className={styles.dropdownBtnText}>
                    <Package size={16} className={styles.dropdownIconLeft} />
                    {cityPackages[selectedComparePackage]?.name || 'Select Package'}
                  </span>
                  <ChevronDown size={16} className={`${styles.dropdownChevron} ${compareDropdownOpen ? styles.dropdownChevronOpen : ''}`} />
                </button>
                {compareDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {cityPackages.map((p, idx) => (
                      <button
                        key={idx}
                        className={`${styles.dropdownItem} ${selectedComparePackage === idx ? styles.dropdownItemActive : ''}`}
                        onClick={() => {
                          setSelectedComparePackage(idx);
                          setCompareDropdownOpen(false);
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Single Package Specifications Card */}
              {!showFullComparison && (
                <div className={styles.singlePackageSpecsCard}>
                  <h3>{cityPackages[selectedComparePackage]?.name} Specifications</h3>
                  <div className={styles.singleSpecsGrid}>
                    {comparisonRows.map((row, rIdx) => (
                      <div key={rIdx} className={styles.singleSpecRow}>
                        <strong>{row.label}</strong>
                        <span>{cityPackages[selectedComparePackage]?.[row.key] || '—'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compare All Packages Action Button */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem', marginBottom: showFullComparison ? '2.5rem' : '0' }}>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowFullComparison(!showFullComparison)}
                >
                  {showFullComparison ? 'Collapse Comparison Matrix' : 'Compare All Packages'}
                </Button>
              </div>

              {/* Full Comparison Table Container with Animation (expanded/collapsed) */}
              {showFullComparison && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.35 }}
                  className={styles.compareWrapper}
                >
                  <div className={styles.tableScrollContainer}>
                    <table className={styles.compareTable}>
                      <thead>
                        <tr>
                          <th style={{ width: '25%' }}>Features & Specs</th>
                          {cityPackages.map((p, idx) => (
                            <th key={idx}>
                              {p.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            <td style={{ fontWeight: '600' }}>{row.label}</td>
                            {cityPackages.map((p, pIdx) => (
                              <td key={pIdx}>
                                {p[row.key] || '—'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No package configuration available for the selected city.</p>
          )}
        </div>
      </section>

      {/* 5. Inclusions / Exclusions */}
      <section className="section container">
        <div className="grid-2">
          <div>
            <span className="text-overline">Scope of Work</span>
            <h2 className="display-sm" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>Standard Inclusions</h2>
            <div className={styles.inclusionsCol}>
              {includedList.map((item, idx) => (
                <div key={idx} className={styles.checkListItem}>
                  <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-overline">Exclusions list</span>
            <h2 className="display-sm" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>Exclusions</h2>
            <div className={styles.inclusionsCol}>
              <div className={styles.checkListItem}>
                <XCircle size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span>Interior decoration fittings like cabinets, custom ceiling lights & loose furniture</span>
              </div>
              <div className={styles.checkListItem}>
                <XCircle size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span>Heavy landscape designing, private pool filtrations and compounding grids</span>
              </div>
              <div className={styles.checkListItem}>
                <XCircle size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                <span>Electrical grid connection fees, municipal tax deposits for water pipe links</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 6. Material Explorer */}
      <section className="section container">
        <SectionHeader
          eyebrow="Ingredient Audits"
          heading="Certified Construction Materials"
          subheading="We build using premium brands. Select a brand below to review technical specifications certificates."
        />

        <div style={{ marginTop: '3.5rem' }}>
          {/* Modern Dropdown Selector */}
          <div className={styles.dropdownContainer}>
            <button 
              className={styles.dropdownBtn}
              onClick={() => setMaterialDropdownOpen(!materialDropdownOpen)}
            >
              <span className={styles.dropdownBtnText}>
                <Layers size={16} className={styles.dropdownIconLeft} />
                {materialsList[activeMaterialTab].name}
              </span>
              <ChevronDown size={16} className={`${styles.dropdownChevron} ${materialDropdownOpen ? styles.dropdownChevronOpen : ''}`} />
            </button>
            {materialDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {materialsList.map((m, idx) => (
                  <button
                    key={idx}
                    className={`${styles.dropdownItem} ${activeMaterialTab === idx ? styles.dropdownItemActive : ''}`}
                    onClick={() => {
                      setActiveMaterialTab(idx);
                      setMaterialDropdownOpen(false);
                    }}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Original Material Card Layout */}
          <div className={styles.matDetailCard}>
            <span className={styles.detailTag}>Material specs</span>
            <h3 className={styles.detailTitle}>{activeMaterial.name} Specs Sheet</h3>
            <p className={styles.detailDesc}>{activeMaterial.desc}</p>

            <div className={styles.specsGrid}>
              <div className={styles.specBox}>
                <strong>Usage / Application</strong>
                <span>{activeMaterial.app}</span>
              </div>
              <div className={styles.specBox}>
                <strong>Structural Benefit</strong>
                <span>{activeMaterial.benefit}</span>
              </div>
              <div className={styles.specBox}>
                <strong>Technical Grade</strong>
                <span>{activeMaterial.quality}</span>
              </div>
              <div className={styles.specBox}>
                <strong>Available Packages</strong>
                <span>{activeMaterial.tier}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Recommendation Quiz */}
      <section className="section container" id="wizard">
        <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
          <div>
            <span className="text-overline">Requirement Wizard</span>
            <h2 className="display-sm" style={{ marginTop: '0.5rem' }}>Estimate Your Specifications</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', lineHeight: '1.6' }}>
              Choose your budget targets and specify your plot layout bounds. Our spatial engine recommends the optimal cement brand and steel structural configuration.
            </p>
          </div>

          <div className={`glass-panel ${styles.quizCard}`}>
            <div className={styles.quizFormGroup}>
              <label>Target Budget Specification Class</label>
              <select value={quizBudget} onChange={(e) => setQuizBudget(e.target.value)} className={styles.selectInput}>
                <option value="basic">Core Shell Build (Budget Target)</option>
                <option value="executive">Executive Smart Build (Balanced)</option>
                <option value="signature">Signature Elite Build (Ultra Premium)</option>
              </select>
            </div>

            <div className={styles.quizFormGroup}>
              <label>Plot Built-up Area: {quizPlot} sqft</label>
              <input 
                type="range" 
                min="800" 
                max="8000" 
                step="100" 
                value={quizPlot} 
                onChange={(e) => setQuizPlot(parseInt(e.target.value))} 
                className={styles.rangeInput}
              />
            </div>

            <button className="btn btn-primary" onClick={handleRecommendation} style={{ width: '100%' }}>
              Verify Specifications Recommendation
            </button>

            {recommendedPackage && (
              <div className={styles.quizResult}>
                <span>Recommended Tier:</span>
                <h3>{recommendedPackage}</h3>
                <p>
                  Optimized for a {quizPlot} sqft plot. Includes certified cement and ductile rebar steel specifications.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                  Discuss Recommended Specs
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. FAQ accordion specific to packages */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Pricing Helpdesk"
          heading="Pricing & Billing FAQs"
          subheading="Answers detailing material variations approvals, milestone billing releases, and municipal permits scopes."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* 11. Multi-Step Quote Wizard component */}
      <QuoteWizard />

      {/* 12. Final CTA Banner */}
      <CTA
        title="Ready to Secure Your Civil Engineering Estimate?"
        description="Join site consultations with our spatial planning desk and contracting estimators to draft Bill of Quantities today."
        primaryBtnText="Book Consultation Call"
        primaryBtnLink="/contact"
        secondaryBtnText="Estimate Cost Calculator"
        secondaryBtnLink="/packages"
        bgVariant="gradient"
        layout="center"
      />
    </div>
  );
};

export default Packages;
