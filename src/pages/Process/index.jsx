import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layers, Calendar, CheckSquare, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';

const Process = () => {
  const steps = [
    {
      title: 'Consultation & Spatial Blueprinting',
      subtitle: 'Phase 1: Week 1 to 4',
      desc: 'We conduct architectural brainstorming, prepare 3D visual models, analyze site soils, and draft the first estimation tables (BOQ).',
      icon: <Layers size={24} />
    },
    {
      title: 'Zoning Approval & Procurement',
      subtitle: 'Phase 2: Week 5 to 8',
      desc: 'Our legal desks submit structural documentation to state agencies for clearance while locking in material supply chains.',
      icon: <Calendar size={24} />
    },
    {
      title: 'Site Preparation & Substructures',
      subtitle: 'Phase 3: Month 3',
      desc: 'Excavation machinery grades the soil, setups anti-termite shields, and pours heavy concrete foundations.',
      icon: <CheckSquare size={24} />
    },
    {
      title: 'Superstructure Framework Assembly',
      subtitle: 'Phase 4: Month 4 to 6',
      desc: 'Steel pillars or concrete slabs take shape. Walls are laid out using energy-efficient AAC brick masonry.',
      icon: <Shield size={24} />
    },
    {
      title: 'MEP Integration & Wet Finishes',
      subtitle: 'Phase 5: Month 7 to 9',
      desc: 'Plumbing conduits, electrical lines, HVAC nodes, and initial wall plastering work are executed concurrently.',
      icon: <Layers size={24} />
    },
    {
      title: 'Premium Handovers & Quality Checks',
      subtitle: 'Phase 6: Month 10 to 12',
      desc: 'Applying finish coats, flooring tiles, smart controls setup, final compliance clearances, and key delivery.',
      icon: <CheckSquare size={24} />
    }
  ];

  return (
    <div className="process-page">
      <Helmet>
        <title>Construction Process Roadmap | BuildCraft Constructions</title>
        <meta name="description" content="Review our step-by-step building process timeline, from zoning permit applications to keys handover." />
      </Helmet>

      <section className="subpage-header">
        <div className="container">
          <span className="accent-text">Strategic Timeline</span>
          <h1 className="title-large mb-3">Our Construction Process</h1>
          <p className="subtitle">Learn how we guide your project from soil testing and permits to finished handover, using strict quality assurance checks.</p>
        </div>
      </section>

      <section className="subpage-content container">
        <div className={styles.timelineContainer}>
          <div className={styles.timelineList}>
            {/* Timeline Line */}
            <div className={styles.timelineLine}></div>

            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className={styles.timelineRow}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Circle Marker */}
                <div className={styles.timelineBubble}>
                  {step.icon}
                </div>

                <div className="glass-panel" style={{ padding: '2rem', flexGrow: 1 }}>
                  <span className="accent-text" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>{step.subtitle}</span>
                  <h3 className="mb-2" style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Process;
