import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import SectionHeader from './SectionHeader';
import styles from './OneStopHomeSolutions.module.css';

const OneStopHomeSolutions = () => {
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { services: backendServices, isLoading } = useGlobalData();
  const services = backendServices?.length > 0 ? backendServices.map(s => ({
    icon: s.icon_name && Icons[s.icon_name] ? React.createElement(Icons[s.icon_name], { size: 28 }) : <Icons.HelpCircle size={28} />,
    title: s.title,
    desc: s.description,
    deliverables: s.features || [],
    timeline: s.tagline || 'Contact us', // using tagline for timeline fallback
    badge: s.category?.name || 'Service',
    related: [],
    path: `/services/${s.id}`
  })) : [];

  const activeService = services[hoveredIdx] || services[0];

  const renderPreviewPanel = (isMobileView = false) => {
    return (
      <motion.div 
        key={hoveredIdx}
        initial={{ opacity: 0, x: isMobileView ? 0 : 20, y: isMobileView ? 10 : 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.previewPanel}
      >
        <div className={styles.previewHeader}>
          <div className={styles.previewIconWrapper}>
            {activeService?.icon}
          </div>
          <div>
            <span className={styles.previewBadge}>{activeService?.badge}</span>
            <h3 className={styles.previewTitle}>{activeService?.title}</h3>
          </div>
        </div>

        <p className={styles.previewDesc}>{activeService?.desc}</p>

        <div className={styles.deliverablesSection}>
          <h4>Key Deliverables</h4>
          <div className={styles.deliverablesGrid}>
            {activeService?.deliverables?.map((item, idx) => (
              <div key={idx} className={styles.deliverableItem}>
                <Icons.CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panelMetaGrid}>
          <div className={styles.metaBox}>
            <span className={styles.metaLabel}>Estimated Timeline</span>
            <strong className={styles.metaValue}>{activeService?.timeline}</strong>
          </div>
        </div>

        <div className={styles.relatedSection}>
          <span className={styles.metaLabel}>Related Specialities</span>
          <div className={styles.relatedChips}>
            {activeService?.related?.map((chip, idx) => (
              <span key={idx} className={styles.chip}>{chip}</span>
            ))}
          </div>
        </div>

        {/* <Link to={activeService.path} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center', justifyContent: 'center' }}>
          Learn More <ArrowRight size={16} style={{ marginLeft: '6px' }} />
        </Link> */}
      </motion.div>
    );
  };

  return (
    <section className={`section ${styles.solutionsSection}`} id="solutions">
      {/* Animated background blobs */}
      <div className={styles.bgBlob} />
      <div className={styles.bgBlob2} />
      <div className={styles.gridPattern} />

      <div className="container">
        <SectionHeader
          eyebrow="One Stop Solutions"
          heading="End-to-End Home Solutions"
          subheading="A unified framework mapping structural safety, premium supply chain logistics, smart upgrades, and legal approvals."
        />

        <div className={styles.interactiveLayout} style={{ marginTop: '4rem' }}>
          {/* Left Column: Grid of Service Cards */}
          <div className={styles.cardsGrid}>
            {services?.map((item, idx) => {
              const isActive = idx === hoveredIdx;
              return (
                <React.Fragment key={idx}>
                  <motion.div
                    className={`${styles.serviceCard} ${isActive ? styles.serviceCardActive : ''}`}
                    onClick={() => setHoveredIdx(idx)}
                    onMouseEnter={() => !isMobile && setHoveredIdx(idx)}
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.iconContainer}>
                        {item.icon}
                      </div>
                      <h4>{item.title}</h4>
                    </div>
                  </motion.div>

                  {/* Render preview inline below active card on mobile */}
                  {isActive && isMobile && (
                    <div className={styles.mobilePreviewWrapper}>
                      {renderPreviewPanel(true)}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Panel (Desktop/Tablet) */}
          {!isMobile && (
            <div className={styles.previewPanelWrapper}>
              <AnimatePresence mode="wait">
                {renderPreviewPanel(false)}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OneStopHomeSolutions;
