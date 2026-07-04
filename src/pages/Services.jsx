import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Compass, HardHat, FileText, ShieldCheck, ArrowRight, Info, Play, CheckCircle2, Star, Clock 
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { servicesData } from '../data/servicesData';
import { faqData } from '../data/faqData';

import SectionHeader from '../components/sections/SectionHeader';
import OneStopHomeSolutions from '../components/sections/OneStopHomeSolutions';
import Accordion from '../components/ui/Accordion';
import MotionWrapper from '../components/common/MotionWrapper';
import Button from '../components/common/Button';
import HeroOverlay from '../components/common/HeroOverlay';
import CTA from '../components/sections/CTA';
import { HeaderThemeContext } from '../layouts/Layout';
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
      { id: 'architecture', title: 'Architecture & Design', desc: 'BIM coordinates, spatial layouts, 3D renderings.', tag: 'Design Cell', timeline: '3-6 Weeks', image: 'https://images.unsplash.com/photo-1503387762-592ded58c45a?auto=format&fit=crop&w=500&q=80' },
      { id: 'sustainable', title: 'Sustainable Optimization', desc: 'Low-carbon concrete, solar path coordinates.', tag: 'Eco Design', timeline: '2-4 Weeks', image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80' }
    ],
    construction: [
      { id: 'residential', title: 'Residential Construction', desc: 'Luxury custom villa builds, multi-family framing.', tag: 'General Contract', timeline: '8-12 Months', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' },
      { id: 'commercial', title: 'Commercial Developments', desc: 'Corporate hubs, plazas, high-load steel structures.', tag: 'Heavy Contract', timeline: '12-18 Months', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80' },
      { id: 'industrial', title: 'Industrial Complexes', desc: 'Gantry sheds, flat slab logistics zones.', tag: 'Precast Civil', timeline: '14-24 Months', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=500&q=80' }
    ],
    specialized: [
      { id: 'pmc', title: 'PMC Audits Control', desc: 'Vendor checks, weekly reports, budget controls.', tag: 'Audit Consultancy', timeline: 'Ongoing', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=500&q=80' },
      { id: 'material-supply', title: 'Direct Material Supply', desc: 'Procuring UltraTech cement, Tata rebar steel.', tag: 'Logistics Supply', timeline: 'Immediate', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80' },
      { id: 'plan-approval', title: 'Zoning & Permits Approval', desc: 'Soil geotech clearings, municipal submittals.', tag: 'Legal Approvals', timeline: '4-8 Weeks', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=500&q=80' }
    ],
    post: [
      { id: 'renovation', title: 'Interior Execution & Renovation', desc: 'Premium spatial fit-outs, retrofitting works.', tag: 'Interior Execution', timeline: '8-16 Weeks', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80' },
      { id: 'smart-home', title: 'Smart Home Automation', desc: 'Lighting automations, smart lock biometrics access.', tag: 'Sensors Mesh', timeline: '2-4 Weeks', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=500&q=80' }
    ]
  };

  // 9 process steps
  const processSteps = [
    { title: 'Consultation', label: 'Needs Assessment', desc: 'Discussing budget caps, floor counts, and spatial ideas.' },
    { title: 'Site Visit', label: 'Soil Audits', desc: 'Testing land topography bounds and soil geotech reports.' },
    { title: 'Planning', label: 'Revit Blueprints', desc: 'Erecting 3D BIM coordinate models and engineering charts.' },
    { title: 'Quotation', label: 'Milestones BOQ', desc: 'Detailing pricing lines with zero contract margins additions.' },
    { title: 'Approval', label: 'Zoning clearances', desc: 'Submitting site files to local municipality planners.' },
    { title: 'Construction', label: 'Foundation Casting', desc: 'Erecting RCC pillars structural frames and brickworks.' },
    { title: 'Inspection', label: 'Lab Compression Checks', desc: 'Independent checks verify materials stress constraints.' },
    { title: 'Handover', label: 'Keys Sign-Off', desc: 'Clearing final checks list and transferring access keys.' },
    { title: 'Support', label: '15-Year Coverage', desc: 'Registering waterproofing and foundation warranty files.' }
  ];

  // Comparisons matrix
  const comparisons = [
    {
      service: 'Villa Construction',
      purpose: 'Bespoke Luxury Homes',
      suitable: 'Private Land Owners',
      timeline: '8-12 Months',
      advantage: 'Custom floor design & premium materials sourcing'
    },
    {
      service: 'Commercial Office Tower',
      purpose: 'Multi-Tenant Plazas',
      suitable: 'Real Estate Developers',
      timeline: '12-18 Months',
      advantage: 'LEED rating support and heavy-duty gantry steel frame'
    },
    {
      service: 'Project Management (PMC)',
      purpose: 'Budget & Quality Audits',
      suitable: 'Independent Home Builders',
      timeline: 'Varies',
      advantage: 'Zero billing margins leakages, weekly drone reports'
    }
  ];

  // Material Partners details
  const brandsList = [
    { name: 'UltraTech Cement', desc: 'Grade-53 structural strength cement.', use: 'Slab Casting & RCC Pillars', badge: 'Certified Core Strength', warranty: '15 Years' },
    { name: 'Tata Tiscon Steel', desc: 'TMT steel rebars featuring extreme ductility.', use: 'Foundations & Column Framing', badge: 'Fe 550D High Elongation', warranty: '20 Years' },
    { name: 'Asian Paints Apex', desc: 'Silicon emulsion weatherproof coating.', use: 'Exterior Protective Painting', badge: 'Anti-Algal UV-Protection', warranty: '7 Years' }
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
            <a href="#solutions" className={`btn btn-secondary ${styles.btnSecTransparent}`}>Interactive Circle</a>
          </div>

          {/* Animated Statistics inside Hero */}
          <div className={styles.heroStats}>
            <div className={styles.statBox}>
              <strong>15+</strong>
              <span>Years of Civil Audits</span>
            </div>
            <div className={styles.statBox}>
              <strong>100%</strong>
              <span>Material Lab Verified</span>
            </div>
            <div className={styles.statBox}>
              <strong>150+</strong>
              <span>Custom Villas Handed Over</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Service Categories Grouping */}
      <section className="section container">
        <SectionHeader
          eyebrow="Divisions Classification"
          heading="Grouped Construction Divisions"
          subheading="We cluster our specialist engineering services into distinct chronological categories representing the complete lifecycle of structural execution."
        />

        {/* Category Pills Menu */}
        <div className={styles.pillsContainer} style={{ marginTop: '3.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`${styles.pillBtn} ${activeCategory === cat.id ? styles.pillActive : ''}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
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
              className={`glass-panel ${styles.serviceCard}`}
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
                <Link to={`/services/${srv.id}`} className={styles.cardLink}>
                  Review Specifications <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                </Link>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* 3. One Stop Home Solutions widget */}
      <OneStopHomeSolutions />

      {/* 4. Interactive Build / Service Process */}
      <section className={`section ${styles.processSection}`} id="process">
        <div className="container">
          <SectionHeader
            eyebrow="Execution Milestones"
            heading="Turnkey Services Workflow"
            subheading="An step-by-step workflow managing compliance permits, pricing approvals, structure curing checks, and handover reports."
          />

          <div className={styles.journeyWrapper} style={{ marginTop: '4rem' }}>
            <div className={styles.timelineRow}>
              {processSteps.map((stg, idx) => (
                <div
                  key={idx}
                  className={`${styles.stepNode} ${idx === activeStep ? styles.activeNode : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={styles.iconCircle}>
                    <CheckCircle2 size={16} />
                  </div>
                  <span className={styles.nodeTitle}>{stg.title}</span>
                </div>
              ))}
            </div>

            <div className={`glass-panel ${styles.detailCard}`}>
              <div className={styles.detailHeader}>
                <span className={styles.stepNum}>Milestone Phase 0{activeStep + 1}</span>
                <span className={styles.stepLabel}>{currentStep.label}</span>
              </div>
              <h3 className={styles.detailTitle}>{currentStep.title}</h3>
              <p className={styles.detailText}>{currentStep.desc}</p>
              <div className={styles.note}>
                <Info size={14} />
                <span>Click nodes above to review scheduling checks.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Service Comparison Section */}
      <section className="section container">
        <SectionHeader
          eyebrow="Matrix Table"
          heading="Service Specifications Comparison"
          subheading="Compare scopes, parameters, execution schedules, and optimal applications of our key build formats."
        />

        <div className={styles.comparisonWrapper} style={{ marginTop: '3.5rem' }}>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Build Segment</th>
                  <th>Core Purpose</th>
                  <th>Suitable For</th>
                  <th>Baseline Duration</th>
                  <th>Structural Advantage</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, idx) => (
                  <tr key={idx}>
                    <td className={styles.boldCell}>{row.service}</td>
                    <td>{row.purpose}</td>
                    <td>{row.suitable}</td>
                    <td className={styles.accentCell}>{row.timeline}</td>
                    <td>{row.advantage}</td>
                    <td>
                      <Link to="/contact" className={styles.tableLink}>
                        Select Scope &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. Material Brands Expanded */}
      <section className={`section ${styles.brandsSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Partner Brands"
            heading="Certified Raw Materials"
            subheading="Review specifications and quality certifications of our certified cement, steel, and chemical waterproofing suppliers."
          />

          <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
            {brandsList.map((brand, idx) => (
              <MotionWrapper
                key={idx}
                variant="slideUp"
                delay={idx * 0.1}
                className={`glass-panel ${styles.brandCard}`}
              >
                <div className={styles.brandHeader}>
                  <h4 className={styles.brandTitle}>{brand.name}</h4>
                  <span className={styles.brandBadge}>{brand.badge}</span>
                </div>
                <p className={styles.brandDesc}>{brand.desc}</p>
                <div className={styles.brandSpecs}>
                  <div className={styles.specItem}>
                    <strong>Application:</strong>
                    <span>{brand.use}</span>
                  </div>
                  <div className={styles.specItem}>
                    <strong>Manufacturer Warranty:</strong>
                    <span>{brand.warranty}</span>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

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

      {/* 8. Conversion Quote CTA */}
      <CTA
        title="Ready to Deploy Our Design-Build Framework?"
        description="Schedule a site audit call with our engineers to verify structural soil capabilities and estimate material BOQ parameters today."
        primaryBtnText="Schedule Free Site Consultation"
        primaryBtnLink="/contact"
        secondaryBtnText="Review Estimate Pricing"
        secondaryBtnLink="/packages"
        bgVariant="gradient"
        layout="left"
      />
    </div>
  );
};

export default Services;
