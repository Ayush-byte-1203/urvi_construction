import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, Compass, Clock, MapPin, ShieldAlert, Award, ChevronRight, CheckCircle2, Play, Info, HelpCircle
} from 'lucide-react';
import { appConfig } from '@config/appConfig';
import { projectsData } from '@data/projectsData';

import SectionHeader from '@sections/SectionHeader';
import GenericCard from '@components/GenericCard';
import Accordion from '@components/Accordion';
import MotionWrapper from '@components/MotionWrapper';
import Button from '@components/Button';

import { HeaderThemeContext } from '@/layouts/Layout';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { id } = useParams();
  const project = projectsData[id] || projectsData['vista-residences'];

  const [sliderPos, setSliderPos] = useState(50);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  // Asset Mappings for Images
  const projectImages = {
    'apex-tower': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'vista-residences': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'helios-logistics': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    'luna-villas': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    'zenith-hub': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    'nova-assembly': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80'
  };

  const projectThumbnails = {
    'apex-tower': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    'vista-residences': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    'helios-logistics': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    'luna-villas': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    'zenith-hub': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    'nova-assembly': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80'
  };

  // Specs
  const technicalSpecs = [
    { label: 'Built area', value: project.area },
    { label: 'Floors Count', value: 'G + 2 Floors structure' },
    { label: 'Material Grade', value: 'Bespoke Luxury Tiers' },
    { label: 'Seismic Protection', value: 'Seismic Zone III Compliant' }
  ];

  // Materials Used
  const materialsMock = [
    { brand: 'TATA Steel Fe550D', type: 'Ductile rebar framing', why: 'Anti-corrosive properties safeguard foundations against waterfront humidity.' },
    { brand: 'UltraTech Cement', type: 'Grade-53 concrete', why: 'Ensures optimal slump tests and heavy-duty load parameters.' },
    { brand: 'Asian Paints Apex', type: 'Silicone Emulsion', why: 'Weather protection shield preserves facade aesthetics.' }
  ];

  const relatedProjects = Object.values(projectsData)
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.85), rgba(11, 15, 25, 0.9)), url(${projectImages[project.id]})`
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const faqItems = [
    { title: 'What was the exact construction duration?', content: `This project was completed within ${project.year === '2025' ? '12 Months' : '10 Months'}, aligning with baseline schedules.` },
    { title: 'Which raw material brands were specified?', content: 'Certified concrete was sourced from UltraTech Cement and steel rebar from TATA Steel.' }
  ];

  return (
    <div className="project-detail-page">
      <Helmet>
        <title>{project.title} Case study | Paramarsh Construction</title>
        <meta name="description" content={project.scope} />
      </Helmet>

      {/* Hero Header */}
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
          <p className={styles.heroDesc}>{project.tag} &middot; Completed specs case study</p>
        </div>
      </section>

      {/* Specifications Dashboard */}
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
            <h2 className={styles.sectionTitle}>Client Requirements</h2>
            <p className={styles.goalsText}>
              The client requested a bespoke structural design optimized for waterfront aesthetics, low carbon footprints, and seismic reinforcements.
            </p>
          </div>
          <div className={`glass-panel ${styles.rightCol}`}>
            <strong>Project Metadata</strong>
            <div className={styles.metaRow}>
              <span>Client: {project.client}</span>
              <span>Architect: {project.architect}</span>
              <span>Location: {project.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Structural Challenges & Engineering Solutions */}
      <section className={`section ${styles.challengesSection}`}>
        <div className="container grid-2" style={{ gap: '3rem' }}>
          <div className={`glass-panel ${styles.challengesCard}`}>
            <div className={styles.cardHeader} style={{ color: '#ef4444' }}>
              <ShieldAlert size={20} />
              <h3>Site Challenges</h3>
            </div>
            <p className={styles.cardText}>{project.challenges}</p>
          </div>

          <div className={`glass-panel ${styles.challengesCard}`}>
            <div className={styles.cardHeader} style={{ color: '#22c55e' }}>
              <Award size={20} />
              <h3>Engineering Solutions</h3>
            </div>
            <p className={styles.cardText}>{project.solutions}</p>
          </div>
        </div>
      </section>

      {/* Before & After Interactive Image Comparison Slider */}
      <section className={`section ${styles.comparisonSection}`}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionHeader
            eyebrow="Visual checks"
            heading="Before & After Comparison"
            subheading="Hover and slide your cursor left and right over the container to compare raw site excavation staging against the finished layout."
          />

          <div 
            className={styles.sliderContainer} 
            onMouseMove={handleMouseMove}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                setSliderPos(percentage);
              }
            }}
            style={{ marginTop: '3.5rem' }}
          >
            {/* Before image */}
            <div className={styles.beforeImageWrapper}>
              <img src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80" alt="Excavation Staging" />
              <span className={`${styles.sliderLabelTag} ${styles.labelBefore}`}>Before (Civil Base)</span>
            </div>

            {/* After image */}
            <div className={styles.afterImageWrapper} style={{ width: `${sliderPos}%` }}>
              <img src={projectImages[project.id]} alt="Finished Landmark" style={{ width: '800px', maxWidth: 'none' }} />
              <span className={`${styles.sliderLabelTag} ${styles.labelAfter}`}>After (Finished Villa)</span>
            </div>

            {/* Slider bar line */}
            <div className={styles.sliderBar} style={{ left: `${sliderPos}%` }}>
              <div className={styles.sliderHandle} />
            </div>
          </div>
        </div>
      </section>

      {/* Material Showcase */}
      <section className="section container">
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
      </section>

      {/* Drone Video Walkthrough */}
      <section className={`section ${styles.videoSection}`}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <SectionHeader
            eyebrow="Media playback"
            heading="Aerial Drone walkthrough"
            subheading="Watch finished structure layout details filmed via drone site checks."
          />

          <div className={styles.videoPlayerCard} style={{ marginTop: '3rem' }}>
            <img src={projectThumbnails[project.id]} alt="Drone Preview" />
            <div className={styles.videoOverlay} />
            <button className={styles.playBtn} onClick={() => alert('Launching drone walkthrough playback.')}>
              <Play size={20} fill="currentColor" />
            </button>
            <span className={styles.playbackTag}>Play Timelapse</span>
          </div>
        </div>
      </section>

      {/* FAQs Specific to Project */}
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

      {/* Related Case Studies */}
      <section className={`section ${styles.relatedSection}`}>
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
                  image={projectThumbnails[item.id]}
                  badge={item.tag}
                  title={item.title}
                  description={item.scope}
                  meta={[
                    <span key="area"><Compass size={12} style={{ marginRight: '0.25rem', color: 'var(--accent)' }} /> {item.area}</span>,
                    <span key="year"><Clock size={12} style={{ marginRight: '0.25rem', color: 'var(--accent)' }} /> {item.year}</span>
                  ]}
                  ctaText="Read Case Study"
                  ctaLink={`/projects/${item.id}`}
                />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default ProjectDetail;
