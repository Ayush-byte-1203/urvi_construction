import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, CheckCircle2, HelpCircle, ShieldCheck
} from 'lucide-react';
import { appConfig } from '@config/appConfig';
import { packagesData } from '@data/packagesData';
import SectionHeader from '@sections/SectionHeader';
import QuoteWizard from '@sections/QuoteWizard';
import MotionWrapper from '@components/MotionWrapper';
import Button from '@components/Button';
import HeroOverlay from '@components/HeroOverlay';

import { HeaderThemeContext } from '@/layouts/Layout';
import styles from './Packages.module.css';

const Packages = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const [activePackage, setActivePackage] = useState(1); // 0: Standard, 1: Premium, 2: Luxury
  const [openCategory, setOpenCategory] = useState('Design & Drawings'); // Synchronized comparison active row


  useEffect(() => {
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  // Packages metadata
  const packageTiers = [
    {
      id: 'standard',
      name: 'Standard Package',
      price: '1499',
      tagline: 'Strong concrete framing and standard shell layouts.',
      bestFor: 'Budget-conscious homeowners seeking structural safety.',
      projectType: 'Independent Villas & Row Houses',
      warranty: '5 Years Structural Warranty',
      timeline: '6 to 8 Months',
      grade: 'Standard Structural M20',
      plotSize: '1,000 - 2,500 sq.ft.',
      floors: 'Ground + 1 Floor max',
      description: 'Our Standard package offers a robust structural base with basic functional finishes. Excellent choice for those focusing on structural core strength at an economical rate.',
      advantages: ['Extremely Cost-effective', 'Fastest build time duration', 'Zero structural compromise'],
      idealCustomer: 'First-time homebuilders looking for essential layouts.',
      limitations: 'Basic floor tiling layouts; custom elevations not included.',
      upgrades: 'Option to upgrade individual paint coats and plumbing brands.',
      maintenance: 'Standard 1-year general maintenance support.',
      whyChoose: 'Highest structural safety-to-cost ratio in the market.',
      constructionQuality: 'Rigid soil compaction and reinforced steel grid frames.',
      recommendedBudget: '₹20L - ₹35L overall'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '1799',
      tagline: 'Premium finishes and smart home integrations.',
      bestFor: 'Urban families seeking modern interior styles and automation.',
      projectType: 'Modern Villas, Bungalows & Corporate Offices',
      warranty: '10 Years Structural Warranty',
      timeline: '9 to 11 Months',
      grade: 'Premium Seismic M25',
      plotSize: '1,200 - 4,000 sq.ft.',
      floors: 'Ground + 3 Floors max',
      description: 'Our most popular tier. Features premium raw materials (TATA steel, UltraTech cement), modular kitchen ducts, and false ceilings, delivering high visual style and superior longevity.',
      advantages: ['Certified branded materials', 'Smart home ready conduits', 'Generous 10-year warranty'],
      idealCustomer: 'Modern families aiming for high aesthetic value and premium utility.',
      limitations: 'Limited luxury marble selections; pool structures extra.',
      upgrades: 'Easily upgrade to smart control hubs and premium sanitary brands.',
      maintenance: 'Extended 2-year complete maintenance support.',
      whyChoose: 'Optimal balance of state-of-the-art materials and design value.',
      constructionQuality: 'Double coat external plastering works and high-grade rebar casting.',
      recommendedBudget: '₹40L - ₹75L overall'
    },
    {
      id: 'luxury',
      name: 'Luxury Package',
      price: '2111',
      tagline: 'Custom luxury villa designs and high-end finishes.',
      bestFor: 'Clients aiming for bespoke luxury landmarks, pools, and high-end marbles.',
      projectType: 'High-end Estates, Farms & Commercial complexes',
      warranty: '15 Years Structural Warranty',
      timeline: '12 to 15 Months',
      grade: 'Luxury Ultra M30',
      plotSize: '2,000 - 10,000 sq.ft.',
      floors: 'Ground + 4 Floors max',
      description: 'The ultimate luxury building package. Loaded with pre-polished Italian marble, Legrand smart automation arrays, soundproof UPVC frames, and custom landscaping.',
      advantages: ['Italian marble layouts', '100% custom architectural planning', 'Complete 15-year safety coverage'],
      idealCustomer: 'Handovers of luxury estates and elite corporate headquarters.',
      limitations: 'Higher initial budget requirements.',
      upgrades: 'Bespoke customization included standard.',
      maintenance: '3-Year complete premium maintenance package.',
      whyChoose: 'For those who want zero compromises and fully bespoke architectural landmarks.',
      constructionQuality: 'Heavy concrete foundations, customized soil testing, and triple waterproofing coats.',
      recommendedBudget: '₹80L+ overall'
    }
  ];

  const activeData = packageTiers[activePackage];

  // Material specifications data per package
  const materialSpecs = {
    standard: {
      'Design & Drawings': { brand: 'Paramarsh Design Cell', grade: '2D Planning', spec: 'Standard 2D floor plans & basic elevation layouts', why: 'Establishes clear spatial configuration before execution', upgrade: 'Structural drawing clearance', warranty: 'N/A' },
      'Civil Construction': { brand: 'Local Certified Materials', grade: 'M20 Concrete', spec: 'Standard M20 structural concrete & structural framing', why: 'Guarantees reliable load safety limits', upgrade: 'M25 Concrete', warranty: '5 Years' },
      'Architectural Design': { brand: 'Standard Architectural', grade: 'Basic 2D', spec: 'Standard spacing drafts & compliance guidelines', why: 'Ensures functional room alignment', upgrade: 'Premium 3D visualizations', warranty: 'N/A' },
      'Interior Design': { brand: 'Essential Carpentry', grade: 'Basic standard', spec: 'Basic wardrobe layout drafts and room sizing', why: 'Utilizes storage capacity efficiently', upgrade: 'Gypsum false ceiling package', warranty: '1 Year' },
      'Structural Designing': { brand: 'Standard RCC Design', grade: 'Basic structural', spec: 'Slab reinforcement details & foundation sizing', why: 'Prevents structure settling stresses', upgrade: 'Seismic frame analysis', warranty: '5 Years' },
      'MEP Designing': { brand: 'Standard Conduit Grid', grade: 'FR Grade', spec: 'Basic electrical conduits & plumbing plumbing layouts', why: 'Prevents utility line conflicts', upgrade: 'HVAC layout planning', warranty: '1 Year' },
      'Government Liaison Assistance': { brand: 'Standard Clearance', grade: 'File filing', spec: 'Standard permits filing assistance coordination', why: 'Speeds up initial site approvals', upgrade: 'End-to-end liaison NOCs', warranty: 'N/A' },
      'Flooring & Wall Tiling': { brand: 'Vitrified Tiles', grade: '2x2 ft onwards', spec: 'Single charge vitrified tiles in all areas', why: 'Highly durable and cost-effective surface', upgrade: '4x2 ft Vitrified option', warranty: '1 Year' },
      'Painting': { brand: 'Asian Paints', grade: 'Tractor Emulsion', spec: 'Putty coats followed by Tractor interior emulsion', why: 'Provides clean wall appearance', upgrade: 'Royale luxury coat', warranty: '2 Years' },
      'Electrical': { brand: 'Anchor / Finolex', grade: 'Roma Switches', spec: 'Anchor Roma modular switches & standard safety wiring', why: 'Protects against electrical overload issues', upgrade: 'Havells FRLSH wiring', warranty: '2 Years' },
      'Plumbing': { brand: 'Astral CPVC / PVC', grade: 'SDR 11 CPVC', spec: 'Concealed water pipeline layouts & PVC drain conduits', why: 'Corrosion resistant water distribution lines', upgrade: 'Premium Astral grid valves', warranty: '5 Years' },
      'Fixtures': { brand: 'Cera / Parryware', grade: 'Standard fittings', spec: 'Floor mounted WC & standard chrome plumbing mixers', why: 'Reliable functional sanitation utility', upgrade: 'Jaquar fittings package', warranty: '1 Year' },
      'Doors': { brand: 'Flush Doors', grade: 'Hardwood frame', spec: 'Molded skin flush doors with commercial wood frames', why: 'Functional and budget-friendly entryway', upgrade: 'Teak veneer frames', warranty: '1 Year' },
      'Windows': { brand: 'Aluminium Sliding', grade: 'Standard 2-Track', spec: 'Powder coated frames with 4mm glass panes', why: 'Adequate lighting and ventilation parameters', upgrade: 'UPVC sliding frame', warranty: '1 Year' },
      'Fabrication': { brand: 'MS Grills & Rails', grade: 'Mild Steel', spec: 'MS staircase railings & window safety grills', why: 'Provides core safety barrier highlights', upgrade: 'Stainless steel rails', warranty: '2 Years' },
      'Compound Wall': { brand: 'Brick Boundary', grade: '4-inch thickness', spec: '4ft height boundary walls with cement plastering', why: 'Establishes clear perimeter boundaries', upgrade: 'AAC block wall 5ft', warranty: '2 Years' },
      'Elevation': { brand: 'Basic Elevation', grade: 'Paint Finish', spec: 'Standard modern facade styling with external paint highlights', why: 'Clean visual facade outline', upgrade: 'Wooden cladding tiles', warranty: '2 Years' }
    },
    premium: {
      'Design & Drawings': { brand: 'Paramarsh Design Cell', grade: '3D Elevation', spec: 'Complete 3D visual models, electrical schematics & site plans', why: 'Avoids execution redesign costs', upgrade: 'Custom VR visualizations', warranty: 'N/A' },
      'Civil Construction': { brand: 'Branded Certified', grade: 'M25 Concrete', spec: 'M25 grade structural frame casting & AAC block brickwork', why: 'Provides seismic structural safety', upgrade: 'M30 heavy concrete', warranty: '10 Years' },
      'Architectural Design': { brand: 'Premium Architectural', grade: 'Custom Plan', spec: 'Custom layout planning, zoning maps & exterior facade layouts', why: 'Maximizes ventilation and natural light flow', upgrade: 'Bespoke high-end designs', warranty: 'N/A' },
      'Interior Design': { brand: 'Modern Interiors', grade: 'Gypsum Ceilings', spec: 'Gypsum false ceiling in living areas & modular kitchen setup', why: 'Delivers high aesthetic value and modern storage', upgrade: 'Bespoke Italian modular wardrobes', warranty: '2 Years' },
      'Structural Designing': { brand: 'Advanced RCC Design', grade: 'Seismic resistant', spec: 'Detailed soil compaction testing & heavy steel rebar details', why: 'High ductility prevents framing stresses', upgrade: 'Extended structural warranty', warranty: '10 Years' },
      'MEP Designing': { brand: 'Concealed MEP Grid', grade: 'Low Smoke', spec: 'Concealed electrical lines & CPVC pressure conduits', why: 'Prevents leakage risk and load overloads', upgrade: 'Smart home hub cabling', warranty: '5 Years' },
      'Government Liaison Assistance': { brand: 'NOC & Approval', grade: 'Clearance ready', spec: 'Zoning approvals, regulatory NOC filings and permissions', why: 'Guarantees legal compliance with state agencies', upgrade: 'Completion certificate collection', warranty: 'N/A' },
      'Flooring & Wall Tiling': { brand: 'Vitrified Premium', grade: '4x2 ft Double Charged', spec: 'Double charged glossy vitrified tiles & granite stairs', why: 'Seamless premium flooring visuals', upgrade: 'Italian Marble slabs', warranty: '2 Years' },
      'Painting': { brand: 'Asian Paints', grade: 'Apex Ultima', spec: 'Double coat putty & weather-proof facade paint', why: 'Protects exterior walls from rain weathering', upgrade: 'Royale luxury silk', warranty: '5 Years' },
      'Electrical': { brand: 'Havells / Finolex', grade: 'FRLSH wires', spec: 'Havells modular switches & fire-resistant cabling', why: 'Maximum safety against fire/short-circuits', upgrade: 'Legrand automated switches', warranty: '5 Years' },
      'Plumbing': { brand: 'Supreme / Astral', grade: 'SDR 11 Premium', spec: 'Concealed CPVC pipes with pressure gate valves', why: 'Consistent water pressure and zero leakages', upgrade: 'Kohler grid pipelines', warranty: '10 Years' },
      'Fixtures': { brand: 'Jaquar Fittings', grade: 'Premium Chrome', spec: 'Wall hung WC models & chromium plated mixers', why: 'Elegant looks, easier bathroom floor cleaning', upgrade: 'Kohler fixture package', warranty: '5 Years' },
      'Doors': { brand: 'Teak Veneer Doors', grade: 'Salwood Frames', spec: 'Veneered doors with hardwood salwood frames', why: 'Warp-resistant doors with elegant premium texture', upgrade: 'Solid teakwood carved main door', warranty: '5 Years' },
      'Windows': { brand: 'UPVC Windows', grade: '3-Track Premium', spec: 'UPVC window profiles with sliding safety mesh', why: 'Highly effective dust and sound insulation', upgrade: 'Double glazed frames', warranty: '5 Years' },
      'Fabrication': { brand: 'Designer MS Gate', grade: 'Heavy Steel', spec: 'Designer MS main gates & stainless steel balcony handrails', why: 'Prestige elevation and balcony security', upgrade: 'Toughened glass rails', warranty: '5 Years' },
      'Compound Wall': { brand: 'AAC Block Boundary', grade: '6-inch thickness', spec: '5ft height boundary wall with structural pillars', why: 'Reinforced secure boundary boundary line', upgrade: 'Stone clad border wall', warranty: '5 Years' },
      'Elevation': { brand: 'Modern Elevation', grade: 'Texture & Clad', spec: 'Facade stone/wood cladding accents with profile lighting', why: 'Stunning premium curb appeal', upgrade: 'Luxury marble cladding', warranty: '5 Years' }
    },
    luxury: {
      'Design & Drawings': { brand: 'Bespoke Design Cell', grade: 'Full custom VR', spec: 'Unlimited architectural plans, 3D renderings & interior maps', why: 'Full visual control before laying foundation', upgrade: 'Custom architectural consultant', warranty: 'N/A' },
      'Civil Construction': { brand: 'Ultra-Luxury Grade', grade: 'M30 heavy duty', spec: 'M30 heavy reinforcement concrete structure & Porotherm blocks', why: 'Ultimate durability and thermal insulation', upgrade: 'Custom pile layouts', warranty: '15 Years' },
      'Architectural Design': { brand: 'Elite Architectural', grade: 'Bespoke Luxury', spec: 'Bespoke architectural styling, glass details & grand elevations', why: 'Unique landmark aesthetic and design value', upgrade: 'Bespoke design consulting', warranty: 'N/A' },
      'Interior Design': { brand: 'Bespoke Interiors', grade: 'Royale luxury', spec: 'Custom Gypsum patterns in all areas & fully loaded modular kitchen', why: 'Spacious high-end storage with soft close systems', upgrade: 'Bespoke Italian kitchen', warranty: '5 Years' },
      'Structural Designing': { brand: 'Heavy RCC Design', grade: 'Pile foundation', spec: 'Seismic M30 column design & pile configurations', why: 'Ultimate stability even on weak soil structures', upgrade: 'Extended structural warranty', warranty: '15 Years' },
      'MEP Designing': { brand: 'Smart MEP Grid', grade: 'Home Automation', spec: 'Legrand automated panel cabinets & home theater low-voltage prep', why: 'State-of-the-art home control capabilities', upgrade: 'Complete home integration', warranty: '10 Years' },
      'Government Liaison Assistance': { brand: 'Complete Clearance', grade: 'NOC & Certificate', spec: 'Zoning approvals, safety NOC clearances & completion certificates', why: 'Hassle-free legal handovers', upgrade: 'Custom liaison support', warranty: 'N/A' },
      'Flooring & Wall Tiling': { brand: 'Italian Marble / Wooden', grade: 'Class A pre-polished', spec: 'Botticino or Dyna Italian marble flooring layouts', why: 'Exquisite elite aesthetic, easy polishing upkeep', upgrade: 'Custom marble inlays', warranty: '5 Years' },
      'Painting': { brand: 'Asian Paints Royale', grade: 'Royale Silk', spec: 'Asian Paints Royale Silk internal & weather-proof facade', why: 'Washable luxury wall surfaces with smooth sheen', upgrade: 'Special texturing overlays', warranty: '10 Years' },
      'Electrical': { brand: 'Legrand Smart Switch', grade: 'Home Automation', spec: 'Legrand smart modular switches and voice activation', why: 'Touch-free automated lighting controls', upgrade: 'Custom automation hardware', warranty: '10 Years' },
      'Plumbing': { brand: 'Astral CPVC / Kohler', grade: 'High Pressure', spec: 'Concealed CPVC pipes with integrated pressure lines', why: 'Consistent rain shower pressures, silent lines', upgrade: 'Brass pipe conduits', warranty: '15 Years' },
      'Fixtures': { brand: 'Kohler / Grohe', grade: 'Elite Fixtures', spec: 'Thermostatic shower controllers & premium rain shower mixers', why: 'Delivers a luxurious spa-like experience at home', upgrade: 'Brass gold custom taps', warranty: '10 Years' },
      'Doors': { brand: 'Solid Teak Wood', grade: 'Custom Carved', spec: 'Solid seasoned carved teakwood doors with digital locks', why: 'Top-tier home protection, beauty, and status', upgrade: 'Biometric smart locks', warranty: '10 Years' },
      'Windows': { brand: 'Double Glazed UPVC', grade: 'Acoustic / Thermal', spec: 'Double glazed UPVC window frames with soundproof glass', why: 'Ultimate noise dampening and climate insulation', upgrade: 'Motorized roller shutters', warranty: '10 Years' },
      'Fabrication': { brand: 'Bespoke Wrought Iron', grade: 'Prestige Grade', spec: 'Heavy wrought iron main gates & toughened glass balcony rails', why: 'Unparalleled safety coupled with grand facade elevation', upgrade: 'Custom brass highlights', warranty: '10 Years' },
      'Compound Wall': { brand: 'Designer Stone Clad', grade: 'Reinforced AAC', spec: '6ft height brick/AAC boundary wall with stone tile cladding', why: 'Ultimate security and matches main elevation style', upgrade: 'Automated electric fence', warranty: '10 Years' },
      'Elevation': { brand: 'Bespoke Facade', grade: 'Marble & Lighting', spec: 'Luxury marble facade highlights, lighting & glass panels', why: 'Stunning premium facade that commands presence', upgrade: 'Bespoke facade configurations', warranty: '10 Years' }
    }
  };
  // Dynamic FAQs based on package selection
  const packageFAQs = {
    standard: [
      { q: 'Is the standard package structurally safe?', a: 'Yes. We utilize standard Fe 500 steel grids and UltraTech/ACC cement. The core structural safety matches the same code requirements as the Premium and Luxury packages, only the finish selections are simplified.' },
      { q: 'Can I choose to upgrade flooring materials later?', a: 'Yes. You can choose to upgrade to premium flooring or bathroom fixtures during the excavation stage by paying the rate differential.' },
      { q: 'What is the estimated warranty on structural items?', a: 'The Standard package includes a solid 5-year structural safety warranty covering concrete framing and foundation structures.' }
    ],
    premium: [
      { q: 'What smart home features are standard here?', a: 'We install modular conduits ready for smart control hubs, digital switches, and home automation systems. Standard lighting controls can be linked to mobile devices.' },
      { q: 'Why is the warranty 10 years instead of 5?', a: 'By utilizing seismic-resistant M25 concrete mixes, AAC block layouts, and TATA Tiscon Fe 500D steel, the building frame achieves significantly higher ductility, allowing us to back it with a 10-year warranty.' },
      { q: 'Are false ceilings included in all rooms?', a: 'The Premium package includes designer gypsum false ceilings for living rooms and master bedrooms, with other rooms receiving putty coats.' }
    ],
    luxury: [
      { q: 'Can we customize the architectural designs from scratch?', a: 'Absolutely. The Luxury package includes full custom architectural design revisions, spatial blueprints, 3D renders, and zoning NOC clearance assistance without any layout limits.' },
      { q: 'What kind of marbles are available for flooring?', a: 'We offer Dyna, Botticino, and premium imported Italian marble selections. Each slab is selected, polished, and laid under high-precision oversight.' },
      { q: 'Is solar installation covered under this tier?', a: 'Yes, we coordinate clean energy solar grid connections, along with multi-jet thermostatic rain showers and Legrand smart systems.' }
    ]
  };



  return (
    <div className="packages-page">
      <Helmet>
        <title>Interactive Pricing Packages | {appConfig.company.name}</title>
        <meta name="description" content="Explore and compare Standard, Premium, and Luxury packages from Paramarsh Construction. View categorized specifications, cost infographics, and dynamic comparisons." />
        <link rel="canonical" href={`${appConfig.seo.siteUrl}/packages`} />
      </Helmet>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <HeroOverlay type="dark" />
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={10} />
            <span>Interactive Packages</span>
          </div>
          <h1 className={styles.heroTitle}>Premium Construction Packages</h1>
          <p className={styles.heroDesc}>
            Choose a package tier to explore categorized material specifications, cost transparency charts, advantages, and dynamic estimator comparisons.
          </p>
        </div>
      </section>

      {/* 1. Interactive Package Selector */}
      <section className="section container">
        <SectionHeader
          eyebrow="Explore Tiers"
          heading="Select Your Specifications Package"
          subheading="Click on a package to update details, material standards, advantages, and calculation metrics across the entire page."
        />

        <div className={styles.selectorGrid} style={{ marginTop: '2.5rem' }}>
          {packageTiers.map((tier, idx) => {
            const isActive = idx === activePackage;
            return (
              <div
                key={tier.id}
                onClick={() => setActivePackage(idx)}
                className={`${styles.selectorCard} ${isActive ? styles.selectorCardActive : ''}`}
              >
                <div className={styles.selectorCardHeader}>
                  <h4>{tier.name}</h4>
                  <div className={styles.selectorCardPrice}>
                    <strong>₹{tier.price}</strong>
                    <span>/ sq.ft. onwards</span>
                  </div>
                </div>
                <p className={styles.selectorCardTagline}>{tier.tagline}</p>
                {isActive && <div className={styles.activeIndicator} />}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Dynamic Package Details Panel */}
      <section className={`section ${styles.detailsSection}`}>
        <div className="container">
          <div className={styles.detailsPanel}>
            <div className={styles.detailsPanelLeft}>
              <span className={styles.panelBadge}>Active Details Panel</span>
              <h2>{activeData.name} Overview</h2>
              <p className={styles.panelDesc}>{activeData.description}</p>

              <div className={styles.panelTagGroup}>
                <div className={styles.panelTag}>
                  <strong>Best For:</strong>
                  <span>{activeData.bestFor}</span>
                </div>
                <div className={styles.panelTag}>
                  <strong>Warranty:</strong>
                  <span>{activeData.warranty}</span>
                </div>
                <div className={styles.panelTag}>
                  <strong>Timeline:</strong>
                  <span>{activeData.timeline}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailsPanelRight}>
              <div className={styles.metricGrid}>
                <div className={styles.metricItem}>
                  <span>Construction Grade</span>
                  <strong>{activeData.grade}</strong>
                </div>
                <div className={styles.metricItem}>
                  <span>Suitable Plot Sizes</span>
                  <strong>{activeData.plotSize}</strong>
                </div>
                <div className={styles.metricItem}>
                  <span>Recommended Floors</span>
                  <strong>{activeData.floors}</strong>
                </div>
                <div className={styles.metricItem}>
                  <span>Project Types</span>
                  <strong>{activeData.projectType}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* 5. Interactive Comparison Table */}
      <section className={`section ${styles.compareSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Tiers Comparison"
            heading="Synchronized Specifications Comparison"
            subheading="Expand any category below to compare material standards side-by-side across all packages."
          />

          <div className={styles.comparisonGrid} style={{ marginTop: '3rem' }}>
            {packageTiers.map((tier) => {
              const tierId = tier.id; // 'standard', 'premium', 'luxury'
              return (
                <div key={tier.id} className={styles.packageCompareCard}>
                  {/* Card Header Info */}
                  <div className={styles.cardHeaderInfo}>
                    <h3>{tier.name}</h3>
                    <div className={styles.comparePrice}>
                      <strong>₹{tier.price}</strong>
                      <span>/ sq.ft.</span>
                    </div>
                    <p className={styles.cardTagline}>{tier.tagline}</p>
                  </div>

                  {/* Accordion Categories inside the card */}
                  <div className={styles.cardAccordionsList}>
                    {Object.keys(materialSpecs[tierId]).map((category) => {
                      const isOpen = openCategory === category;
                      const item = materialSpecs[tierId][category];
                      return (
                        <div key={category} className={styles.cardAccordionItem}>
                          <button
                            type="button"
                            className={`${styles.cardAccordionHeader} ${isOpen ? styles.cardAccordionHeaderActive : ''}`}
                            onClick={() => setOpenCategory(isOpen ? null : category)}
                          >
                            <span>{category}</span>
                            <ChevronRight
                              size={14}
                              className={styles.chevronIcon}
                              style={{
                                transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                              }}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className={styles.cardAccordionBody}
                              >
                                <div className={styles.cardAccordionContent}>
                                  <strong>{item.brand}</strong>
                                  <span className={styles.colGrade}>{item.grade}</span>
                                  <p>{item.spec}</p>
                                  {item.why && <span className={styles.colWhy}>Why: {item.why}</span>}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 & 9. Advantages & "Why Choose This Package" */}
      <section className="section container">
        <SectionHeader
          eyebrow="Core Strengths"
          heading={`Why Choose the ${activeData.name}`}
          subheading="Advantages, ideal client profiles, recommended plot sizes, and limitations to ensure complete transparency."
        />

        <div className="grid-3" style={{ marginTop: '3rem' }}>
          <div className={styles.advantageCard}>
            <h4>Key Advantages</h4>
            <ul>
              {activeData.advantages.map((adv, idx) => (
                <li key={idx}><CheckCircle2 size={16} /> <span>{adv}</span></li>
              ))}
            </ul>
          </div>

          <div className={styles.advantageCard}>
            <h4>Ideal Customer & Value</h4>
            <div className={styles.advantageMetric}>
              <strong>Recommended Budget:</strong>
              <span>{activeData.recommendedBudget}</span>
            </div>
            <div className={styles.advantageMetric}>
              <strong>Plot Sizes:</strong>
              <span>{activeData.plotSize}</span>
            </div>
            <p className={styles.advantageText}>{activeData.idealCustomer}</p>
          </div>

          <div className={styles.advantageCard}>
            <h4>Limitations & Upgrades</h4>
            <p><strong>Limitations:</strong> {activeData.limitations}</p>
            <p style={{ marginTop: '1rem' }}><strong>Upgrades Available:</strong> {activeData.upgrades}</p>
            <p style={{ marginTop: '1rem' }}><strong>Maintenance Notes:</strong> {activeData.maintenance}</p>
          </div>
        </div>

        
        <div className={styles.ctaRow} style={{ marginTop: '3rem' }}>
          <Link to="/contact" className="btn btn-primary">Book Consultation</Link>
          <a href="tel:+919428694361" className="btn btn-secondary">Talk to Expert</a>
        </div>
      </section>

      {/* 11. Dynamic FAQs */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <SectionHeader
            eyebrow="Common Inquiries"
            heading={`${activeData.name} FAQs`}
            subheading="Frequently asked questions configured dynamically for your active package selection."
          />

          <div className={styles.faqList} style={{ marginTop: '3rem' }}>
            {packageFAQs[activeTiersId(activePackage)].map((faq, idx) => (
              <div key={idx} className={styles.faqItem}>
                <HelpCircle size={18} className={styles.faqIcon} />
                <div className={styles.faqText}>
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      
      
    </div>
  );
};

// Helper to resolve string ids for package tiers
function activeTiersId(index) {
  if (index === 0) return 'standard';
  if (index === 1) return 'premium';
  return 'luxury';
}

export default Packages;
