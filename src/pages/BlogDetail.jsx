import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HeaderThemeContext } from '../components/Layout';
import { useGlobalData } from '../context/GlobalDataContext';
import { ArrowLeft, User, Calendar, Tag, Share2 } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { blogs } = useGlobalData();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setHeaderTheme('dark');
    window.scrollTo(0, 0);
  }, [setHeaderTheme, id]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      const foundBlog = blogs.find(b => b.id.toString() === id);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        navigate('/blog');
      }
    }
  }, [blogs, id, navigate]);

  if (!blog) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading blog...</div>;
  }

  // Related posts (excluding current, same category if possible, limited to 3)
  const relatedPosts = blogs
    .filter(b => b.id !== blog.id)
    .sort((a, b) => (a.category_name === blog.category_name ? -1 : 1))
    .slice(0, 3);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Helmet>
        <title>{blog.title} | Paramarsh Construction</title>
        <meta name="description" content={blog.content.substring(0, 160).replace(/<[^>]+>/g, '')} />
      </Helmet>

      {/* Hero Section */}
      <div style={{ position: 'relative', height: '50vh', minHeight: '400px', display: 'flex', alignItems: 'flex-end', paddingBottom: '3rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <img
            src={blog.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80'}
            alt={blog.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%)' }} />
        </div>

        <div className="container">
          <MotionWrapper variant="slideUp">
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Back to all articles
            </Link>

            {blog.category_name && (
              <span style={{ display: 'inline-block', background: 'var(--accent)', color: '#fff', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
                {blog.category_name}
              </span>
            )}

            <h1 className="display-sm" style={{ color: '#fff', marginBottom: '1.5rem', maxWidth: '800px' }}>
              {blog.title}
            </h1>

            <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> By {blog.author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </MotionWrapper>
        </div>
      </div>

      {/* Content Section */}
      <section className="section container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <MotionWrapper variant="slideUp" delay={0.2}>
            {/* Social Share (Mock) */}
            {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
              <button
                onClick={() => alert('Sharing functionality would open native share sheet or links.')}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.875rem' }}
              >
                <Share2 size={16} /> Share Article
              </button>
            </div> */}

            {/* Article Body */}
            <div
              style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-main)' }}
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>') }}
            />
          </MotionWrapper>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="section" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center' }}>Keep Reading</h2>
            <div className="grid-3" style={{ gap: '2rem' }}>
              {relatedPosts.map((post, idx) => (
                <MotionWrapper key={post.id} variant="slideUp" delay={idx * 0.1} style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '200px' }}>
                    <img src={post.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80'} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', lineHeight: 1.4 }}>
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
    </div>
  );
};

export default BlogDetail;
