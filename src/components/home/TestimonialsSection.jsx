import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';
import SectionHeader from '../SectionHeader';

// TODO: replace placeholder content
const testimonials = [
  {
    initials: "AK",
    name: "Arvind Krishnan",
    location: "Koramangala, Bengaluru",
    quote: "The level of professionalism and adherence to timelines was exceptional. They handled every statutory approval and delivered a beautiful, structurally sound home without any cost overruns.",
    rating: 5
  },
  {
    initials: "SM",
    name: "Sneha Murthy",
    location: "Indiranagar, Bengaluru",
    quote: "We were completely stress-free during the entire construction phase. The dedicated project manager kept us updated daily with photos and progress reports. Highly recommended turnkey service.",
    rating: 5
  },
  {
    initials: "RP",
    name: "Rajesh Patel",
    location: "Whitefield, Bengaluru",
    quote: "From the architectural 3D rendering to the final coat of paint, the quality of materials and craftsmanship was evident. They truly build certainty into their process.",
    rating: 5
  }
];

const TestimonialsSection = () => {
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
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={styles.card}
            >
              <Quote className={styles.quoteIcon} size={40} />
              
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className={styles.quoteText}>"{testimonial.quote}"</p>
              
              <div className={styles.authorInfo}>
                <div className={styles.avatar}>{testimonial.initials}</div>
                <div>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <span className={styles.authorLocation}>{testimonial.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
