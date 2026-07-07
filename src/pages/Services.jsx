import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Compass, HardHat, FileText, ShieldCheck, ArrowRight, Info, Play, CheckCircle2, Star, Clock,
  Sparkles, CalendarDays, ClipboardCheck, Hammer, Sofa, KeyRound, BadgeCheck, Users, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { appConfig } from '@config/appConfig';
import { servicesData } from '@data/servicesData';
import { faqData } from '@data/faqData';

import SectionHeader from '@sections/SectionHeader';
import OneStopHomeSolutions from '@sections/OneStopHomeSolutions';
import Accordion from '@components/Accordion';
import MotionWrapper from '@components/MotionWrapper';
import Button from '@components/Button';
import HeroOverlay from '@components/HeroOverlay';
import PremiumTimeline from '@components/PremiumTimeline';

import { HeaderThemeContext } from '@/layouts/Layout';
import styles from './Services.module.css';

const Services = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [activeCategory, setActiveCategory] = useState('planning');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  const categories = [
    { id: 'planning', label: 'Planning & Design', icon: <Compass size={18} /> },
    { id: 'construction', label: 'Construction', icon: <HardHat size={18} /> },
    { id: 'specialized', label: 'Specialized Services', icon: <FileText size={18} /> },
    { id: 'post', label: 'Post-Construction', icon: <ShieldCheck size={18} /> }
  ];

  // Group services by category
  const categoryServices = {
    planning: [
      { id: 'architecture', title: 'Architecture & Design', desc: 'BIM coordinates, spatial layouts, 3D renderings.', tag: 'Design Cell', timeline: '3-6 Weeks', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=500&q=80' },
      { id: 'sustainable', title: 'Sustainable Optimization', desc: 'Low-carbon concrete, solar path coordinates.', tag: 'Eco Design', timeline: '2-4 Weeks', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80' }
    ],
    construction: [
      { id: 'residential', title: 'Residential Construction', desc: 'Luxury custom villa builds, multi-family framing.', tag: 'General Contract', timeline: '8-12 Months', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' },
      { id: 'commercial', title: 'Commercial Developments', desc: 'Corporate hubs, plazas, high-load steel structures.', tag: 'Heavy Contract', timeline: '12-18 Months', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80' },
      { id: 'industrial', title: 'Industrial Complexes', desc: 'Gantry sheds, flat slab logistics zones.', tag: 'Precast Civil', timeline: '14-24 Months', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80' }
    ],
    specialized: [
      { id: 'pmc', title: 'PMC Audits Control', desc: 'Vendor checks, weekly reports, budget controls.', tag: 'Audit Consultancy', timeline: 'Ongoing', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80' },
      { id: 'material-supply', title: 'Direct Material Supply', desc: 'Procuring UltraTech cement, Tata rebar steel.', tag: 'Logistics Supply', timeline: 'Immediate', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80' },
      { id: 'plan-approval', title: 'Zoning & Permits Approval', desc: 'Soil geotech clearings, municipal submittals.', tag: 'Legal Approvals', timeline: '4-8 Weeks', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=500&q=80' }
    ],
    post: [
      { id: 'renovation', title: 'Interior Execution & Renovation', desc: 'Premium spatial fit-outs, retrofitting works.', tag: 'Interior Execution', timeline: '8-16 Weeks', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80' },
      { id: 'smart-home', title: 'Smart Home Automation', desc: 'Lighting automations, smart lock biometrics access.', tag: 'Sensors Mesh', timeline: '2-4 Weeks', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80' }
    ]
  };

  // 9 process steps enriched
  const processSteps = [
    { title: 'Idea', label: 'Vision & Goals', desc: 'Collaborating to understand spatial requirements, budget limitations, and architectural dreams.', duration: '3 Days', deliverables: ['Budget Planning', 'Site Analysis', 'Requirement Gathering'], team: 'Lead Architect, Client Coordinator', status: 'Completed', checks: 'Site viability approval', illustration: '📐', icon: <Sparkles size={20} /> },
    { title: 'Planning', label: 'Geotech Checks', desc: 'Mapping soil load capacities, plot coordinates parameters, and structuring timelines.', duration: '5 Days', deliverables: ['Soil Testing', 'Surveys', 'Timeline Scheduling'], team: 'Geotech Engineer, Planner', status: 'Completed', checks: 'Soil bearing capacity', illustration: '📊', icon: <CalendarDays size={20} /> },
    { title: 'Design', label: 'BIM 3D Renderings', desc: 'Drafting Revit BIM blueprints, HVAC mapping, and exporting calculation reports.', duration: '14 Days', deliverables: ['3D Renderings', 'BIM Coordination', 'Load Calculations'], team: 'BIM Architect, Designer', status: 'Current', checks: 'Structural audit log', illustration: '💻', icon: <Compass size={20} /> },
    { title: 'Approval', label: 'Zoning & Permits', desc: 'Submitting structural maps to municipal offices and securing clearances.', duration: '21 Days', deliverables: ['Sanction Files', 'Zoning NOC', 'Environmental Certifications'], team: 'Compliance Consultant', status: 'Upcoming', checks: 'Municipality approvals', illustration: '📁', icon: <ClipboardCheck size={20} /> },
    { title: 'Construction', label: 'Foundation Curing', desc: 'Excavation, pouring rebar concrete foundations, and erecting structural frames.', duration: '120 Days', deliverables: ['Excavation', 'RCC Casting', 'Masonry'], team: 'Site Supervisor, Engineer', status: 'Upcoming', checks: 'Cube test certificates', illustration: '🏗', icon: <Hammer size={20} /> },
    { title: 'Quality Check', label: 'Lab Audits', desc: 'Laboratory testing of concrete cubes compression limits and EAF steel checks.', duration: 'Ongoing', deliverables: ['Cube Testing', 'Tensile Inspections', 'Waterproofing Verification'], team: 'PMC Auditor, QC Tech', status: 'Upcoming', checks: 'Tensile validation', illustration: '🔬', icon: <ShieldCheck size={20} /> },
    { title: 'Interior', label: 'Fittings & Aesthetics', desc: 'Laying floor tiles, routing low-voltage wires, and installing sanitary fixtures.', duration: '45 Days', deliverables: ['Flooring', 'Ceiling Setup', 'Sanitary Fittings'], team: 'Interior Architect', status: 'Upcoming', checks: 'Bathroom leak validation', illustration: '🛋', icon: <Sofa size={20} /> },
    { title: 'Handover', label: 'Keys Sign-Off', desc: 'Final site snagging inspections list clearing and official keys transfer.', duration: '7 Days', deliverables: ['Snagging List', 'Safety Certifications', 'Final Keys'], team: 'Project Director', status: 'Upcoming', checks: 'Compliance log', illustration: '🔑', icon: <KeyRound size={20} /> },
    { title: 'Warranty', label: '15-Year Coverage', desc: 'Providing structural warranty coverage certificate and maintenance checkups.', duration: '15 Years', deliverables: ['Structural Warranty', 'Dampness Warranty', 'Inspections Calendar'], team: 'Support Lead', status: 'Upcoming', checks: 'Warranty registry', illustration: '📜', icon: <BadgeCheck size={20} /> }
  ];

  // Mapped FAQs
  const faqItems = faqData.slice(0, 5).map((f) => ({
    title: f.q,
    content: f.a
  }));

  const currentStep = processSteps[activeStep];

  return (
    <div className="services-page">
      <Helmet>
        <title>Engineering Services Ecosystem | Paramarsh Construction</title>
        <meta name="description"        content="Explore our complete services ecosystem from architectural planning and plan approvals to turnkey construction, PMC audits, and home automation integration." />
        <link rel="canonical"           href={`${appConfig.seo.siteUrl}/services`} />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="Engineering Services Ecosystem | Paramarsh Construction" />
        <meta property="og:description" content="Turnkey construction, PMC audits, architectural planning and smart home integration in Vadodara." />
        <meta property="og:url"         content={`${appConfig.seo.siteUrl}/services`} />
        <meta property="og:image"       content={appConfig.seo.ogImage} />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:title"      content="Construction Services | Paramarsh Construction" />
        <meta name="twitter:description" content="End-to-end construction services from concept to handover." />
        <meta name="twitter:image"      content={appConfig.seo.ogImage} />
      </Helmet>

      {/* 1. Services Hero Section */}
      <section className={styles.heroSection}>
        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Services Ecosystem</span>
          </div>

          <h1 className={styles.heroTitle}>Architectural & Civil Engineering Ecosystem</h1>
          <p className={styles.heroDesc}>
            Deploying BIM coordinate systems, verified material logistics networks, municipal approval filings, and independent PMC quality audits under a unified delivery framework.
          </p>

          <div className={styles.heroCtaRow}>
            <Link to="/contact" className="btn btn-primary">Book Site Assessment</Link>
          </div>

          {/* Animated Statistics inside Hero */}
          <div className={styles.heroStats}>
            <div className={styles.statBox}>
              <strong>15+</strong>
              <span>Years Support</span>
            </div>
            <div className={styles.statBox}>
              <strong>250+</strong>
              <span>Projects Handover</span>
            </div>
            <div className={styles.statBox}>
              <strong>100%</strong>
              <span>BOQ Safety Audited</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive One Stop Solutions Showcase */}
      <OneStopHomeSolutions />

      {/* 3. Categorized Details Grid */}
      <section className="section container">
        <SectionHeader
          eyebrow="Category Filter"
          heading="Specialty Services Details"
          subheading="Select a category button below to review granular service scopes, expected durations and live image previews."
        />

        {/* Category Tabs */}
        <div className={styles.pillsContainer} style={{ marginTop: '3.5rem' }}>
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setActiveStep(0);
              }}
              className={`${styles.pillBtn} ${activeCategory === tab.id ? styles.pillActive : ''}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid-3" style={{ marginTop: '2.5rem', gap: '2rem' }}>
          {categoryServices[activeCategory].map((srv, idx) => (
            <MotionWrapper
              key={srv.id}
              variant="slideUp"
              delay={idx * 0.1}
              className={styles.serviceCard}
            >
              <div className={styles.cardImage}>
                <img src={srv.image} alt={srv.title} />
                <span className={styles.cardTag}>{srv.tag}</span>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{srv.title}</h3>
                <p className={styles.cardDesc}>{srv.desc}</p>
                <div className={styles.cardMeta}>
                  <Clock size={12} className={styles.metaIcon} />
                  <span>Timeline: {srv.timeline}</span>
                </div>
                <Link to="/contact" className={styles.cardLink}>
                  Book Scope Assessment <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </Link>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* 4. Premium Scheduling Milestones Timeline */}
      <PremiumTimeline
        eyebrow="Milestone Targets"
        heading="Scheduling & Process Milestones"
        subheading="An interactive overview indicating chronological steps, lab compression audits and keys handover parameters."
        steps={processSteps}
        activeStep={activeStep}
        onStepChange={setActiveStep}
      />

      {/* 7. Grouped FAQ Accordions */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Questions Desk"
          heading="Ecosystem FAQs"
          subheading="Common questions detailing permit approval timelines, material supply logistics, and site PMC checks."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>
      </section>

      
      
    </div>
  );
};

export default Services;
