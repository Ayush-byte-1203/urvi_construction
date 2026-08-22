import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { appConfig } from '../data/appConfig';
import { usePageData } from '../hooks/usePageData';
import { useGlobalData } from '../context/GlobalDataContext';
import HeroOverlay from '../components/HeroOverlay';
import SectionHeader from '../components/SectionHeader';
import CostCalculatorSection from '../components/CostCalculatorSection';
import FAQSection from '../components/FAQSection';
import CTASection from '../components/CTASection';
import { HeaderThemeContext } from '../components/Layout';
import styles from './Packages.module.css';

const Packages = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { pageData, isLoading: pageLoading } = usePageData('packages');
  const globalData = useGlobalData();
  const globalLoading = globalData.isLoading;

  const isLoading = globalLoading || pageLoading;

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  // Use dynamic packages from the backend
  const packageTiers = globalData.packages || [];
  
  // State for which category is open per package
  // packageId -> categoryName
  const [openCategories, setOpenCategories] = useState({});
  const [selectedCity, setSelectedCity] = useState('All');

  // Extract unique cities from all packages
  const availableCities = ['All', ...new Set(packageTiers.flatMap(tier => tier.cities?.map(c => c.name) || []))];

  // Filter package tiers based on selected city
  const filteredTiers = selectedCity === 'All' 
    ? packageTiers 
    : packageTiers.filter(tier => tier.cities?.some(c => c.name === selectedCity));

  const toggleAccordion = (packageId, categoryName) => {
    const isDesktop = window.innerWidth >= 992;
    
    setOpenCategories(prev => {
      const isCurrentlyOpen = prev[packageId] === categoryName;
      
      if (isDesktop) {
        // Sync accordion state across all packages on desktop
        const newState = {};
        packageTiers.forEach(tier => {
          newState[tier.id] = isCurrentlyOpen ? null : categoryName;
        });
        return { ...prev, ...newState };
      } else {
        // Only toggle for the specific package on mobile
        return {
          ...prev,
          [packageId]: isCurrentlyOpen ? null : categoryName
        };
      }
    });
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (packageTiers.length === 0) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No packages available. Please add them in the admin panel.</div>;
  }

  return (
    <div className="packages-page">
      <Helmet>
        <title>Construction Packages | {appConfig.company.name}</title>
        <meta name="description" content={pageData?.subtitle || "Explore our transparent construction packages."} />
      </Helmet>

      {/* Hero Section */}
      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url(${pageData?.hero_image || 'https://images.unsplash.com/photo-1541888081600-01103f6f1c4e?auto=format&fit=crop&w=1920&q=80'})` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Packages</span>
            </div>
            <h1>{pageData?.title || 'Construction Packages'}</h1>
            <p className="subtitle">
              {pageData?.subtitle || 'Transparent, flexible pricing tiers for every budget. Explore our inclusions below.'}
            </p>
          </motion.div>
        </div>
      </header>

      {/* Pricing Tiers Grid */}
      <section className="section container" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {/* City Filter Tabs */}
        {availableCities.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {availableCities.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                  backgroundColor: selectedCity === city ? 'var(--brand-yellow, #EAB308)' : 'var(--bg-card)',
                  color: selectedCity === city ? '#0F172A' : 'var(--text-primary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: selectedCity === city ? '0 4px 12px rgba(234, 179, 8, 0.35)' : 'none'
                }}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        <div className={styles.pricingGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          {filteredTiers.map((tier) => (
            <div key={tier.id} className={styles.pricingCard} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden', position: 'relative', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
              {(tier.badge || (tier.is_popular ? 'Most Popular' : null)) && (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: (tier.badge === 'Most Popular' || tier.is_popular) ? 'var(--brand-yellow, #EAB308)' : '#334155', color: (tier.badge === 'Most Popular' || tier.is_popular) ? '#0F172A' : '#ffffff', textAlign: 'center', padding: '0.55rem 1rem', fontSize: '0.875rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                  {tier.badge || 'Most Popular'}
                </div>
              )}
              
              <div style={{ padding: (tier.badge || tier.is_popular) ? '3.75rem 2rem 2rem' : '3.75rem 2rem 2rem', borderBottom: '1px solid var(--border)', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{tier.name}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)' }}>₹{tier.price}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>/ sq.ft.</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>{tier.description}</p>
                
                {tier.advantages && tier.advantages.length > 0 && (
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px dashed var(--border)' }}>
                    <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--brand-yellow-dark, #D97706)', marginBottom: '0.75rem', fontWeight: '700' }}>Package Highlights</h5>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {tier.advantages.map((adv, aIdx) => (
                        <li key={aIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                          <CheckCircle2 size={15} style={{ color: 'var(--brand-yellow-dark, #D97706)', flexShrink: 0 }} />
                          <span>{adv.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordions */}
              <div style={{ padding: '1.5rem 1rem' }}>
                <h4 style={{ marginBottom: '1rem', paddingLeft: '1rem', color: 'var(--text-primary)' }}>Inclusions</h4>
                {(tier.specifications || tier.material_specs || []).map((spec, idx) => {
                  const catName = spec.category_name || spec.category?.name || (typeof spec.category === 'string' ? spec.category : '') || `Inclusion Category ${idx + 1}`;
                  const isOpen = openCategories[tier.id] === catName;
                  return (
                    <div key={idx} style={{ marginBottom: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                      <button 
                        onClick={() => toggleAccordion(tier.id, catName)}
                        style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isOpen ? 'var(--bg-secondary)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                      >
                        <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{catName}</strong>
                        <ChevronRight size={18} style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s', color: 'var(--text-secondary)' }} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: 'hidden', background: 'var(--bg-primary)' }}
                          >
                            <ul style={{ padding: '1rem', margin: 0, listStyle: 'none', borderTop: '1px solid var(--border)' }}>
                              {[
                                spec.detail && `${spec.detail}`,
                                spec.brand && `Brand: ${spec.brand}`,
                                spec.grade && `Grade: ${spec.grade}`,
                                spec.spec && `Spec: ${spec.spec}`,
                                spec.why && `Why: ${spec.why}`,
                                spec.upgrade && `Upgrade: ${spec.upgrade}`,
                                spec.warranty && `Warranty: ${spec.warranty}`
                              ].filter(Boolean).map((item, i) => (
                                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                  <CheckCircle2 size={14} style={{ color: 'var(--color-success-default)', marginRight: '0.5rem', marginTop: '3px', flexShrink: 0 }} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CostCalculatorSection />

      <FAQSection />
      
      <CTASection title="Not sure which package fits?" subtitle="Schedule a free consultation and let our experts guide you." />
    </div>
  );
};

export default Packages;
