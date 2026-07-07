import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Clock, ShieldCheck } from 'lucide-react';
import SectionHeader from '@sections/SectionHeader';
import MotionWrapper from '@components/MotionWrapper';
import styles from './FeaturedProjects.module.css';

const FeaturedProjects = () => {
  const featured = {
    id: 'vista-residences',
    title: 'The Vista Waterfront Estates',
    tag: 'Premium Luxury Homes',
    scope: 'Retaining walls structural systems, RCC structural building, green terrace landscaping.',
    area: '12 Luxury Units',
    year: '2024',
    progress: '100%',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  };

  const supporting = [
    {
      id: 'apex-tower',
      title: 'Apex Business Plaza',
      tag: 'Commercial Office Tower',
      area: '85,000 sq. ft.',
      progress: '100%',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'luna-villas',
      title: 'Luna Premium Row Villas',
      tag: 'Custom Gated Community',
      area: '16 Custom Villas',
      progress: '92%',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80'
    }
  ];

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
          <div className={styles.imageWrapper}>
            <img src={featured.image} alt={featured.title} className={styles.projectImage} />
            <div className={styles.progressBadge}>Build Status: {featured.progress}</div>
          </div>
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
              <div className={styles.smallImageWrapper}>
                <img src={project.image} alt={project.title} className={styles.smallImage} />
                <div className={styles.smallProgressBadge}>{project.progress}</div>
              </div>
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
