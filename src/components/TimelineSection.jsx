import React from 'react';
import { motion } from 'framer-motion';
import styles from './TimelineSection.module.css';

import { useGlobalData } from '../context/GlobalDataContext';

const TimelineSection = () => {
  const { journey } = useGlobalData();
  const milestones = journey || [];

  return (
    <section className={`section ${styles.timelineSection}`}>
      <div className="container">
        <div className={styles.header}>
          <span className="text-overline">Our Journey</span>
          <h2 className="section-heading">Milestones of Excellence</h2>
          <p className="subheading">From our humble beginnings to becoming a trusted name in construction, our journey is defined by passion and precision.</p>
        </div>

        <div className={styles.timeline}>
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`${styles.timelineItem} ${isEven ? styles.left : styles.right}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={styles.content}>
                  <div className={styles.year}>{milestone.year}</div>
                  <h3 className={styles.title}>{milestone.title}</h3>
                  <p className={styles.description}>{milestone.description}</p>
                </div>
                <div className={styles.centerLine}>
                  <div className={styles.dot}></div>
                </div>
                <div className={styles.imageBox}>
                  <img src={milestone.image} alt={milestone.title} loading="lazy" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
