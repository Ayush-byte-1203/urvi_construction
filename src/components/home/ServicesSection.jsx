import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader } from 'lucide-react';
import styles from './ServicesSection.module.css';
import SectionHeader from '../SectionHeader';
import { useGlobalData } from '../../context/GlobalDataContext';

const ServicesSection = () => {
  const { services, isLoading } = useGlobalData();

  if (isLoading) {
    return (
      <section className={`section ${styles.servicesSection}`} style={{ minHeight: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader className="spin" size={48} color="var(--primary)" />
      </section>
    );
  }

  return (
    <section className={`section ${styles.servicesSection}`}>
      <div className="container">
        <SectionHeader 
          eyebrow="Our Expertise"
          heading="Core Construction Services"
          subheading="Comprehensive building solutions delivered with uncompromising quality and absolute precision."
          center
        />

        <div className={styles.grid}>
          {services.map((service, idx) => (
            <motion.div 
              key={service.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.card}
            >
              <Link to={`/services/${service.slug}`} className={styles.imageWrapper}>
                <img src={service.image} alt={service.title} className={styles.image} loading="lazy" />
                <div className={styles.imageOverlay}></div>
              </Link>
              
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.description}</p>
                
                <div className={styles.tags}>
                  {(service.features || []).slice(0, 3).map((tag, i) => (
                    <span key={i} className={styles.tagPill}>{tag.name || tag}</span>
                  ))}
                </div>
                
                <div className={styles.cardFooter}>
                  <Link to={`/services/${service.slug}`} className={styles.exploreLink}>
                    Explore Service <ArrowRight size={16} style={{ marginLeft: '6px' }} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
