import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, HardHat, Sparkles, FileCheck, FileText, Package, Cpu, Shield, Leaf, ArrowRight, CheckCircle2
} from 'lucide-react';
import SectionHeader from '@sections/SectionHeader';
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

  const services = [
    {
      icon: <Compass size={28} />,
      title: 'Architecture',
      desc: 'BIM-coordinated 3D coordinate drafting cell creating luxury layouts with millimetric precision.',
      deliverables: ['BIM 3D Model', 'Detailed Floor Plans', 'Exterior Facade Design', 'Structural Layouts'],
      timeline: '15–20 Days',
      badge: 'Elite Planning',
      related: ['Construction', 'Interior Design', 'PMC'],
      path: '/services'
    },
    {
      icon: <HardHat size={28} />,
      title: 'Construction',
      desc: 'Certified general contracting teams pouring EAF steel and anti-curing concrete foundations.',
      deliverables: ['Foundation RCC Pouring', 'Superstructure Masonry', 'Curing Supervision', 'Slab Casting'],
      timeline: '180–240 Days',
      badge: 'Turnkey Contract',
      related: ['Architecture', 'Material Supply', 'PMC'],
      path: '/services'
    },
    {
      icon: <Sparkles size={28} />,
      title: 'Interior Design',
      desc: 'Custom interior fit-outs, vitrified floor maps, and champagne bronze layout coordinates.',
      deliverables: ['3D Space Visualization', 'Material Selection Boards', 'False Ceiling Layouts', 'Custom Cabinets'],
      timeline: '30–45 Days',
      badge: 'Luxury Fit-out',
      related: ['Architecture', 'Smart Home', 'Landscape'],
      path: '/services'
    },
    {
      icon: <FileCheck size={28} />,
      title: 'PMC',
      desc: 'Project Management Consultancy providing site schedules verification and BOQ audit updates.',
      deliverables: ['BOQ Audits', 'Quality Inspection Logs', 'Milestone Verifications', 'Cost Controls Reporting'],
      timeline: 'Ongoing Support',
      badge: 'Independent Audit',
      related: ['Construction', 'Legal Assistance', 'Approval'],
      path: '/services'
    },
    {
      icon: <FileText size={28} />,
      title: 'Plan Approval',
      desc: 'Handling soil geotech evaluations clearances and local municipality permissions files processing.',
      deliverables: ['Zoning Permissions', 'Geotech Soil Reports', 'Municipality Submissions', 'Sanction NOC Clearance'],
      timeline: '30–60 Days',
      badge: 'Liaison Support',
      related: ['Architecture', 'Legal Assistance', 'PMC'],
      path: '/services'
    },
    {
      icon: <Package size={28} />,
      title: 'Material Supply',
      desc: 'Direct supplier yards network providing high-grade cement and Fe 550D rebar steel.',
      deliverables: ['Direct Supply Logistics', 'Fe 550D Steel Deliveries', 'Quality Cement Sourcing', 'Batch Testing Reports'],
      timeline: 'As Scheduled',
      badge: 'Supply Chain',
      related: ['Construction', 'PMC', 'Renovation'],
      path: '/services'
    },
    {
      icon: <Cpu size={28} />,
      title: 'Smart Home',
      desc: 'Low-voltage home automations, ambient light routing, and CCTV sensory security grids.',
      deliverables: ['Concealed Cabling', 'Automated Switchboards', 'CCTV Security Setup', 'Voice Control Config'],
      timeline: '10–15 Days',
      badge: 'Tech Upgrade',
      related: ['Interior Design', 'Architecture', 'Renovation'],
      path: '/services'
    },
    {
      icon: <Sparkles size={28} />, // Reusing sparkles for renovation
      title: 'Renovation',
      desc: 'High-end remodeling mapping custom villa extensions and structural reinforcement updates.',
      deliverables: ['Structural Reinforcements', 'Wall Remodeling', 'Dampness Treatments', 'Plumbing Overhauls'],
      timeline: '30–90 Days',
      badge: 'Remodeling Contract',
      related: ['Construction', 'Material Supply', 'Smart Home'],
      path: '/services'
    },
    {
      icon: <Shield size={28} />,
      title: 'Legal Assistance',
      desc: 'Clearing zoning bounds disputes and drafting escrow milestone agreements.',
      deliverables: ['Milestone Escrow Drafting', 'Zoning Boundaries Audits', 'Title Clearances Records', 'Regulatory NOCs Check'],
      timeline: '7–10 Days',
      badge: 'Risk Mitigation',
      related: ['PMC', 'Plan Approval', 'Construction'],
      path: '/services'
    },
    {
      icon: <Leaf size={28} />,
      title: 'Landscape',
      desc: 'Eco-conscious green landscape layouts featuring carbon-absorbing concrete borders.',
      deliverables: ['Eco-conscious Green Borders', 'Garden Lighting Design', 'Carbon-absorbing Drainage', 'Foliage Layout Plans'],
      timeline: '15–30 Days',
      badge: 'Eco Design',
      related: ['Interior Design', 'Architecture', 'Construction'],
      path: '/services'
    }
  ];

  const activeService = services[hoveredIdx];

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
            {activeService.icon}
          </div>
          <div>
            <span className={styles.previewBadge}>{activeService.badge}</span>
            <h3 className={styles.previewTitle}>{activeService.title}</h3>
          </div>
        </div>

        <p className={styles.previewDesc}>{activeService.desc}</p>

        <div className={styles.deliverablesSection}>
          <h4>Key Deliverables</h4>
          <div className={styles.deliverablesGrid}>
            {activeService.deliverables.map((item, idx) => (
              <div key={idx} className={styles.deliverableItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panelMetaGrid}>
          <div className={styles.metaBox}>
            <span className={styles.metaLabel}>Estimated Timeline</span>
            <strong className={styles.metaValue}>{activeService.timeline}</strong>
          </div>
        </div>

        <div className={styles.relatedSection}>
          <span className={styles.metaLabel}>Related Specialities</span>
          <div className={styles.relatedChips}>
            {activeService.related.map((chip, idx) => (
              <span key={idx} className={styles.chip}>{chip}</span>
            ))}
          </div>
        </div>

        <Link to={activeService.path} className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center', justifyContent: 'center' }}>
          Learn More <ArrowRight size={16} style={{ marginLeft: '6px' }} />
        </Link>
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
            {services.map((item, idx) => {
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
