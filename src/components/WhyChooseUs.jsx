import React from 'react';
import { 
  Users, Coins, ShieldCheck, Award 
} from 'lucide-react';
import SectionHeader from './SectionHeader';
import MotionWrapper from './MotionWrapper';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  const chooseCards = [
    {
      icon: <Users size={28} />,
      title: 'Dedicated Project Engineer',
      desc: 'One point of contact coordinating daily labor logs, site updates, and material testing charts.',
      badge: 'Coordination'
    },
    {
      icon: <Coins size={28} />,
      title: 'Transparent BOQ Costing',
      desc: 'Access live itemized cost sheets. Zero markup additions or unapproved billing releases.',
      badge: 'Honesty'
    },
    {
      icon: <ShieldCheck size={28} />,
      title: '100+ Lab Quality Checks',
      desc: 'We execute concrete cube compressive load testing and steel ductility checks before casting.',
      badge: 'Audit Verified'
    },
    {
      icon: <Award size={28} />,
      title: 'Structural Warranty Guarantee',
      desc: 'Every home construction is backed by a verified 15-Year structural stability layout warranty.',
      badge: 'Security'
    }
  ];

  return (
    <section className={`section ${styles.solutionsSection}`} id="why-us">
      <div className="container">
        
        {/* Why Choose Us Redesign */}
        <SectionHeader
          eyebrow="Key Benefits"
          heading="Engineered for Peace of Mind"
          subheading="Learn how our civil auditing systems and transparent sourcing desks safeguard your investment."
        />

        <div className="grid-2" style={{ marginTop: '3.5rem', gap: '2rem' }}>
          {chooseCards.map((item, idx) => (
            <MotionWrapper
              key={idx}
              variant="slideUp"
              delay={idx * 0.08}
              className={`glass-panel ${styles.whyCard}`}
            >
              <div className={styles.cardHeaderRow}>
                <div className={styles.iconCircle}>{item.icon}</div>
                <span className={styles.badgeTag}>{item.badge}</span>
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
