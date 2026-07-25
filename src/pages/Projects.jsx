import React, { useEffect, useContext, useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobalData } from '../context/GlobalDataContext';
import CTASection from '../components/CTASection';
import styles from './Projects.module.css';

const Projects = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { projects: allProjects } = useGlobalData();
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  const filteredProjects = useMemo(() => {
    if (!allProjects) return [];
    return filter === 'All' 
      ? allProjects 
      : allProjects.filter(p => p.category_name === filter);
  }, [filter, allProjects]);

  return (
    <div className="page-wrapper">
      <SEO 
        title="Our Portfolio | Construction Projects"
        description="Browse our extensive portfolio of completed and ongoing residential and commercial construction projects."
      />
      
      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Projects</span>
            </div>
            <h1>Our Portfolio</h1>
            <p className="subtitle">
              Explore a curated selection of our finest builds, where precision engineering meets architectural elegance.
            </p>
          </motion.div>
        </div>
      </header>
      
      <div className={styles.filterTabsContainer} style={{ paddingTop: '3rem', display: 'flex', justifyContent: 'center' }}>

          <div className={styles.filterTabs}>
            {['All', 'Residential', 'Commercial'].map(type => (
              <button 
                key={type}
                className={`${styles.filterBtn} ${filter === type ? styles.active : ''}`}
                onClick={() => setFilter(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

      <section className={`section ${styles.portfolioSection}`}>
        <div className="container">
          <motion.div layout className={styles.grid}>
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <img src={project.image} alt={project.title} className={styles.image} loading="lazy" />
                    {project.status && <div className={styles.statusBadge}>{project.status}</div>}
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{project.title}</h3>
                    <p className={styles.cardDesc}>{project.description}</p>
                    
                    <div className={styles.metaData}>
                      <div className={styles.metaItem}>
                        <MapPin size={16} />
                        <span>{project.location}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <Maximize size={16} />
                        <span>{project.built_area || project.area}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className={styles.noResults}>
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection title="Inspired by Our Work?" subtitle="Contact us to discuss how we can bring a similar level of excellence to your next project." />
    </div>
  );
};

export default Projects;
