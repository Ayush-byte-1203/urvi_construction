import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Star, MessageSquare, ChevronRight, Play, Quote, Award, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { appConfig } from '../data/appConfig';
import { testimonialsData } from '../data/testimonialsData';
import SectionHeader from '../components/SectionHeader';
import MotionWrapper from '../components/MotionWrapper';
import MediaWrapper from '../components/MediaWrapper';
import Button from '../components/Button';

import { HeaderThemeContext } from '../components/Layout';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);
  const ratingsMetrics = [
    { value: '4.9/5', label: 'Average Client Rating' },
    { value: '150+', label: 'Landmarks Delivered' },
    { value: '99.4%', label: 'On-Time Handovers' },
    { value: '48%', label: 'Repeat Client Ratio' }
  ];

  const videoTestimonials = [
    {
      name: 'Dr. Ananya Sen',
      project: 'The Vista Waterfront Estates',
      duration: '2:40 Min',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Mr. Rajeev Verma',
      project: 'Apex Business Plaza',
      duration: '3:15 Min',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Mr. Satish Nair',
      project: 'Helios Cold Storage',
      duration: '1:50 Min',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const featured = testimonialsData[1]; // Dr. Ananya Sen

  return (
    <div className="testimonials-page">
      <Helmet>
        <title>Client Testimonials | {appConfig.company.name}</title>
        <meta name="description" content="Read reviews and testimonials from corporate group leaders and luxury residential clients." />
      </Helmet>

      {/* ========================================== */}
      {/* SECTION: Breadcrumb Header */}
      {/* ========================================== */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>Testimonials</span>
          </div>
          <h1 className="display-md" style={{ color: 'var(--text-primary)' }}>Client Testimonials</h1>
          <p className="subheading" style={{ margin: '0.5rem auto 0', maxWidth: '700px' }}>
            Discover why prominent corporate groups and premium homeowners choose BuildCraft to construct their high-value landmarks.
          </p>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Satisfaction Counters Section */}
      {/* ========================================== */}
      <section className="section container">
        <div className={styles.metricsGrid}>
          {ratingsMetrics.map((met, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.1} className={styles.metricCard}>
              <span className={styles.metricValue}>{met.value}</span>
              <span className={styles.metricLabel}>{met.label}</span>
            </MotionWrapper>
          ))}
        </div>

        {/* Featured Testimonial */}
        {featured && (
          <MotionWrapper variant="fadeIn" className={styles.featuredCard}>
            <div className={styles.featuredVisual}>
              <Quote size={80} className={styles.featuredQuoteIcon} />
            </div>
            
            <div className={styles.featuredText}>
              <span className="text-overline" style={{ color: 'var(--accent)' }}>Featured Review</span>
              <p className={styles.featuredQuote}>
                "{featured.quote}"
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-divider)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <div>
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>{featured.author}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{featured.role}</span>
                </div>
                <span className={styles.projectBadge}>
                  {featured.project}
                </span>
              </div>
            </div>
          </MotionWrapper>
        )}

        {/* Video Testimonials section */}
        <div style={{ marginBottom: '4rem' }}>
          <SectionHeader
            eyebrow="Video reviews"
            heading="Watch Client Success Stories"
            subheading="Hear directly from developers and homeowners detailing material clearances and on-site coordinates management."
          />

          <div className={styles.videoGrid} style={{ marginTop: '3rem' }}>
            {videoTestimonials.map((vid, idx) => (
              <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.15} className={styles.videoCard}>
                <div className={styles.videoThumbnail}>
                  <MediaWrapper src={vid.image} alt={vid.name} aspectRatio="16/10" />
                  <div className={styles.playOverlay}>
                    <button 
                      onClick={() => alert(`Mock video player triggered for ${vid.name}`)}
                      className={styles.playBtn}
                      aria-label={`Play review by ${vid.name}`}
                    >
                      <Play size={20} fill="var(--brand-primary-default)" />
                    </button>
                  </div>
                  <span className={styles.durationBadge}>{vid.duration}</span>
                </div>
                <div className={styles.videoInfo}>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{vid.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{vid.project}</span>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>

        {/* General Grid Reviews */}
        <div>
          <SectionHeader
            eyebrow="Reviews directory"
            heading="Verified Partner Reviews"
            subheading="Review scores gathered from structural inspections audits and keys handover checks."
          />

          <div className="grid-2" style={{ marginTop: '3rem' }}>
            {testimonialsData.map((r, i) => (
              <MotionWrapper key={i} variant="slideUp" delay={i * 0.1} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={styles.starsRow}>
                  {[...Array(r.rating || 5)].map((_, idx) => (
                    <Star key={idx} size={14} fill="var(--accent)" color="var(--accent)" />
                  ))}
                </div>
                
                <p className="mb-4" style={{ 
                  fontStyle: 'italic', 
                  fontSize: '0.95rem', 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: '1.6', 
                  flexGrow: 1 
                }}>
                  "{r.quote}"
                </p>
                
                <div className={styles.authorCard}>
                  <span className={styles.authorName}>{r.author}</span>
                  <span className={styles.authorRole}>{r.role}</span>
                  <span className={styles.projectBadge}>
                    Project: {r.project}
                  </span>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SECTION: Trust Highlights segment */}
      {/* ========================================== */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Credentials"
            heading="Our Structural Commitments"
            subheading="We back our general contracting works with verified laboratory audits and safety assurances."
          />

          <div className="grid-3" style={{ marginTop: '3rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
              <Award size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Verified Quality Checks</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  All structural concrete cubes undergo compression testing to assure load bearing capacities.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
              <ShieldCheck size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>15-Yr Frame Warranties</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  We guarantee concrete columns stability and rebar anti-rust treatments on elite structures.
                </p>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1rem' }}>
              <CheckCircle2 size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>snagging audit checks</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  We complete SNAG inspections covering all electrical switches and pipe plumbing before handing over keys.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default Testimonials;
