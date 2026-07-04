import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Search, Compass, Clock, ChevronRight, MapPin, CheckCircle2 
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { projectsData } from '../data/projectsData';

import SectionHeader from '../components/sections/SectionHeader';
import MotionWrapper from '../components/common/MotionWrapper';
import Button from '../components/common/Button';
import HeroOverlay from '../components/common/HeroOverlay';
import CTA from '../components/sections/CTA';
import { HeaderThemeContext } from '../layouts/Layout';
import styles from './Projects.module.css';

const Projects = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'industrial', label: 'Industrial' },
    { id: 'villa', label: 'Signature Villa' },
    { id: 'renovation', label: 'Renovation' }
  ];

  // Asset Mappings for Images
  const projectImages = {
    'apex-tower': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    'vista-residences': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    'helios-logistics': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    'luna-villas': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    'zenith-hub': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    'nova-assembly': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
  };

  const projectList = Object.values(projectsData);

  // Filter Logic
  const filteredProjects = projectList.filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          proj.scope.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          proj.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                            proj.category === activeCategory ||
                            (activeCategory === 'villa' && proj.tag.toLowerCase().includes('villa')) ||
                            (activeCategory === 'renovation' && proj.tag.toLowerCase().includes('renovation'));
    return matchesSearch && matchesCategory;
  });

  const featuredProject = projectsData['vista-residences'] || projectList[0];
  const supportingProjects = projectList.filter(p => p.id !== featuredProject.id).slice(0, 4);

  return (
    <div className="projects-page">
      <Helmet>
        <title>Portfolio & Case Studies | Paramarsh Construction</title>
        <meta name="description" content="Explore our high-performance build portfolio of luxury residential villas, commercial Plazas, and flat flooring logistics warehouses." />
      </Helmet>

      {/* 1. Projects Hero */}
      <section className={styles.heroSection}>
        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Case Studies</span>
          </div>

          <h1 className={styles.heroTitle}>Case Studies & Civil Portfolio</h1>
          <p className={styles.heroDesc}>
            Discover how our BIM coordinates designs, geotech soil excavations checking, and general contracting supervisors pour durability into luxury villas.
          </p>

          {/* Stats inside Hero */}
          <div className={styles.heroStats}>
            <div className={styles.statBox}>
              <strong>150+</strong>
              <span>Delivered Landmarks</span>
            </div>
            <div className={styles.statBox}>
              <strong>100%</strong>
              <span>On-Time Handover</span>
            </div>
            <div className={styles.statBox}>
              <strong>15 Yrs</strong>
              <span>Civil Auditing Legacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Projects Showcase */}
      <section className="section container">
        <span className="text-overline">Portfolio Highlights</span>
        <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '3rem' }}>Featured Case Studies</h2>

        <div className={styles.featuredGrid}>
          {/* Left Large Featured Case */}
          <MotionWrapper variant="slideRight" className={`glass-panel ${styles.largeFeatured}`}>
            <div className={styles.largeImgWrapper}>
              <img src={projectImages[featuredProject.id]} alt={featuredProject.title} />
              <span className={styles.statusBadge}>Delivered</span>
            </div>
            <div className={styles.largeContent}>
              <span className={styles.projectTag}>{featuredProject.tag}</span>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.scope}</p>
              
              <div className={styles.metaRow}>
                <span><Compass size={14} /> {featuredProject.area}</span>
                <span><MapPin size={14} /> {featuredProject.location}</span>
              </div>

              <Link to={`/projects/${featuredProject.id}`} className={styles.caseLink}>
                Review Case Specifications &rarr;
              </Link>
            </div>
          </MotionWrapper>

          {/* Right 4 Supporting Cases */}
          <div className={styles.supportingColumn}>
            {supportingProjects.map((project, idx) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`} 
                className={`glass-panel ${styles.supportingCard}`}
              >
                <img src={projectImages[project.id]} alt={project.title} className={styles.supportingImg} />
                <div>
                  <span className={styles.supportTag}>{project.tag}</span>
                  <h4 className={styles.supportTitle}>{project.title}</h4>
                  <span className={styles.supportLoc}>{project.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Categories and Advanced Search */}
      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Specialties Filter"
            heading="Civil Portfolio Explorer"
            subheading="Search and filter completed commercial centers, gated row villas, and flat flooring cold logistics warehouses."
          />

          <div className={styles.controlsRow} style={{ marginTop: '3.5rem' }}>
            {/* Search Input */}
            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search portfolio projects"
              />
            </div>

            {/* Category Chips */}
            <div className={styles.chipsContainer}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`${styles.chipBtn} ${activeCategory === cat.id ? styles.chipActive : ''}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Interactive Grid */}
          <div className="grid-3" style={{ marginTop: '2.5rem', gap: '2rem' }}>
            {filteredProjects.map((project, idx) => (
              <MotionWrapper
                key={project.id}
                variant="slideUp"
                delay={idx * 0.08}
                className={`glass-panel ${styles.projectCard}`}
              >
                <div className={styles.cardImgWrapper}>
                  <img src={projectImages[project.id]} alt={project.title} />
                  <span className={styles.cardBadge}>{project.year}</span>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>{project.tag}</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.scope}</p>
                  
                  <div className={styles.cardMeta}>
                    <Compass size={12} className={styles.metaIcon} />
                    <span>Area: {project.area}</span>
                  </div>

                  <Link to={`/projects/${project.id}`} className={styles.cardLink}>
                    View Case Study <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </Link>
                </div>
              </MotionWrapper>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              No portfolio projects match your search criteria.
            </div>
          )}
        </div>
      </section>

      {/* 5. Book Similar Project CTA */}
      <CTA
        title="Inspired by Our Completed Case Studies?"
        description="Schedule coordinate site inspections calls with our general contracting engineers to plan specifications today."
        primaryBtnText="Book Consultation Call"
        primaryBtnLink="/contact"
        secondaryBtnText="Estimate Cost Calculator"
        secondaryBtnLink="/packages"
        bgVariant="gradient"
        layout="center"
      />
    </div>
  );
};

export default Projects;
