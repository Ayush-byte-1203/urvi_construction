import React, { useState, useContext, useEffect } from 'react';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Compass, Play, Layers, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';

import SectionHeader from '../components/SectionHeader';
import OneStopHomeSolutions from '../components/OneStopHomeSolutions';
import Accordion from '../components/Accordion';
import MotionWrapper from '../components/MotionWrapper';
import Button from '../components/Button';
import HeroOverlay from '../components/HeroOverlay';


import { HeaderThemeContext } from '../components/Layout';
import styles from './Services.module.css';

const Services = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, services: servicesData, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, sections, isLoading: isPageLoading } = usePageData('services');
  const [activeCategory, setActiveCategory] = useState('All Divisions');
  const [activeStep, setActiveStep] = useState(0);

  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);





  const appConfig = siteSettings ? { seo: { defaultTitle: `${siteSettings.site_name} | Services`, defaultDescription: pageData?.subtitle || 'Services', siteUrl: '' } } : { seo: { defaultTitle: 'Loading...', defaultDescription: 'Loading...', siteUrl: '' } };

  // Generate categories from loaded services
  const rawCategories = ['All Divisions', ...new Set((servicesData || []).map(s => s.category_name || s.category || 'General'))];



  // const faqItems = (faqs || []).slice(0, 4).map((f) => ({
  //   title: f.question || f.q,
  //   content: f.answer || f.a
  // }));

  const filteredServices = activeCategory === 'All Divisions' 
    ? (servicesData || [])
    : (servicesData || []).filter(s => (s.category_name || s.category) === activeCategory);

  if (isLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="services-page">
      <SEO 
        title={appConfig.seo.defaultTitle}
        description={appConfig.seo.defaultDescription}
        url="/services"
      />

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
            <span>Services Ecosystem</span>
          </div>

          <h1 className={styles.heroTitle}>{pageData?.title || 'Architectural & Civil Engineering Ecosystem'}</h1>
          <p className={styles.heroDesc}>{pageData?.subtitle || 'Deploying advanced delivery frameworks.'}</p>

          <div className={styles.heroCtaRow}>
            <Link to="/contact" className="btn btn-primary">Book Site Assessment</Link>
          </div>
        </div>
      </section>

      <OneStopHomeSolutions />

      <section className="section container">
        <SectionHeader
          eyebrow="Category Filter"
          heading="Specialty Services Details"
          subheading="Select a category button below to review granular service scopes."
        />

        <div className={styles.pillsContainer} style={{ marginTop: '3.5rem' }}>
          {rawCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveStep(0); }}
              className={`${styles.pillBtn} ${activeCategory === cat ? styles.pillActive : ''}`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="grid-3" style={{ marginTop: '2.5rem', gap: '2rem' }}>
          {filteredServices.map((service, idx) => (
            <MotionWrapper key={service.id || idx} variant="slideUp" delay={idx * 0.1}>
              <div className={`glass-panel ${styles.serviceCard}`}>
                <Link to={`/services/${service.id}`} className={styles.cardImage} style={{ display: 'block' }}>
                  <img 
                    src={service.image || service.detail_image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"} 
                    alt={service.title} 
                  />
                </Link>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{service.category_name || service.category}</span>
                    <span className={styles.cardTimeline}>{service.tagline || 'Premium Quality'}</span>
                  </div>
                  
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description || service.desc}</p>
                  
                  <div className={styles.cardFeatures}>
                    {(service.features || []).slice(0, 3).map((feat, fidx) => (
                      <div key={fidx} className={styles.featureItem}>
                        <div className={styles.featureDot} />
                        <span>{feat.text || feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={`/services/${service.id}`} className={styles.cardButton}>
                    Explore Specifications <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>


      {/* SECTION: 7. Grouped FAQ Accordions */}
      {/* ========================================== */}
      {/* <section id="faq" className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Questions Desk"
          heading="Ecosystem FAQs"
          subheading="Common questions detailing permit approval timelines, material supply logistics, and site PMC checks."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>
      </section> */}

      
      
    </div>
  );
};

export default Services;
