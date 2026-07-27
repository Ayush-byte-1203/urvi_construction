import React, { useEffect, useContext, useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import { ArrowRight, CheckCircle2, ChevronRight, PenTool, Monitor, Layout, Image, FileText, Compass, Activity, Box, Crosshair, Menu, ShieldAlert, CheckSquare, Calculator, Calendar, Users, CheckCircle, Eye, Key, Wrench, Zap, Home, UserCheck, Shield, FastForward, Star, Heart, Map, Layers, Wifi, Sun, User, TrendingUp, Smartphone, Award, Coffee, Archive, Lightbulb, Settings, Maximize, DollarSign, Clock, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalData } from '../context/GlobalDataContext';
import CTASection from '../components/CTASection';
import styles from './ServiceDetail.module.css';

// Dynamic icon mapper
const IconMapper = ({ name, ...props }) => {
  const icons = {
    PenTool, Monitor, Layout, Image, FileText, Compass, Activity, Box, Crosshair, Menu, ShieldAlert, CheckSquare, Calculator, Calendar, Users, CheckCircle, Eye, Key, Wrench, Zap, Home, UserCheck, Shield, FastForward, Star, Heart, Map, Layers, Wifi, Sun, User, TrendingUp, Smartphone, Award, Coffee, Archive, Lightbulb, Settings, Maximize, DollarSign, Clock, Wind
  };
  const IconComponent = icons[name] || CheckCircle2;
  return <IconComponent {...props} />;
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const { setHeaderTheme } = useContext(HeaderThemeContext);

  useEffect(() => {
    setHeaderTheme('none'); // Transparent header for hero
  }, [setHeaderTheme]);

  const { services, isLoading } = useGlobalData();

  const serviceRaw = useMemo(() => {
    return (services || []).find(s => s.slug === slug);
  }, [slug, services]);

  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  if (!serviceRaw) {
    return <Navigate to="/services" replace />;
  }

  // Map Django model directly to frontend expectations
  const service = {
    ...serviceRaw,
    whyChooseUs: {
      image: serviceRaw.detail_image || serviceRaw.image,
      benefits: serviceRaw.benefits || [],
      callout: serviceRaw.tagline || ''
    },
    servicesIncluded: serviceRaw.included_features || [],
    process: serviceRaw.workflow_steps || [],
    specializations: serviceRaw.features || [],
    benefits: serviceRaw.benefits || []
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO
        title={`${service.title} | Our Services`}
        description={service.description}
      />

      {/* A. Hero */}
      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url(${service.image})` }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <Link to="/services" style={{ color: 'rgba(255,255,255,0.7)' }}>Services</Link> <ChevronRight size={14} /> <span>{service.title}</span>
            </div>
            <h1 className="hero-title" style={{ fontSize: 'var(--font-size-hero)', color: '#fff', marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{service.title}</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>{service.description}</p>
          </motion.div>
        </div>
      </header>

      {/* B. Why Choose Us (Specific) */}
      <section className="section container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}
        >
          <div style={{ position: 'relative' }}>
            <img src={service.whyChooseUs.image} alt="Why Choose Us" style={{ borderRadius: 'var(--radius-md)', width: '100%', height: 'auto', boxShadow: 'var(--shadow-lg)' }} />
          </div>
          <div>
            <h2 className="section-heading">Why Choose Us for {service.title}?</h2>
            <ul style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {service.whyChooseUs.benefits.map((benefit, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <CheckCircle2 size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>{benefit.title || benefit}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '2.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent)', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                "{service.whyChooseUs.callout}"
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* C. Our Services Include (6-card grid) */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="text-overline">Comprehensive Solutions</span>
            <h2 className="section-heading">Our {service.title} Services Include</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {service.servicesIncluded.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}
                className={styles.hoverCard}
              >
                <div style={{ width: '60px', height: '60px', backgroundColor: 'hsla(16, 100%, 55%, 0.1)', color: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <IconMapper name={item.icon} size={28} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--border-strong)', marginBottom: '0.5rem', opacity: 0.5 }}>0{idx + 1}</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{item.name}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* D. Our Process (6-step flow on dark background) */}
      {/* <section className="section" style={{ backgroundColor: '#111827', color: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="text-overline" style={{ color: 'var(--accent)' }}>Proven Methodology</span>
            <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'bold' }}>Our {service.title} Process</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem 2rem', position: 'relative' }}>
            {service.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '1.5rem', backgroundColor: '#1f2937', zIndex: 2 }}>
                  {idx + 1}
                </div>
                <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{step.title}</h4>
                <p style={{ color: '#9ca3af', fontSize: '1rem' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* E. We Specialize In (2x2 grid) */}
      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span className="text-overline">Expertise</span>
            <h2 className="section-heading">We Specialize In</h2>
            <p className="text-body-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Our team has deep expertise across various subsets of {service.title.toLowerCase()}, ensuring that no matter the project type, we have the right specialists for the job.
            </p>
            <Link to="/projects" className="btn btn-secondary">View Our Portfolio <ArrowRight size={16} /></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {service.specializations.map((spec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{ backgroundColor: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}
                className={styles.hoverCard}
              >
                <CheckCircle2 size={24} className="text-accent" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{spec.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{spec.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Benefits of Hiring (icon-list + image) */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}
        >
          <div>
            <h2 className="section-heading">Benefits of Hiring Professional {service.title}</h2>
            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {service.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}
                >
                  <div style={{ backgroundColor: 'var(--bg-card)', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                    <IconMapper name={benefit.icon} size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.125rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{benefit.title}</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src={service.image} alt="Benefits" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: 'auto', boxShadow: 'var(--shadow-lg)' }} />
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={24} />
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '1.25rem', color: 'var(--text-primary)' }}>100%</strong>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Client Satisfaction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* G. CTA */}
      <CTASection
        title={`Ready to Start Your ${service.title} Project?`}
        subtitle="Get in touch with our experts for a free consultation and customized quote tailored to your specific needs."
      />
    </div>
  );
};

export default ServiceDetail;
