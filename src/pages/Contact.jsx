import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, ShieldCheck, Clock 
} from 'lucide-react';
import { appConfig } from '@config/appConfig';
import SectionHeader from '@sections/SectionHeader';
import MotionWrapper from '@components/MotionWrapper';
import Button from '@components/Button';
import HeroOverlay from '@components/HeroOverlay';
import InquiryForm from '@components/InquiryForm';
import { HeaderThemeContext } from '@/layouts/Layout';
import styles from './Contact.module.css';

const Contact = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

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
            <InquiryForm />
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
