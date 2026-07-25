import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { useGlobalData } from '../context/GlobalDataContext';

const FAQSection = () => {
  const { faqs: allFaqs, isLoading } = useGlobalData();
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = useMemo(() => {
    if (!allFaqs) return ['All'];
    const cats = new Set(allFaqs.map(f => f.category_name).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [allFaqs]);

  const filteredFaqs = useMemo(() => {
    if (!allFaqs) return [];
    if (activeCategory === 'All') return allFaqs;
    return allFaqs.filter(f => f.category_name === activeCategory);
  }, [activeCategory, allFaqs]);

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  return (
    <section className="section container">
      <SectionHeader 
        eyebrow="Common Questions"
        heading="Frequently Asked Questions"
        subheading="Everything you need to know about our packages, processes, and policies."
        center
      />

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenFaq(null); }}
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '100px',
              fontWeight: '500',
              border: '1px solid',
              borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openFaq === idx;
          return (
            <div key={idx} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <button 
                onClick={() => toggleFaq(idx)}
                style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isOpen ? 'var(--bg-secondary)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <HelpCircle size={20} className="text-accent" style={{ flexShrink: 0 }} />
                  <strong style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>{faq.question}</strong>
                </div>
                <ChevronRight size={20} style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', color: 'var(--text-secondary)' }} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 1.5rem 1.5rem 3.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
