import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, MessageCircle, Info, Settings, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Accordion from '../components/Accordion';
import SectionHeader from '../components/SectionHeader';
import styles from './FAQ.module.css';
import { ROUTES } from '../data/routes';
import { useGlobalData } from '../context/GlobalDataContext';

const FAQ_DATA_FALLBACK = [
  {
    category: 'General',
    questions: [
      {
        question: 'What types of construction projects do you handle?',
        answer: 'We handle a wide range of projects including residential homes, commercial complexes, industrial facilities, and large-scale renovations. Our team has the expertise to manage projects of varying complexity and scale.'
      },
      {
        question: 'Are you licensed and insured?',
        answer: 'Yes, absolutely. We are fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers\' compensation to protect both our clients and our team throughout the duration of any project.'
      },
      {
        question: 'How long have you been in business?',
        answer: 'We have been proudly serving the community for over 15 years, building a strong reputation for quality craftsmanship and reliable service.'
      }
    ]
  },
  {
    category: 'Process',
    questions: [
      {
        question: 'What is your typical project process?',
        answer: 'Our process generally involves an initial consultation, followed by design and planning, obtaining necessary permits, the construction phase, and finally, a thorough walkthrough and handover. We keep you informed at every step.'
      },
      {
        question: 'How do you handle changes during construction?',
        answer: 'We use a formal change order process. If you request a change or if unforeseen circumstances require one, we will provide a detailed estimate of the cost and time impact for your approval before proceeding.'
      },
      {
        question: 'Who will be my main point of contact?',
        answer: 'You will be assigned a dedicated Project Manager who will be your primary point of contact throughout the entire build, ensuring clear communication and smooth coordination.'
      }
    ]
  },
  {
    category: 'Pricing',
    questions: [
      {
        question: 'How is the cost of my project determined?',
        answer: 'Project costs are determined based on the scope of work, materials selected, site conditions, and labor requirements. We provide detailed, itemized estimates after the initial design and planning phase.'
      },
      {
        question: 'Do you offer financing options?',
        answer: 'While we do not provide direct financing, we work with several trusted financial institutions and can connect you with lending partners who specialize in construction loans.'
      },
      {
        question: 'Are estimates free?',
        answer: 'Yes, we offer complimentary initial consultations and high-level estimates. For detailed, itemized project proposals, a small design fee may apply, which is often credited towards the project cost if you choose to proceed.'
      }
    ]
  }
];

const FAQ = () => {
  const { faqs } = useGlobalData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const faqData = useMemo(() => {
    if (!faqs || faqs.length === 0) return FAQ_DATA_FALLBACK;
    const grouped = {};
    faqs.forEach(f => {
      const cat = f.category_name || f.category || 'General';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push({ question: f.question || f.q, answer: f.answer || f.a });
    });
    return Object.keys(grouped).map(cat => ({
      category: cat,
      questions: grouped[cat]
    }));
  }, [faqs]);

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFaqs = useMemo(() => {
    return faqData.map(section => {
      // Filter by category
      if (activeCategory !== 'All' && section.category !== activeCategory) {
        return null;
      }

      // Filter by search query
      const filteredQuestions = section.questions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredQuestions.length === 0) return null;

      return {
        ...section,
        questions: filteredQuestions
      };
    }).filter(Boolean);
  }, [searchQuery, activeCategory]);

  return (
    <main className="page-wrapper">
      {/* ========================================== */}
      {/* SECTION: Hero Section */}
      {/* ========================================== */}
      <section className={styles.hero}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.breadcrumbs}>
            <Link to={ROUTES.HOME}>Home</Link>
            <span>/</span>
            <span>FAQ</span>
          </div>
          <h1 className={styles.heroTitle}>Frequently Asked Questions</h1>
          <p className={styles.heroDesc}>
            Find answers to common questions about our construction services, processes, and more. 
            Can't find what you're looking for? Reach out to our support team.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Controls */}
          <div className={styles.controlsWrapper}>
            <div className={styles.searchBar}>
              <Search size={20} color="var(--color-text-secondary)" />
              <input 
                type="text" 
                placeholder="Search questions..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className={styles.categoryPills}>
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`${styles.pill} ${activeCategory === cat ? styles.activePill : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Content */}
          <div className={styles.faqContent}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((section, idx) => (
                <div key={idx} style={{ marginBottom: '3rem' }}>
                  <SectionHeader 
                    heading={section.category}
                    align="left"
                    style={{ marginBottom: '1.5rem' }}
                  />
                  <Accordion 
                    items={section.questions.map(q => ({
                      title: q.question,
                      content: q.answer
                    }))}
                    allowMultiple={true}
                  />
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-secondary)' }}>
                <HelpCircle size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <h3>No results found</h3>
                <p>We couldn't find any questions matching your search criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                  style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
          
        </div>
      </section>
      
      {/* ========================================== */}
      {/* SECTION: Contact CTA Section */}
      {/* ========================================== */}
      <section style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Still have questions?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Our team of construction experts is ready to help you with any specific inquiries you might have regarding your upcoming project.
          </p>
          <Link to={ROUTES.CONTACT} style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'var(--accent)', 
            color: 'white', 
            padding: '1rem 2rem', 
            borderRadius: 'var(--radius-full)', 
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}>
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  );
};

export default FAQ;
