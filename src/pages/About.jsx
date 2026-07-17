import React, { useContext, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Target, Shield, Clock, Compass, Ruler, Lightbulb, ChevronRight
} from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import { statsData } from '../data/statsData';
import { appConfig } from '../data/appConfig';
import SectionHeader from '../components/SectionHeader';
import PremiumTimeline from '../components/PremiumTimeline';
import MotionWrapper from '../components/MotionWrapper';
import MediaWrapper from '../components/MediaWrapper';
import Button from '../components/Button';
import sample1 from '../Images/sample1.jpeg';
import sample2 from '../Images/sample2.jpeg';
import sample3 from '../Images/sample3.jpeg';
import sample4 from '../Images/sample4.jpeg';

import HeroOverlay from '../components/HeroOverlay';
import { HeaderThemeContext } from '../components/Layout';
import styles from './About.module.css';

const About = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const containerRef = useRef(null);
  const { siteSettings, coreValues, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, sections, isLoading: isPageLoading } = usePageData('about');
  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);



  const seoConfig = siteSettings ? { seo: { defaultTitle: `${siteSettings.site_name} | About`, defaultDescription: pageData?.subtitle || 'About Us', siteUrl: '' } } : { seo: { defaultTitle: 'Loading...', defaultDescription: 'Loading...', siteUrl: '' } };

  const galleryImages = [
    sample1,
    sample2,
    sample3,
    sample4,
  ];

  return (
    <div className="about-page">
      <Helmet>
        <title>{seoConfig.seo.defaultTitle}</title>
        <meta name="description" content="Discover our history of engineering landmarks, certifications, partner networks, and values that make us Vadodara's premier construction company." />
      </Helmet>

      {/* ========================================== */}
      {/* SECTION: Breadcrumbs Subpage Hero */}
      {/* ========================================== */}
      <section className={styles.hero}>
        <HeroOverlay type="dark" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>About Us</span>
          </div>
          <div className={styles.heroText}>
            {/* <span className={styles.heroEyebrow}>Legacy of Excellence</span> */}
            <h1 className={styles.heroTitle}>{pageData?.title || 'Precision Meets Passion'}</h1>
            <p className={styles.heroDesc}>
              {pageData?.subtitle || `For over two decades, ${appConfig.company.name} has been at the forefront of architectural innovation and structural integrity.`}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Heritage split layout */}
      {/* ========================================== */}
      <section className="section container">
        <div className={styles.overviewSplit}>
          <MotionWrapper variant="slideRight" className={styles.overviewText}>
            <span className="text-overline">Heritage & Foundation</span>
            <h2 className="display-sm">Engineered for Lifetimes</h2>
            <p className="text-body-md">
              
Built to last
"We believe a premium home shouldn't demand an compromised budget. We deliver exact structural excellence tailored to your financial plan."


            </p>
            <p className="text-body-sm" style={{ color: 'var(--text-muted)' }}>
              Headquartered in Placeholder City, we maintain a zero-incident safety track record across all our residential, commercial, and industrial sites.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="slideLeft">
            <div className={styles.overviewImageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                alt={`${appConfig.company.name} Engineering Staging`}
                className={styles.overviewImage}
              />
              
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Vision & Mission Cards */}
      {/* ========================================== */}
      <section className={styles.visionMissionSection}>
        <div className="container grid-2" style={{ gap: '3rem' }}>
          <MotionWrapper variant="slideUp" className={styles.visionCard}>
            <Target size={36} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardDesc}>
              To eliminate the stress and delays of traditional construction by delivering transparent planning, premium materials, and certified engineering standards
            </p>
          </MotionWrapper>

          <MotionWrapper variant="slideUp" delay={0.15} className={styles.visionCard}>
            <Compass size={36} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardDesc}>
              To shape the future of modern living by crafting durable, sustainable, and structurally flawless properties engineered to protect generations to come.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Core Values Grid */}
      {/* ========================================== */}
      <section className="section container">
        <SectionHeader
          eyebrow="Core Values"
          heading={pageData?.title || "What Governs Our Sites"}
          subheading={pageData?.subtitle || "Our engineering supervisors, design coordinators, and contractors operate under strict guidelines to ensure quality."}
        />

        <div className={styles.valuesGrid}>
          {coreValues && coreValues.map((val, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.08} className={styles.valueCard}>
              <div style={{ color: 'var(--accent)', marginBottom: '0.25rem' }}>{val.icon_name}</div>
              <h4 className={styles.valueTitle}>{val.title}</h4>
              <ul className={styles.valueDesc} style={{ paddingLeft: '1.25rem', margin: 0, listStyleType: 'disc' }}>
                {Array.isArray(val.description) ? val.description.map((bullet, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{bullet}</li>
                )) : <li>{val.description || val.desc}</li>}
              </ul>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Company Timeline milestones */}
      {/* ========================================== */}
      {/* <PremiumTimeline
        eyebrow="Milestones"
        heading="Historical Staged Timeline"
        subheading="Review our trajectory from boutique residential drafts to heavy civil logistics developers."
        steps={timelineSteps}
      /> */}

      {/* ========================================== */}
      {/* SECTION: Office & Site Gallery */}
      {/* ========================================== */}
      <section className="section container">
        <SectionHeader
          eyebrow="Active Operations"
          heading="Operations Gallery"
          subheading="A visual look into our structural construction yards, drafting offices, and completed projects."
        />

        <div className={styles.galleryGrid}>
          {galleryImages.map((src, idx) => (
            <MotionWrapper key={idx} variant="scale" delay={idx * 0.1} className="glass-panel" style={{ overflow: 'hidden' }}>
              <MediaWrapper
                src={src}
                alt={`${appConfig.company.name} Operation ${idx + 1}`}
                aspectRatio="16/10"
                style={{ transition: 'transform var(--transition-slow)' }}
              />
            </MotionWrapper>
          ))}
        </div>
      </section>

      
      
    </div>
  );
};

export default About;
