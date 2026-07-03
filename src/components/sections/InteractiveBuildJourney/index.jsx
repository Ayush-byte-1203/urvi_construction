import React, { useState } from 'react';
import { 
  Lightbulb, Calendar, Compass, FileCheck, Hammer, ShieldCheck, Sparkles, Key, Award, Info 
} from 'lucide-react';
import SectionHeader from '../SectionHeader';
import MotionWrapper from '../../common/MotionWrapper';
import styles from './styles.module.css';

const InteractiveBuildJourney = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      title: 'Idea',
      icon: <Lightbulb size={18} />,
      label: 'Vision & Goals',
      desc: 'Collaborating to understand spatial requirements, budget limitations, and architectural dreams.'
    },
    {
      title: 'Planning',
      icon: <Calendar size={18} />,
      label: 'Geotech & Site Checks',
      desc: 'Mapping soil load capacities, plot coordinates parameters, and structuring timeline models.'
    },
    {
      title: 'Design',
      icon: <Compass size={18} />,
      label: 'BIM 3D Renderings',
      desc: 'Drafting Revit BIM blueprints, HVAC mapping, and exporting structural calculation reports.'
    },
    {
      title: 'Approval',
      icon: <FileCheck size={18} />,
      label: 'Zoning & Permits',
      desc: 'Submitting structural maps to municipal offices and securing regulatory building clearances.'
    },
    {
      title: 'Construction',
      icon: <Hammer size={18} />,
      label: 'Civil Foundation Curing',
      desc: 'Excavation, pouring rebar concrete foundations, and erecting block work structural frames.'
    },
    {
      title: 'Quality Check',
      icon: <ShieldCheck size={18} />,
      label: 'Lab Material Audits',
      desc: 'Laboratory testing of concrete cubes compression limits and EAF steel reinforcements checks.'
    },
    {
      title: 'Interior',
      icon: <Sparkles size={18} />,
      label: 'Fittings & Aesthetics',
      desc: 'Laying vitrified floor tiles, routing low-voltage wires, and installing premium sanitary fixtures.'
    },
    {
      title: 'Handover',
      icon: <Key size={18} />,
      label: 'Milestones Sign-Off',
      desc: 'Final site snagging inspections list clearing and official keys transfer to the client.'
    },
    {
      title: 'Warranty',
      icon: <Award size={18} />,
      label: '15-Year Coverage',
      desc: 'Providing structural warranty coverage certificate and ongoing maintenance checkups.'
    }
  ];

  const currentStage = stages[activeStep];

  return (
    <section className="section container" id="journey">
      <SectionHeader
        eyebrow="Milestones Tracker"
        heading="Interactive Build Journey"
        subheading="Track and visualize the precise structural execution parameters from day one site audits to final keys handover."
      />

      <div className={styles.journeyWrapper} style={{ marginTop: '4.5rem' }}>
        {/* Stages Timeline Row */}
        <div className={styles.timelineRow}>
          {stages.map((stg, idx) => (
            <div
              key={idx}
              className={`${styles.stepNode} ${idx === activeStep ? styles.activeNode : ''}`}
              onClick={() => setActiveStep(idx)}
            >
              <div className={styles.iconCircle}>{stg.icon}</div>
              <span className={styles.nodeTitle}>{stg.title}</span>
            </div>
          ))}
        </div>

        {/* Selected Stage Detail Panel */}
        <MotionWrapper
          key={activeStep}
          variant="fadeIn"
          className={`glass-panel ${styles.detailCard}`}
        >
          <div className={styles.detailHeader}>
            <span className={styles.stepNum}>Phase 0{activeStep + 1}</span>
            <span className={styles.stepLabel}>{currentStage.label}</span>
          </div>
          <h3 className={styles.detailTitle}>{currentStage.title}</h3>
          <p className={styles.detailText}>{currentStage.desc}</p>
          <div className={styles.note}>
            <Info size={14} />
            <span>Click any node in the journey tracker above to review structural operations.</span>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
};

export default InteractiveBuildJourney;
