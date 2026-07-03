import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Search, ChevronRight, Calendar, Clock, ArrowRight, Play,
  Download, BookOpen, HelpCircle, FileText, Layers, Home,
  Cpu, DollarSign, Compass, Zap, CheckCircle2, ChevronDown
} from 'lucide-react';
import { appConfig } from '../../config/appConfig';
import { blogsData } from '../../data/blogsData';
import SectionHeader from '../../components/sections/SectionHeader';
import MotionWrapper from '../../components/common/MotionWrapper';
import styles from './styles.module.css';

/* ─── Static Knowledge Center data ─────────────────────────────────────── */

const CATEGORIES = [
  { id: 'all',         label: 'All Articles',       icon: <Layers size={18} /> },
  { id: 'materials',   label: 'Material Guides',     icon: <Compass size={18} /> },
  { id: 'design',      label: 'Design Ideas',        icon: <Home size={18} /> },
  { id: 'budget',      label: 'Budget Planning',     icon: <DollarSign size={18} /> },
  { id: 'smart',       label: 'Smart Home',          icon: <Cpu size={18} /> },
  { id: 'process',     label: 'Build Process',       icon: <CheckCircle2 size={18} /> },
  { id: 'engineering', label: 'Engineering Tips',    icon: <Zap size={18} /> },
];

const GUIDES = [
  { title: 'How to Build a House — Complete Guide', desc: 'A step-by-step breakdown of every stage from soil testing to handover.', tag: '12 min read' },
  { title: 'Choosing the Right Foundation Type',    desc: 'Isolated vs strip vs raft footings — which suits your plot?',          tag: '8 min read'  },
  { title: 'Understanding Your BOQ',                desc: 'Decode a Bill of Quantities before signing any construction contract.',  tag: '6 min read'  },
  { title: 'Government Approval Checklist',         desc: 'Municipal permits, NOCs and occupancy certificates explained.',          tag: '7 min read'  },
  { title: 'Construction Timeline Explained',       desc: 'Realistic phase durations for G, G+1 and G+2 builds in Vadodara.',     tag: '5 min read'  },
];

const COMPARISONS = [
  {
    title: 'UltraTech vs ACC Cement',
    rows: [
      { feature: 'Grade',          a: '53-Grade OPC',          b: '53-Grade OPC'        },
      { feature: 'Compressive Str.', a: '53 N/mm² at 28 days', b: '53 N/mm² at 28 days' },
      { feature: 'Setting Time',   a: '30 min initial',        b: '30 min initial'       },
      { feature: 'Best For',       a: 'RCC slabs & columns',   b: 'Block masonry work'   },
      { feature: 'Our Pick',       a: '✓ Preferred',           b: '—'                    },
    ],
  },
  {
    title: 'TATA Tiscon vs JSW Neosteel',
    rows: [
      { feature: 'Grade',          a: 'Fe 550D',               b: 'Fe 550D'              },
      { feature: 'Elongation',     a: '16% min',               b: '16% min'              },
      { feature: 'Rib Pattern',    a: 'Transverse + Longitudinal', b: 'CRS rib pattern'  },
      { feature: 'Best For',       a: 'Seismic zones III+',    b: 'General construction' },
      { feature: 'Our Pick',       a: '✓ Preferred',           b: '—'                    },
    ],
  },
];

const COST_ARTICLES = [
  { title: 'How Construction Cost is Calculated',     desc: 'Rate per sq ft explained — what goes in and what is often hidden.' },
  { title: 'Hidden Costs Every Home Builder Misses',  desc: 'Approvals, soil testing, temporary utilities and more.'            },
  { title: 'Top 7 Ways to Save on Construction',      desc: 'Smart procurement and phased construction strategies.'             },
  { title: 'Cost Escalation — How We Handle It',      desc: 'Our bulk-procurement hedging and change-order process.'            },
];

const INSPIRATION_IMGS = [
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', label: 'Modern Luxury Villa'    },
  { src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80', label: 'Contemporary Interior'  },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', label: 'Open-Plan Office'       },
  { src: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80', label: 'Industrial Facade'      },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', label: 'High-Rise Commercial'   },
  { src: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&w=600&q=80', label: 'Minimalist Residence'   },
];

const VIDEOS = [
  { title: 'Foundation Pouring Timelapse',   thumb: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80' },
  { title: 'Material Selection Masterclass', thumb: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80' },
  { title: 'Drone Site Walkthrough',         thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
  { title: 'Budget Planning Seminar',        thumb: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
];

const DOWNLOADS = [
  { title: 'Construction Quality Checklist', size: 'PDF · 1.5 MB' },
  { title: 'Budget Planner Template',        size: 'PDF · 0.8 MB' },
  { title: 'Material Specifications Guide',  size: 'PDF · 2.8 MB' },
  { title: 'Company Profile Brochure',       size: 'PDF · 4.2 MB' },
];

const GLOSSARY = [
  { term: 'Beam',          def: 'A horizontal structural member transferring loads to columns or walls.' },
  { term: 'Column',        def: 'A vertical compression member that carries loads from beams to foundations.' },
  { term: 'Foundation',    def: 'The lowest part of a structure, transferring all loads to the ground.' },
  { term: 'Lintel',        def: 'A horizontal beam placed above openings (doors/windows) to carry wall loads.' },
  { term: 'Plinth',        def: 'The raised base of a building that sits above ground level.' },
  { term: 'RCC',           def: 'Reinforced Cement Concrete — concrete with steel rebar embedded for tension resistance.' },
  { term: 'Slab',          def: 'A flat concrete plate forming floors, roofs, or other decks.' },
  { term: 'Slump Test',    def: 'A site test measuring the workability/consistency of fresh concrete.' },
  { term: 'Waterproofing', def: 'Chemical or membrane-based treatment preventing water ingress into structures.' },
];

const FAQ_ITEMS = [
  { q: 'What is the typical construction timeline for a G+1 home?',  a: 'A G+1 residential build in Vadodara typically takes 10–14 months depending on design complexity, soil conditions and approvals.',      cat: 'construction' },
  { q: 'Which package includes smart home wiring?',                   a: 'The Executive Smart and Signature Elite packages include pre-planned low-voltage conduit routing for home automation systems.',              cat: 'packages'      },
  { q: 'What concrete grade do you use for slabs?',                  a: 'We use M25 to M30 grade concrete (designed mix) for residential slabs, verified by cube compressive testing at 7 and 28 days.',           cat: 'materials'     },
  { q: 'How is the final cost determined?',                           a: 'Final cost depends on plot area, floors, package tier, add-ons, and finishes. Our cost calculator provides a close indicative estimate.',    cat: 'budget'        },
  { q: 'What does the structural warranty cover?',                    a: 'Our 15-year structural warranty covers RCC framework integrity — columns, beams, slabs. A separate 10-year waterproofing warranty also applies.', cat: 'warranty'  },
  { q: 'Do you handle government approvals?',                         a: 'Yes. Our compliance desk manages building plan approvals, NOCs, soil reports, and final occupancy certificates end-to-end.',                cat: 'legal'         },
];

const FAQ_CATS = ['all', 'construction', 'packages', 'materials', 'budget', 'warranty', 'legal'];

const BLOG_IMAGES = {
  'sustainable-building-materials': 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80',
  'smart-home-automation':          'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
};

/* ─── Component ─────────────────────────────────────────────────────────── */

const Blog = () => {
  const [searchTerm,    setSearchTerm]    = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFaqCat,  setActiveFaqCat]  = useState('all');
  const [faqSearch,     setFaqSearch]     = useState('');
  const [openGlossary,  setOpenGlossary]  = useState(null);
  const [email,         setEmail]         = useState('');
  const [subDone,       setSubDone]       = useState(false);
  const [activeComp,    setActiveComp]    = useState(0);

  const blogsList = Object.values(blogsData);
  const featured  = blogsList[0];
  const gridList  = blogsList.filter(b =>
    (activeCategory === 'all' || b.category.toLowerCase() === activeCategory) &&
    (b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredFaqs = FAQ_ITEMS.filter(f =>
    (activeFaqCat === 'all' || f.cat === activeFaqCat) &&
    f.q.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="blog-page">
      <Helmet>
        <title>Knowledge Center &amp; Resource Hub | BuildCraft</title>
        <meta name="description" content="Construction guides, material comparisons, budget planning tips, design inspiration and more — your complete resource for building in Vadodara." />
        <meta property="og:title"       content="Knowledge Center | BuildCraft" />
        <meta property="og:description" content="Expert guides, material comparisons and cost planning resources for your construction project." />
        <meta property="og:type"        content="website" />
      </Helmet>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Knowledge Center</span>
          </div>

          <h1 className={styles.heroTitle}>Knowledge Center &amp; Resource Hub</h1>
          <p className={styles.heroDesc}>
            Expert construction guides, material comparisons, budget planning tools and design
            inspiration — everything you need before breaking ground.
          </p>

          {/* Hero search */}
          <div className={styles.heroSearch}>
            <Search size={18} className={styles.heroSearchIcon} />
            <input
              type="text"
              placeholder="Search articles, guides, materials…"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search knowledge center"
            />
          </div>

          <div className={styles.heroTrust}>
            <span><BookOpen size={14} /> 50+ Expert Articles</span>
            <span><Clock    size={14} /> Avg. 6 min read</span>
            <span><CheckCircle2 size={14} /> Verified by Engineers</span>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED ARTICLE ─────────────────────────────────────────── */}
      {!searchTerm && activeCategory === 'all' && (
        <section className="section container">
          <span className="text-overline">Editor's Pick</span>
          <h2 className="display-sm" style={{ marginTop: '0.25rem', marginBottom: '2.5rem' }}>Featured Article</h2>

          <MotionWrapper variant="fadeIn">
            <div className={`glass-panel ${styles.featuredCard}`}>
              <div className={styles.featuredImg}>
                <img src={BLOG_IMAGES[featured.id]} alt={featured.title} loading="lazy" />
                <span className={styles.featuredCatBadge}>{featured.category}</span>
              </div>
              <div className={styles.featuredContent}>
                <div className={styles.featuredMeta}>
                  <span><Calendar size={12} /> {featured.date}</span>
                  <span><Clock size={12} /> {featured.readTime}</span>
                </div>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <p className={styles.featuredAuthor}>By {featured.author} · {featured.role}</p>
                <Link to={`/blog/${featured.id}`} className="btn btn-primary" style={{ width: 'fit-content', marginTop: '1rem' }}>
                  Read Article <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                </Link>
              </div>
            </div>
          </MotionWrapper>
        </section>
      )}

      {/* ── 3. CATEGORY FILTER + ARTICLE GRID ──────────────────────────── */}
      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          <div className={styles.catGrid}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`${styles.catCard} ${activeCategory === cat.id ? styles.catActive : ''}`}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid-3" style={{ marginTop: '3rem', gap: '2rem' }}>
            {gridList.map((blog, idx) => (
              <MotionWrapper key={blog.id} variant="slideUp" delay={idx * 0.08}>
                <Link to={`/blog/${blog.id}`} className={`glass-panel ${styles.articleCard}`}>
                  <div className={styles.acImgWrap}>
                    <img src={BLOG_IMAGES[blog.id]} alt={blog.title} loading="lazy" />
                    <span className={styles.acCatBadge}>{blog.category}</span>
                  </div>
                  <div className={styles.acBody}>
                    <h3 className={styles.acTitle}>{blog.title}</h3>
                    <p className={styles.acExcerpt}>{blog.excerpt}</p>
                    <div className={styles.acMeta}>
                      <span><Calendar size={11} /> {blog.date}</span>
                      <span><Clock size={11} /> {blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              </MotionWrapper>
            ))}
          </div>

          {gridList.length === 0 && (
            <p style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
              No articles match your search. Try a different keyword or category.
            </p>
          )}
        </div>
      </section>

      {/* ── 4. CONSTRUCTION GUIDES ──────────────────────────────────────── */}
      <section className="section container">
        <SectionHeader
          eyebrow="Step-by-Step"
          heading="Construction Guides"
          subheading="Practical, expert-written guides covering every phase of your build journey."
        />
        <div className="grid-3" style={{ marginTop: '3.5rem', gap: '2rem' }}>
          {GUIDES.map((g, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.07}>
              <div className={`glass-panel ${styles.guideCard}`}>
                <span className={styles.guideTag}>{g.tag}</span>
                <h3 className={styles.guideTitle}>{g.title}</h3>
                <p className={styles.guideDesc}>{g.desc}</p>
                <button className={styles.guideLink}>
                  Read Guide <ArrowRight size={13} />
                </button>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* ── 5. MATERIAL COMPARISON CENTER ───────────────────────────────── */}
      <section className={`section ${styles.compareSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Side-by-Side"
            heading="Material Comparison Center"
            subheading="Unbiased comparisons of the brands we specify — so you understand what goes into your home."
          />

          <div className={styles.compTabs} style={{ marginTop: '3rem' }}>
            {COMPARISONS.map((c, i) => (
              <button
                key={i}
                onClick={() => setActiveComp(i)}
                className={`${styles.compTab} ${activeComp === i ? styles.compTabActive : ''}`}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div className={`glass-panel ${styles.compTable}`}>
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{COMPARISONS[activeComp].rows[0] ? COMPARISONS[activeComp].title.split(' vs ')[0] : 'Option A'}</th>
                  <th>{COMPARISONS[activeComp].title.split(' vs ')[1] || 'Option B'}</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISONS[activeComp].rows.map((row, ri) => (
                  <tr key={ri} className={row.feature === 'Our Pick' ? styles.pickRow : ''}>
                    <td className={styles.featureCol}>{row.feature}</td>
                    <td>{row.a}</td>
                    <td>{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 6. COST PLANNING ARTICLES ───────────────────────────────────── */}
      <section className="section container">
        <SectionHeader
          eyebrow="Financial Planning"
          heading="Cost Planning Resources"
          subheading="Understand where your money goes and how to make every rupee count."
        />
        <div className="grid-2" style={{ marginTop: '3.5rem', gap: '2rem' }}>
          {COST_ARTICLES.map((a, idx) => (
            <div key={idx} className={`glass-panel ${styles.costCard}`}>
              <DollarSign size={22} className={styles.costIcon} />
              <div>
                <h3 className={styles.costTitle}>{a.title}</h3>
                <p className={styles.costDesc}>{a.desc}</p>
              </div>
              <ArrowRight size={18} className={styles.costArrow} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. DESIGN INSPIRATION GALLERY ───────────────────────────────── */}
      <section className={`section ${styles.inspSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Visual Ideas"
            heading="Design Inspiration Gallery"
            subheading="Browse styles that have inspired real projects we've delivered in Vadodara."
          />
          <div className={styles.masonryGrid} style={{ marginTop: '3.5rem' }}>
            {INSPIRATION_IMGS.map((img, idx) => (
              <div key={idx} className={styles.masonryItem}>
                <img src={img.src} alt={img.label} loading="lazy" />
                <span className={styles.masonryLabel}>{img.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. VIDEO LEARNING CENTER ────────────────────────────────────── */}
      <section className="section container">
        <SectionHeader
          eyebrow="Watch &amp; Learn"
          heading="Video Learning Center"
          subheading="Construction timelapses, material walkthroughs and expert seminars."
        />
        <div className="grid-4" style={{ marginTop: '3.5rem', gap: '1.5rem' }}>
          {VIDEOS.map((v, idx) => (
            <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.07}>
              <div className={`glass-panel ${styles.videoCard}`} onClick={() => alert('Video player placeholder')}>
                <div className={styles.videoThumb}>
                  <img src={v.thumb} alt={v.title} loading="lazy" />
                  <div className={styles.videoPlay}><Play size={18} fill="currentColor" /></div>
                </div>
                <p className={styles.videoTitle}>{v.title}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* ── 9. DOWNLOAD CENTER ──────────────────────────────────────────── */}
      <section className={`section ${styles.dlSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Free Resources"
            heading="Download Center"
            subheading="Practical templates and guides you can use right now — no sign-up required."
          />
          <div className="grid-2" style={{ marginTop: '3.5rem', gap: '1.5rem' }}>
            {DOWNLOADS.map((d, idx) => (
              <div key={idx} className={`glass-panel ${styles.dlCard}`}>
                <FileText size={24} className={styles.dlIcon} />
                <div className={styles.dlText}>
                  <strong>{d.title}</strong>
                  <span>{d.size}</span>
                </div>
                <button
                  className={styles.dlBtn}
                  onClick={() => alert(`Download placeholder: ${d.title}`)}
                  aria-label={`Download ${d.title}`}
                >
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CONSTRUCTION GLOSSARY ───────────────────────────────────── */}
      <section className="section container">
        <SectionHeader
          eyebrow="A–Z Reference"
          heading="Construction Glossary"
          subheading="Plain-English definitions of the technical terms you'll encounter throughout your project."
        />
        <div className={styles.glossaryList} style={{ marginTop: '3.5rem' }}>
          {GLOSSARY.map((item, idx) => (
            <div key={idx} className={styles.glossaryItem}>
              <button
                className={styles.glossaryTrigger}
                onClick={() => setOpenGlossary(openGlossary === idx ? null : idx)}
                aria-expanded={openGlossary === idx}
              >
                <span className={styles.glossaryTerm}>{item.term}</span>
                <ChevronDown
                  size={16}
                  className={`${styles.glossaryChevron} ${openGlossary === idx ? styles.glossaryChevronOpen : ''}`}
                />
              </button>
              {openGlossary === idx && (
                <p className={styles.glossaryDef}>{item.def}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 11. INTERACTIVE FAQ HUB ─────────────────────────────────────── */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Quick Answers"
            heading="FAQ Hub"
            subheading="Filter by topic or search for specific questions."
          />

          <div className={styles.faqControls} style={{ marginTop: '3rem' }}>
            <div className={styles.faqSearch}>
              <Search size={15} />
              <input
                type="text"
                placeholder="Search FAQs…"
                value={faqSearch}
                onChange={e => setFaqSearch(e.target.value)}
                aria-label="Search FAQs"
              />
            </div>
            <div className={styles.faqChips}>
              {FAQ_CATS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFaqCat(cat)}
                  className={`${styles.faqChip} ${activeFaqCat === cat ? styles.faqChipActive : ''}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.faqItems} style={{ marginTop: '2rem' }}>
            {filteredFaqs.map((f, idx) => (
              <details key={idx} className={`glass-panel ${styles.faqDetail}`}>
                <summary className={styles.faqSummary}>
                  <HelpCircle size={16} className={styles.faqIcon} />
                  {f.q}
                </summary>
                <p className={styles.faqAnswer}>{f.a}</p>
              </details>
            ))}
            {filteredFaqs.length === 0 && (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
                No FAQs match your query. Try a different filter.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── 12. NEWSLETTER ──────────────────────────────────────────────── */}
      <section className={styles.newsletterSection}>
        <div className={`container ${styles.newsletterInner}`}>
          <div className={styles.nlLeft}>
            <span className="text-overline" style={{ color: '#93c5fd' }}>Monthly Updates</span>
            <h2>Join the Construction Insights Club</h2>
            <ul className={styles.nlBenefits}>
              {['Material rate updates', 'Budget planning tips', 'Design trends', 'Regulatory news'].map((b, i) => (
                <li key={i}><CheckCircle2 size={14} /> {b}</li>
              ))}
            </ul>
          </div>

          <div className={styles.nlRight}>
            {subDone ? (
              <div className={styles.nlSuccess}>
                <CheckCircle2 size={32} />
                <p>You're subscribed! Welcome to the Insights Club.</p>
              </div>
            ) : (
              <form
                onSubmit={e => { e.preventDefault(); if (email) setSubDone(true); }}
                className={styles.nlForm}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="btn btn-primary">Subscribe Free</button>
              </form>
            )}
            <p className={styles.nlDisclaimer}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
