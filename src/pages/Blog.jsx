import React, { useEffect, useContext, useState, useMemo } from 'react';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Blog.module.css';

import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';

const Blog = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { pageData } = usePageData('blog');
  const { blogs: allPosts } = useGlobalData();
  const heroBg = pageData?.hero_image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  const categories = useMemo(() => {
    if (!allPosts) return ['All'];
    const cats = new Set(allPosts.map(p => p.category?.name || p.category_name).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!allPosts) return [];
    if (activeCategory === 'All') return allPosts;
    return allPosts.filter(p => (p.category?.name || p.category_name) === activeCategory);
  }, [activeCategory, allPosts]);

  const loadMore = () => {
    setVisiblePosts(prev => Math.min(prev + 3, filteredPosts.length));
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="Construction Blog | Insights & Trends"
        description="Read our latest articles on construction trends, architectural design, and home building tips."
      />

      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url('${heroBg}')` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Blog</span>
            </div>
            <h1>{pageData?.title || "Insights, Trends & Guides"}</h1>
            <p className="subtitle">
              {pageData?.subtitle || "Expert advice and industry news to help you navigate your construction journey with confidence."}
            </p>
          </motion.div>
        </div>
      </header>

      <section className={`section ${styles.blogSection}`} style={{ paddingTop: '2rem' }}>
        <div className="container">
          
          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '100px',
                  fontWeight: '600',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: activeCategory === cat ? 'var(--accent)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div layout className={styles.grid}>
            <AnimatePresence>
              {filteredPosts.slice(0, visiblePosts).map((post, idx) => (
                <motion.div 
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={styles.card}
                >
                  <div className={styles.imageWrapper}>
                    <img src={post.image} alt={post.title} className={styles.image} loading="lazy" />
                    <div className={styles.categoryBadge}>{post.category_name}</div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <div className={styles.metaData}>
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    
                    <h3 className={styles.cardTitle}>
                      <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                    </h3>
                    
                    <p className={styles.cardExcerpt}>{post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 100) + '...'}</p>
                    
                    <div className={styles.cardFooter}>
                      <Link to={`/blog/${post.slug || post.id}`} className={styles.readMoreLink}>
                        Read Article <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No articles found in this category.
            </div>
          )}
          
          {visiblePosts < filteredPosts.length && (
            <div className={styles.loadMoreWrapper} style={{ marginTop: '3rem', textAlign: 'center' }}>
              <button onClick={loadMore} className="btn btn-secondary">
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
