import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, CheckCircle2, PlusCircle, ChevronRight, Clock, ShieldCheck, Award, FileText, Download 
} from 'lucide-react';
import { appConfig } from '../config/appConfig';
import { packagesData } from '../data/packagesData';
import { faqData } from '../data/faqData';
import SectionHeader from '../components/sections/SectionHeader';
import GenericCard from '../components/cards/GenericCard';
import Timeline from '../components/ui/Timeline';
import MotionWrapper from '../components/common/MotionWrapper';
import MediaWrapper from '../components/common/MediaWrapper';
import Accordion from '../components/ui/Accordion';
import Button from '../components/common/Button';
import InquiryForm from '../components/ui/InquiryForm';
import CTA from '../components/sections/CTA';
import { HeaderThemeContext } from '../layouts/Layout';
import styles from './PackageDetail.module.css';

const PackageDetail = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { id } = useParams();

  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  const slugify = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const plan = packagesData.find((p) => slugify(p.name) === id) || packagesData[1];

  const comparisonRows = [
    { label: 'Construction Cost', value: plan.constructionCost },
    { label: 'Material Quality', value: plan.materialQuality },
    { label: 'Steel Brand', value: plan.steelBrand },
    { label: 'Cement Brand', value: plan.cementBrand },
    { label: 'Electrical Brand', value: plan.electricalBrand },
    { label: 'Paint Brand', value: plan.paintBrand },
    { label: 'Flooring', value: plan.flooring },
    { label: 'Doors', value: plan.doors },
    { label: 'Windows', value: plan.windows },
    { label: 'Sanitary', value: plan.sanitary },
    { label: 'Kitchen', value: plan.kitchen },
    { label: 'Ceiling', value: plan.ceiling },
    { label: 'Waterproofing', value: plan.waterproofing },
    { label: 'Structure Warranty', value: plan.warranty },
    { label: 'Support term', value: plan.support },
    { label: 'Estimated Timeline', value: plan.timeline }
  ];

  const materialPartners = [
    { name: 'UltraTech Cement', category: 'Cement Spans' },
    { name: 'Tata Tiscon Steel', category: 'EAF Reinforcements' },
    { name: 'Havells Electrical', category: 'Conduits & Grid' },
    { name: 'Asian Paints', category: 'Coatings' },
    { name: 'Kajaria Tiles', category: 'Flooring Layouts' },
    { name: 'Jaquar Fittings', category: 'Sanitary Specs' }
  ];

  const relatedPlans = packagesData.filter((p) => slugify(p.name) !== slugify(plan.name));

  // FAQ mockups — faqData is an array with keys q/a
  const faqItems = faqData.slice(0, 3).map((f) => ({
    title: f.q,
    content: f.a
  }));

  return (
    <div className="package-detail-page">
      <Helmet>
        <title>{plan.name} Plan Specs | {appConfig.company.name}</title>
        <meta name="description" content={plan.tagline} />
      </Helmet>

      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <Link to="/packages">Packages</Link>
            <ChevronRight size={12} />
            <span>{plan.name} Detail Specs</span>
          </div>
          <h1 className="display-md" style={{ color: 'var(--text-primary)' }}>{plan.name}</h1>
          <p className="subheading" style={{ margin: '0.5rem auto 0', maxWidth: '700px' }}>
            {plan.tagline}
          </p>
        </div>
      </section>

      {/* Detail Split */}
      <section className="section container">
        <Link to="/packages" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to All Packages
        </Link>

        <div className={styles.detailSplit} style={{ marginTop: '1rem' }}>
          {/* Left Column: Checklist of what is Included vs Optional */}
          <div>
            <div className={styles.checklistGrid}>
              <div className={styles.checklistCol}>
                <h3 className={styles.checkTitle}>Included in Package</h3>
                <div className={styles.checkList}>
                  {plan.whatIncluded.map((feat, idx) => (
                    <div key={idx} className={styles.checkItem}>
                      <CheckCircle2 size={16} className={`${styles.checkIcon} ${styles.includedIcon}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.checklistCol}>
                <h3 className={styles.checkTitle}>Available as Optional</h3>
                <div className={styles.checkList}>
                  {plan.whatOptional.map((feat, idx) => (
                    <div key={idx} className={styles.checkItem}>
                      <PlusCircle size={16} className={`${styles.checkIcon} ${styles.optionalIcon}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <Award size={24} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>Structural Quality Assurance</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', lineHeight: '1.5' }}>
                    All raw material batches undergo laboratory tests for density, ductility, and structural load tolerances before pouring concrete foundations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Summary & Table Checklist */}
          <div className="glass-panel" style={{ padding: '2.5rem', height: 'fit-content' }}>
            <h3 className="card-heading mb-3" style={{ color: 'var(--accent)', fontWeight: 600 }}>Plan Overview</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
              <span className={styles.priceHeading} style={{ fontSize: '2.25rem' }}>{plan.price}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{plan.unit}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                <Clock size={14} style={{ color: 'var(--accent)' }} />
                <span>{plan.timeline}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                <ShieldCheck size={14} style={{ color: 'var(--accent)' }} />
                <span>Permits processing included</span>
              </div>
            </div>

            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* Materials specification tables */}
      <section className={styles.materialsSection}>
        <div className="container">
          <SectionHeader
            eyebrow="Tiers details"
            heading="Exhaustive Material Specifications"
            subheading="Review brands, material options, and details mapping compared in this construction package."
          />

          <div className={styles.materialsGrid}>
            {comparisonRows.slice(2, 10).map((mat, idx) => (
              <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.08} className={styles.materialCard}>
                <span className={styles.materialSpec}>{mat.label}</span>
                <h4 className={styles.materialTitle}>{mat.value}</h4>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Stages timeline */}
      <section className={styles.stagesSection}>
        <div className="container">
          <SectionHeader
            eyebrow="Stages Workflow"
            heading="Estimated Construction Timeline"
            subheading="Review the timeline phases mapping concrete curing cycles, brickwork masonries, and finishing audits."
          />

          <div style={{ marginTop: '4rem' }}>
            <Timeline items={plan.stages} />
          </div>
        </div>
      </section>

      {/* Material Brand Partners grayscale logos */}
      <section className={styles.partnersSection}>
        <div className="container">
          <SectionHeader
            eyebrow="Supply chain"
            heading="Material Brand Partners"
            subheading="Grayscale brands references colorize on hover audits, assuring raw concrete frame warranties."
          />

          <div className={styles.partnersGrid}>
            {materialPartners.map((part, idx) => (
              <MotionWrapper key={idx} variant="fadeIn" delay={idx * 0.08} className={styles.partnerLogoCard}>
                <div>
                  <div className={styles.partnerName}>{part.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.25rem', textTransform: 'uppercase' }}>
                    {part.category}
                  </div>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Download Brochure Card */}
      <section className={styles.brochureSection}>
        <div className="container">
          <div className={styles.brochureCard}>
            <div className={styles.brochurePreview}>
              <FileText size={64} className={styles.brochureIcon} />
            </div>
            
            <div className={styles.brochureText}>
              <h3 className={styles.brochureTitle}>Download Core Build Specifications</h3>
              <p className={styles.brochureDesc}>
                Obtain complete architectural PDFs detailing brand models, concrete mix grades, electrical conduit layouts, and structural blueprints variables.
              </p>
              <div className={styles.brochureMeta}>
                <span>PDF Format &middot; 4.8 MB &middot; BuildCraft Certified Release</span>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Brochure PDF downloading scheduled."); }} style={{ width: 'fit-content', marginTop: '0.5rem' }}>
                <Button variant="primary" iconLeft={<Download size={16} />}>Download Brochure Guide</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Package Gallery Section */}
      <section className={styles.gallerySection}>
        <div className="container">
          <SectionHeader
            eyebrow="Image showcase"
            heading="Build Visual Gallery"
            subheading="Review active building yards, concrete staging, and layout handovers mapping this package tier."
          />

          <div className={styles.galleryGrid}>
            {plan.gallery.map((src, idx) => (
              <MotionWrapper key={idx} variant="scale" delay={idx * 0.1} className="glass-panel" style={{ overflow: 'hidden' }}>
                <MediaWrapper 
                  src={src} 
                  alt={`${plan.name} Staging Photo ${idx + 1}`}
                  aspectRatio="16/10"
                />
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Quote Request Form */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Inquiry desk"
          heading="Request Plan Cost Draft"
          subheading="Fill plot specifications, locations, and structural timelines to obtain initial estimates call."
        />
        <div className="glass-panel" style={{ padding: '3rem', marginTop: '3.5rem' }}>
          <InquiryForm defaultService="residential" />
        </div>
      </section>

      {/* Related Plans */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <div className="container">
          <SectionHeader
            eyebrow="Options"
            heading="Other Construction Plans"
            subheading="Compare our other raw building concrete shell systems or luxury customized villa additions."
          />

          <div className="grid-2" style={{ marginTop: '3rem' }}>
            {relatedPlans.map((item, idx) => {
              const itemSlug = slugify(item.name);
              return (
                <MotionWrapper key={idx} variant="slideUp" delay={idx * 0.15} className="glass-panel" style={{ padding: '2.5rem' }}>
                  <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.name}
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '0.25rem', marginBottom: '1.5rem' }}>
                    {item.tagline}
                  </p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.price}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.unit}</span>
                    </div>
                    <Link to={`/packages/${itemSlug}`}>
                      <Button variant="outline" iconRight={<ChevronRight size={14} />}>View Plan Specs</Button>
                    </Link>
                  </div>
                </MotionWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA 
        title="Ready to Build Your Project landmarks?"
        description="We provide comprehensive initial spatial assessments and preliminary civil cost drafts calls."
        primaryBtnText="Get Free Quote Estimation"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Projects Gallery"
        secondaryBtnLink="/projects"
        bgVariant="gradient"
        layout="center"
      />
    </div>
  );
};

export default PackageDetail;
