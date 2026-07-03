import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Briefcase, MapPin, Send, ShieldCheck, ChevronRight, Award, Compass, Star 
} from 'lucide-react';
import { appConfig } from '../../config/appConfig';
import SectionHeader from '../../components/sections/SectionHeader';
import MotionWrapper from '../../components/common/MotionWrapper';
import Button from '../../components/common/Button';
import CTA from '../../components/sections/CTA';
import styles from './styles.module.css';

const Careers = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const jobs = [
    {
      title: 'Senior Estimation Engineer (BOQ)',
      department: 'Hiring Operations - Estimations',
      location: 'Corporate HQ, Mumbai',
      type: 'Full-time / In-office',
      desc: 'Responsible for structural concrete modeling audits, raw materials cost estimations, and subcontractor bidding ledgers.'
    },
    {
      title: 'Senior Architectural Visualizer (BIM)',
      department: 'Hiring Operations - Design Cell',
      location: 'Corporate HQ, Mumbai',
      type: 'Full-time / Hybrid option',
      desc: 'Expert in preparing BIM designs, rendering photorealistic 3D interior walks, and detailing site construction maps.'
    },
    {
      title: 'Site Planning Manager',
      department: 'Hiring Operations - Construction',
      location: 'Regional Office, Western Zone',
      type: 'Full-time / Site-based',
      desc: 'Supervising concrete pouring, framing crews, monitoring steel ton deliveries, and ensuring strict site safety compliance.'
    }
  ];

  const cultureValues = [
    {
      title: 'Safety First Policies',
      desc: 'We enforce safety standards, protective gear checklists, and regular site audits to protect structural crews.'
    },
    {
      title: 'BIM Precision Focus',
      desc: 'Our architecture design division works on advanced BIM modeling, aligning wire conduits and concrete joints early.'
    },
    {
      title: 'Transparent Ledgers',
      desc: 'We make estimating structures transparent, updating steel rebar quantities and cement bulk prices.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="careers-page">
      <Helmet>
        <title>Careers & Jobs | {appConfig.company.name}</title>
        <meta name="description" content="Build the future with us. Join the design cell or construction operations team at BuildCraft." />
      </Helmet>

      {/* Breadcrumb Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>Careers</span>
          </div>
          <h1 className="display-md" style={{ color: 'var(--text-primary)' }}>Build the Future with Us</h1>
          <p className="subheading" style={{ margin: '0.5rem auto 0', maxWidth: '700px' }}>
            Join our structural engineering desks, design cells, and site planning branches.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="section container">
        <SectionHeader
          eyebrow="Culture & Values"
          heading="Why Build With BuildCraft"
          subheading="We build landmark frameworks while nurturing engineering talent and safety checklists."
        />

        <div className={styles.cultureGrid} style={{ marginTop: '3rem' }}>
          {cultureValues.map((val, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.1} className={styles.cultureCard}>
              <h3 className={styles.cultureTitle}>{val.title}</h3>
              <p className={styles.cultureDesc}>{val.desc}</p>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Open Positions & Form split layout */}
      <section className="section container">
        <div className="grid-2">
          {/* Job listings */}
          <div>
            <span className="text-overline">Current openings</span>
            <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '2.5rem' }}>Open Opportunities</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {jobs.map((job, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span className={styles.statusTag}>
                    {job.type}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', color: 'var(--text-primary)', fontWeight: 600 }}>{job.title}</h3>
                  
                  <div className={styles.jobMeta}>
                    <span>{job.department}</span>
                    <span>|</span>
                    <span className={styles.jobMetaItem}><MapPin size={12} style={{ color: 'var(--accent)' }} /> {job.location}</span>
                  </div>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: '1.5' }}>{job.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Careers application Form */}
          <div className="glass-panel" style={{ padding: '3rem', height: 'fit-content' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--accent)', marginBottom: '1.5rem' }}>
              Quick Apply
            </h3>
            
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <ShieldCheck size={56} style={{ color: 'var(--accent)', margin: '0 auto 1.5rem' }} />
                <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-family-display)', fontSize: '1.4rem' }}>Application Logged</h4>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
                  Thank you. Our Talent Acquisition team will inspect your credentials and schedule resume follow-ups.
                </p>
                <Button variant="outline" onClick={() => setFormSubmitted(false)}>Submit Another Application</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="fullname" className={styles.formLabel}>Full Name *</label>
                  <input type="text" id="fullname" required className={styles.formInput} />
                </div>
                
                <div className="grid-2">
                  <div>
                    <label htmlFor="email" className={styles.formLabel}>Email *</label>
                    <input type="email" id="email" required className={styles.formInput} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={styles.formLabel}>Phone *</label>
                    <input type="tel" id="phone" required className={styles.formInput} />
                  </div>
                </div>

                <div>
                  <label htmlFor="position" className={styles.formLabel}>Target Position *</label>
                  <select id="position" required className={styles.formInput} style={{ cursor: 'pointer' }}>
                    <option value="">Select a role</option>
                    {jobs.map((j, i) => (
                      <option key={i} value={j.title}>{j.title}</option>
                    ))}
                    <option value="internship">Graduate Internship Program</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="resume" className={styles.formLabel}>Resume URL (PDF Link) *</label>
                  <input type="url" id="resume" placeholder="Google Drive / Dropbox link" required className={styles.formInput} />
                </div>

                <div>
                  <label htmlFor="coverletter" className={styles.formLabel}>Brief Cover Note</label>
                  <textarea id="coverletter" rows="3" className={styles.formInput} style={{ resize: 'vertical' }}></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  Submit Resume Details <Send size={14} style={{ marginLeft: '0.25rem' }} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Internship opportunities section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            <span className="text-overline">Graduate program</span>
            <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '1.5rem' }}>Building Internships Program</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              We coordinates 6-month structural design and site supervision internships for engineering and architecture students. Learn on active project yards directly under senior site engineers.
            </p>
            <a href="#fullname" onClick={() => { document.getElementById('fullname')?.focus(); }}>
              <Button variant="primary" iconRight={<Compass size={16} />}>Apply for Internships</Button>
            </a>
          </div>

          <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Award size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Hands-on Site learning</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Monitor concrete pouring schedules, steel rebar logs, and structural checklists.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <Star size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>Career placement paths</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  Outstanding interns receive pre-placement corporate job offers upon graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <CTA 
        title="Want to Join BuildCraft Operations?"
        description="Connect with our talent acquisition desk or coordinate direct application files."
        primaryBtnText="View All Vacancies"
        primaryBtnLink="#fullname"
        secondaryBtnText="Request Cost Assessment"
        secondaryBtnLink="/contact"
        bgVariant="gradient"
        layout="center"
      />
    </div>
  );
};

export default Careers;
