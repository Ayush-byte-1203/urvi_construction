import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play } from 'lucide-react';
import styles from './ProcessSection.module.css';
import SectionHeader from '../SectionHeader';

const ProcessSection = () => {
  // TODO: replace placeholder content
  const steps = [
    { num: "01", title: "Consultation & Briefing", desc: "We discuss your vision, budget, and lifestyle requirements to define the project scope." },
    { num: "02", title: "Site Survey", desc: "Our engineers assess the topography, orientation, and feasibility of the plot." },
    { num: "03", title: "Floor Plans & Soil Testing", desc: "Drafting optimal layouts while testing soil bearing capacity for structural design." },
    { num: "04", title: "Approvals & Documentation", desc: "We handle all municipal and statutory clearances required before construction." },
    { num: "05", title: "3D Design & Drawings", desc: "Detailed 3D visualizations and structural blueprints are finalized." },
    { num: "06", title: "Agreement", desc: "A transparent, fixed-cost agreement is signed with no hidden escalation clauses." },
    { num: "07", title: "Construction Start", desc: "Groundbreaking begins, with daily updates provided via your dedicated manager." }
  ];

  return (
    <section className={`section ${styles.processSection}`}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column: Narrative and Steps */}
        <div className={styles.content}>
          <SectionHeader 
            eyebrow="How It Works"
            heading="Our Proven 7-Step Process"
            subheading="A systematic, transparent journey from your first idea to the final handover, ensuring zero surprises along the way."
          />

          <div className={styles.stepsTimeline}>
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.stepItem}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Media and Stats */}
        <div className={styles.mediaSide}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={styles.videoCard}
          >
            <img 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" 
              alt="Construction Site Overview" 
              className={styles.posterImage}
              loading="lazy"
            />
            <button className={styles.playButton} aria-label="Play Process Video">
              <Play size={32} fill="currentColor" />
            </button>
            <div className={styles.videoOverlay}></div>
          </motion.div>

          <div className={styles.statsGrid}>
            <div className={styles.statBox}>
              <div className={styles.statIcon}><CheckCircle size={24} /></div>
              <h5 className={styles.statValue}>150+</h5>
              <p className={styles.statLabel}>Quality Checkpoints</p>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}><CheckCircle size={24} /></div>
              <h5 className={styles.statValue}>10 Years</h5>
              <p className={styles.statLabel}>Structural Warranty</p>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}><CheckCircle size={24} /></div>
              <h5 className={styles.statValue}>Zero</h5>
              <p className={styles.statLabel}>Compromise on Quality</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
