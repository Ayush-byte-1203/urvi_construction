import React, { useEffect, useContext } from 'react';
import SEO from '../components/SEO';
import { useGlobalData } from '../context/GlobalDataContext';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import Timeline from '../components/Timeline';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Award, Shield } from 'lucide-react';
import CTASection from '../components/CTASection';
import styles from './About.module.css';

const About = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings } = useGlobalData();

  useEffect(() => {
    setHeaderTheme('none'); // Uses transparent dark theme for the hero banner
  }, [setHeaderTheme]);

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '120+', label: 'Projects Completed' },
    { value: '100%', label: 'Turnkey Delivery' },
    { value: '50+', label: 'In-house Experts' }
  ];

  const values = [
    { icon: <Target size={32} />, title: "Precision", desc: "Every millimeter matters. We execute with exacting standards and rigorous quality control." },
    { icon: <Award size={32} />, title: "Excellence", desc: "From premium materials to master craftsmanship, we never compromise on the final product." },
    { icon: <Shield size={32} />, title: "Integrity", desc: "Transparent pricing, zero hidden costs, and honest communication throughout the build." }
  ];

  return (
    <div className="page-wrapper">
      <SEO
        title="About Us | Our Legacy"
        description="Learn about our 15+ year legacy in building premium residential and commercial structures."
      />

      {/* Hero Banner */}
      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url('https://images.unsplash.com/photo-1541888081600-01103f6f1c4e?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="breadcrumbs">
              <a href="/">Home</a>
              <span>/</span>
              <span>About Us</span>
            </div>
            <h1>Our Legacy</h1>
            <p className="subtitle">Building Tomorrow, Today. Learn about our 15+ year legacy in premium construction.</p>
          </motion.div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className={`section container ${styles.storySection}`}>
        <div className={styles.storyGrid}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="Our Story"
              heading="A Foundation of Trust"
            />
            <div className={styles.storyText}>
              <p>
                What started as a small firm of dedicated engineers over a decade ago has grown into Bengaluru's premier turnkey construction company. We recognized a critical flaw in the traditional construction industry: a fragmented process that left homeowners stressed, over-budget, and managing multiple contractors.
              </p>
              <p>
                We rebuilt the model from the ground up. By bringing architects, structural engineers, project managers, and interior designers under one roof, we created a seamless, end-to-end building experience.
              </p>
              <ul className={styles.storyChecklist}>
                <li><CheckCircle2 size={18} className="text-accent" /> Over 120+ successful handovers</li>
                <li><CheckCircle2 size={18} className="text-accent" /> In-house structural & architectural team</li>
                <li><CheckCircle2 size={18} className="text-accent" /> Fixed-price contracts with zero escalation</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.imageGrid}
          >
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80" alt="Architectural Planning" className={styles.gridImg1} loading="lazy" />
            <img src="https://images.unsplash.com/photo-1590495914106-4d048d6db95a?auto=format&fit=crop&w=600&q=80" alt="Construction Site" className={styles.gridImg2} loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-light">
        <div className="container">
          <SectionHeader
            eyebrow="Our Journey"
            heading="Milestones That Defined Us"
            centered
          />
          <Timeline />
        </div>
      </section>


      {/* Mission & Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Core Principles"
            heading="Our Mission & Values"
            subheading="We don't just aim to build houses; our mission is to elevate the standard of living through superior construction methodologies."
            center
          />
          <div className={styles.valuesGrid}>
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.valueCard}
              >
                <div className={styles.valueIcon}>{val.icon}</div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Let's Build Your Legacy Together" subtitle="Contact us for a free site visit and architectural consultation." />
    </div>
  );
};

export default About;
