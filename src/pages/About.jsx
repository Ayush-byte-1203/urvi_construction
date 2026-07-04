import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target, Compass, Shield, Award, Users, FileText, CheckCircle2, ChevronRight, ArrowRight
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { statsData } from '../data/statsData';
import { testimonialsData } from '../data/testimonialsData';
import SectionHeader from '../components/sections/SectionHeader';
import Timeline from '../components/ui/Timeline';
import MotionWrapper from '../components/common/MotionWrapper';
import MediaWrapper from '../components/common/MediaWrapper';
import Button from '../components/common/Button';
import CTA from '../components/sections/CTA';
import HeroOverlay from '../components/common/HeroOverlay';
import { HeaderThemeContext } from '../layouts/Layout';
import styles from './About.module.css';

const About = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);
  const coreValues = [
    { icon: <Shield size={24} />, title: 'Safety Integrity', desc: 'Ensuring structural safety and EAF material load certifications.' },
    { icon: <Target size={24} />, title: 'Millimetric Precision', desc: 'Drafting exact BOQ estimations and matching strict planning codes.' },
    { icon: <Compass size={24} />, title: 'Green Sustainability', desc: 'Utilizing carbon-absorbing concrete blocks and solar orientation plans.' },
    { icon: <Award size={24} />, title: 'Uncompromising Quality', desc: 'Using certified engineering teams and high-grade cement spans.' },
    { icon: <Users size={24} />, title: 'Total Transparency', desc: 'Providing active updates and budget spreadsheets on client portals.' },
    { icon: <FileText size={24} />, title: 'Milestone Adherence', desc: 'Deploying continuous logistics checks to keep sites on schedule.' },
    { icon: <CheckCircle2 size={24} />, title: 'Aesthetic Vision', desc: 'Bespoke designs under double-glazed architectural facades.' },
    { icon: <ArrowRight size={24} />, title: 'Operational Excellence', desc: 'Managing civil submissions, zoning clearances, and final keys handover.' }
  ];

  const timelineSteps = [
    { step: '2011', title: 'Company Founded', description: 'Established as a residential renovator cell in Placeholder City.' },
    { step: '2015', title: 'Commercial Expansion', description: 'First corporate commercial plaza completed with zero safety incidents.' },
    { step: '2019', title: 'Industrial Division Launch', description: 'Launched heavy logistics warehouse units and precast span manufacturing.' },
    { step: '2023', title: 'ISO & Quality Awards', description: 'Recognized for eco-conscious build choices and green orientations.' },
    { step: 'Future', title: 'AI Staged Construction', description: 'Integrating live project monitoring and structural sensor grids.' }
  ];

  const certifications = [
    { title: 'ISO 9001:2015', authority: 'Quality Management Standards', desc: 'Ensures construction practices and material procurement align with global rules.' },
    { title: 'ISO 45001:2018', authority: 'Occupational Health & Safety', desc: 'Verified on-site worker safety protocols and zero-accident target checks.' },
    { title: 'Green Building Council', authority: 'Sustainable Construction', desc: 'LEED orientation design parameters and recycled materials usages.' }
  ];

  const materialPartners = [
    { name: 'UltraTech Cement', category: 'Cement Spans' },
    { name: 'Tata Tiscon Steel', category: 'EAF Reinforcements' },
    { name: 'Havells Electrical', category: 'Conduits & Grid' },
    { name: 'Asian Paints', category: 'Coatings' },
    { name: 'Kajaria Tiles', category: 'Flooring Layouts' },
    { name: 'Jaquar Fittings', category: 'Sanitary Spcs' }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  ];

  // Curate testimonial
  const featuredTestimonial = testimonialsData[0];

  return (
    <div className="about-page">
      <Helmet>
        <title>About Us &amp; Legacy | {appConfig.company.name}</title>
        <meta name="description" content="Discover our history of engineering landmarks, certifications, partner networks, and values that make us Vadodara's premier construction company." />
        <link rel="canonical" href={`${appConfig.seo.siteUrl}/about`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`About Us & Legacy | ${appConfig.company.name}`} />
        <meta property="og:description" content="Discover our history of engineering landmarks, certifications, partner networks, and values." />
        <meta property="og:url" content={`${appConfig.seo.siteUrl}/about`} />
        <meta property="og:image" content={appConfig.seo.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`About Us | ${appConfig.company.name}`} />
        <meta name="twitter:description" content="Discover our engineering legacy, certifications and partner network." />
        <meta name="twitter:image" content={appConfig.seo.ogImage} />
      </Helmet>

      {/* Breadcrumbs Subpage Hero */}
      <section className={styles.hero}>
        <HeroOverlay type="dark" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>About Us</span>
          </div>
          <h1 className={styles.heroTitle}>Who We Are</h1>
          <p className={styles.heroDesc}>
            We translate architectural calculations into physical luxury and structural resilience.
          </p>
        </div>
      </section>

      {/* Heritage split layout */}
      <section className="section container">
        <div className={styles.overviewSplit}>
          <MotionWrapper variant="slideRight" className={styles.overviewText}>
            <span className="text-overline">Heritage & Foundation</span>
            <h2 className="display-sm">Engineered for Lifetimes</h2>
            <p className="text-body-md">
              At Paramarsh Construction, we believe that premium landmark properties are defined by details.
              Our teams manage zoning permissions, civil calculations, precast concrete structures, and interior fit-outs under strict timelines.
            </p>
            <p className="text-body-sm" style={{ color: 'var(--text-muted)' }}>
              Headquartered in Placeholder City, we maintain a zero-incident safety track record across all our residential, commercial, and industrial sites.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="slideLeft">
            <div className={styles.overviewImageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
                alt="Paramarsh Construction Engineering Staging"
                className={styles.overviewImage}
              />
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className={styles.visionMissionSection}>
        <div className="container grid-2" style={{ gap: '3rem' }}>
          <MotionWrapper variant="slideUp" className={styles.visionCard}>
            <Target size={36} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Mission</h3>
            <p className={styles.cardDesc}>
              To construct exceptional spaces that inspire human lives, optimize energy utilization scales, and build confidence through transparent material ledgers and scheduled deliveries.
            </p>
          </MotionWrapper>

          <MotionWrapper variant="slideUp" delay={0.15} className={styles.visionCard}>
            <Compass size={36} className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>Our Vision</h3>
            <p className={styles.cardDesc}>
              To pioneer zero-carbon concrete block integrations, advanced BIM drawings coordinations, and smart sensory monitoring structures, establishing a new global benchmark of construction excellence.
            </p>
          </MotionWrapper>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="section container">
        <SectionHeader
          eyebrow="Core Values"
          heading="What Governs Our Sites"
          subheading="Our engineering supervisors, design coordinators, and contractors operate under strict guidelines to ensure quality."
        />

        <div className={styles.valuesGrid}>
          {coreValues.map((val, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.08} className={styles.valueCard}>
              <div style={{ color: 'var(--accent)', marginBottom: '0.25rem' }}>{val.icon}</div>
              <h4 className={styles.valueTitle}>{val.title}</h4>
              <p className={styles.valueDesc}>{val.desc}</p>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Company Timeline milestones */}
      <section className={styles.timelineSection}>
        <div className="container">
          <SectionHeader
            eyebrow="Milestones"
            heading="Historical Staged Timeline"
            subheading="Review our trajectory from boutique residential drafts to heavy civil logistics developers."
          />
          <div style={{ marginTop: '4rem' }}>
            <Timeline items={timelineSteps} />
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="section container">
        <SectionHeader
          eyebrow="Credentials"
          heading="Certifications & Safety Protocols"
          subheading="Every concrete pour, structural weld, and electrical layout undergoes verified inspections to match international benchmarks."
        />

        <div className="grid-3" style={{ marginTop: '3rem' }}>
          {certifications.map((cert, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.15} className="glass-panel" style={{ padding: '2.5rem' }}>
              <span className="text-overline" style={{ fontSize: '0.75rem' }}>{cert.authority}</span>
              <h4 className="card-heading mb-2" style={{ marginTop: '0.5rem', fontWeight: 600 }}>{cert.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{cert.desc}</p>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Material Partners Grayscale Hovers */}
      <section className={styles.partnersSection}>
        <div className="container">
          <SectionHeader
            eyebrow="Supply Chain"
            heading="Premium Material Partners"
            subheading="We procure only certified raw materials from verified vendors, ensuring structural endurance."
          />

          <div className={styles.partnersGrid}>
            {materialPartners.map((part, idx) => (
              <MotionWrapper key={idx} variant="fadeIn" delay={idx * 0.08} className={styles.partnerLogoCard}>
                <div>
                  <div className={styles.partnerName}>{part.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', textTransform: 'uppercase' }}>
                    {part.category}
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Site Gallery */}
      <section className="section container">
        <SectionHeader
          eyebrow="Active Operations"
          heading="Operations Gallery"
          subheading="A visual look into our structural construction yards, drafting offices, and completed projects."
        />

        <div className={styles.galleryGrid}>
          {galleryImages.map((src, idx) => (
            <MotionWrapper key={idx} variant="scale" delay={idx * 0.1} className="glass-panel" style={{ overflow: 'hidden' }}>
              <MediaWrapper
                src={src}
                alt={`Paramarsh Construction Operation ${idx + 1}`}
                aspectRatio="16/10"
                style={{ transition: 'transform var(--transition-slow)' }}
              />
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Featured Testimonial Highlight */}
      <section className={styles.partnersSection}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <span className="text-overline">Client Reference</span>
          <p className="text-body-lg" style={{ fontStyle: 'italic', color: 'var(--text-primary)', margin: '1.5rem 0', fontFamily: 'var(--font-family-display)' }}>
            "{featuredTestimonial.quote}"
          </p>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{featuredTestimonial.author}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            {featuredTestimonial.role} &middot; <strong>{featuredTestimonial.project}</strong>
          </div>
          <Link to="/testimonials">
            <Button variant="outline" iconRight={<ArrowRight size={16} />}>View All Client Reviews</Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;
