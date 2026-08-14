import React from 'react';
import { ArrowRight, PlayCircle, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';
import { useGlobalData } from '../../context/GlobalDataContext';
import { usePageData } from '../../hooks/usePageData';
import Skeleton from '../Skeleton';

const HeroSection = ({ cityContext }) => {
  const { siteSettings, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, isLoading: isPageLoading } = usePageData('home');
  const isLoading = isGlobalLoading || isPageLoading;

  const siteName = siteSettings?.site_name || 'Paramarsh Construction';
  const badgeText = cityContext ? `${siteName} | ${cityContext}` : `${siteName} | Vadodara`;
  
  const bgImage = isLoading ? null : (pageData?.hero_image || siteSettings?.hero_poster_url || null);

  return (
    <section className={styles.hero}>
      {/* Background Video/Image Fallback */}
      <div className={styles.videoBackground}>
        <div className={styles.overlay}></div>
        {isLoading ? (
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
            <Skeleton width="100%" height="100%" />
          </div>
        ) : siteSettings?.hero_video_url ? (
          <video autoPlay loop muted playsInline className={styles.bgImage} poster={bgImage || undefined}>
            <source src={siteSettings.hero_video_url} type="video/mp4" />
          </video>
        ) : bgImage ? (
          <img 
            src={bgImage} 
            alt="Luxury Construction Background" 
            className={styles.bgImage}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', backgroundColor: '#111', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
        )}
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.textContent}
        >
          <span className={styles.eyebrowBadge}>{badgeText}</span>
          
          {siteSettings?.hero_headline ? (
            <h1 className={styles.title} dangerouslySetInnerHTML={{ __html: siteSettings.hero_headline }} />
          ) : (
            <h1 className={styles.title}>
              Crafting Architecturally <br/>
              <span className={styles.emphasized}>Superior</span> Homes
            </h1>
          )}
          
          <p className={styles.subtext}>
            {siteSettings?.hero_subtext || "Turnkey construction solutions designed for durability, aesthetics, and flawless execution from concept to handover."}
          </p>
          
          <div className={styles.actions}>
            <Link to="/contact" className={`btn btn-primary ${styles.btnPrimary}`}>
              {siteSettings?.hero_primary_btn_text || "Free Consultation"} <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/about#projects" className={`btn btn-outline ${styles.btnSecondary}`}>
              {siteSettings?.hero_secondary_btn_text || "View Projects"} <PlayCircle size={16} style={{ marginLeft: '8px' }} />
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statPill}>
              <span className={styles.pulseDot}></span>
              <span>{siteSettings?.hero_stat_pill_1 || "10+ Live Projects"}</span>
            </div>
            <div className={styles.statPill}>
              <MousePointerClick size={14} style={{ color: 'var(--brand-yellow-dark, #D97706)' }} />
              <span>{siteSettings?.hero_stat_pill_2 || "₹1600/sq.ft Starting Price"}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
