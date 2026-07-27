import React, { useEffect, useContext, useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import Timeline from '../components/Timeline';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Target, Award, Shield, MapPin, Maximize } from 'lucide-react';
import CTASection from '../components/CTASection';
import styles from './About.module.css';
import sample1Img from '../Images/sample1.jpeg';

const About = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { pageData } = usePageData('about');
  const { siteSettings, projects: allProjects, coreValues, projectCategories } = useGlobalData();
  const [filter, setFilter] = useState('All');
  const heroBg = pageData?.hero_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";

  const categories = useMemo(() => {
    const cats = new Set();
    if (projectCategories && projectCategories.length > 0) {
      projectCategories.forEach(c => {
        if (c.name) cats.add(c.name);
      });
    }
    if (allProjects && allProjects.length > 0) {
      allProjects.forEach(p => {
        if (p.category_name) cats.add(p.category_name);
      });
    }
    if (cats.size === 0) {
      return ['All', 'Residential', 'Commercial'];
    }
    return ['All', ...Array.from(cats)];
  }, [projectCategories, allProjects]);

  useEffect(() => {
    setHeaderTheme('none'); // Uses transparent dark theme for the hero banner
  }, [setHeaderTheme]);

  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    return filter === 'All'
      ? allProjects
      : allProjects.filter(p => p.category_name === filter);
  }, [filter, allProjects]);

  const stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '100%', label: 'Turnkey Delivery' },
    { value: '25+', label: 'In-house Experts' }
  ];

  const defaultValues = [
    { title: "Precision", description: "Every millimeter matters. We execute with exacting standards and rigorous quality control." },
    { title: "Excellence", description: "From premium materials to master craftsmanship, we never compromise on the final product." },
    { title: "Integrity", description: "Transparent pricing, zero hidden costs, and honest communication throughout the build." }
  ];

  const valuesList = (coreValues && coreValues.length > 0) ? coreValues : defaultValues;

  return (
    <div className="page-wrapper">
      <SEO
        title="About Us | Our Legacy & Portfolio"
        description="Learn about our 10+ year legacy in building premium residential and commercial structures, and explore our completed projects."
      />

      {/* Hero Banner */}
      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url('${heroBg}')` }}>
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
            <h1>{pageData?.title || "Our Legacy & Portfolio"}</h1>
            <p className="subtitle">{pageData?.subtitle || "Building Tomorrow, Today. Learn about our 10+ year legacy and explore our completed signature builds."}</p>
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
                What started as a small firm of dedicated engineers over a decade ago has grown into Vadodara's premier turnkey construction company. We recognized a critical flaw in the traditional construction industry: a fragmented process that left homeowners stressed, over-budget, and managing multiple contractors.
              </p>
              <p>
                We rebuilt the model from the ground up. By bringing architects, structural engineers, project managers, and interior designers under one roof, we created a seamless, end-to-end building experience.
              </p>
              <ul className={styles.storyChecklist}>
                <li><CheckCircle2 size={18} className="text-accent" /> Over 50+ successful handovers</li>
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
            <img src={siteSettings?.about_story_image_1 || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80"} alt="Architectural Planning" className={styles.gridImg1} loading="lazy" />
            <img src={siteSettings?.about_story_image_2 || sample1Img} alt="Construction Site" className={styles.gridImg2} loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ── Signature Projects Portfolio Showcase Section (Merged into About Us) ── */}
      <section id="projects" className="section bg-light" style={{ padding: '4rem 0' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Our Signature Builds"
            heading="Completed Projects Portfolio"
            subheading="Explore our finest handovers, featuring precision civil engineering and bespoke interior finishing."
            center
          />

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', margin: '2rem 0 3rem', flexWrap: 'wrap' }}>
            {categories.map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  padding: '0.6rem 1.4rem',
                  borderRadius: '30px',
                  border: '1px solid var(--border)',
                  backgroundColor: filter === type ? 'var(--brand-yellow, #EAB308)' : '#ffffff',
                  color: filter === type ? '#0F172A' : 'var(--text-primary)',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: filter === type ? '0 4px 12px rgba(234, 179, 8, 0.35)' : 'none'
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '230px', overflow: 'hidden' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    {project.status && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(15, 23, 42, 0.75)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.78rem',
                        fontWeight: '600'
                      }}>
                        {project.status}
                      </span>
                    )}
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                      {project.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1.25rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      {project.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <MapPin size={15} style={{ color: 'var(--brand-yellow-dark, #D97706)' }} />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {(project.built_area || project.area) && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Maximize size={15} style={{ color: 'var(--brand-yellow-dark, #D97706)' }} />
                          <span>{project.built_area || project.area}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <p>No projects found in this category.</p>
            </div>
          )}
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
            {valuesList.map((val, idx) => (
              <motion.div
                key={val.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.valueCard}
              >
                <div className={styles.valueIcon}><Target size={32} /></div>
                <h3 className={styles.valueTitle}>{val.title}</h3>
                <p className={styles.valueDesc}>{val.description || val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
