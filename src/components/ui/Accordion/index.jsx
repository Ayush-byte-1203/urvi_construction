import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles.module.css';

const Accordion = ({ items = [], allowMultiple = false, className = '' }) => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) => 
        prev.includes(index) 
          ? prev.filter((i) => i !== index) 
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx);
        
        return (
          <div 
            key={idx} 
            className={`${styles.item} ${isOpen ? styles.itemActive : ''}`}
          >
            <button 
              className={styles.header}
              onClick={() => handleToggle(idx)}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>{item.title}</span>
              <span className={styles.icon}>
                <ChevronDown size={18} />
              </span>
            </button>
            
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  className={styles.contentWrapper}
                >
                  <div className={styles.content}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
