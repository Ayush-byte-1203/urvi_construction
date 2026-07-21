import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, MoveUpRight, Hexagon, Maximize, Ruler, Home, Compass } from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';

import SectionHeader from '../components/SectionHeader';
import MotionWrapper from '../components/MotionWrapper';
import Button from '../components/Button';
import HeroOverlay from '../components/HeroOverlay';

import { HeaderThemeContext } from '../components/Layout';
import styles from './Projects.module.css';

const Projects = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, projects: projectsData, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, sections, isLoading: isPageLoading } = usePageData('projects');

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);



  const appConfig = siteSettings ? { seo: { defaultTitle: `${siteSettings.site_name} | Projects`, defaultDescription: pageData?.subtitle || 'Projects', siteUrl: '' } } : { seo: { defaultTitle: 'Loading...', defaultDescription: 'Loading...', siteUrl: '' } };

  const rawCategories = ['All', ...new Set((projectsData || []).map(p => p.category_name || p.category || 'General'))];

  const filteredProjects = (projectsData || []).filter((proj) => {
    const matchesSearch = proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proj.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (proj.location || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeFilter === 'All' || (proj.category_name || proj.category) === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredProject = (projectsData || [])[0];
  const supportingProjects = (projectsData || []).slice(1, 5);

  return (
    <div className="projects-page">
      <Helmet>
        <title>Portfolio & Landmarks | {appConfig.seo.defaultTitle}</title>
        <meta name="description" content={appConfig.seo.defaultDescription} />
      </Helmet>

      {/* ========================================== */}
      {/* SECTION: 1. Projects Hero */}
      {/* ========================================== */}
      <section className={styles.heroSection}>
                {pageData?.hero_video && (
          <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
            <source src={pageData.hero_video} type="video/mp4" />
          </video>
        )}
        {pageData?.hero_image && !pageData?.hero_video && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${pageData.hero_image})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        )}

        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <Home size={10} style={{ margin: '0 8px' }} />
            <span>Case Studies</span>
          </div>

          <h1 className={styles.heroTitle}>Case Studies & Civil Portfolio</h1>
          <p className={styles.heroDesc}>
            Discover how our BIM coordinates designs, geotech soil excavations checking, and general contracting supervisors pour durability into luxury villas.
          </p>

          {/* Stats inside Hero */}
          {/* <div className={styles.heroStats}>
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
          </div> */}
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: 2. Featured Projects Showcase */}
      {/* ========================================== */}
      <section className="section container">
        <span className="text-overline">Portfolio Highlights</span>
        <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '3rem' }}>Featured Case Studies</h2>

        <div className={styles.featuredGrid}>
          {/* ========================================== */}
          {/* SECTION: Left Large Featured Case */}
          {/* ========================================== */}
          <MotionWrapper variant="slideRight" className={`glass-panel ${styles.largeFeatured}`}>
            <div className={styles.largeImgWrapper}>
              <img src={featuredProject?.image} alt={featuredProject?.title} />
              <span className={styles.statusBadge}>Delivered</span>
            </div>
            <div className={styles.largeContent}>
              <span className={styles.projectTag}>{featuredProject?.category_name}</span>
              <h3>{featuredProject?.title}</h3>
              <p>{featuredProject?.description}</p>

              <div className={styles.metaRow}>
                <span><Maximize size={14} /> {featuredProject?.built_area}</span>
                <span><MapPin size={14} /> {featuredProject?.location}</span>
              </div>

              <Link to={`/projects/${featuredProject?.id}`} className={styles.caseLink}>
                Review Case Specifications &rarr;
              </Link>
            </div>
          </MotionWrapper>

          {/* Right 4 Supporting Cases */}
          <div className={styles.supportingColumn}>
            {supportingProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`glass-panel ${styles.supportingCard}`}
              >
                <img src={project.image} alt={project.title} className={styles.supportingImg} />
                <div>
                  <span className={styles.supportTag}>{project.category_name}</span>
                  <h4 className={styles.supportTitle}>{project.title}</h4>
                  <span className={styles.supportLoc}>{project.location}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: 3. Categories and Advanced Search */}
      {/* ========================================== */}
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
              <input
                type="text"
                placeholder="Search by name, category, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search portfolio projects"
              />
            </div>

            {/* Category Chips */}
            <div className={styles.filterTabs}>
              {rawCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
                >
                  {cat}
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
                  <img src={project.image || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'} alt={project.title} />
                  <span className={styles.cardBadge}>{project.completion_date || '2024'}</span>
                </div>
                <div className={styles.cardContent}>
                  <span className={styles.cardTag}>{project.category_name || project.category || 'General'}</span>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>

                  <div className={styles.cardMeta}>
                    <Compass size={12} className={styles.metaIcon} />
                    <span>Area: {project.built_area}</span>
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



    </div>
  );
};

export default Projects;
