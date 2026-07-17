import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Compass, Play, Layers, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';

import SectionHeader from '../components/SectionHeader';
import OneStopHomeSolutions from '../components/OneStopHomeSolutions';
import Accordion from '../components/Accordion';
import MotionWrapper from '../components/MotionWrapper';
import Button from '../components/Button';
import HeroOverlay from '../components/HeroOverlay';
import PremiumTimeline from '../components/PremiumTimeline';

import { HeaderThemeContext } from '../components/Layout';
import styles from './Services.module.css';

const Services = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, services: servicesData, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, sections, isLoading: isPageLoading } = usePageData('services');
  const [activeCategory, setActiveCategory] = useState('All Divisions');
  const [activeStep, setActiveStep] = useState(0);

  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);



  const appConfig = siteSettings ? { seo: { defaultTitle: `${siteSettings.site_name} | Services`, defaultDescription: pageData?.subtitle || 'Services', siteUrl: '' } } : { seo: { defaultTitle: 'Loading...', defaultDescription: 'Loading...', siteUrl: '' } };

  // Generate categories from loaded services
  const rawCategories = ['All Divisions', ...new Set(servicesData.map(s => s.category_name || s.category || 'General'))];

  // 9 process steps enriched
  const processSteps = [
    { title: 'Idea', label: 'Vision & Goals', desc: 'Collaborating to understand spatial requirements, budget limitations, and architectural dreams.', duration: '3 Days', deliverables: ['Budget Planning', 'Site Analysis', 'Requirement Gathering'], team: 'Lead Architect, Client Coordinator', status: 'Completed', checks: 'Site viability approval', illustration: '📐', icon: <Layers size={20} /> },
    { title: 'Planning', label: 'Geotech Checks', desc: 'Mapping soil load capacities, plot coordinates parameters, and structuring timelines.', duration: '5 Days', deliverables: ['Soil Testing', 'Surveys', 'Timeline Scheduling'], team: 'Geotech Engineer, Planner', status: 'Completed', checks: 'Soil bearing capacity', illustration: '📊', icon: <Compass size={20} /> },
    { title: 'Design', label: 'BIM 3D Renderings', desc: 'Drafting Revit BIM blueprints, HVAC mapping, and exporting calculation reports.', duration: '14 Days', deliverables: ['3D Renderings', 'BIM Coordination', 'Load Calculations'], team: 'BIM Architect, Designer', status: 'Current', checks: 'Structural audit log', illustration: '💻', icon: <Layers size={20} /> },
    { title: 'Approval', label: 'Zoning & Permits', desc: 'Submitting structural maps to municipal offices and securing clearances.', duration: '21 Days', deliverables: ['Sanction Files', 'Zoning NOC', 'Environmental Certifications'], team: 'Compliance Consultant', status: 'Upcoming', checks: 'Municipality approvals', illustration: '📁', icon: <Layers size={20} /> },
    { title: 'Construction', label: 'Foundation Curing', desc: 'Excavation, pouring rebar concrete foundations, and erecting structural frames.', duration: '120 Days', deliverables: ['Excavation', 'RCC Casting', 'Masonry'], team: 'Site Supervisor, Engineer', status: 'Upcoming', checks: 'Cube test certificates', illustration: '🏗', icon: <Layers size={20} /> },
    { title: 'Quality Check', label: 'Lab Audits', desc: 'Laboratory testing of concrete cubes compression limits and EAF steel checks.', duration: 'Ongoing', deliverables: ['Cube Testing', 'Tensile Inspections', 'Waterproofing Verification'], team: 'PMC Auditor, QC Tech', status: 'Upcoming', checks: 'Tensile validation', illustration: '🔬', icon: <Layers size={20} /> },
    { title: 'Interior', label: 'Fittings & Aesthetics', desc: 'Laying floor tiles, routing low-voltage wires, and installing sanitary fixtures.', duration: '45 Days', deliverables: ['Flooring', 'Ceiling Setup', 'Sanitary Fittings'], team: 'Interior Architect', status: 'Upcoming', checks: 'Bathroom leak validation', illustration: '🛋', icon: <Layers size={20} /> },
    { title: 'Handover', label: 'Keys Sign-Off', desc: 'Final site snagging inspections list clearing and official keys transfer.', duration: '7 Days', deliverables: ['Snagging List', 'Safety Certifications', 'Final Keys'], team: 'Project Director', status: 'Upcoming', checks: 'Compliance log', illustration: '🔑', icon: <Layers size={20} /> },
    { title: 'Warranty', label: '15-Year Coverage', desc: 'Providing structural warranty coverage certificate and maintenance checkups.', duration: '15 Years', deliverables: ['Structural Warranty', 'Dampness Warranty', 'Inspections Calendar'], team: 'Support Lead', status: 'Upcoming', checks: 'Warranty registry', illustration: '📜', icon: <Layers size={20} /> }
  ];

  // const faqItems = (faqs || []).slice(0, 4).map((f) => ({
  //   title: f.question || f.q,
  //   content: f.answer || f.a
  // }));

  const filteredServices = activeCategory === 'All Divisions' 
    ? servicesData 
    : servicesData.filter(s => (s.category_name || s.category) === activeCategory);

  return (
    <div className="services-page">
      <Helmet>
        <title>{appConfig.seo.defaultTitle}</title>
      </Helmet>

      <section className={styles.heroSection}>
        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Services Ecosystem</span>
          </div>

          <h1 className={styles.heroTitle}>{pageData?.title || 'Architectural & Civil Engineering Ecosystem'}</h1>
          <p className={styles.heroDesc}>{pageData?.subtitle || 'Deploying advanced delivery frameworks.'}</p>

          <div className={styles.heroCtaRow}>
            <Link to="/contact" className="btn btn-primary">Book Site Assessment</Link>
          </div>
        </div>
      </section>

      <OneStopHomeSolutions />

      <section className="section container">
        <SectionHeader
          eyebrow="Category Filter"
          heading="Specialty Services Details"
          subheading="Select a category button below to review granular service scopes."
        />

        <div className={styles.pillsContainer} style={{ marginTop: '3.5rem' }}>
          {rawCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setActiveStep(0); }}
              className={`${styles.pillBtn} ${activeCategory === cat ? styles.pillActive : ''}`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="grid-3" style={{ marginTop: '2.5rem', gap: '2rem' }}>
          {filteredServices.map((service, idx) => (
            <MotionWrapper key={service.id || idx} variant="slideUp" delay={idx * 0.1}>
              <div className={`glass-panel ${styles.serviceCard}`}>
                <div className={styles.cardImage}>
                  <img 
                    src={service.image || service.detail_image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"} 
                    alt={service.title} 
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardCategory}>{service.category_name || service.category}</span>
                    <span className={styles.cardTimeline}>{service.tagline || 'Premium Quality'}</span>
                  </div>
                  
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description || service.desc}</p>
                  
                  <div className={styles.cardFeatures}>
                    {(service.features || []).slice(0, 3).map((feat, fidx) => (
                      <div key={fidx} className={styles.featureItem}>
                        <div className={styles.featureDot} />
                        <span>{feat.text || feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={`/services/${service.id}`} className={styles.cardButton}>
                    Explore Specifications <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      <PremiumTimeline
        eyebrow="Milestone Targets"
        heading="Scheduling & Process Milestones"
        subheading="An interactive overview indicating chronological steps, lab compression audits and keys handover parameters."
        steps={processSteps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />

      {/* ========================================== */}
      {/* SECTION: 7. Grouped FAQ Accordions */}
      {/* ========================================== */}
      {/* <section id="faq" className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Questions Desk"
          heading="Ecosystem FAQs"
          subheading="Common questions detailing permit approval timelines, material supply logistics, and site PMC checks."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>
      </section> */}

      
      
    </div>
  );
};

export default Services;
