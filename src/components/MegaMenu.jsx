import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './MegaMenu.module.css';

const MegaMenu = ({ activeItem, isOpen, onClose }) => {
  const { megaMenus, isLoading } = useGlobalData();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !activeItem || isLoading || !megaMenus || !megaMenus[activeItem]) return null;

  const content = megaMenus[activeItem];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={styles.megaMenu}
      onMouseLeave={onClose}
    >
      <div className="container" style={{ maxWidth: '1440px' }}>
        <div className={styles.grid}>
          {/* Categories Links Column */}
          <div className={styles.categories}>
            {content.categories && content.categories.map((cat, idx) => (
              <div key={idx} className={styles.categoryGroup}>
                <span className={styles.groupTitle}>{cat.group_title}</span>
                <div className={styles.linkList}>
                  {cat.links && cat.links.map((link, lIdx) => {
                    const IconComponent = LucideIcons[link.icon_name] || LucideIcons.HelpCircle;
                    return (
                      <Link
                        key={lIdx}
                        to={link.path}
                        className={styles.itemLink}
                        onClick={onClose}
                      >
                        <div className={styles.linkIconWrapper}>
                          <IconComponent size={16} />
                        </div>
                        <div>
                          <span className={styles.itemTitle}>{link.title}</span>
                          {link.description && <span className={styles.itemDesc}>{link.description}</span>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Featured Showcase Column */}
          {content.featured && (
            <div className={styles.featured}>
              <div className={styles.featuredImageWrapper}>
                <img
                  src={content.featured.image || content.featured.image_url}
                  alt={content.featured.title}
                  className={styles.featuredImage}
                />
              </div>
              <h5 className={styles.featuredTitle}>{content.featured.title}</h5>
              <p className={styles.featuredDesc}>{content.featured.description}</p>
              <Link
                to={content.featured.path}
                className={styles.featuredBtnLink}
                onClick={onClose}
              >
                <span className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  {content.featured.link_text} <LucideIcons.ArrowRight size={12} />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
