import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, CalendarDays, Compass, ClipboardCheck, Hammer, ShieldCheck, Sofa, KeyRound, BadgeCheck, CheckCircle2, ChevronRight, Info
} from 'lucide-react';
import SectionHeader from '../SectionHeader';
import styles from './styles.module.css';

const InteractiveBuildJourney = () => {
  const [expandedIdx, setExpandedIdx] = useState(2); // Default open Design stage
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stages = [
    {
      title: 'Idea',
      icon: <Sparkles size={22} />,
      label: 'Vision & Goals',
      phaseNum: 'PHASE 01',
      desc: 'Collaborating to understand spatial requirements, budget limitations, and architectural dreams.',
      duration: '3 Days',
      deliverables: ['Budget Planning', 'Site Analysis', 'Requirement Gathering'],
      status: 'Completed',
      goals: 'Define the architectural vision, boundary guidelines, and coordinate budget bounds.',
      team: 'Lead Architect, Client Coordinator',
      checks: 'Site viability approval',
      notes: 'Initial kick-off meeting files and client expectations mapped.',
      illustration: '📐'
    },
    {
      title: 'Planning',
      icon: <CalendarDays size={22} />,
      label: 'Geotech & Site Checks',
      phaseNum: 'PHASE 02',
      desc: 'Mapping soil load capacities, plot coordinates parameters, and structuring timeline models.',
      duration: '5 Days',
      deliverables: ['Soil Load Testing', 'Topographical Surveys', 'Timeline Scheduling'],
      status: 'Completed',
      goals: 'Verify geotech constraints and draft milestone construction timelines.',
      team: 'Geotechnical Engineer, Project Planner',
      checks: 'Soil bearing capacity certificate',
      notes: 'Excavation depth benchmarks set based on geotech findings.',
      illustration: '📊'
    },
    {
      title: 'Design',
      icon: <Compass size={22} />,
      label: 'BIM 3D Renderings',
      phaseNum: 'PHASE 03',
      desc: 'Drafting Revit BIM blueprints, HVAC mapping, and exporting structural calculation reports.',
      duration: '14 Days',
      deliverables: ['3D Elevation Renderings', 'BIM Revit Coordination', 'Structural Load Calculations'],
      status: 'Current',
      goals: 'Create comprehensive millimetric blueprints and high-precision spatial layouts.',
      team: 'BIM Architect, Structural Designer',
      checks: 'Structural audit log',
      notes: 'Autodesk Revit coordinate maps synchronized with client design revisions.',
      illustration: '💻'
    },
    {
      title: 'Approval',
      icon: <ClipboardCheck size={22} />,
      label: 'Zoning & Permits',
      phaseNum: 'PHASE 04',
      desc: 'Submitting structural maps to municipal offices and securing regulatory building clearances.',
      duration: '21 Days',
      deliverables: ['Municipality Sanction Files', 'Zoning Clearance NOC', 'Environmental Certifications'],
      status: 'Upcoming',
      goals: 'Secure formal building permission permits from local state planning departments.',
      team: 'Compliance Consultant, Liaison Officer',
      checks: 'Municipality plan approvals',
      notes: 'Assistance filing government clearances and zoning maps.',
      illustration: '📁'
    },
    {
      title: 'Construction',
      icon: <Hammer size={22} />,
      label: 'Civil Foundation Curing',
      phaseNum: 'PHASE 05',
      desc: 'Excavation, pouring rebar concrete foundations, and erecting block work structural frames.',
      duration: '120 Days',
      deliverables: ['Soil Excavation', 'Footing RCC Casting', 'Superstructure Masonry'],
      status: 'Upcoming',
      goals: 'Execute heavy civil structures matching certified raw material standards.',
      team: 'Site Supervisor, Structural Engineer',
      checks: 'Cube concrete test certificates',
      notes: 'Tata steel and UltraTech Grade 53 cement sourced directly from supplier yards.',
      illustration: '🏗'
    },
    {
      title: 'Quality Check',
      icon: <ShieldCheck size={22} />,
      label: 'Lab Material Audits',
      phaseNum: 'PHASE 06',
      desc: 'Laboratory testing of concrete cubes compression limits and EAF steel reinforcements checks.',
      duration: 'Ongoing',
      deliverables: ['Concrete Cube Testing', 'Steel Tensile Inspections', 'Waterproofing Verification'],
      status: 'Upcoming',
      goals: 'Conduct independent laboratory audits under third-party PMC observation.',
      team: 'PMC Auditor, QC Lab Tech',
      checks: 'Tensile load validation certificate',
      notes: 'Cube compression tests verified in certified NABL labs.',
      illustration: '🔬'
    },
    {
      title: 'Interior',
      icon: <Sofa size={22} />,
      label: 'Fittings & Aesthetics',
      phaseNum: 'PHASE 07',
      desc: 'Laying vitrified floor tiles, routing low-voltage wires, and installing premium sanitary fixtures.',
      deliverables: ['Vitrified Flooring Slabs', 'False Ceiling Installation', 'Sanitary Fittings Setup'],
      status: 'Upcoming',
      goals: 'Finish interior spaces to match luxury finishes and fit-out selections.',
      team: 'Interior Architect, Finishes Lead',
      checks: 'Bathroom leak validation',
      notes: 'Jaquar/Kohler sanitary and Asian Paints interior Royale finishing applied.',
      illustration: '🛋'
    },
    {
      title: 'Handover',
      icon: <KeyRound size={22} />,
      label: 'Milestones Sign-Off',
      phaseNum: 'PHASE 08',
      desc: 'Final site snagging inspections list clearing and official keys transfer to the client.',
      duration: '7 Days',
      deliverables: ['Comprehensive Snagging List', 'Safety Certifications', 'Final Keys Handovers'],
      status: 'Upcoming',
      goals: 'Deliver a fully completed, defect-free structure with keys transfer.',
      team: 'Project Director, Site Lead',
      checks: 'Completion compliance log',
      notes: 'All items on client snagging list audited and closed.',
      illustration: '🔑'
    },
    {
      title: 'Warranty',
      icon: <BadgeCheck size={22} />,
      label: '15-Year Coverage',
      phaseNum: 'PHASE 09',
      desc: 'Providing structural warranty coverage certificate and ongoing maintenance checkups.',
      duration: '15 Years',
      deliverables: ['15-Year Structural Warranty', 'Dampness Warranty Card', 'Annual Inspections Calendar'],
      status: 'Upcoming',
      goals: 'Provide long-term support and annual checkups to ensure structure resilience.',
      team: 'Customer Support Lead',
      checks: 'Warranty registry file',
      notes: 'Foundation structural concrete and waterproofing backed by written warranty.',
      illustration: '📜'
    }
  ];

  const floatingStats = {
    1: '🏗 320+ Projects Completed',
    3: '👷 120+ In-house Engineers',
    5: '📅 15+ Years Service',
    7: '⭐ 4.9 Average Rating'
  };

  const handleCardClick = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
  };

  return (
    <section className={`section ${styles.journeySection}`} id="journey">
      {/* Decorative Blueprint Background Details */}
      <div className={styles.blueprintGrid} />
      <div className={styles.lightBlob} />
      <div className={styles.lightBlob2} />

      <div className="container">
        <SectionHeader
          eyebrow="Milestones Tracker"
          heading="Interactive Build Journey"
          subheading="Track and visualize the precise structural execution parameters from day one site audits to final keys handover."
        />

        <div className={styles.timelineContainer} style={{ marginTop: '5rem' }}>
          {/* Animated Center Spine */}
          <div className={styles.centerSpine}>
            <div className={styles.glowingCore} />
          </div>

          <div className={styles.stagesList}>
            {stages.map((stage, idx) => {
              const isEven = idx % 2 === 0;
              const isExpanded = expandedIdx === idx;
              
              return (
                <React.Fragment key={idx}>
                  <div className={`${styles.stageRow} ${isEven ? styles.rowLeft : styles.rowRight}`}>
                    {/* Spine Node Marker */}
                    <div className={styles.spineNodeMarker}>
                      <div className={`${styles.markerDot} ${
                        stage.status === 'Completed' ? styles.markerCompleted :
                        stage.status === 'Current' ? styles.markerCurrent : styles.markerUpcoming
                      }`}>
                        {stage.status === 'Completed' ? <CheckCircle2 size={12} /> : null}
                      </div>
                    </div>

                    {/* Timeline card wrapper */}
                    <motion.div
                      className={`${styles.journeyCard} ${isExpanded ? styles.cardExpanded : ''}`}
                      onClick={() => handleCardClick(idx)}
                      layout="position"
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.iconCircleWrapper}>
                          {stage.icon}
                        </div>
                        <div className={styles.headerInfo}>
                          <span className={styles.phaseLabel}>{stage.phaseNum}</span>
                          <h3 className={styles.phaseTitle}>{stage.title}</h3>
                          <span className={styles.labelSubtext}>{stage.label}</span>
                        </div>
                      </div>

                      <p className={styles.cardBrief}>{stage.desc}</p>

                      <div className={styles.cardQuickMeta}>
                        <div className={styles.metaBadge}>
                          <span>Duration:</span>
                          <strong>{stage.duration}</strong>
                        </div>
                        <div className={styles.metaBadge}>
                          <span>Status:</span>
                          <strong className={
                            stage.status === 'Completed' ? styles.textCompleted :
                            stage.status === 'Current' ? styles.textCurrent : styles.textUpcoming
                          }>{stage.status}</strong>
                        </div>
                      </div>

                      {/* Expandable Extended content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={styles.expandedContent}
                          >
                            <div className={styles.divider} />
                            
                            <div className={styles.extendedGrid}>
                              <div className={styles.extraField}>
                                <strong>Project Goals:</strong>
                                <p>{stage.goals}</p>
                              </div>
                              <div className={styles.extraField}>
                                <strong>Assigned Team:</strong>
                                <p>{stage.team}</p>
                              </div>
                              <div className={styles.extraField}>
                                <strong>Quality Gates:</strong>
                                <p>{stage.checks}</p>
                              </div>
                              <div className={styles.extraField}>
                                <strong>Deliverables:</strong>
                                <div className={styles.deliverablesList}>
                                  {stage.deliverables.map((item, dIdx) => (
                                    <span key={dIdx} className={styles.dChip}>✓ {item}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Fading Illustration / Icon visual */}
                            <div className={styles.illustrationOverlay}>
                              {stage.illustration}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Floating Statistics between stages */}
                  {floatingStats[idx] && (
                    <div className={styles.floatingStatsContainer}>
                      <span className={styles.statsTag}>{floatingStats[idx]}</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveBuildJourney;
