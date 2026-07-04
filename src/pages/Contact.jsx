import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, MessageSquare, Calendar, Compass, ShieldCheck, Clock 
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import SectionHeader from '../components/sections/SectionHeader';
import MotionWrapper from '../components/common/MotionWrapper';
import Button from '../components/common/Button';
import HeroOverlay from '../components/common/HeroOverlay';
import { HeaderThemeContext } from '../layouts/Layout';
import styles from './Contact.module.css';

const Contact = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [activeTab, setActiveTab] = useState('general');
  const [submittedForms, setSubmittedForms] = useState({
    general: false,
    quote: false,
    consultation: false,
    sitevisit: false
  });

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  const handleFormSubmit = (e, formId) => {
    e.preventDefault();
    setSubmittedForms((prev) => ({ ...prev, [formId]: true }));
  };

  const handleResetForm = (formId) => {
    setSubmittedForms((prev) => ({ ...prev, [formId]: false }));
  };

  return (
    <div className="contact-page">
      <Helmet>
        <title>Contact Paramarsh Construction | Premium Construction Estimates</title>
        <meta name="description"        content="Get in touch for a free site assessment, engineering drawings review, or cost estimate. Book a consultation with Paramarsh Construction today." />
        <link rel="canonical"           href={`${appConfig.seo.siteUrl}/contact`} />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="Contact Paramarsh Construction | Premium Construction Estimates" />
        <meta property="og:description" content="Book a free site assessment or cost estimation call with our engineering team." />
        <meta property="og:url"         content={`${appConfig.seo.siteUrl}/contact`} />
        <meta property="og:image"       content={appConfig.seo.ogImage} />
        <meta name="twitter:card"       content="summary_large_image" />
        <meta name="twitter:title"      content="Contact Paramarsh Construction" />
        <meta name="twitter:description" content="Book a free site assessment or cost estimation call." />
        <meta name="twitter:image"      content={appConfig.seo.ogImage} />
      </Helmet>

      {/* Breadcrumb Header */}
      <section className={styles.hero}>
        <HeroOverlay type="dark" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>Contact</span>
          </div>
          <h1 className={styles.heroTitle}>Start the Dialogue</h1>
          <p className={styles.heroDesc}>
            Ready to map out your structural designs? Schedule an estimation call or submit your blueprints.
          </p>
        </div>
      </section>

      {/* Split layout: Info cards vs Multi-form */}
      <section className="section container">
        <div className="grid-2">
          {/* Direct channels */}
          <div>
            <span className="text-overline">Get in touch</span>
            <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '2.5rem' }}>Direct Communication Channels</h2>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <Phone size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <span className={styles.label}>Phone Inquiries</span>
                  <a href={appConfig.company.phoneFormatted} className={styles.value}>{appConfig.company.phone}</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Mail size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <span className={styles.label}>Email Inquiries</span>
                  <a href={appConfig.company.emailLink} className={styles.value}>{appConfig.company.email}</a>
                </div>
              </div>

              <div className={styles.infoCard}>
                <Clock size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <span className={styles.label}>Working Shifts</span>
                  <span className={styles.value}>{appConfig.company.businessHours}</span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <MapPin size={24} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div>
                  <span className={styles.label}>Headquarters Address</span>
                  <span className={styles.value}>{appConfig.company.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Multi-form Container */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            {/* Tabs */}
            <div className={styles.formTabs}>
              <button 
                onClick={() => setActiveTab('general')}
                className={`${styles.tabBtn} ${activeTab === 'general' ? styles.activeTabBtn : ''}`}
              >
                Inquiry
              </button>
              <button 
                onClick={() => setActiveTab('quote')}
                className={`${styles.tabBtn} ${activeTab === 'quote' ? styles.activeTabBtn : ''}`}
              >
                Quote
              </button>
              <button 
                onClick={() => setActiveTab('consultation')}
                className={`${styles.tabBtn} ${activeTab === 'consultation' ? styles.activeTabBtn : ''}`}
              >
                Consulting
              </button>
              <button 
                onClick={() => setActiveTab('sitevisit')}
                className={`${styles.tabBtn} ${activeTab === 'sitevisit' ? styles.activeTabBtn : ''}`}
              >
                Site Visit
              </button>
            </div>

            {/* General Inquiry Form */}
            {activeTab === 'general' && (
              submittedForms.general ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <CheckCircle2 size={56} style={{ color: 'var(--accent)', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-family-display)', fontSize: '1.4rem' }}>Enquiry Logged</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
                    Thank you. We have recorded your parameters. An engineer will return calls in 2 business days.
                  </p>
                  <Button variant="outline" onClick={() => handleResetForm('general')}>Submit Another Inquiry</Button>
                </div>
              ) : (
                <form onSubmit={(e) => handleFormSubmit(e, 'general')} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--accent)' }}>Project Inquiry Form</h3>
                  <div>
                    <label htmlFor="gen-name" className={styles.formLabel}>Full Name *</label>
                    <input type="text" id="gen-name" required className={styles.formInput} />
                  </div>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="gen-email" className={styles.formLabel}>Email *</label>
                      <input type="email" id="gen-email" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="gen-phone" className={styles.formLabel}>Phone *</label>
                      <input type="tel" id="gen-phone" required className={styles.formInput} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="gen-desc" className={styles.formLabel}>Message Details *</label>
                    <textarea id="gen-desc" required rows="4" className={styles.formInput} style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Inquiry <Send size={14} style={{ marginLeft: '0.25rem' }} />
                  </button>
                </form>
              )
            )}

            {/* Quote Request Form */}
            {activeTab === 'quote' && (
              submittedForms.quote ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <CheckCircle2 size={56} style={{ color: 'var(--accent)', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-family-display)', fontSize: '1.4rem' }}>Estimation Logged</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
                    Thank you. We have recorded your plot variables. Our estimating division will coordinate cost assessments.
                  </p>
                  <Button variant="outline" onClick={() => handleResetForm('quote')}>Submit Another Quote</Button>
                </div>
              ) : (
                <form onSubmit={(e) => handleFormSubmit(e, 'quote')} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--accent)' }}>Quotation Request Form</h3>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="q-name" className={styles.formLabel}>Name *</label>
                      <input type="text" id="q-name" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="q-phone" className={styles.formLabel}>Phone *</label>
                      <input type="tel" id="q-phone" required className={styles.formInput} />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="q-city" className={styles.formLabel}>City Location *</label>
                      <input type="text" id="q-city" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="q-plotsize" className={styles.formLabel}>Plot Area (sq. ft.) *</label>
                      <input type="text" id="q-plotsize" required className={styles.formInput} />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="q-package" className={styles.formLabel}>Build Package *</label>
                      <select id="q-package" required className={styles.formInput} style={{ cursor: 'pointer' }}>
                        <option value="core">Core Shell Build</option>
                        <option value="executive">Executive Smart Build</option>
                        <option value="signature">Signature Elite Build</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="q-budget" className={styles.formLabel}>Budget Range *</label>
                      <select id="q-budget" required className={styles.formInput} style={{ cursor: 'pointer' }}>
                        <option value="50">Below ₹50 Lakhs</option>
                        <option value="100">₹50 Lakhs - ₹1 Crore</option>
                        <option value="150">Above ₹1 Crore</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Request Estimates <Send size={14} style={{ marginLeft: '0.25rem' }} />
                  </button>
                </form>
              )
            )}

            {/* Consultation Booking Form */}
            {activeTab === 'consultation' && (
              submittedForms.consultation ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <Calendar size={56} style={{ color: 'var(--accent)', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-family-display)', fontSize: '1.4rem' }}>Consultation Booked</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
                    Thank you. We have blocked coordinates. A spatial planner will email confirmation.
                  </p>
                  <Button variant="outline" onClick={() => handleResetForm('consultation')}>Book Another Slot</Button>
                </div>
              ) : (
                <form onSubmit={(e) => handleFormSubmit(e, 'consultation')} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--accent)' }}>Book Design Consultation</h3>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="c-name" className={styles.formLabel}>Name *</label>
                      <input type="text" id="c-name" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className={styles.formLabel}>Phone *</label>
                      <input type="tel" id="c-phone" required className={styles.formInput} />
                    </div>
                  </div>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="c-date" className={styles.formLabel}>Preferred Date *</label>
                      <input type="date" id="c-date" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="c-mode" className={styles.formLabel}>Meeting Mode *</label>
                      <select id="c-mode" required className={styles.formInput} style={{ cursor: 'pointer' }}>
                        <option value="online">Online Video (Zoom/Meet)</option>
                        <option value="inperson">In-Person Office visit</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Book Slots <Send size={14} style={{ marginLeft: '0.25rem' }} />
                  </button>
                </form>
              )
            )}

            {/* Site Visit Request Form */}
            {activeTab === 'sitevisit' && (
              submittedForms.sitevisit ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <Compass size={56} style={{ color: 'var(--accent)', margin: '0 auto 1.5rem' }} />
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-family-display)', fontSize: '1.4rem' }}>Site Visit Scheduled</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '2rem' }}>
                    Thank you. We have logged land details. A zoning inspection specialist will inspect plot layouts.
                  </p>
                  <Button variant="outline" onClick={() => handleResetForm('sitevisit')}>Request Another Visit</Button>
                </div>
              ) : (
                <form onSubmit={(e) => handleFormSubmit(e, 'sitevisit')} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--accent)' }}>Request Site Inspection</h3>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="s-name" className={styles.formLabel}>Name *</label>
                      <input type="text" id="s-name" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="s-phone" className={styles.formLabel}>Phone *</label>
                      <input type="tel" id="s-phone" required className={styles.formInput} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="s-address" className={styles.formLabel}>Plot / Site Address *</label>
                    <input type="text" id="s-address" required className={styles.formInput} />
                  </div>
                  <div className="grid-2">
                    <div>
                      <label htmlFor="s-date" className={styles.formLabel}>Visit Date *</label>
                      <input type="date" id="s-date" required className={styles.formInput} />
                    </div>
                    <div>
                      <label htmlFor="s-stage" className={styles.formLabel}>Current Stage *</label>
                      <select id="s-stage" required className={styles.formInput} style={{ cursor: 'pointer' }}>
                        <option value="raw">Raw Vacant Land</option>
                        <option value="foundation">Excavated / Footings ready</option>
                        <option value="refit">Demolition required</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Request Inspection <Send size={14} style={{ marginLeft: '0.25rem' }} />
                  </button>
                </form>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ Preview Block */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="FAQ"
          heading="Contact-Related Queries"
          subheading="Learn about soil testing clearances, billing parameters, and site visiting policies."
        />
        <div className="glass-panel text-center" style={{ marginTop: '3rem', padding: '3rem' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            We have prepared comprehensive files explaining site surveying processes, structural mix testing schedules, and snags clearing handovers.
          </p>
          <Link to="/faq">
            <Button variant="outline">Browse Complete FAQ Directory</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
