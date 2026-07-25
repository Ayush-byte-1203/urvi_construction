import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import styles from './ClientSpotlightSection.module.css';
import SectionHeader from '../SectionHeader';
import { useGlobalData } from '../../context/GlobalDataContext';

const ClientSpotlightSection = () => {
  const { testimonials } = useGlobalData();
  const featuredTestimonial = (testimonials || [])[0];

  return (
    <section className={`section ${styles.spotlightSection}`}>
      <div className="container">
        
        <div className={styles.grid}>
          
          {/* Left Side: Video/Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={styles.mediaSide}
          >
            <div className={styles.videoCard}>
              <img 
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80" 
                alt="Luxury Home Exterior" 
                className={styles.videoPoster}
                loading="lazy"
              />
              <button className={styles.playButton} aria-label="Play Video Testimonial">
                <Play size={28} fill="currentColor" />
              </button>
            </div>
          </motion.div>

          {/* Right Side: Featured Written Review */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={styles.contentSide}
          >
            <SectionHeader 
              eyebrow="Featured Spotlight"
              heading="A Journey from Blueprint to Reality"
            />
            
            <div className={styles.reviewContent}>
              <div className={styles.rating}>
                {Array.from({ length: featuredTestimonial?.rating || 5 }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              
              <p className={styles.quote}>
                "{featuredTestimonial?.content || 'Outstanding service and quality!'}"
              </p>
              
              <div className={styles.clientDetails}>
                <h4 className={styles.clientName}>{featuredTestimonial?.client_name}</h4>
                <p className={styles.clientMeta}>
                  {featuredTestimonial?.project_name} {featuredTestimonial?.location ? `• ${featuredTestimonial.location}` : ''}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ClientSpotlightSection;
