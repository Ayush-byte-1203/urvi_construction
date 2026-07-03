import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight, CheckCircle2, XCircle, Info, Download, HelpCircle, ArrowRight, Star, HardHat, ShieldCheck, Clock 
} from 'lucide-react';
import { appConfig } from '../../config/appConfig';
import { packagesData } from '../../data/packagesData';
import { faqData } from '../../data/faqData';

import SectionHeader from '../../components/sections/SectionHeader';
import QuoteWizard from '../../components/sections/QuoteWizard';
import CitySelector from '../../components/common/CitySelector';
import MotionWrapper from '../../components/common/MotionWrapper';
import Button from '../../components/common/Button';
import Accordion from '../../components/ui/Accordion';
import styles from './styles.module.css';

const Packages = () => {
  const [selectedCity, setSelectedCity] = useState(localStorage.getItem('selectedCity') || 'vadodara');
  const [activeMaterialTab, setActiveMaterialTab] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const [mobileCompareTab, setMobileCompareTab] = useState(1); // Default to Executive

  // Recommendation Quiz state
  const [quizBudget, setQuizBudget] = useState('executive');
  const [quizPlot, setQuizPlot] = useState(1500);
  const [recommendedPackage, setRecommendedPackage] = useState(null);

  // Sync city updates from Navbar CitySelector
  useEffect(() => {
    const syncCity = () => {
      setSelectedCity(localStorage.getItem('selectedCity') || 'vadodara');
    };
    window.addEventListener('cityChanged', syncCity);
    return () => window.removeEventListener('cityChanged', syncCity);
  }, []);

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    localStorage.setItem('selectedCity', cityId);
    window.dispatchEvent(new Event('cityChanged'));
  };

  const cityPackages = packagesData[selectedCity] || [];

  const comparisonRows = [
    { label: 'Construction Cost', key: 'constructionCost' },
    { label: 'Material Quality', key: 'materialQuality' },
    { label: 'Steel Brand', key: 'steelBrand' },
    { label: 'Cement Brand', key: 'cementBrand' },
    { label: 'Electrical Brand', key: 'electricalBrand' },
    { label: 'Paint Brand', key: 'paintBrand' },
    { label: 'Flooring Spec', key: 'flooring' },
    { label: 'Doors Spec', key: 'doors' },
    { label: 'Windows Spec', key: 'windows' },
    { label: 'Sanitary Fittings', key: 'sanitary' },
    { label: 'Kitchen Fittings', key: 'kitchen' },
    { label: 'False Ceiling', key: 'ceiling' },
    { label: 'Waterproofing', key: 'waterproofing' },
    { label: 'Structure Warranty', key: 'warranty' },
    { label: 'Maintenance Support', key: 'support' },
    { label: 'Completion Timeline', key: 'timeline' }
  ];

  // Material specs list
  const materialsList = [
    { name: 'UltraTech Cement', desc: 'Certified Grade-53 cement for maximum pillar load capacities.', benefit: 'Prevents cracks formation during setting.', app: 'Foundation & Pillars RCC casting.', quality: 'Ultra High Strength', tier: 'All Packages' },
    { name: 'TATA Tiscon Steel', desc: 'Fe 550D TMT reinforcement rebars with premium flexibility.', benefit: 'Protects structure against earthquake shakes.', app: 'Slab structural grid rebar work.', quality: 'Super Ductile', tier: 'Executive & Signature' },
    { name: 'Kajaria Floor Tiles', desc: 'Luxury vitrified floor tiles with anti-scratch coating.', benefit: 'Sleek surface texture easy to clean.', app: 'Living area & bedroom floor layouts.', quality: 'Luxury Finish', tier: 'Signature Elite' },
    { name: 'Asian Paints Ultima', desc: 'Weather-proof exterior protective acrylic emulsion paints.', benefit: 'Guards walls against damp patches and sun peeling.', app: 'Facade coating layers.', quality: 'Weather Shield', tier: 'All Packages' },
    { name: 'Jaquar Fittings', desc: 'Premium sanitary fittings and luxury basin taps.', benefit: 'Anti-leak ceramic valves with smooth flows.', app: 'Bathroom plumbing systems.', quality: 'Premium Finish', tier: 'Executive & Signature' }
  ];

  // Timeline stages
  const timelineStages = [
    { title: 'Planning', label: 'Soil testings and site checks', desc: 'Auditing soil loads and mapping plot bounds.' },
    { title: 'Design', label: 'BIM blueprints creation', desc: 'Generating 3D spatial models and HVAC layouts.' },
    { title: 'Approval', label: 'Municipality approvals filing', desc: 'Handling documents submittals to local planning boards.' },
    { title: 'Foundation', label: 'Excavation & concrete pouring', desc: 'Erecting solid base structures.' },
    { title: 'Structure', label: 'Pillars and slabs casting', desc: 'Building concrete block frames.' },
    { title: 'Roofing', label: 'Slab waterproofing audits', desc: 'Pouring waterproofing membranes.' },
    { title: 'MEP', label: 'Wires and pipes routing', desc: 'Routing copper cables and PVC drain runs.' },
    { title: 'Finishing', label: 'Plastering & tiling installations', desc: 'Laying floor layouts and painting facades.' },
    { title: 'Inspection', label: 'Independent QC tests logs', desc: 'Verifying steel strengths and concrete slump.' },
    { title: 'Handover', label: 'Keys handover coordinates', desc: 'Clearing final checks list and transferring keys.' }
  ];

  // Included / Excluded mocks
  const includedList = [
    'Complete structural design & plans drawings',
    'Excavation & soil geotech laboratory tests',
    'RCC structural block frames casting work',
    'Interior finishes tiles and painting coats',
    'Concealed plumbing and electrical wiring grids',
    '15-Year structural warranty certificate'
  ];

  const excludedList = [
    'Furniture & decorative loose appliances',
    'External municipal drainage pipeline connection fees',
    'Landscaping green layout structures',
    'Government permits filing fees clearances'
  ];

  // Recommendations logic
  const handleRecommendation = () => {
    if (quizBudget === 'basic') {
      setRecommendedPackage('Core Shell Build');
    } else if (quizBudget === 'executive') {
      setRecommendedPackage('Executive Smart Build');
    } else {
      setRecommendedPackage('Signature Elite Build');
    }
  };

  const downloads = [
    { title: 'Premium Villa spec Brochure', size: '4.8 MB', file: '#' },
    { title: 'Materials specifications guide', size: '2.5 MB', file: '#' },
    { title: 'Pre-construction inspection Checklist', size: '1.2 MB', file: '#' }
  ];

  const faqItems = faqData.slice(0, 6).map((f) => ({
    title: f.q,
    content: f.a
  }));

  const activeMaterial = materialsList[activeMaterialTab];
  const activeTimeline = timelineStages[activeTimelineStep];

  return (
    <div className="packages-page">
      <Helmet>
        <title>Construction Cost Packages & Specifications | BuildCraft</title>
        <meta name="description" content="Configure pricing packages: Basic Core Shell, Premium Executive Smart, and Luxury Signature Elite custom villa builds." />
      </Helmet>

      {/* 1. Packages Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Packages & Estimator</span>
          </div>

          <h1 className={styles.heroTitle}>Transparent Construction Pricing Packages</h1>
          <p className={styles.heroDesc}>
            Verify rebar steel specifications, concrete foundation load limits, interior finishes specs, and timelines up front. Zero hidden margin markups.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/contact" className="btn btn-primary">Book Consultation Call</Link>
            <a href="#wizard" className={`btn btn-secondary ${styles.btnSecOutline}`}>Launch Calculator</a>
          </div>

          {/* Trust Badges */}
          <div className={styles.trustRow}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={14} />
              <span>15-Year Frame Warranty</span>
            </div>
            <div className={styles.trustBadge}>
              <CheckCircle2 size={14} />
              <span>Lab Verified Materials Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. City Selector & Filter */}
      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
          <div>
            <span className="text-overline">Active Location Selector</span>
            <h2 className="display-sm" style={{ marginTop: '0.5rem' }}>Select Your City</h2>
          </div>
          <CitySelector selectedCityId={selectedCity} onChangeCity={handleCityChange} />
        </div>

        {/* 3. Package Cards Grid */}
        <div className="grid-3" style={{ marginTop: '2.5rem' }}>
          {cityPackages.map((plan, idx) => (
            <MotionWrapper
              key={idx}
              variant="slideUp"
              delay={idx * 0.1}
              className={`${styles.planCard} ${plan.popular ? styles.popularCard : ''}`}
            >
              {plan.popular && <span className={styles.popularBadge}>Most Popular</span>}
              <div className={styles.cardImageWrapper}>
                <img 
                  src={idx === 0 ? 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80' : idx === 1 ? 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=500&q=80' : 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80'} 
                  alt={plan.name} 
                  className={styles.cardImg} 
                />
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{plan.name}</h3>
                <span className={styles.cardTag}>{plan.tagline}</span>
                <div className={styles.priceRow}>
                  <strong className={styles.priceText}>{plan.price}</strong>
                  <span className={styles.unitText}>{plan.unit}</span>
                </div>
              </div>

              <div className={styles.cardSpecs}>
                <div className={styles.specItem}>
                  <Clock size={12} className={styles.specIcon} />
                  <span>Timeline: {plan.timeline}</span>
                </div>
                <div className={styles.specItem}>
                  <CheckCircle2 size={12} className={styles.specIcon} />
                  <span>Cement: {plan.cementBrand}</span>
                </div>
                <div className={styles.specItem}>
                  <CheckCircle2 size={12} className={styles.specIcon} />
                  <span>Steel: {plan.steelBrand}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <a href="#comparison" className="btn btn-primary">Compare Details</a>
                <Link to="/contact" className={`btn btn-secondary ${styles.btnCardSec}`}>Book Consult</Link>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* 4. Comparison Matrix Table */}
      <section className={`section ${styles.compareSection}`} id="comparison">
        <div className="container">
          <SectionHeader
            eyebrow="Tiers Comparison"
            heading="Dynamic Specifications Comparison"
            subheading="Review rebar steel grades, concrete foundation strengths, electrical conduits, and warranty terms side-by-side."
          />

          {cityPackages.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className={styles.desktopCompare} style={{ marginTop: '3.5rem' }}>
                <div className={styles.tableWrapper}>
                  <table className={styles.compareTable}>
                    <thead>
                      <tr>
                        <th>Build Feature</th>
                        {cityPackages.map((plan, i) => (
                          <th key={i}>{plan.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row, idx) => (
                        <tr key={idx}>
                          <td className={styles.featureCol}>{row.label}</td>
                          {cityPackages.map((plan, pIdx) => (
                            <td 
                              key={pIdx} 
                              className={plan.popular ? styles.highlightCol : ''}
                            >
                              {plan[row.key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Tabbed View */}
              <div className={styles.mobileCompare} style={{ marginTop: '2.5rem' }}>
                <div className={styles.mobileTabs}>
                  {cityPackages.map((plan, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMobileCompareTab(idx)}
                      className={`${styles.tabBtn} ${mobileCompareTab === idx ? styles.activeTabBtn : ''}`}
                    >
                      {plan.name}
                    </button>
                  ))}
                </div>

                <div className={`glass-panel ${styles.mobileCompareCard}`} style={{ padding: '1.5rem' }}>
                  {comparisonRows.map((row, idx) => (
                    <div key={idx} className={styles.mobileCompareRow}>
                      <span className={styles.mobileRowLabel}>{row.label}</span>
                      <span className={styles.mobileRowValue}>
                        {cityPackages[mobileCompareTab] ? cityPackages[mobileCompareTab][row.key] : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-muted)' }}>
              No construction packages available for the selected city.
            </div>
          )}
        </div>
      </section>

      {/* 5. Interactive Material Specifications Explorer */}
      <section className="section container">
        <SectionHeader
          eyebrow="Components specs"
          heading="Interactive Materials Explorer"
          subheading="Click any core raw material to review structural applications, quality certifications, and package availabilities."
        />

        <div className={styles.materialsWrapper} style={{ marginTop: '3.5rem' }}>
          {/* Left Navigation: Material Items list */}
          <div className={styles.materialsNav}>
            {materialsList.map((mat, idx) => (
              <div
                key={idx}
                className={`${styles.matNavItem} ${idx === activeMaterialTab ? styles.matNavActive : ''}`}
                onClick={() => setActiveMaterialTab(idx)}
              >
                <strong>{mat.name}</strong>
                <span>{mat.quality}</span>
              </div>
            ))}
          </div>

          {/* Right Details Container */}
          <div className={`glass-panel ${styles.matDetailCard}`}>
            <span className={styles.detailTag}>{activeMaterial.quality}</span>
            <h3 className={styles.detailTitle}>{activeMaterial.name}</h3>
            <p className={styles.detailDesc}>{activeMaterial.desc}</p>
            
            <div className={styles.specsGrid}>
              <div className={styles.specBox}>
                <strong>Core Benefit:</strong>
                <span>{activeMaterial.benefit}</span>
              </div>
              <div className={styles.specBox}>
                <strong>Where Applied:</strong>
                <span>{activeMaterial.app}</span>
              </div>
              <div className={styles.specBox}>
                <strong>Package Tier Availability:</strong>
                <span>{activeMaterial.tier}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Included vs Excluded Blocks Grid */}
      <section className={`section ${styles.incExcSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Checklist details"
            heading="Standard Inclusions & Exclusions"
            subheading="Review exactly what is covered in our general contracting scope compared to local municipal fees."
          />

          <div className="grid-2" style={{ marginTop: '3.5rem', gap: '2.5rem' }}>
            {/* Included */}
            <div className={`glass-panel ${styles.listCard}`}>
              <div className={styles.listHeader}>
                <CheckCircle2 size={20} style={{ color: '#22c55e' }} />
                <h3>Standard Inclusions</h3>
              </div>
              <ul className={styles.checklist}>
                {includedList.map((item, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={14} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Excluded */}
            <div className={`glass-panel ${styles.listCard}`}>
              <div className={styles.listHeader}>
                <XCircle size={20} style={{ color: '#ef4444' }} />
                <h3>Exclusions</h3>
              </div>
              <ul className={styles.checklist}>
                {excludedList.map((item, idx) => (
                  <li key={idx}>
                    <XCircle size={14} className={styles.crossIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Construction Timeline */}
      <section className="section container">
        <SectionHeader
          eyebrow="Workflow check"
          heading="Interactive Construction Timeline"
          subheading="Follow the chronological milestones checklist followed by our general contracting supervisors."
        />

        <div className={styles.timelineWrapper} style={{ marginTop: '4rem' }}>
          <div className={styles.timelineRow}>
            {timelineStages.map((stg, idx) => (
              <div
                key={idx}
                className={`${styles.timelineNode} ${idx === activeTimelineStep ? styles.nodeActive : ''}`}
                onClick={() => setActiveTimelineStep(idx)}
              >
                <div className={styles.nodeBubble}>
                  <HardHat size={16} />
                </div>
                <span className={styles.nodeTitle}>{stg.title}</span>
              </div>
            ))}
          </div>

          <div className={`glass-panel ${styles.timelineDetailCard}`}>
            <span className={styles.timelineNum}>Milestone Stage 0{activeTimelineStep + 1}</span>
            <h3 className={styles.timelineTitle}>{activeTimeline.title}</h3>
            <span className={styles.timelineLabel}>{activeTimeline.label}</span>
            <p className={styles.timelineText}>{activeTimeline.desc}</p>
          </div>
        </div>
      </section>

      {/* 8. Recommendation Quiz */}
      <section className={`section ${styles.quizSection}`}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <SectionHeader
            eyebrow="Guided recommender"
            heading="Which Package Fits Your Build?"
            subheading="Answer three simple parameters to obtain our structural design recommendation."
          />

          <div className={`glass-panel ${styles.quizCard}`} style={{ marginTop: '3rem' }}>
            <div className={styles.quizField}>
              <label>Select Estimated Budget Target</label>
              <div className="grid-3" style={{ gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => setQuizBudget('basic')} className={`${styles.quizOpt} ${quizBudget === 'basic' ? styles.quizOptSelected : ''}`}>Basic (Core)</button>
                <button onClick={() => setQuizBudget('executive')} className={`${styles.quizOpt} ${quizBudget === 'executive' ? styles.quizOptSelected : ''}`}>Premium (Executive)</button>
                <button onClick={() => setQuizBudget('signature')} className={`${styles.quizOpt} ${quizBudget === 'signature' ? styles.quizOptSelected : ''}`}>Luxury (Signature)</button>
              </div>
            </div>

            <div className={styles.quizField} style={{ marginTop: '1.5rem' }}>
              <label>Enter Plot Size (sq. ft.)</label>
              <input 
                type="number" 
                value={quizPlot} 
                onChange={(e) => setQuizPlot(Number(e.target.value))} 
                className={styles.quizInput}
              />
            </div>

            <button onClick={handleRecommendation} className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
              Generate Build Recommendation
            </button>

            {recommendedPackage && (
              <div className={styles.quizResult}>
                <span>Recommended Tier:</span>
                <h3>{recommendedPackage}</h3>
                <p>
                  Optimized for a {quizPlot} sqft plot. Includes certified cement and ductile rebar steel specifications.
                </p>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                  Discuss Recommended Specs
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 9. Download Center */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="File Database"
          heading="Documents & Specifications Downloads"
          subheading="Download complete spec guides sheets, inspection checklists files, and brand brochures."
        />

        <div className={styles.downloadsList} style={{ marginTop: '3rem' }}>
          {downloads.map((dl, idx) => (
            <div key={idx} className={`glass-panel ${styles.dlCard}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Download size={18} style={{ color: 'var(--accent)' }} />
                <div>
                  <h4 className={styles.dlTitle}>{dl.title}</h4>
                  <span className={styles.dlSize}>Format: PDF &bull; File Size: {dl.size}</span>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={() => alert(`Downloading: ${dl.title} (Simulation)`)}>
                Download Specs
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ accordion specific to packages */}
      <section className="section container" style={{ maxWidth: '800px' }}>
        <SectionHeader
          eyebrow="Pricing Helpdesk"
          heading="Pricing & Billing FAQs"
          subheading="Answers detailing material variations approvals, milestone billing releases, and municipal permits scopes."
        />
        <div style={{ marginTop: '3.5rem' }}>
          <Accordion items={faqItems} />
        </div>
      </section>

      {/* 11. Multi-Step Quote Wizard component */}
      <QuoteWizard />

      {/* 12. Final CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className={`container ${styles.ctaContainer}`}>
          <h2>Ready to Secure Your Civil Engineering Estimate?</h2>
          <p>
            Join site consultations with our spatial planning desk and contracting estimators to draft Bill of Quantities today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary">Book Consultation</Link>
            <a href="#comparison" className={`btn btn-secondary ${styles.btnSecOutline}`}>Review Comparison Table</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
