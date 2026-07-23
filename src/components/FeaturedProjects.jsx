import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Clock, ShieldCheck } from 'lucide-react';
import SectionHeader from './SectionHeader';
import MotionWrapper from './MotionWrapper';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './FeaturedProjects.module.css';

const FeaturedProjects = () => {
  const { projects: projectsData } = useGlobalData();

  // If no data is available yet, provide a fallback or return null
  if (!projectsData || projectsData.length === 0) return null;

  const featuredData = projectsData[0];
  const supportingData = projectsData.slice(1, 3);

  const featured = {
    id: featuredData.id,
    title: featuredData.title,
    tag: featuredData.category_name || 'General',
    scope: featuredData.description || 'No description available.',
    area: featuredData.built_area || 'Area not specified',
    year: featuredData.completion_date ? new Date(featuredData.completion_date).getFullYear() : '2024',
    progress: '100%', 
    image: featuredData.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  };

  const supporting = supportingData.map(p => ({
    id: p.id,
    title: p.title,
    tag: p.category_name || 'General',
    area: p.built_area || 'Area not specified',
    progress: '100%',
    image: p.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  }));


  return (
    <section className="section container" id="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div>
          <span className="text-overline">Case Studies</span>
          <h2 className="display-sm" style={{ marginTop: '0.5rem' }}>Masterpieces Constructed</h2>
        </div>
        <Link to="/projects">
          <button className="btn btn-secondary">All Projects <ArrowRight size={16} style={{ marginLeft: '4px' }} /></button>
        </Link>
      </div>

      <div className={styles.asymmetricGrid}>
        {/* LEFT: Large Featured Card */}
        <MotionWrapper variant="slideRight" className={`glass-panel ${styles.largeCard}`}>
          <Link to={`/projects/${featured.id}`} className={styles.imageWrapper} style={{ display: 'block' }}>
            <img src={featured.image} alt={featured.title} className={styles.projectImage} loading="lazy" />
            <div className={styles.progressBadge}>Build Status: {featured.progress}</div>
          </Link>
          <div className={styles.cardInfo}>
            <span className={styles.tag}>{featured.tag}</span>
            <h3 className={styles.projectTitle}>{featured.title}</h3>
            <p className={styles.projectDesc}>{featured.scope}</p>
            
            <div className={styles.metaRow}>
              <span className={styles.metaItem}>
                <Compass size={14} className={styles.metaIcon} /> {featured.area}
              </span>
              <span className={styles.metaItem}>
                <Clock size={14} className={styles.metaIcon} /> Year {featured.year}
              </span>
            </div>

            <Link to={`/projects/${featured.id}`} className={styles.ctaLink}>
              View Project Specs <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </Link>
          </div>
        </MotionWrapper>

        {/* RIGHT: Supporting Cards List */}
        <div className={styles.supportingColumn}>
          {supporting.map((project, idx) => (
            <MotionWrapper
              key={project.id}
              variant="slideLeft"
              delay={idx * 0.15}
              className={`glass-panel ${styles.smallCard}`}
            >
              <Link to={`/projects/${project.id}`} className={styles.smallImageWrapper} style={{ display: 'block' }}>
                <img src={project.image} alt={project.title} className={styles.smallImage} loading="lazy" />
                <div className={styles.smallProgressBadge}>{project.progress}</div>
              </Link>
              <div className={styles.smallCardContent}>
                <span className={styles.smallTag}>{project.tag}</span>
                <h4 className={styles.smallTitle}>{project.title}</h4>
                <span className={styles.smallArea}>Built-up Area: {project.area}</span>
                
                <Link to={`/projects/${project.id}`} className={styles.smallCta}>
                  View Specs
                </Link>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
