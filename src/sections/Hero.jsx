import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroOverlay from '@components/HeroOverlay';
import styles from './Hero.module.css';

const Hero = () => {
  const videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-detail-with-concrete-and-glass-41763-large.mp4";
  const posterUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

  return (
    <div className={styles.heroContainer}>
      {/* Background Video */}
      <video
        autoPlay loop muted playsInline
        poster={posterUrl}
        className={styles.heroVideo}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Reusable Standardized Hero Overlay */}
      <HeroOverlay type="video" />

      {/* Content */}
      <div className={`container ${styles.heroContentWrapper}`}>
        <motion.div
          className={styles.heroTextBlock}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Eyebrow Badge */}
          <div className={styles.heroEyebrow}>
            <ShieldCheck size={14} />
            <span>Engineering Legacy &bull; Since 2011</span>
          </div>

          {/* Headline */}
          <h1 className={styles.heroTitle}>
            We Engineer <br />
            <span className={styles.heroTitleAccent}>Architectural</span> Masterpieces
          </h1>

          {/* Subtitle */}
          <p className={styles.heroSubtitle}>
            Merging structural physics with modern luxury design to build premium landmarks that endure generations. From soil audit to final keys handover.
          </p>

          
          <div className={styles.heroCtaGroup}>
            <Link to="/contact" className="btn btn-primary">
              Get Free Quote <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </Link>
            <Link to="/projects" className={`btn btn-secondary ${styles.btnSecondaryOutline}`}>
              View Projects
            </Link>
          </div>
        </motion.div>

        {/* Floating Information Panel */}
        <motion.div
          className={styles.floatingPanel}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        >
          <h4 className={styles.panelTitle}>BuildCraft Commitments</h4>
          <div className={styles.panelItems}>
            <div className={styles.panelItem}>
              <ShieldCheck size={16} className={styles.itemIcon} />
              <span>Premium Materials Sourcing</span>
            </div>
            <div className={styles.panelItem}>
              <Clock size={16} className={styles.itemIcon} />
              <span>Fixed Handover Timeline</span>
            </div>
            <div className={styles.panelItem}>
              <Users size={16} className={styles.itemIcon} />
              <span>Dedicated Project Manager</span>
            </div>
            <div className={styles.panelItem}>
              <Award size={16} className={styles.itemIcon} />
              <span>Transparent BOQ Billing</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
