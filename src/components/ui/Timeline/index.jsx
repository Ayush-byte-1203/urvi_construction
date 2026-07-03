import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Compass, Layers, Award, Cpu, Sparkles, HardHat, Hammer, Paintbrush, ShieldCheck 
} from 'lucide-react';
import styles from './styles.module.css';

// Dynamic helper to match title to icon
const getMilestoneIcon = (title = "") => {
  const t = title.toLowerCase();
  if (t.includes('found') || t.includes('start')) return <HardHat size={20} />;
  if (t.includes('excavat') || t.includes('soil')) return <Compass size={20} />;
  if (t.includes('slab') || t.includes('frame')) return <Layers size={20} />;
  if (t.includes('masonry') || t.includes('block')) return <Hammer size={20} />;
  if (t.includes('plaster') || t.includes('finish') || t.includes('paint')) return <Paintbrush size={20} />;
  if (t.includes('commercial')) return <Building2 size={20} />;
  if (t.includes('award') || t.includes('iso')) return <Award size={20} />;
  if (t.includes('ai') || t.includes('future') || t.includes('innovat')) return <Cpu size={20} />;
  return <ShieldCheck size={20} />;
};

// Dynamic helper to match title to image placeholder
const getMilestoneImage = (title = "", idx) => {
  const t = title.toLowerCase();
  if (t.includes('excavat') || t.includes('soil') || t.includes('found')) {
    return 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80';
  }
  if (t.includes('slab') || t.includes('masonry') || t.includes('frame')) {
    return 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80';
  }
  if (t.includes('commercial') || t.includes('plaza')) {
    return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80';
  }
  if (t.includes('finish') || t.includes('paint') || t.includes('key')) {
    return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
  }
  // Fallbacks based on index
  const fallbacks = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
  ];
  return fallbacks[idx % fallbacks.length];
};

const Timeline = ({ items = [], className = '' }) => {
  return (
    <div className={`${styles.timelineContainer} ${className}`}>
      {/* Animated Center Vertical Line */}
      <div className={styles.centerLine}>
        <motion.div 
          className={styles.progressLine}
          initial={{ height: 0 }}
          whileInView={{ height: '100%' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>

      <div className={styles.timelineList}>
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          const image = getMilestoneImage(item.title, idx);
          const icon = getMilestoneIcon(item.title);
          const descText = item.description || item.desc || "";

          return (
            <motion.div
              key={idx}
              className={`${styles.timelineItem} ${isLeft ? styles.itemLeft : styles.itemRight}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.15, 0.6) }}
            >
              {/* Glowing node point on the timeline line */}
              <div className={styles.timelineNode}>
                <div className={styles.nodeCore} />
              </div>

              {/* Milestone Premium Card */}
              <div className={`glass-panel ${styles.timelineCard}`}>
                {/* Year / Step Badge */}
                <div className={styles.cardHeaderRow}>
                  <span className={styles.yearBadge}>{item.step || `Phase 0${idx + 1}`}</span>
                  <div className={styles.iconCircle}>{icon}</div>
                </div>

                {/* Supporting Image */}
                {image && (
                  <div className={styles.cardImageWrapper}>
                    <img src={image} alt={item.title} className={styles.cardImage} loading="lazy" />
                  </div>
                )}

                {/* Text Content */}
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  {item.subtitle && <span className={styles.cardSubtitle}>{item.subtitle}</span>}
                  {descText && <p className={styles.cardDesc}>{descText}</p>}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
