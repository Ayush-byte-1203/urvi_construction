import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HeaderThemeContext } from '../components/Layout';
import { useGlobalData } from '../context/GlobalDataContext';
import SectionHeader from '../components/SectionHeader';
import MotionWrapper from '../components/MotionWrapper';
import HeroOverlay from '../components/HeroOverlay';
import { ArrowRight, Clock, User, Calendar, ChevronRight } from 'lucide-react';
import styles from './Blog.module.css';

const Blog = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { blogs, blogCategories } = useGlobalData();
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  const categories = ['All', ...new Set(blogCategories?.map(c => c.name) || [])];

  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs?.filter(b => b.category_name === activeCategory);

  return (
    <div className="blog-page">
      <Helmet>
        <title>Blog | Paramarsh Construction</title>
        <meta name="description" content="Read the latest news, insights, and construction methodologies from Paramarsh Construction." />
      </Helmet>

      {/* ========================================== */}
      {/* SECTION: Breadcrumbs Subpage Hero */}
      {/* ========================================== */}
      <section className={styles.hero}>
        <HeroOverlay type="dark" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>Blog</span>
          </div>
          <div className={styles.heroText}>
            {/* <span className={styles.heroEyebrow}>Insights & News</span> */}
            <h1 className={styles.heroTitle}>Construction Blog</h1>
            <p className={styles.heroDesc}>
              Dive deep into civil engineering insights, project updates, and modern building methodologies.
            </p>
          </div>
        </div>
      </section>

      <section className="section container" style={{ paddingTop: '3rem' }}>

        {/* Categories Filter */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                background: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
                color: activeCategory === cat ? '#fff' : 'var(--text-main)',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {filteredBlogs?.length > 0 ? (
          <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
            {filteredBlogs.map((post, idx) => (
              <MotionWrapper key={post.id} variant="slideUp" delay={idx * 0.1} className="glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={post.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  />
                  {post.category_name && (
                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--accent)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                      {post.category_name}
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {new Date(post.date).toLocaleDateString()}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {post.author}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4 }}>
                    <Link to={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.content.replace(/<[^>]+>/g, '')}
                  </p>

                  <div style={{ marginTop: 'auto' }}>
                    <Link to={`/blog/${post.id}`} style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>
                      Read Article <ArrowRight size={16} style={{ marginLeft: '4px' }} />
                    </Link>
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            No blog posts available in this category yet. Check back later!
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
