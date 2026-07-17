import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Users, FileText, MapPin, HardHat, ShieldCheck, Home, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import Button from '../components/Button';
import { HeaderThemeContext } from '../components/Layout';
import styles from './Process.module.css';

const Process = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, isLoading: isGlobalLoading } = useGlobalData();
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

  const steps = [
    {
      phase: 'Phase 01',
      shortLabel: 'Consultation',
      title: 'Consultation & Spatial Blueprinting',
      subtitle: 'Week 1 to 4',
      desc: 'We conduct architectural brainstorming, prepare 3D visual models, analyze site soils, and draft the first estimation tables (BOQ).',
      icon: <Users size={22} />,
      deliverables: ['3D Visual Models', 'Soil Analysis Report', 'BOQ Estimation Table'],
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80'
    },
    {
      phase: 'Phase 02',
      shortLabel: 'Zoning Clearance',
      title: 'Zoning Approval & Procurement',
      subtitle: 'Week 5 to 8',
      desc: 'Our legal desks submit structural documentation to state agencies for clearance while locking in material supply chains.',
      icon: <FileText size={22} />,
      deliverables: ['Regulatory Permissions', 'Material Procurement Plan', 'Structural NOCs'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80'
    },
    {
      phase: 'Phase 03',
      shortLabel: 'Excavation',
      title: 'Site Preparation & Substructures',
      subtitle: 'Month 3',
      desc: 'Excavation machinery grades the soil, setups anti-termite shields, and pours heavy concrete foundations.',
      icon: <MapPin size={22} />,
      deliverables: ['Site Excavation Complete', 'Anti-Termite Shield Setup', 'Concrete Foundation Poured'],
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80'
    },
    {
      phase: 'Phase 04',
      shortLabel: 'Framework',
      title: 'Superstructure Framework Assembly',
      subtitle: 'Month 4 to 6',
      desc: 'Steel pillars or concrete slabs take shape. Walls are laid out using energy-efficient AAC brick masonry.',
      icon: <HardHat size={22} />,
      deliverables: ['RCC Column Pillars Framed', 'Ceiling Slabs Curing', 'AAC Block Walls Built'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
    },
    {
      phase: 'Phase 05',
      shortLabel: 'Integration',
      title: 'MEP Integration & Wet Finishes',
      subtitle: 'Month 7 to 9',
      desc: 'Plumbing conduits, electrical lines, HVAC nodes, and initial wall plastering work are executed concurrently.',
      icon: <ShieldCheck size={22} />,
      deliverables: ['Concealed Wiring & Piping', 'HVAC Ducting Complete', 'Initial Wall Plastering'],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80'
    },
    {
      phase: 'Phase 06',
      shortLabel: 'Handover',
      title: 'Premium Handovers & Quality Checks',
      subtitle: 'Month 10 to 12',
      desc: 'Applying finish coats, flooring tiles, smart controls setup, final compliance clearances, and key delivery.',
      icon: <Home size={22} />,
      deliverables: ['Flooring & Painting Complete', 'Final Compliance Audited', 'Keys Handed Over'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80'
    }
  ];

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
