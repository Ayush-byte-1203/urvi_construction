import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, Calendar, Clock, Share2, Globe, Send, MessageSquare, MessageCircle, Link2, Info, ChevronRight
} from 'lucide-react';
import { appConfig } from '../../config/appConfig';
import { blogsData } from '../../data/blogsData';
import SectionHeader from '../../components/sections/SectionHeader';
import GenericCard from '../../components/cards/GenericCard';
import MotionWrapper from '../../components/common/MotionWrapper';
import MediaWrapper from '../../components/common/MediaWrapper';
import Button from '../../components/common/Button';
import CTA from '../../components/sections/CTA';
import styles from './styles.module.css';

const BlogDetail = () => {
  const { id } = useParams();

  const blog = blogsData[id] || blogsData['sustainable-building-materials'];

  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeAnchor, setActiveAnchor] = useState('intro');

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      setScrollPercent(progress);

      // Section tracker
      const anchors = ['intro', 'section1', 'section2', 'section3'];
      for (const anchor of anchors) {
        const el = document.getElementById(anchor);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveAnchor(anchor);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  const blogImages = {
    'sustainable-building-materials': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    'smart-home-automation': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80'
  };

  const blogThumbnails = {
    'sustainable-building-materials': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80',
    'smart-home-automation': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80'
  };

  const isMaterials = id === 'sustainable-building-materials';

  const tocItems = isMaterials ? [
    { id: 'intro', label: '1. Decarbonizing Real Estate' },
    { id: 'section1', label: '2. Zero-Carbon Concrete Blocks' },
    { id: 'section2', label: '3. Recycled & Structural Steel' },
    { id: 'section3', label: '4. Cross-Laminated Timber (CLT)' }
  ] : [
    { id: 'intro', label: '1. Luxury Villa Automation' },
    { id: 'section1', label: '2. Low-Voltage Conduit Mapping' },
    { id: 'section2', label: '3. Thermal Zoning Sensors' },
    { id: 'section3', label: '4. Central Smart Core Cabinets' }
  ];

  // Related Recommendations
  const relatedBlogs = Object.values(blogsData)
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  const handleShare = (type) => {
    if (type === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert('Case link coordinates copied to clipboard!');
    } else {
      alert(`Social sharing overlay mock triggered for ${type}`);
    }
  };

  return (
    <div className="blog-detail-page">
      <Helmet>
        <title>{blog.title} | {appConfig.company.name} Knowledge Center</title>
        <meta name="description"        content={blog.excerpt} />
        <link rel="canonical"            href={`https://buildcraft.in/blog/${blog.id}`} />
        {/* Open Graph */}
        <meta property="og:type"         content="article" />
        <meta property="og:title"        content={blog.title} />
        <meta property="og:description"  content={blog.excerpt} />
        <meta property="og:url"          content={`https://buildcraft.in/blog/${blog.id}`} />
        <meta property="og:image"        content={blogImages[blog.id]} />
        <meta property="article:author"  content={blog.author} />
        <meta property="article:published_time" content={blog.date} />
        {/* Twitter Card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image"       content={blogImages[blog.id]} />
        {/* Article JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": blog.title,
          "description": blog.excerpt,
          "author": { "@type": "Person", "name": blog.author },
          "datePublished": blog.date,
          "publisher": { "@type": "Organization", "name": appConfig.company.name }
        })}</script>
        {/* Breadcrumb JSON-LD */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",             "item": "https://buildcraft.in/" },
            { "@type": "ListItem", "position": 2, "name": "Knowledge Center", "item": "https://buildcraft.in/blog" },
            { "@type": "ListItem", "position": 3, "name": blog.title }
          ]
        })}</script>
      </Helmet>

      {/* Reading Progress indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>

      {/* Breadcrumb Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog">Blog</Link>
            <ChevronRight size={12} />
            <span>Article Details</span>
          </div>
          <h1 className="display-sm" style={{ color: 'var(--text-primary)', maxWidth: '800px', margin: '0 auto' }}>
            {blog.title}
          </h1>
          <p className="subheading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} style={{ color: 'var(--accent)' }} /> {blog.date}</span>
            <span>&middot;</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} style={{ color: 'var(--accent)' }} /> {blog.readTime}</span>
          </p>
        </div>
      </section>

      {/* Detail Split */}
      <section className="section container">
        <Link to="/blog" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to All Articles
        </Link>

        <div className={styles.articleSplit} style={{ marginTop: '1rem' }}>
          {/* Left Column: Sticky Table of Contents */}
          <aside className={styles.sidebar}>
            <div className={styles.tocCard}>
              <h4 className={styles.tocTitle}>Table of Contents</h4>
              <div className={styles.tocList}>
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`${styles.tocLink} ${activeAnchor === item.id ? styles.tocLinkActive : ''}`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* Center Column: Rich Article Body */}
          <div>
            <MediaWrapper 
              src={blogImages[blog.id]} 
              alt={blog.title}
              aspectRatio="16/9"
              style={{ borderRadius: 'var(--radius-md)', marginBottom: '2.5rem' }}
            />

            <article className={styles.articleBody}>
              <h2 id="intro" className={styles.h2}>
                {isMaterials ? 'Decarbonizing Global Real Estate' : 'Luxury Villa Automation'}
              </h2>
              <p>{blog.content[0]}</p>

              <div className={styles.pullQuote}>
                "The carbon-neutral framework isn't an option; it's a foundational physics requirement for future corporate values."
              </div>

              <h2 id="section1" className={styles.h2}>
                {isMaterials ? 'Zero-Carbon Concrete Blocks' : 'Low-Voltage Conduit Mapping'}
              </h2>
              <p>{blog.content[1]}</p>

              <div className={styles.calloutBox}>
                <Info size={18} className={styles.calloutIcon} />
                <div className={styles.calloutContent}>
                  <strong>Pro Staging Tip:</strong> Always coordinate wire conduits early with spatial drafts to avoid structural core drills on load walls.
                </div>
              </div>

              <h2 id="section2" className={styles.h2}>
                {isMaterials ? 'Recycled & Structural Steel' : 'Thermal Zoning Sensors'}
              </h2>
              <p>{blog.content[2]}</p>

              <h2 id="section3" className={styles.h2}>
                {isMaterials ? 'Cross-Laminated Timber (CLT)' : 'Central Smart Core Cabinets'}
              </h2>
              <p>{blog.content[3]}</p>
            </article>

            {/* Author Profile card */}
            <div className={styles.authorCard}>
              <img 
                src={isMaterials ? 'https://i.pravatar.cc/150?img=68' : 'https://i.pravatar.cc/150?img=47'}
                alt={blog.author}
                className={styles.avatar}
              />
              <div>
                <span className={styles.authorName}>Written by {blog.author}</span>
                <span className={styles.authorBio} style={{ display: 'block' }}>
                  {blog.role} &middot; Principal researcher coordinating structural safety codes and green blueprints orientators.
                </span>
              </div>
            </div>

            {/* Internal Linking CTA Block */}
            <div className={styles.internalCta}>
              <h4>Continue Your Construction Journey</h4>
              <div className={styles.internalCtaLinks}>
                <Link to="/packages#wizard" className={styles.internalLink}>
                  <span>📐</span> Get a Free Cost Estimate
                </Link>
                <Link to="/services" className={styles.internalLink}>
                  <span>🏗️</span> Explore Our Services
                </Link>
                <Link to="/packages" className={styles.internalLink}>
                  <span>📦</span> View Construction Packages
                </Link>
                <Link to="/projects" className={styles.internalLink}>
                  <span>🏛️</span> See Completed Projects
                </Link>
              </div>
            </div>

            {/* Share Group */}
            <div className={styles.shareSection}>
              <span className={styles.shareLabel}>Share Article</span>
              <div className={styles.shareGroup}>
                <button onClick={() => handleShare('facebook')} className={styles.shareBtn} aria-label="Share on Facebook"><Globe size={16} /></button>
                <button onClick={() => handleShare('linkedin')} className={styles.shareBtn} aria-label="Share on LinkedIn"><Send size={16} /></button>
                <button onClick={() => handleShare('twitter')} className={styles.shareBtn} aria-label="Share on Twitter"><MessageSquare size={16} /></button>
                <button onClick={() => handleShare('whatsapp')} className={styles.shareBtn} aria-label="Share on WhatsApp"><MessageCircle size={16} /></button>
                <button onClick={() => handleShare('copy')} className={styles.shareBtn} aria-label="Copy article link"><Link2 size={16} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles recommendations */}
      <section className="section container" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
        <SectionHeader
          eyebrow="Recommendations"
          heading="Related Insights & Guides"
          subheading="Explore more studies mapping electrical safety networks, concrete aggregate compression tests, and solar blueprints drafts."
        />

        <div className="grid-2" style={{ marginTop: '3rem' }}>
          {relatedBlogs.map((item, idx) => (
            <MotionWrapper key={item.id} variant="slideUp" delay={idx * 0.15}>
              <GenericCard
                image={blogThumbnails[item.id]}
                badge={item.category}
                title={item.title}
                description={item.excerpt}
                meta={[
                  <span key="date"><Calendar size={12} style={{ marginRight: '0.25rem' }} /> {item.date}</span>,
                  <span key="read"><Clock size={12} style={{ marginRight: '0.25rem' }} /> {item.readTime}</span>
                ]}
                ctaText="Read Article"
                ctaLink={`/blog/${item.id}`}
              />
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* Final conversions */}
      <CTA 
        title="Ready to Build Your Project landmarks?"
        description="We provide comprehensive initial spatial assessments and preliminary civil cost drafts calls."
        primaryBtnText="Request consultation Call"
        primaryBtnLink="/contact"
        secondaryBtnText="Review Estimating Tiers"
        secondaryBtnLink="/packages"
        bgVariant="gradient"
        layout="center"
      />
    </div>
  );
};

export default BlogDetail;
