import React from 'react';
import { ArrowRight, PlayCircle, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = ({ cityContext }) => {
  const badgeText = cityContext ? `Paramarsh Construction | ${cityContext}` : 'Paramarsh Construction | Vadodara';

  return (
    <section className={styles.hero}>
      {/* Background Video/Image Fallback */}
      <div className={styles.videoBackground}>
        <div className={styles.overlay}></div>
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Construction Background" 
          className={styles.bgImage}
        />
        {/* TODO: replace placeholder content with actual video asset */}
        {/* <video autoPlay loop muted playsInline className={styles.video}>
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video> */}
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.textContent}
        >
          {/* TODO: replace placeholder content */}
          <span className={styles.eyebrowBadge}>{badgeText}</span>
          
          <h1 className={styles.title}>
            Crafting Architecturally <br/>
            <span className={styles.emphasized}>Superior</span> Homes
          </h1>
          
          <p className={styles.subtext}>
            Turnkey construction solutions designed for durability, 
            aesthetics, and flawless execution from concept to handover.
          </p>
          
          <div className={styles.actions}>
            <Link to="/contact" className={`btn btn-primary ${styles.btnPrimary}`}>
              Free Consultation <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/projects" className={`btn btn-outline ${styles.btnSecondary}`}>
              View Projects <PlayCircle size={16} style={{ marginLeft: '8px' }} />
            </Link>
          </div>

          <div className={styles.stats}>
            {/* TODO: replace placeholder content */}
            <div className={styles.statPill}>
              <div className={styles.pulseDot}></div>
              <span><strong>10+</strong> Live Projects</span>
            </div>
            <div className={styles.statPill}>
              <span><strong>₹1950/sq.ft</strong> Starting Price</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className={styles.scrollIndicator}>
        <MousePointerClick size={24} />
        <span>Scroll to Explore</span>
      </div>
    </section>
  );
};

export default HeroSection;
