import React, { useEffect, useContext } from 'react';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import Accordion from '../components/Accordion';
import SectionHeader from '../components/SectionHeader';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useGlobalData } from '../context/GlobalDataContext';

const Services = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { faqs } = useGlobalData();
  const formattedFaqs = (faqs || []).map(f => ({ title: f.question, content: f.answer }));

  useEffect(() => {
    setHeaderTheme('none');
  }, [setHeaderTheme]);

  return (
    <div className="page-wrapper">
      <SEO 
        title="Our Services | Turnkey Solutions"
        description="Explore our comprehensive range of construction, architectural, and interior design services."
      />
      
      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Services</span>
            </div>
            <h1>Our Services</h1>
            <p className="subtitle">
              Comprehensive turnkey solutions from architectural blueprints to final interiors.
            </p>
          </motion.div>
        </div>
      </header>

      <div style={{ paddingTop: '4rem' }}>
        <ServicesSection />
      </div>
      
      <ProcessSection />

      {/* FAQ Section */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', paddingBottom: 'var(--gap-section)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionHeader 
            eyebrow="FAQ"
            heading="Frequently Asked Questions"
            center
          />
          <Accordion items={formattedFaqs} allowMultiple={true} />
        </div>
      </section>
    </div>
  );
};

export default Services;
