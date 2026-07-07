import React, { useEffect, useRef } from 'react';
import { Search, X, History, LayoutGrid } from 'lucide-react';
import styles from './SearchModal.module.css';

const SearchModal = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Auto focus search field
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recentSearches = [
    'Residential structural design process',
    'Commercial estimation calculator',
    'BuildCraft precast logistics'
  ];

  const suggestedPages = [
    { title: 'Portfolio Projects Grid', desc: 'Detailed case reviews' },
    { title: 'Premium construction Packages', desc: 'Estimation cost details' }
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton} 
          onClick={onClose} 
          aria-label="Close Search Overlay"
        >
          <X size={20} />
        </button>

        {/* Input area */}
        <div className={styles.inputWrapper}>
          <span className={styles.searchIcon}><Search size={20} /></span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            placeholder="Type blueprints, planning, processes or pricing..."
            aria-label="Search site contents"
          />
        </div>

        {/* Categories / History */}
        <div className={styles.grid}>
          <div>
            <h4 className={styles.sectionTitle}>Recent Searches</h4>
            <div className={styles.list}>
              {recentSearches.map((item, idx) => (
                <div key={idx} className={styles.listItem}>
                  <History size={14} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className={styles.sectionTitle}>Suggested Pages</h4>
            <div className={styles.list}>
              {suggestedPages.map((item, idx) => (
                <div key={idx} className={styles.listItem}>
                  <LayoutGrid size={14} />
                  <div>
                    <div style={{ fontWeight: 500 }}>{item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
