import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';
import SectionHeader from '../SectionHeader';
import { useGlobalData } from '../../context/GlobalDataContext';

const getInitials = (name) => {
  if (!name) return "CL";
  const parts = name.trim().split(' ').filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const TestimonialsSection = () => {
  const { testimonials, isLoading } = useGlobalData();
  const items = Array.isArray(testimonials) ? testimonials : [];

  if (!isLoading && items.length === 0) {
    return null;
  }

  return (
    <section className={`section ${styles.testimonialsSection}`}>
      <div className="container">
        <SectionHeader 
          eyebrow="Client Stories"
          heading="What Our Homeowners Say"
          subheading="Don't just take our word for it. Read honest experiences from families who trusted us with their dream homes."
          center
        />

        <div className={styles.grid}>
          {items.map((testimonial, idx) => {
            const name = testimonial.name || testimonial.client_name || "Homeowner";
            const subtitle = testimonial.role || testimonial.location || testimonial.project_name || "Homeowner";
            const quoteText = testimonial.content || testimonial.quote || "";
            const ratingVal = Math.max(1, Math.min(5, Number(testimonial.rating) || 5));
            const initials = getInitials(name);
            const profileImage = testimonial.profile_image;

            return (
              <motion.div 
                key={testimonial.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={styles.card}
              >
                <Quote className={styles.quoteIcon} size={40} />
                
                <div className={styles.rating}>
                  {[...Array(ratingVal)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                
                <p className={styles.quoteText}>"{quoteText}"</p>
                
                <div className={styles.authorInfo}>
                  <div className={styles.avatar}>
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt={name} 
                        style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div>
                    <h4 className={styles.authorName}>{name}</h4>
                    <span className={styles.authorLocation}>{subtitle}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

