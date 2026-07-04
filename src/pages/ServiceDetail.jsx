import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, HardHat, ShieldCheck, Compass, Info, Play, HelpCircle 
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { servicesData } from '../data/servicesData';
import { faqData } from '../data/faqData';
import SectionHeader from '../components/sections/SectionHeader';
import GenericCard from '../components/cards/GenericCard';
import Accordion from '../components/ui/Accordion';
import MotionWrapper from '../components/common/MotionWrapper';
import Button from '../components/common/Button';
import InquiryForm from '../components/ui/InquiryForm';
import { HeaderThemeContext } from '../layouts/Layout';
import styles from './ServiceDetail.module.css';

const ServiceDetail = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { id } = useParams();
  const service = servicesData[id] || servicesData.residential;

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  // Fully comprehensive image mappings to cover new services
  const serviceImages = {
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    industrial: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
    architecture: 'https://images.unsplash.com/photo-1503387762-592ded58c45a?auto=format&fit=crop&w=1200&q=80',
    renovation: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    sustainable: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    pmc: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
    'smart-home': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    'material-supply': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    'plan-approval': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    'legal-assistance': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  };

  const serviceThumbnails = {
    residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    industrial: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    architecture: 'https://images.unsplash.com/photo-1503387762-592ded58c45a?auto=format&fit=crop&w=600&q=80',
    renovation: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    sustainable: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80',
    pmc: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    'smart-home': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    'material-supply': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    'plan-approval': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80',
    'legal-assistance': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  };

  // Mock specs
  const materialsMock = [
    { title: 'Grade-53 Concrete', spec: 'Standard M25/M30 Structural concrete mixes', desc: 'Compression-tested aggregate poured under anti-shaking conditions.' },
    { title: 'TMT Ductile Rebar Steel', spec: 'Fe 550D TMT Reinforcements spans', desc: 'Certified high elongation steel profiles with high rust resistance.' },
    { title: 'Acoustic Block Masonry', spec: 'Lightweight AAC structural insulated wall blocks', desc: 'Pre-cured blocks providing optimized insulation and firewall checks.' }
  ];

  // Recommendations
  const relatedServices = Object.values(servicesData)
    .filter((srv) => srv.id !== service.id)
    .slice(0, 3);

  // Grouped FAQ Items specific to service
  const serviceFAQs = faqData.slice(0, 3).map((f) => ({
    title: f.q,
    content: f.a
  }));

  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.85), rgba(11, 15, 25, 0.9)), url(${serviceImages[service.id]})`
  };

  return (
    <div className="service-detail-page">
      <Helmet>
        <title>{service.title} Specifications | Paramarsh Construction</title>
        <meta name="description" content={service.tagline} />
      </Helmet>

      {/* Hero Header */}
      <section className={styles.hero} style={heroStyle}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <Link to="/services">Services</Link>
            <ChevronRight size={10} />
            <span>{service.title}</span>
          </div>

          <h1 className={styles.heroTitle}>{service.title}</h1>
          <p className={styles.heroDesc}>{service.tagline}</p>
          
          <div className={styles.heroActions}>
            <a href="#quote-form" className="btn btn-primary">Request Pricing Call</a>
            <a href="#process" className={`btn btn-secondary ${styles.btnSecOutline}`}>Review Workflow</a>
          </div>
        </div>
      </section>

      {/* Split Details Section */}
      <section className="section container" id="overview">
        <Link to="/services" className={styles.backLink}>
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Return to Ecosystem
        </Link>

        <div className={styles.detailSplit} style={{ marginTop: '1.5rem' }}>
          {/* Left Column: Scope & Benefits */}
          <div className={styles.scopeColumn}>
            <span className="text-overline">Division Overview</span>
            <h2 className={styles.sectionTitle}>Scope & Specifications</h2>
            <p className={styles.descriptionText}>{service.desc}</p>

            <h3 className={styles.subHeading}>Engineering Benefits</h3>
            <div className={styles.benefitGrid}>
              {service.benefits.map((b, idx) => (
                <div key={idx} className={styles.benefitItem}>
                  <CheckCircle2 size={16} className={styles.benefitCheck} />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Micro Video Walkthrough Mockup */}
            <div className={styles.videoPlaceholder}>
              <img src={serviceThumbnails[service.id]} alt="Staging Preview" className={styles.videoBg} />
              <div className={styles.videoOverlay} />
              <div className={styles.playBtn} onClick={() => alert('Launching site staging playback walkthrough.')}>
                <Play size={18} fill="currentColor" />
              </div>
              <span className={styles.playLabel}>Watch Site Staging Video</span>
            </div>
          </div>

          {/* Right Column: Interactive Process Roadmap */}
          <div className={`glass-panel ${styles.roadmapCard}`} id="process">
            <h3 className={styles.roadmapHeading}>Workflow Milestones</h3>
            <p className={styles.roadmapSub}>Sequence of execution checkpoints followed by site coordinators:</p>

            <div className={styles.roadmapList}>
              {service.process.map((step, idx) => (
                <div key={idx} className={styles.roadmapStep}>
                  <div className={styles.indicatorCol}>
                    <span className={styles.roadmapBubble}>{idx + 1}</span>
                    {idx < service.process.length - 1 && <span className={styles.roadmapLine} />}
                  </div>
                  <div className={styles.stepTextCol}>
                    <span className={styles.stepTitle}>{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Standard Materials Table */}
      <section className={`section ${styles.materialsSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Bill of Materials"
            heading="Standard Structural Components"
            subheading="We specify only certified aggregates and high-ductility steel rebar systems."
          />

          <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
            {materialsMock.map((mat, idx) => (
              <div key={idx} className={`glass-panel ${styles.materialCard}`}>
                <span className={styles.matSpec}>{mat.spec}</span>
                <h4 className={styles.matTitle}>{mat.title}</h4>
                <p className={styles.matDesc}>{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service FAQ Accordion */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Q&A Helpdesk"
          heading="Service FAQs"
          subheading="Answers detailing timeline schedules, pricing calculations, and inspection files clearings."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={serviceFAQs} />
        </div>
      </section>

      {/* Inquiry Form Form */}
      <section className="section container" id="quote-form" style={{ maxWidth: '720px' }}>
        <div className="glass-panel" style={{ padding: '3rem' }}>
          <span className="text-overline" style={{ display: 'block', textAlign: 'center', marginBottom: '0.5rem' }}>Consultation Desk</span>
          <h3 style={{ textAlign: 'center', fontFamily: 'var(--font-family-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>
            Request Spec Consultation
          </h3>
          <InquiryForm defaultService={service.id} />
        </div>
      </section>

      {/* Related Services recommendations */}
      <section className={`section ${styles.relatedSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Explore Specialties"
            heading="Related Engineering Specialties"
            subheading="Complementary services supporting plan approvals, PMC quality checks, or smart home automations."
          />

          <div className="grid-3" style={{ marginTop: '3.5rem' }}>
            {relatedServices.map((srv, idx) => (
              <MotionWrapper key={srv.id} variant="slideUp" delay={idx * 0.1}>
                <GenericCard
                  image={serviceThumbnails[srv.id]}
                  badge={srv.tagline}
                  title={srv.title}
                  description={srv.desc}
                  ctaText="Explore Division Specs"
                  ctaLink={`/services/${srv.id}`}
                />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
