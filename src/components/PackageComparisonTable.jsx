import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import styles from '../pages/Packages.module.css';

const PackageComparisonTable = ({ packageTiers, hideHeader = false }) => {
  const [openCategoryDesktop, setOpenCategoryDesktop] = useState(null);
  const [openCategoryMobile, setOpenCategoryMobile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pre-process material specs for easy accordion rendering
  const materialSpecs = {};
  packageTiers.forEach(tier => {
    materialSpecs[tier.id] = {};
    if (tier.material_specs) {
      tier.material_specs.forEach(spec => {
         if (!materialSpecs[tier.id][spec.category_name]) {
           materialSpecs[tier.id][spec.category_name] = [];
         }
         materialSpecs[tier.id][spec.category_name].push(spec);
      });
    }
  });

  const processTextToBullets = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const bullets = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      if (bullets.length > 0 && (
        /^[a-z]/.test(trimmed) || 
        bullets[bullets.length - 1].endsWith(' of') ||
        trimmed.startsWith('Hindware') ||
        trimmed.startsWith('Parryware')
      )) {
        bullets[bullets.length - 1] += ' ' + trimmed;
      } else {
        bullets.push(trimmed);
      }
    });
    return bullets;
  };

  return (
    <div style={{ marginTop: hideHeader ? '0' : '4rem', width: '100%' }}>
      {!hideHeader && (
        <SectionHeader
          eyebrow="Tiers Comparison"
          heading="Synchronized Specifications Comparison"
          subheading="Expand any category below to compare material standards side-by-side across all packages."
        />
      )}

      <div className={styles.comparisonGrid} style={{ marginTop: hideHeader ? '1rem' : '3rem' }}>
        {packageTiers.map((tier) => {
          const tierId = tier.id;
          return (
            <div key={tier.id} className={styles.packageCompareCard}>
              <div className={styles.cardHeaderInfo}>
                <h3>{tier.name}</h3>
                <div className={styles.comparePrice}>
                  <strong>₹{tier.price}</strong>
                  <span>/ sq.ft.</span>
                </div>
                <p className={styles.cardTagline}>{tier.tagline}</p>
              </div>

              <div className={styles.cardAccordionsList}>
                {Object.keys(materialSpecs[tierId] || {}).map((category) => {
                  const isOpen = isMobile 
                    ? (openCategoryMobile?.tierId === tierId && openCategoryMobile?.category === category)
                    : (openCategoryDesktop === category);
                  
                  const items = materialSpecs[tierId][category] || [];
                  return (
                    <div key={category} className={styles.cardAccordionItem}>
                      <button
                        type="button"
                        className={`${styles.cardAccordionHeader} ${isOpen ? styles.cardAccordionHeaderActive : ''}`}
                        onClick={() => {
                          if (isMobile) {
                            setOpenCategoryMobile(isOpen ? null : { tierId, category });
                          } else {
                            setOpenCategoryDesktop(isOpen ? null : category);
                          }
                        }}
                      >
                        <span>{category}</span>
                        <ChevronRight
                          size={14}
                          className={styles.chevronIcon}
                          style={{
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                          }}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className={styles.cardAccordionBody}
                          >
                            <div className={styles.cardAccordionContent}>
                              {items.map((item, idx) => (
                                <ul key={idx} style={{ paddingLeft: '1.25rem', margin: '0', listStyleType: 'disc' }}>
                                  {processTextToBullets(item.brand).map((bullet, lineIdx) => (
                                    <li key={lineIdx} style={{ marginBottom: '6px', fontWeight: 'normal', color: 'var(--text-main)', lineHeight: '1.5' }}>
                                      {bullet}
                                    </li>
                                  ))}
                                </ul>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageComparisonTable;
