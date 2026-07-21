import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import HeroOverlay from './HeroOverlay';
import styles from './Hero.module.css';

const Hero = () => {
  const { siteSettings } = useGlobalData();
  const { pageData } = usePageData('home');
  
  // Prefer pageData.hero_video/image over siteSettings over static fallbacks
  const videoUrl = pageData?.hero_video || siteSettings?.hero_video_url || "https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-detail-with-concrete-and-glass-41763-large.mp4";
  const posterUrl = pageData?.hero_image || siteSettings?.hero_poster_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

  return (
    <div className={styles.heroContainer}>
      {/* Background Video or Image */}
      {videoUrl.endsWith('.mp4') || videoUrl.includes('mixkit') ? (
        <video
          autoPlay loop muted playsInline
          poster={posterUrl}
          className={styles.heroVideo}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${videoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      )}

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
            <span>Engineering Legacy</span>
          </div>

          {/* Headline */}
          <h1 
            className={styles.heroTitle} 
            dangerouslySetInnerHTML={{ __html: siteSettings?.hero_headline || `Your Dream<br/>Our Build<br/><span class="${styles.heroTitleAccent}">Complete Site Solutions</span> Under One Roof!` }}
          />

          {/* Subtitle */}
          {/* <p className={styles.heroSubtitle}>
            Merging structural physics with modern luxury design to build premium landmarks that endure generations. From soil audit to final keys handover.
          </p> */}

          
          <div className={styles.heroCtaGroup}>
            <Link to="/contact" className="btn btn-primary">
              Get Free Quote <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </Link>
            <Link to="/projects" className={`btn btn-secondary ${styles.btnSecondaryOutline}`}>
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
