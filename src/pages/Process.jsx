import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import Button from '../components/Button';
import { HeaderThemeContext } from '../components/Layout';
import styles from './Process.module.css';

const Process = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, processSteps: backendSteps, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, isLoading: isPageLoading } = usePageData('process');
  const [activeStep, setActiveStep] = useState(0);

  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading dynamic content from backend...</div>;
  }

  const appConfig = siteSettings ? { seo: { defaultTitle: `${siteSettings.site_name} | Process`, defaultDescription: pageData?.subtitle || 'Our Process' } } : { seo: { defaultTitle: 'Loading...', defaultDescription: 'Loading...' } };

  const steps = backendSteps?.length > 0 ? backendSteps.map(s => ({
    phase: `Phase ${String(s.step_number).padStart(2, '0')}`,
    shortLabel: s.label || s.title,
    title: s.title,
    subtitle: s.duration || '',
    desc: s.description,
    icon: s.icon_name && Icons[s.icon_name] ? React.createElement(Icons[s.icon_name], { size: 22 }) : <Icons.HelpCircle size={22} />,
    deliverables: s.team ? [s.team] : [], // Use team as deliverables fallback since model doesn't have deliverables
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80'
  })) : [];

  const currentStage = steps[activeStep];

  return (
    <div className="process-page">
      <Helmet>
        <title>Execution Methodology | {appConfig.seo.defaultTitle}</title>
        <meta name="description" content={appConfig.seo.defaultDescription} />
      </Helmet>

      <section className={`subpage-header ${styles.processHeader}`}>
        <div className="container">
          <span className={`accent-text ${styles.processBadge}`}>Strategic Timeline</span>
          <h1 className={`title-large ${styles.processTitle}`}>{pageData?.title || 'Our Construction Process'}</h1>
          <p className={`subtitle ${styles.processSubtitle}`}>{pageData?.subtitle || 'Learn how we guide your project from soil testing and permits to finished handover, using strict quality assurance checks.'}</p>
        </div>
      </section>

      <div className={styles.pageContentWrapper}>
        <div className="container">
          {/* Stepper Navigation Track Container */}
          <div className={styles.stepperWrapper}>
            <div className={styles.stepperTrack}>
              {steps.map((stg, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                return (
                  <React.Fragment key={idx}>
                    <button
                      className={`${styles.stepNode} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                      onClick={() => setActiveStep(idx)}
                      aria-label={`Go to ${stg.title}`}
                    >
                      <span className={styles.stepNumber}>{stg.phase}</span>
                      <div className={styles.stepIconWrapper}>
                        <span className={styles.stepIcon}>{stg.icon}</span>
                      </div>
                      <span className={styles.stepLabel}>{stg.shortLabel}</span>
                    </button>
                    
                    {idx < steps.length - 1 && (
                      <div className={`${styles.connector} ${idx < activeStep ? styles.connectorCompleted : ''}`}>
                        <div className={styles.connectorFill} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Selected Stage Detail Card */}
          <div className={styles.detailCard}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={styles.cardContent}
              >
                {/* Left Side: Info (70% width) */}
                <div className={styles.cardInfo}>
                  <span className={styles.cardBadge}>{currentStage.subtitle}</span>
                  <h3 className={styles.cardTitle}>{currentStage.title}</h3>
                  <p className={styles.cardDesc}>{currentStage.desc}</p>
                  
                  <div className={styles.deliverablesSection}>
                    <h4>Key Deliverables:</h4>
                    <ul>
                      {currentStage.deliverables.map((item, dIdx) => (
                        <li key={dIdx}>
                          <CheckCircle2 size={16} className={styles.bulletIcon} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side: Image (30% width) */}
                <div className={styles.cardImageWrapper}>
                  <img 
                    src={currentStage.image} 
                    alt={currentStage.title}
                    className={styles.cardImage}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Supporting Information Card */}
          <div className={styles.infoBanner}>
            <div className={styles.infoBannerLeft}>
              <div className={styles.infoBannerIconWrapper}>
                <HardHat size={32} className={styles.infoBannerIcon} />
              </div>
              <div className={styles.infoBannerText}>
                <h4>From Concept to Completion, We Build with Trust.</h4>
                <p>Our streamlined process ensures your project is delivered on time, within budget, and with complete transparency.</p>
              </div>
            </div>
            <div className={styles.infoBannerRight}>
              <Link to="/contact">
                <Button variant="primary">Schedule a Consultation</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
