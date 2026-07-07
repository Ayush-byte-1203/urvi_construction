import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Coins, Award, Eye, ShieldCheck, Heart, ArrowRight, CheckCircle2, 
  FileText, Shield, Briefcase, Download, Mail, ExternalLink, X 
} from 'lucide-react';
import SectionHeader from '@sections/SectionHeader';
import MotionWrapper from '@components/MotionWrapper';
import styles from './WhyChooseUs.module.css';

const WhyChooseUs = () => {
  const [activeCert, setActiveCert] = useState(null);

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

  const promiseItems = [
    'Zero Compromise Concrete Grades',
    'Tata Tiscon Fe550D reinforcement standard',
    'Waterproofing double-layer chemical coatings',
    'BIM structural clash checking before work starts',
    'Real-time labor compliance supervision'
  ];

  const certifications = [
    { id: 'iso', name: 'ISO 9001:2015', desc: 'Certified Quality Management Systems coordinates.' },
    { id: 'safety', name: 'OHSAS 18001 Safety', desc: 'Zero accident site engineering standards.' },
    { id: 'reg', name: 'Government Class-A Register', desc: 'Licensed municipal building approval desks.' }
  ];


  return (
    <section className={`section ${styles.solutionsSection}`} id="why-us">
      <div className="container">
        
        {/* 1. Why Choose Us Redesign */}
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

        {/* 2. Construction Promise & Quality Audits checklist */}
        <div className={styles.promiseWrapper} style={{ marginTop: '5.5rem' }}>
          <div className={styles.promiseTextCol}>
            <span className="text-overline">Durability Pledge</span>
            <h2>Our Construction Promise</h2>
            <p>
              We commit to the highest levels of quality control in Vadodara, checking concrete slumps, structural steel yields, and masonry alignments.
            </p>
            <ul className={styles.promiseList}>
              {promiseItems.map((promise, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{promise}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Certifications Modal Section */}
        <div style={{ marginTop: '5.5rem' }}>
          <SectionHeader
            eyebrow="Accreditation"
            heading="Certified Structural Standards"
            subheading="Click any certification badge below to verify our licensed engineer registrations and audit safety compliance."
          />

          <div className="grid-3" style={{ marginTop: '3.5rem', gap: '1.5rem' }}>
            {certifications.map((cert) => (
              <div 
                key={cert.id} 
                onClick={() => setActiveCert(cert)}
                className={`glass-panel ${styles.certCard}`}
              >
                <Shield size={26} className={styles.certIcon} />
                <strong>{cert.name}</strong>
                <span>Click to verify credential &rarr;</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Warranty & After-Sales timeline cards */}
        <div style={{ marginTop: '5.5rem' }}>
          <span className="text-overline">Post-Handover Coverage</span>
          <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '3.5rem' }}>Warranty & Support Timeline</h2>
          
          <div className="grid-3" style={{ gap: '2rem' }}>
            {[
              { title: '15-Year Structural Frame', desc: 'RCC foundation integrity and beam stability warranty coverage.' },
              { title: '10-Year Waterproofing', desc: 'Double layer polymer chemical treatment against moisture seeps.' },
              { title: '3-Year MEP Coverage', desc: 'Pipes, conduits, and low-voltage electrical boards wiring checks.' }
            ].map((war, idx) => (
              <div key={idx} className={`glass-panel ${styles.warCard}`}>
                <Heart size={24} className={styles.warIcon} />
                <h3>{war.title}</h3>
                <p>{war.desc}</p>
              </div>
            ))}
          </div>
        </div>



      </div>

      {/* Certification Modal */}
      {activeCert && (
        <div className={styles.modalOverlay} onClick={() => setActiveCert(null)}>
          <div className={`glass-panel ${styles.modalContent}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setActiveCert(null)}>
              <X size={18} />
            </button>
            <Shield size={36} className={styles.modalIcon} />
            <h2>{activeCert.name} Verification</h2>
            <p>{activeCert.desc}</p>
            <span className={styles.verifBadge}>Status: Verified & Active</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default WhyChooseUs;
