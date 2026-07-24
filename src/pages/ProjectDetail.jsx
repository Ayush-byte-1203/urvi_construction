import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, Compass, Clock, MapPin, ShieldAlert, Award, ChevronRight, CheckCircle2, Play, Info, HelpCircle
} from 'lucide-react';
import { appConfig } from '../data/appConfig';
import { useGlobalData } from '../context/GlobalDataContext';

import SectionHeader from '../components/SectionHeader';
import GenericCard from '../components/GenericCard';
import Accordion from '../components/Accordion';
import MotionWrapper from '../components/MotionWrapper';
import Button from '../components/Button';

import { HeaderThemeContext } from '../components/Layout';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { id } = useParams();
  const { projects: projectsData, isLoading } = useGlobalData();
  
  const project = projectsData?.find(p => p.id.toString() === id) || projectsData?.[0];

  const [sliderPos, setSliderPos] = useState(50);
  const [activeStage, setActiveStage] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  // Include all images in the gallery
  const galleryImages = project?.images || [];

  // Extract unique stages from gallery images, excluding 'Before' and 'After' for the filter buttons
  const availableStages = ['All', ...new Set(
    galleryImages
      .map(img => img.stage)
      .filter(stage => stage && stage !== 'Before' && stage !== 'After')
  )];
  
  const filteredImages = activeStage === 'All' 
    ? galleryImages
    : galleryImages.filter(img => img.stage === activeStage);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  if (isLoading || !project) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Project Specifications...</div>;
  }

  // Specs
  const technicalSpecs = [
    { label: 'Built Area', value: project.built_area || 'Not Specified' },
    { label: 'Completion', value: project.completion_year || project.completion_date || 'Not Specified' },
    { label: 'Duration', value: project.duration || 'Not Specified' },
    { label: 'Budget Range', value: project.budget_range || 'Not Specified' }
  ];

  // Materials Used
  const materialsMock = [
    { brand: 'TATA Steel Fe550D', type: 'Ductile rebar framing', why: 'Anti-corrosive properties safeguard foundations against waterfront humidity.' },
    { brand: 'UltraTech Cement', type: 'Grade-53 concrete', why: 'Ensures optimal slump tests and heavy-duty load parameters.' },
    { brand: 'Asian Paints Apex', type: 'Silicone Emulsion', why: 'Weather protection shield preserves facade aesthetics.' }
  ];

  const relatedProjects = (projectsData || [])
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const fallbackImage = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.85), rgba(11, 15, 25, 0.9)), url(${project.image || fallbackImage})`
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const faqItems = [
    { title: 'What was the exact construction duration?', content: `This project was completed within ${project.duration || project.completion_date || 'Schedule'}, aligning with baseline schedules.` },
    { title: 'Which raw material brands were specified?', content: 'Certified concrete was sourced from UltraTech Cement and steel rebar from TATA Steel.' }
  ];

  return (
    <div className="project-detail-page">
      <Helmet>
        <title>{project.title} Case study | {appConfig.company.name}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* ========================================== */}
      {/* SECTION: Hero Header */}
      {/* ========================================== */}
      <section className={styles.hero} style={heroStyle}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <Link to="/projects">Projects</Link>
            <ChevronRight size={10} />
            <span>Case Study</span>
          </div>

          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.heroDesc}>{project.category_name || project.category || 'Portfolio'} &middot; Completed specs case study</p>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Specifications Dashboard */}
      {/* ========================================== */}
      <section className="section container">
        <Link to="/projects" className={styles.backLink}>
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Return to Portfolio
        </Link>

        {/* Dashboard grid */}
        <div className={styles.dashboardGrid} style={{ marginTop: '1.5rem' }}>
          {technicalSpecs.map((spec, idx) => (
            <div key={idx} className={`glass-panel ${styles.dashboardCard}`}>
              <span className={styles.dashboardLabel}>{spec.label}</span>
              <strong className={styles.dashboardValue}>{spec.value}</strong>
            </div>
          ))}
        </div>

        {/* Client Goals & Requirements */}
        <div className={styles.goalsBlock} style={{ marginTop: '3.5rem' }}>
          <div className={styles.leftCol}>
            <span className="text-overline">Case Context</span>
            <h2 className={styles.sectionTitle}>Project Overview & Requirements</h2>
            <p className={styles.goalsText}>
              {project.client_requirements || project.description || 'Client requirements were fulfilled according to bespoke structural designs.'}
            </p>
          </div>
          <div className={`glass-panel ${styles.rightCol}`}>
            <strong>Project Metadata</strong>
            <div className={styles.metaRow}>
              <span>Client: {project.client_name || 'Confidential'}</span>
              <span>Architect: {project.architect_name || 'In-house Team'}</span>
              <span>Location: {project.location || 'Not Specified'}</span>
              {project.floors_count && <span>Floors: {project.floors_count}</span>}
              {project.material_grade && <span>Materials: {project.material_grade}</span>}
              {project.seismic_protection && <span>Seismic Safety: {project.seismic_protection}</span>}
              {project.eco_features && <span>Eco Features: {project.eco_features}</span>}
              {project.scope_tags && (
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.scope_tags.split(',').map(tag => (
                    <span key={tag} style={{ background: 'var(--accent)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{tag.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Structural Challenges & Engineering Solutions */}
      {/* ========================================== */}
      {(project.challenges || project.solutions) && (
        <section className={`section ${styles.challengesSection}`}>
          <div className="container grid-2" style={{ gap: '3rem' }}>
            {project.challenges && (
              <div className={`glass-panel ${styles.challengesCard}`}>
                <div className={styles.cardHeader} style={{ color: '#ef4444' }}>
                  <ShieldAlert size={20} />
                  <h3>Site Challenges</h3>
                </div>
                <div className={styles.cardText}>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, listStylePosition: 'outside' }}>
                    {(project.challenges.includes('*') || project.challenges.includes('\n')
                      ? project.challenges.split(/(?:\*|\n)/)
                      : project.challenges.split(/\.\s+/)
                    )
                      .map(s => s.trim())
                      .filter(Boolean)
                      .map((item, idx, arr) => {
                        const isSentenceSplit = !project.challenges.includes('*') && !project.challenges.includes('\n');
                        const formattedItem = isSentenceSplit && !item.endsWith('.') ? item + '.' : item;
                        return (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>{formattedItem}</li>
                        );
                      })
                    }
                  </ul>
                </div>
              </div>
            )}

            {project.solutions && (
              <div className={`glass-panel ${styles.challengesCard}`}>
                <div className={styles.cardHeader} style={{ color: '#22c55e' }}>
                  <Award size={20} />
                  <h3>Engineering Solutions</h3>
                </div>
                <div className={styles.cardText}>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0, listStylePosition: 'outside' }}>
                    {(project.solutions.includes('*') || project.solutions.includes('\n')
                      ? project.solutions.split(/(?:\*|\n)/)
                      : project.solutions.split(/\.\s+/)
                    )
                      .map(s => s.trim())
                      .filter(Boolean)
                      .map((item, idx, arr) => {
                        const isSentenceSplit = !project.solutions.includes('*') && !project.solutions.includes('\n');
                        const formattedItem = isSentenceSplit && !item.endsWith('.') ? item + '.' : item;
                        return (
                          <li key={idx} style={{ marginBottom: '0.5rem' }}>{formattedItem}</li>
                        );
                      })
                    }
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      )}


      {/* ========================================== */}
      {/* SECTION: Before & After */}
      {/* ========================================== */}
      {project.images?.some(i => i.stage === 'Before') && project.images?.some(i => i.stage === 'After') && (
        <section className={`section ${styles.beforeAfterSection}`}>
          <div className="container">
             <SectionHeader
              eyebrow="Transformation"
              heading="Before & After"
              subheading="See the striking visual difference from site acquisition to final handover."
            />
            <div className="grid-2" style={{ gap: '2rem', marginTop: '3rem' }}>
              <div className="glass-panel" style={{ padding: '0.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <img src={project.images.find(i => i.stage === 'Before').image} alt="Before" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#000', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>BEFORE</span>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '0.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <img src={project.images.find(i => i.stage === 'After').image} alt="After" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '4px' }} />
                  <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--accent)', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>AFTER</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* SECTION: Image Gallery (Replacing Before/After) */}
      {/* ========================================== */}
      {(project?.images && project.images.length > 0) && (
        <section className={`section ${styles.comparisonSection}`}>
          <div className="container" style={{ maxWidth: '1000px' }}>
            <SectionHeader
              eyebrow="Visual checks"
              heading="Project Gallery"
              subheading="Explore detailed images from different phases of the project lifecycle."
            />

            {/* Tabs */}
            <>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
                {availableStages.map(stage => (
                  <button
                    key={stage}
                    onClick={() => setActiveStage(stage)}
                    style={{
                      padding: '0.5rem 1.5rem',
                      borderRadius: '50px',
                      background: activeStage === stage ? 'var(--accent)' : 'transparent',
                      color: activeStage === stage ? '#fff' : 'var(--text-main, #333)',
                      border: '1px solid',
                      borderColor: activeStage === stage ? 'var(--accent)' : '#ccc',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {stage}
                  </button>
                ))}
              </div>

              {/* Masonry-style Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '3.5rem' }}>
                {filteredImages.map((img, idx) => (
                  <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.1} className={`glass-panel`} style={{ padding: '0.5rem', overflow: 'hidden' }}>
                    <img 
                      src={img.image} 
                      alt={img.caption || `${project.title} - ${img.stage}`} 
                      style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '4px', cursor: 'zoom-in' }}
                      onClick={() => setLightboxImage(img.image)}
                    />
                    <div style={{ padding: '1rem 0.5rem 0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, letterSpacing: '1px' }}>
                        {img.stage} Phase
                      </span>
                      {img.caption && (
                        <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                          {img.caption}
                        </p>
                      )}
                    </div>
                  </MotionWrapper>
                ))}
              </div>
            </>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* SECTION: Material Showcase */}
      {/* ========================================== */}
      {/* <section className="section container">
        <SectionHeader
          eyebrow="Procured components"
          heading="Material Showcase"
          subheading="Raw concrete structural components specified directly for this case study landmark."
        />

        <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
          {materialsMock.map((mat, idx) => (
            <div key={idx} className={`glass-panel ${styles.materialCard}`}>
              <span className={styles.matBrand}>{mat.brand}</span>
              <h4 className={styles.matType}>{mat.type}</h4>
              <p className={styles.matWhy}>{mat.why}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ========================================== */}
      {/* SECTION: Drone Video Walkthrough */}
      {/* ========================================== */}
      {/* make th */}

      {/* ========================================== */}
      {/* SECTION: FAQs Specific to Project */}
      {/* ========================================== */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Q&A Helpdesk"
          heading="Case Study FAQs"
          subheading="Answers detailing site parameters, sewage systems, and billing releases."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Related Case Studies */}
      {/* ========================================== */}
      {/* <section className={`section ${styles.relatedSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Explore Portfolio"
            heading="Related Completed Projects"
            subheading="Review other residential villa complexes or heavy gantry logistics yards completed."
          />

          <div className="grid-3" style={{ marginTop: '3.5rem' }}>
            {relatedProjects.map((item, idx) => (
              <MotionWrapper key={item.id} variant="slideUp" delay={idx * 0.1}>
                <GenericCard
                  image={item.image || fallbackImage}
                  badge={item.category_name || item.category || 'Portfolio'}
                  title={item.title}
                  description={item.description}
                  meta={[
                    <span key="area"><Compass size={12} style={{ marginRight: '0.25rem', color: 'var(--accent)' }} /> {item.built_area || item.area || 'TBD'}</span>,
                    <span key="year"><Clock size={12} style={{ marginRight: '0.25rem', color: 'var(--accent)' }} /> {item.completion_date || item.year || 'TBD'}</span>
                  ]}
                  ctaText="Read Case Study"
                  ctaLink={`/projects/${item.id}`}
                />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section> */}

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '2rem'
          }}
          onClick={() => setLightboxImage(null)}
        >
          <img 
            src={lightboxImage} 
            alt="Enlarged view" 
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }} 
          />
        </div>
      )}
      
    </div>
  );
};

export default ProjectDetail;
