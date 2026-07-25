import React from 'react';
import { motion } from 'framer-motion';
import styles from './Timeline.module.css';

const milestones = [
  {
    year: '2016',
    title: 'The Foundation',
    description: 'Founded with a vision to revolutionize turnkey construction with transparent pricing and in-house engineering.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2018',
    title: 'Expanding the Horizon',
    description: 'Successfully delivered our 50th residential project and expanded our team of in-house architects and designers.',
    image: 'https://images.unsplash.com/photo-1541888081600-01103f6f1c4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2020',
    title: 'Commercial Ventures',
    description: 'Launched our commercial division, taking on large-scale office spaces and retail hubs.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2022',
    title: 'ISO Certification',
    description: 'Achieved ISO 9001:2015 certification for our stringent quality control and 150+ point inspection process.',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80'
  },
  {
    year: '2024',
    title: 'Industry Leaders',
    description: 'Recognized as one of the fastest-growing premium construction firms, with over 120 completed projects.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
  }
];

const Timeline = () => {
  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineLine}></div>
      {milestones.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <div key={index} className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`}>
            <div className={styles.timelineDot}></div>
            <motion.div
              className={styles.timelineContent}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.year}>{item.year}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
