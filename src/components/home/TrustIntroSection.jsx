import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './TrustIntroSection.module.css';

const TrustIntroSection = () => {
  // TODO: replace placeholder content
  const checklist = [
    "Transparent pricing with no hidden costs",
    "Dedicated project manager for daily updates",
    "In-house architects and structural engineers",
    "Premium branded materials guaranteed",
    "Rigorous 150+ point quality inspection"
  ];

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
            From initial blueprints to the final coat of paint, our comprehensive turnkey 
            approach eliminates the stress of coordinating multiple contractors. Experience 
            seamless execution delivered on time and strictly on budget.
          </p>

          <ul className={styles.checklist}>
            {checklist.map((item, idx) => (
              <li key={idx} className={styles.checklistItem}>
                <CheckCircle2 className={styles.checkIcon} size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Link to="/contact" className="btn btn-primary">
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
            <img 
              src="https://images.unsplash.com/photo-1541888081600-01103f6f1c4e?auto=format&fit=crop&w=800&q=80" 
              alt="Engineering Team Reviewing Plans" 
              className={styles.image}
              loading="lazy"
            />
            {/* Overlay element */}
            <div className={styles.experienceOverlay}>
              <span className={styles.expNumber}>15+</span>
              <span className={styles.expText}>Years of <br/>Excellence</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustIntroSection;
