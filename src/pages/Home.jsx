import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Clock, Users, Play, Star, Compass, AlertCircle
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { servicesData } from '../data/servicesData';
import { projectsData } from '../data/projectsData';
import { packagesData } from '../data/packagesData';
import { testimonialsData } from '../data/testimonialsData';
import { faqData } from '../data/faqData';

// Reusable / Redesigned Sections
import Hero from '../components/sections/Hero';
import TrustStrip from '../components/sections/TrustStrip';
import OneStopHomeSolutions from '../components/sections/OneStopHomeSolutions';
import MaterialBrandsExplorer from '../components/sections/MaterialBrandsExplorer';
import VideoGallery from '../components/sections/VideoGallery';
import QuoteWizard from '../components/sections/QuoteWizard';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import WhyChooseUs from '../components/sections/WhyChooseUs';

import SectionHeader from '../components/sections/SectionHeader';
import Accordion from '../components/ui/Accordion';
import MotionWrapper from '../components/common/MotionWrapper';
import MediaWrapper from '../components/common/MediaWrapper';
import Button from '../components/common/Button';
import CitySelector from '../components/common/CitySelector';
import GenericCard from '../components/cards/GenericCard';

import { HeaderThemeContext } from '../layouts/Layout';
import styles from './Home.module.css';

const Home = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'vadodara');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedHomeCardIdx, setSelectedHomeCardIdx] = useState(null);

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

  // Curated lists
  const serviceList = Object.values(servicesData).slice(0, 3); // 3 for asymmetrical grid
  const cityPackages = packagesData[selectedCity] || [];

  const serviceImages = {
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    industrial: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80'
  };

  // Testimonials slide controls
  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };
  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  // Convert FAQs preview list
  const faqItems = faqData.slice(0, 4).map((f) => ({
    title: f.q,
    content: f.a
  }));

  return (
    <div className="home-page">
      <Helmet>
        <title>{appConfig.seo.defaultTitle}</title>
        <meta name="description"       content={appConfig.seo.defaultDescription} />
        <link rel="canonical"           href={appConfig.seo.siteUrl} />
        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content={appConfig.seo.defaultTitle} />
        <meta property="og:description" content={appConfig.seo.defaultDescription} />
        <meta property="og:url"         content={appConfig.seo.siteUrl} />
        <meta property="og:image"       content={appConfig.seo.ogImage} />
        {/* Twitter Card */}
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:title"      content={appConfig.seo.defaultTitle} />
        <meta name="twitter:description" content={appConfig.seo.defaultDescription} />
        <meta name="twitter:image"      content={appConfig.seo.ogImage} />
        {/* WebSite JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': appConfig.company.name,
          'url': appConfig.seo.siteUrl,
          'description': appConfig.seo.defaultDescription
        })}</script>
      </Helmet>

      {/* 1. Cinematic Hero video loop */}
      <Hero />

      {/* 2. Thin Premium Trust Strip */}
      <TrustStrip />

      {/* 3. One Stop Home Solutions circular ecosystem */}
      <OneStopHomeSolutions />

      {/* 4. Asymmetrical Featured Services grid */}
      <section className="section container">
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
      </section>

      {/* 5. City Based Package Selector */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
            <div>
              <span className="text-overline">Estimator Packages</span>
              <h2 className="display-sm" style={{ marginTop: '0.5rem' }}>Construction Cost Packages</h2>
            </div>
            {/* City Selector */}
            <CitySelector selectedCityId={selectedCity} onChangeCity={handleCityChange} />
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

                    <div className={styles.packageFeatures}>
                      <div className={styles.featureItem}>
                        <ShieldCheck size={14} className={styles.featureIcon} />
                        <span>{pkg.materialQuality}</span>
                      </div>
                      <div className={styles.featureItem}>
                        <ShieldCheck size={14} className={styles.featureIcon} />
                        <span>Steel: {pkg.steelBrand}</span>
                      </div>
                      <div className={styles.featureItem}>
                        <ShieldCheck size={14} className={styles.featureIcon} />
                        <span>Cement: {pkg.cementBrand}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
                      <Link to="/packages" onClick={(e) => e.stopPropagation()}>
                        <Button variant={selectedHomeCardIdx === idx ? 'primary' : 'secondary'} fullWidth>
                          Compare Specifications
                        </Button>
                      </Link>
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
        </div>
      </section>

      {/* 7. Why Choose Us (Large Feature Cards) */}
      <WhyChooseUs />

      {/* 8. Featured Projects (Asymmetrical grids) */}
      <FeaturedProjects />

      {/* 9. Material Brands explorer */}
      <MaterialBrandsExplorer />

      {/* 10. Video Gallery Preview */}
      <VideoGallery />

      {/* 11. Redesigned Testimonials (Split layout with video placeholder) */}
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
                {Array.from({ length: testimonialsData[testimonialIndex].rating || 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" className={styles.starIcon} />
                ))}
              </div>
              <p className={styles.quoteBody}>
                "{testimonialsData[testimonialIndex].quote}"
              </p>
              
              <div className={styles.clientDetails}>
                <img 
                  src={`https://i.pravatar.cc/150?img=${(testimonialIndex + 12) * 3}`}
                  alt={testimonialsData[testimonialIndex].author}
                  className={styles.clientAvatar}
                />
                <div>
                  <span className={styles.clientName}>{testimonialsData[testimonialIndex].author}</span>
                  <span className={styles.clientMeta}>
                    {testimonialsData[testimonialIndex].role} &middot; <strong>{testimonialsData[testimonialIndex].project}</strong>
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



      {/* 13. FAQ Preview Accordion */}
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

      {/* 14. Quote Wizard guided calculator preview */}
      <QuoteWizard />

      {/* 15. Redesigned Final CTA */}
      <section className={styles.finalCtaSection}>
        <div className={`container ${styles.finalCtaContainer}`}>
          <h2 className={styles.ctaTitle}>Let's Build Your Dream Home Together</h2>
          <p className={styles.ctaDesc}>
            Join coordinate site consultations checks with our spatial planners and general contracting engineers to clear mechanical BOQ estimates today.
          </p>
          <div className={styles.ctaButtons}>
            <Link to="/contact" className={`btn btn-primary ${styles.btnPrimaryContrast}`}>
              Book Free Site Consultation
            </Link>
            <Link to="/packages" className={`btn btn-secondary ${styles.btnSecondaryTransparent}`}>
              Review Build Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
