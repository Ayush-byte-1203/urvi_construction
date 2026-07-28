import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Maximize, Calendar, Clock, DollarSign, ShieldAlert, Award, ArrowRight, Layers, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './ProjectDetailModal.module.css';

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  const [activeImage, setActiveImage] = useState(project.image);
  const gallery = project.images || [];

  const stats = [
    { label: 'Built Area', value: project.built_area || project.area || 'Not Specified', icon: Maximize },
    { label: 'Location', value: project.location || 'Not Specified', icon: MapPin },
    { label: 'Completion', value: project.completion_year || project.completion_date || 'Completed', icon: Calendar },
    { label: 'Duration', value: project.duration || 'Scheduled', icon: Clock },
    { label: 'Budget Range', value: project.budget_range || 'Fixed Contract', icon: DollarSign }
  ];

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className={styles.modal} 
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          {/* Hero Image Section */}
          <div className={styles.heroImageContainer}>
            <img src={activeImage || project.image} alt={project.title} className={styles.heroImage} />
            <div className={styles.heroGradient}></div>
            <div className={styles.heroContent}>
              <span className={styles.categoryBadge}>
                {project.category_name || project.category || 'Construction Portfolio'}
              </span>
              <h2 className={styles.title}>{project.title}</h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className={styles.body}>
            {/* Stats Dashboard Grid */}
            <div className={styles.statsGrid}>
              {stats.map((s, idx) => (
                <div key={idx} className={styles.statCard}>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statValue}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Metadata Chips */}
            <div className={styles.metaChips}>
              {project.client_name && <span className={styles.chip}>Client: {project.client_name}</span>}
              {project.architect_name && <span className={styles.chip}>Architect: {project.architect_name}</span>}
              {project.floors_count && <span className={styles.chip}>Floors: {project.floors_count}</span>}
              {project.material_grade && <span className={styles.chip}>Materials: {project.material_grade}</span>}
              {project.seismic_protection && <span className={styles.chip}>Seismic Safety: {project.seismic_protection}</span>}
              {project.eco_features && <span className={styles.chip}>Eco: {project.eco_features}</span>}
            </div>

            {/* Scope Tags */}
            {project.scope_tags && (
              <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.scope_tags.split(',').map((tag, tIdx) => (
                  <span key={tIdx} style={{ background: '#334155', color: '#ffffff', padding: '3px 10px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Description & Overview */}
            <div className={styles.sectionHeading}>
              <Layers size={18} style={{ color: 'var(--brand-yellow-dark, #D97706)' }} />
              Project Overview & Inclusions
            </div>
            <p className={styles.description}>
              {project.client_requirements || project.description}
            </p>

            {/* Site Challenges & Engineering Solutions */}
            {(project.challenges || project.solutions) && (
              <div className={styles.challengesGrid}>
                {project.challenges && (
                  <div className={styles.challengeCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <ShieldAlert size={18} /> Site Challenges
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#7f1d1d', lineHeight: '1.5' }}>
                      {project.challenges}
                    </p>
                  </div>
                )}
                {project.solutions && (
                  <div className={styles.solutionCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem' }}>
                      <Award size={18} /> Engineering Solutions
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#14532d', lineHeight: '1.5' }}>
                      {project.solutions}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Image Gallery */}
            {gallery && gallery.length > 0 && (
              <div>
                <div className={styles.sectionHeading}>
                  <ImageIcon size={18} style={{ color: 'var(--brand-yellow-dark, #D97706)' }} />
                  Project Gallery ({gallery.length} Photos)
                </div>
                <div className={styles.galleryGrid}>
                  <img 
                    src={project.image} 
                    alt="Main" 
                    className={styles.galleryImg} 
                    style={{ border: activeImage === project.image ? '3px solid var(--brand-yellow, #EAB308)' : 'none' }}
                    onClick={() => setActiveImage(project.image)} 
                  />
                  {gallery.map((imgItem, idx) => (
                    <img 
                      key={idx} 
                      src={imgItem.image} 
                      alt={imgItem.caption || `Phase ${idx + 1}`} 
                      className={styles.galleryImg} 
                      style={{ border: activeImage === imgItem.image ? '3px solid var(--brand-yellow, #EAB308)' : 'none' }}
                      onClick={() => setActiveImage(imgItem.image)} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className={styles.footer}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Looking for a similar turnkey construction build?
            </span>
            <Link to="/contact" onClick={onClose} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
              Consult Our Experts <ArrowRight size={14} style={{ marginLeft: '6px' }} />
            </Link>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
