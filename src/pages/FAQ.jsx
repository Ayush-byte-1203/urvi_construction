import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  HelpCircle, ChevronDown, ChevronUp, Search, ChevronRight, MessageSquare, PhoneCall, HelpCircle as HelpIcon 
} from 'lucide-react';
import { appConfig } from '@config/appConfig';
import { faqData } from '@data/faqData';
import SectionHeader from '@sections/SectionHeader';
import MotionWrapper from '@components/MotionWrapper';
import Button from '@components/Button';

import { HeaderThemeContext } from '@/layouts/Layout';
import styles from './FAQ.module.css';

const FAQ = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  const categories = [
    { id: 'all', label: 'All Queries' },
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'process', label: 'Process' },
    { id: 'warranty', label: 'Warranty' }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter Logic
  const filteredFAQs = faqData.filter((faq) => {
    const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Featured Questions (first two)
  const featuredFAQs = faqData.slice(0, 2);

  return (
    <div className="faq-page">
      <Helmet>
        <title>Frequently Asked Questions | {appConfig.company.name}</title>
        <meta name="description"        content="Get clear answers about construction timelines, payment milestones, material quality standards, structural warranties, and building approval processes." />
        <link rel="canonical"           href={`${appConfig.seo.siteUrl}/faq`} />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content={`FAQ | ${appConfig.company.name}`} />
        <meta property="og:description" content="Answers to common questions about construction, pricing, warranties and approvals." />
        <meta property="og:url"         content={`${appConfig.seo.siteUrl}/faq`} />
        <meta property="og:image"       content={appConfig.seo.ogImage} />
        <meta name="twitter:card"       content="summary" />
        <meta name="twitter:title"      content={`FAQ | ${appConfig.company.name}`} />
        <meta name="twitter:description" content="Answers to common construction questions." />
      </Helmet>

      {/* Breadcrumb Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>FAQ</span>
          </div>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroDesc}>
            Find immediate answers detailing construction processes, payment terms, and structural safety clearances.
          </p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="section container">
        <div className={styles.controlsWrapper}>
          {/* Category pills */}
          <div className={styles.categoryPills}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.pill} ${activeCategory === cat.id ? styles.activePill : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Questions section */}
        {activeCategory === 'all' && !searchTerm && (
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="text-overline">Common Queries</span>
            <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '2rem' }}>Featured Questions</h2>
            
            <div className={styles.featuredGrid}>
              {featuredFAQs.map((faq, i) => (
                <MotionWrapper key={i} variant="slideUp" delay={i * 0.15} className={styles.featuredCard}>
                  <h3 className={styles.featuredTitle}>
                    <HelpIcon size={18} style={{ color: 'var(--accent)' }} />
                    {faq.q}
                  </h3>
                  <p className={styles.featuredDesc}>{faq.a}</p>
                </MotionWrapper>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Accordion List */}
        <div>
          <span className="text-overline">FAQ Directory</span>
          <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '2.5rem' }}>Accordion Directory</h2>
          
          <div className={styles.faqList}>
            {filteredFAQs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <div 
                  key={index} 
                  className="glass-panel" 
                  style={{ 
                    borderRadius: 'var(--radius-sm)', 
                    overflow: 'hidden',
                    borderColor: isOpen ? 'rgba(var(--accent-rgb), 0.3)' : 'rgba(255,255,255,0.05)'
                  }}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={styles.faqButton}
                    style={{
                      color: isOpen ? 'var(--accent)' : 'var(--text-primary)'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <HelpCircle size={18} style={{ color: isOpen ? 'var(--accent)' : 'var(--text-muted)' }} />
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div className={styles.faqAnswer}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredFAQs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>
              No matches found. Adjust search keywords.
            </div>
          )}
        </div>
      </section>

      
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container grid-2" style={{ alignItems: 'center', gap: '3rem' }}>
          <div>
            <span className="text-overline">Still Need Help?</span>
            <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '1.5rem' }}>Talk directly to our estimating divisions</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
              We draft exhaustive Bills of Quantities (BOQ) layouts matching client spatial drawings and zoning documents. Send blueprints directly to our desk.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact">
                <Button variant="primary" iconRight={<MessageSquare size={16} />}>Contact Estimating Desk</Button>
              </Link>
              <a href={appConfig.company.phoneFormatted}>
                <Button variant="outline" iconLeft={<PhoneCall size={16} />}>Call {appConfig.company.phone}</Button>
              </a>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--text-primary)' }}>
              Working Hours Desk
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Our design cells and site operations desks coordinate logistics support during normal shift hours.
            </p>
            <div style={{ borderTop: '1px solid var(--color-divider)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Monday &ndash; Friday</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>9:00 AM &ndash; 6:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Saturday &ndash; Sunday</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default FAQ;
