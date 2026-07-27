import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize, Loader } from 'lucide-react';
import styles from './PortfolioPreviewSection.module.css';
import SectionHeader from '../SectionHeader';
import { useGlobalData } from '../../context/GlobalDataContext';

const PortfolioPreviewSection = () => {
  const { projects, isLoading } = useGlobalData();

  if (isLoading) {
    return (
      <section className={`section ${styles.portfolioSection}`} style={{ minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader className="spin" size={48} color="var(--primary)" />
      </section>
    );
  }

  // Show max 3 projects on the home page preview
  const displayProjects = (projects || []).slice(0, 3);

  return (
    <section className={`section ${styles.portfolioSection}`}>
      <div className="container">
        
        <div className={styles.headerRow}>
          <SectionHeader 
            eyebrow="Our Portfolio"
            heading="Signature Projects"
            subheading="Explore a curated selection of our finest builds, where precision engineering meets architectural elegance."
          />
          <Link to="/about#projects" className={`btn btn-secondary ${styles.desktopBtn}`}>
            View All Projects <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </Link>
        </div>

        <div className={styles.grid}>
          {displayProjects.map((project, idx) => (
            <motion.div 
              key={project.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
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
        </div>

        <div className={styles.mobileBtnWrapper}>
          <Link to="/about#projects" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
            View All Projects <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PortfolioPreviewSection;
