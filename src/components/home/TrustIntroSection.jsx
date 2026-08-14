import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './TrustIntroSection.module.css';
import { useGlobalData } from '../../context/GlobalDataContext';
import Skeleton from '../Skeleton';
import pic1Img from '../../Images/pic1.jpeg';

const defaultChecklist = [
  "150+ Point Quality Inspection",
  "Fixed-Price Guarantee",
  "On-Time Handover",
  "25-Year Structural Warranty"
];

const TrustIntroSection = () => {
  const { trustFeatures, siteSettings, isLoading } = useGlobalData();
  const listItems = (trustFeatures && trustFeatures.length > 0)
    ? trustFeatures.map(item => item.title)
    : defaultChecklist;
  const introImg = siteSettings?.trust_section_image || (isLoading ? null : pic1Img);

  return (
    <section className={`section ${styles.trustSection}`}>
      <div className={`container ${styles.grid}`}>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className={styles.textContent}
        >
          <span className={styles.badge}>100% Turnkey Solutions</span>
          <h2 className="display-sm">We Build More Than Houses. <br/>We Build <span className="text-accent">Certainty.</span></h2>
          
          <p className={styles.paragraph}>
            From architectural planning and structural engineering to construction, interiors, and final handover, we manage every stage of your dream home under one roof. Our turnkey construction process ensures superior quality, transparent communication, timely delivery, and complete peace of mind—without the hassle of coordinating multiple contractors.
          </p>

          <ul className={styles.checklist}>
            {listItems.map((item, idx) => (
              <li key={idx} className={styles.checklistItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Link to="/packages#cost-calculator" className="btn btn-primary">
              Get an Estimate <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Our Legacy
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.imageWrapper}
        >
          <div className={styles.imageCard}>
            {isLoading ? (
              <div style={{ width: '100%', aspectRatio: '4/5', display: 'flex' }}>
                <Skeleton width="100%" height="100%" />
              </div>
            ) : (
              <img 
                src={introImg} 
                alt="Engineering Team Reviewing Plans" 
                className={styles.image}
                loading="lazy"
              />
            )}
            {/* Overlay element */}
            <div className={styles.experienceOverlay}>
              <span className={styles.expNumber}>10+</span>
              <span className={styles.expText}>Years of <br/>Excellence</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustIntroSection;
