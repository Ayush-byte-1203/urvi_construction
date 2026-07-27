import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Play } from 'lucide-react';
import styles from './ProcessSection.module.css';
import SectionHeader from '../SectionHeader';
import { useGlobalData } from '../../context/GlobalDataContext';

const defaultSteps = [
  { step_number: "01", title: "Consultation & Briefing", description: "We discuss your vision, budget, and lifestyle requirements to define the project scope." },
  { step_number: "02", title: "Site Survey", description: "Our engineers assess the topography, orientation, and feasibility of the plot." },
  { step_number: "03", title: "Floor Plans & Soil Testing", description: "Drafting optimal layouts while testing soil bearing capacity for structural design." },
  { step_number: "04", title: "Approvals & Documentation", description: "We handle all municipal and statutory clearances required before construction." },
  { step_number: "05", title: "3D Design & Drawings", description: "Detailed 3D visualizations and structural blueprints are finalized." },
  { step_number: "06", title: "Agreement", description: "A transparent, fixed-cost agreement is signed with no hidden escalation clauses." },
  { step_number: "07", title: "Construction Start", description: "Groundbreaking begins, with daily updates provided via your dedicated manager." }
];

const ProcessSection = () => {
  const { processSteps, siteSettings } = useGlobalData();
  const steps = (processSteps && processSteps.length > 0) ? processSteps : defaultSteps;
  const posterImg = siteSettings?.process_section_poster_image || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80";

  return (
    <section className={`section ${styles.processSection}`}>
      <div className={`container ${styles.grid}`}>
        
        {/* Left Column: Narrative and Steps */}
        <div className={styles.content}>
          <SectionHeader 
            eyebrow="How It Works"
            heading="Our Proven Handover Process"
            subheading="A systematic, transparent journey from your first idea to the final handover, ensuring zero surprises along the way."
          />

          <div className={styles.stepsTimeline}>
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.stepItem}
              >
                <div className={styles.stepNum}>{step.step_number || step.num || `0${idx + 1}`}</div>
                <div className={styles.stepContent}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.description || step.desc}</p>
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
              src={posterImg} 
              alt="Construction Process Overview" 
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
              <h5 className={styles.statValue}>25 Years</h5>
              <p className={styles.statLabel}>Structural Warranty</p>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statIcon}><CheckCircle size={24} /></div>
              <h5 className={styles.statValue}>Zero</h5>
              <p className={styles.statLabel}>Cost Escalation</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProcessSection;
