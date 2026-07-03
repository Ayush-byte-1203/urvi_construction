import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import MotionWrapper from '../../common/MotionWrapper';
import styles from './styles.module.css';

const WarrantySection = () => {
  const warranties = [
    {
      title: '15-Year Structural Frame Protection',
      desc: 'Guarantees concrete column stability, load foundations, and anti-rust treatments on structural Fe 550D rebar steel.',
      icon: <ShieldCheck size={24} />
    },
    {
      title: '5-Year Chemical Waterproofing Warranty',
      desc: 'Covers toilet floor slabs, terrace chemical membrane coatings, and concrete basement walls leaks prevention.',
      icon: <CheckCircle2 size={24} />
    },
    {
      title: '1-Year Maintenance & Snags Support',
      desc: 'Prompt contractor support addressing plumbing conduits, low-voltage wiring faults, or minor surface putty cracks.',
      icon: <Award size={24} />
    }
  ];

  return (
    <section className="section container" id="warranty">
      <SectionHeader
        eyebrow="Safety Guarantees"
        heading="Warranty & Certification Protection"
        subheading="We back our civil general contracting works with verified laboratory certifications and safety warranties."
      />

      <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
        {warranties.map((item, idx) => (
          <MotionWrapper
            key={idx}
            variant="slideUp"
            delay={idx * 0.1}
            className={`glass-panel ${styles.warrantyCard}`}
          >
            <div className={styles.iconWrapper}>{item.icon}</div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.desc}</p>
          </MotionWrapper>
        ))}
      </div>
    </section>
  );
};

export default WarrantySection;
