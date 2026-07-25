import React, { useContext, useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HeaderThemeContext } from '../components/Layout';
import { useGlobalData } from '../context/GlobalDataContext';
import { ArrowLeft, User, Calendar, Clock, Send, ChevronRight } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';
import CTASection from '../components/CTASection';
import styles from './BlogDetail.module.css';

const BlogDetail = () => {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { blogs, isLoading } = useGlobalData();

  useEffect(() => {
    setHeaderTheme('none');
    window.scrollTo(0, 0);
  }, [setHeaderTheme, slug]);

  const post = useMemo(() => {
    return (blogs || []).find(p => p.slug === slug || p.id.toString() === slug);
  }, [slug, blogs]);

  if (isLoading) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading blog...</div>;
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const blogPost = {
    ...post,
    date: post.date || post.created_at,
    category: post.category_name,
    content: post.content || '',
    author: post.author || 'Admin',
    tags: post.tags || []
  };

  const relatedPosts = (blogs || [])
    .filter(b => b.id !== blogPost.id)
    .sort((a, b) => (a.category_name === blogPost.category_name ? -1 : 1))
    .slice(0, 3);

  const wordCount = blogPost.content.split(' ').length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>{blogPost.title} | Blog</title>
        <meta name="description" content={blogPost.excerpt || blogPost.content.replace(/<[^>]+>/g, '').substring(0, 150)} />
      </Helmet>

      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url(${blogPost.image})` }}>
        <div className={`container ${styles.heroContent}`}>
          <MotionWrapper variant="slideUp">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)' }}>Blog</Link> <ChevronRight size={14} /> <span>{blogPost.category}</span>
            </div>
            <h1 className="hero-title" style={{ fontSize: 'var(--font-size-hero)', color: '#fff', marginBottom: '1.5rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{blogPost.title}</h1>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <User size={16} />
                <span>{blogPost.author}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>{new Date(blogPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className={styles.metaItem}>
                <Clock size={16} />
                <span>{readTime} Min Read</span>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </header>

      <section className="container">
        <div className={styles.contentGrid}>
          <div className={styles.articleCol}>
            <MotionWrapper variant="slideUp" delay={0.2}>
              <article className={styles.mainContent}>
                <div className={styles.articleBody} dangerouslySetInnerHTML={{ __html: blogPost.content }} />

                <div className={styles.tagsRow}>
                  {blogPost.tags && blogPost.tags.map((tag, i) => (
                    <span key={i} className={styles.tagPill}>{tag}</span>
                  ))}
                </div>
              </article>
            </MotionWrapper>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.stickyForm}>
              <h3 className={styles.formTitle}>Enquire Now</h3>
              <p className={styles.formDesc}>Interested in building your dream home? Let's discuss your project.</p>

              <form onSubmit={(e) => { e.preventDefault(); alert("Enquiry submitted!"); }}>
                <div className="form-group mb-3">
                  <input type="text" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="form-group mb-3">
                  <input type="email" className="form-control" placeholder="Your Email" required />
                </div>
                <div className="form-group mb-3">
                  <input type="tel" className="form-control" placeholder="Phone Number" required />
                </div>
                <div className="form-group mb-4">
                  <textarea className="form-control" placeholder="Message" rows="3" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-secondary)', marginTop: '4rem' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center', color: 'var(--text-primary)' }}>Keep Reading</h2>
            <div className="grid-3" style={{ gap: '2rem' }}>
              {relatedPosts.map((post, idx) => (
                <MotionWrapper key={post.id} variant="slideUp" delay={idx * 0.1} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px' }}>
                    <img src={post.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4, color: 'var(--text-primary)' }}>
                      <Link to={`/blog/${post.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {post.title}
                      </Link>
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '1.5rem' }}>
                      {post.content.replace(/<[^>]+>/g, '')}
                    </p>
                    <div style={{ marginTop: 'auto' }}>
                      <Link to={`/blog/${post.id}`} style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>Read More &rarr;</Link>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <CTASection title="Ready to Build Your Dream Home?" subtitle="Get in touch with our experts to discuss your upcoming project." />
    </div>
  );
};

export default BlogDetail;
