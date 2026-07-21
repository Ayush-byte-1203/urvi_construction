import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Clock, Users, Play, Star, Compass, AlertCircle
} from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';

// Reusable / Redesigned Sections
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import OneStopHomeSolutions from '../components/OneStopHomeSolutions';

// import VideoGallery from '../components/VideoGallery';
import QuoteWizard from '../components/QuoteWizard';
import FeaturedProjects from '../components/FeaturedProjects';
import WhyChooseUs from '../components/WhyChooseUs';

import SectionHeader from '../components/SectionHeader';
import Accordion from '../components/Accordion';
import MotionWrapper from '../components/MotionWrapper';
import MediaWrapper from '../components/MediaWrapper';
import Button from '../components/Button';


import CitySelector from '../components/CitySelector';
import GenericCard from '../components/GenericCard';
import PackageComparisonTable from '../components/PackageComparisonTable';

import { HeaderThemeContext } from '../components/Layout';
import styles from './Home.module.css';

const Home = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'vadodara');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedHomeCardIdx, setSelectedHomeCardIdx] = useState(null);
  const [showComparison, setShowComparison] = useState(false);

  const {
    siteSettings,
    services: servicesData,
    packages: rawPackages,
    projects: projectsData,
    testimonials: testimonialsData,
    faqs: faqData,
    isLoading: isGlobalLoading
  } = useGlobalData();

  const { pageData, sections, isLoading: isPageLoading } = usePageData('home');
  const isLoading = isGlobalLoading || isPageLoading;

  // Derive appConfig fallback
  const appConfig = siteSettings ? {
    company: { name: siteSettings.site_name, email: siteSettings.contact_email, phone: siteSettings.contact_phone, address: siteSettings.address },
    seo: { defaultTitle: `${siteSettings.site_name} | Home`, defaultDescription: pageData?.subtitle || 'Welcome', siteUrl: 'http://localhost:5173' }
  } : { company: { name: 'Loading...' }, seo: { defaultTitle: 'Loading...', defaultDescription: 'Loading...', siteUrl: '' } };

  const packagesData = React.useMemo(() => {
    return (rawPackages || []).reduce((acc, pkg) => {
      const city = pkg.city || 'vadodara';
      if (!acc[city]) acc[city] = [];
      acc[city].push(pkg);
      return acc;
    }, {});
  }, [rawPackages]);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  // Sync city updates from Navbar CitySelector
  useEffect(() => {
    const syncCity = () => {
      setSelectedCity(localStorage.getItem('selectedCity') || 'vadodara');
    };
    window.addEventListener('cityChanged', syncCity);
    return () => window.removeEventListener('cityChanged', syncCity);
  }, []);

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    window.dispatchEvent(new Event('cityChanged'));
  };



  // Curated
  const serviceList = Object.values(servicesData || {}).slice(0, 3); // 3 for asymmetrical grid
  const cityPackages = packagesData[selectedCity] || [];

  const serviceImages = {
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    industrial: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  };

  // Testimonials slide controls
  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? (testimonialsData || []).length - 1 : prev - 1));
  };
  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === (testimonialsData || []).length - 1 ? 0 : prev + 1));
  };

  // Convert FAQs preview list
  const faqItems = (faqData || []).slice(0, 4).map((f) => ({
    title: f.question || f.q,
    content: f.answer || f.a
  }));

  return (
    <div className="home-page">
      <Helmet>
        <title>{appConfig.seo.defaultTitle}</title>
        <meta name="description" content={appConfig.seo.defaultDescription} />
        <link rel="canonical" href={appConfig.seo.siteUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={appConfig.seo.defaultTitle} />
        <meta property="og:description" content={appConfig.seo.defaultDescription} />
        <meta property="og:url" content={appConfig.seo.siteUrl} />
        <meta property="og:image" content={appConfig.seo.ogImage} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={appConfig.seo.defaultTitle} />
        <meta name="twitter:description" content={appConfig.seo.defaultDescription} />
        <meta name="twitter:image" content={appConfig.seo.ogImage} />
        {/* WebSite JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': appConfig.company.name,
          'url': appConfig.seo.siteUrl,
          'description': appConfig.seo.defaultDescription
        })}</script>
      </Helmet>

      {/* ========================================== */}
      {/* SECTION: 1. Cinematic Hero video loop */}
      {/* ========================================== */}
      <Hero />

      {/* ========================================== */}
      {/* SECTION: 2. Thin Premium Trust Strip */}
      {/* ========================================== */}
      <TrustStrip />

      {/* ========================================== */}
      {/* SECTION: 3. One Stop Home Solutions circular ecosystem */}
      {/* ========================================== */}
      <OneStopHomeSolutions />

      {/* ========================================== */}
      {/* SECTION: 4. Asymmetrical Featured Services grid */}
      {/* ========================================== */}
      {/* <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <div>
            <span className="text-overline">Services Showcase</span>
            <h2 className="display-sm" style={{ marginTop: '0.5rem' }}>Precision Engineered Divisions</h2>
          </div>
          <Link to="/services">
            <Button variant="secondary">All Services <ArrowRight size={16} /></Button>
          </Link>
        </div>

        <div className={styles.servicesAsymmetricGrid}>
          {serviceList.map((service, idx) => {
            const isLarge = idx === 0;
            return (
              <MotionWrapper
                key={service.id}
                variant="slideUp"
                delay={idx * 0.1}
                className={`glass-panel ${isLarge ? styles.serviceCardLarge : styles.serviceCardSmall}`}
              >
                <div className={isLarge ? styles.largeLayout : styles.smallLayout}>
                  <div className={styles.cardImageWrapper}>
                    <img 
                      src={serviceImages[service.id]} 
                      alt={service.title} 
                      className={styles.cardImg} 
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTag}>{service.tagline}</span>
                    <h3 className={styles.cardTitle}>{service.title}</h3>
                    <p className={styles.cardDesc}>{service.desc}</p>
                    
                    <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                      <span className={styles.benefitText}>Key Benefit: Quality Audits</span>
                      <Link to={`/services/${service.id}`} className={styles.cardCta}>
                        Explore Division <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </MotionWrapper>
            );
          })}
        </div>
      </section> */}

      {/* ========================================== */}
      {/* SECTION: 5. City Based Package Selector */}
      {/* ========================================== */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
            <div>
              <span className="text-overline">Estimator Packages</span>
              <h2 className="display-sm" style={{ marginTop: '0.5rem' }}>Construction Cost Packages</h2>
            </div>
            {/* ========================================== */}
            {/* SECTION: City Selector */}
            {/* ========================================== */}
            {/* make s<CitySelector selectedCityId={selectedCity} onChangeCity={handleCityChange} /> */}
          </div>

          {cityPackages.length > 0 ? (
            <div className="grid-3">
              {cityPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedHomeCardIdx(idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <MotionWrapper
                    variant="slideUp"
                    delay={idx * 0.15}
                    className={`${styles.packageCard} ${selectedHomeCardIdx === idx ? styles.activePackageCard : ''}`}
                  >
                    <div className={styles.packageHeader}>
                      <h4 className={styles.packageName}>{pkg.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                        <span className={styles.packagePrice}>{pkg.price}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pkg.unit}</span>
                      </div>
                      <span className="text-caption" style={{ display: 'block', marginTop: '0.5rem', color: 'var(--accent)' }}>{pkg.timeline}</span>
                    </div>

                    {/* <div className={styles.packageFeatures}>
                      <div className={styles.featureItem}>
                        <ShieldCheck size={14} className={styles.featureIcon} />
                        <span>Steel: {pkg.steelBrand}</span>
                      </div>
                      <div className={styles.featureItem}>
                        <ShieldCheck size={14} className={styles.featureIcon} />
                        <span>Cement: {pkg.cementBrand}</span>
                      </div>
                    </div> */}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                      <div onClick={(e) => { e.stopPropagation(); setShowComparison(!showComparison); }}>
                        <Button variant={selectedHomeCardIdx === idx ? 'primary' : 'secondary'} fullWidth>
                          {showComparison ? "Hide Specifications" : "Compare Specifications"}
                        </Button>
                      </div>
                      <Link to="/contact" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" fullWidth>
                          Request Quote estimation
                        </Button>
                      </Link>
                    </div>
                  </MotionWrapper>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              No construction packages available for the selected city.
            </div>
          )}

          {showComparison && cityPackages.length > 0 && (
            <PackageComparisonTable packageTiers={cityPackages} />
          )}
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: 7. Why Choose Us (Large Feature Cards) */}
      {/* ========================================== */}
      <WhyChooseUs />

      {/* ========================================== */}
      {/* SECTION: 8. Featured Projects (Asymmetrical grids) */}
      {/* ========================================== */}
      <FeaturedProjects />


      {/* ========================================== */}
      {/* SECTION: 10. Video Gallery Preview */}
      {/* ========================================== */}
      {/* <VideoGallery /> */}

      {/* ========================================== */}
      {/* SECTION: 11. Redesigned Testimonials (Split layout with video placeholder) */}
      {/* ========================================== */}
      <section className="section container">
        <SectionHeader
          eyebrow="Reviews"
          heading="Verified Owner Testimonials"
          subheading="Read how our structural planning desk and scheduling managers coordinate sites to build satisfaction."
        />

        <div className={styles.testimonialWrapper} style={{ marginTop: '3.5rem' }}>
          <div className={`glass-panel ${styles.testimonialSplitCard}`}>
            {/* Left Column: Client feedback info */}
            <div className={styles.testimonialTextContent}>
              <div className={styles.ratingRow}>
                {(testimonialsData || []).length > 0 && Array.from({ length: testimonialsData[testimonialIndex]?.rating || 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" className={styles.starIcon} />
                ))}
              </div>
              <p className={styles.quoteBody}>
                "{(testimonialsData || []).length > 0 ? (testimonialsData[testimonialIndex]?.content || testimonialsData[testimonialIndex]?.quote) : 'Loading...'}"
              </p>

              <div className={styles.clientDetails}>
                <img
                  src={(testimonialsData || []).length > 0 && testimonialsData[testimonialIndex]?.image ? testimonialsData[testimonialIndex].image : `https://i.pravatar.cc/150?img=${(testimonialIndex + 12) * 3}`}
                  alt={(testimonialsData || []).length > 0 ? (testimonialsData[testimonialIndex]?.name || testimonialsData[testimonialIndex]?.author) : ''}
                  className={styles.clientAvatar}
                />
                <div>
                  <span className={styles.clientName}>{(testimonialsData || []).length > 0 ? (testimonialsData[testimonialIndex]?.name || testimonialsData[testimonialIndex]?.author) : ''}</span>
                  <span className={styles.clientMeta}>
                    {(testimonialsData || []).length > 0 ? testimonialsData[testimonialIndex]?.role : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Video testimonial mockup placeholder */}
            <div className={styles.videoMockup}>
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                alt="Construction Staging Review Mock"
                className={styles.mockupBg}
              />
              <div className={styles.mockupOverlay} />
              <button
                className={styles.mockupPlayBtn}
                onClick={() => alert('Launching video testimonial walkthrough overlay.')}
                aria-label="Play video testimonial"
              >
                <Play size={20} fill="currentColor" />
              </button>
              <span className={styles.mockupLength}>Watch Story</span>
            </div>
          </div>

          {/* Testimonial slider controllers */}
          <div className={styles.carouselControls}>
            <Button variant="secondary" onClick={handlePrevTestimonial} aria-label="Previous review" style={{ padding: '0.5rem 1rem' }}>
              &larr; Prev
            </Button>
            <Button variant="secondary" onClick={handleNextTestimonial} aria-label="Next review" style={{ padding: '0.5rem 1rem' }}>
              Next &rarr;
            </Button>
          </div>
        </div>
      </section>



      {/* ========================================== */}
      {/* SECTION: 13. FAQ Preview Accordion */}
      {/* ========================================== */}
      <section className="section container-narrow">
        <SectionHeader
          eyebrow="Questions & Answers"
          heading="Frequently Asked Questions"
          subheading="Clear parameters about structural plans, material choices, billing lists, and schedule tracking."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <Link to="/faq">
            <Button variant="outline" iconRight={<ArrowRight size={16} />}>
              Read Full Q&A Database
            </Button>
          </Link>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: 14. Quote Wizard guided calculator preview */}
      {/* ========================================== */}
      <QuoteWizard />



    </div>
  );
};

export default Home;
