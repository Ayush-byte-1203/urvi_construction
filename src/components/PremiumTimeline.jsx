import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, Clock, ShieldCheck, Users, FileText } from 'lucide-react';
import SectionHeader from '@sections/SectionHeader';
import styles from './PremiumTimeline.module.css';

const PremiumTimeline = ({
  eyebrow,
  heading,
  subheading,
  steps = [],
  activeStep: controlledActiveStep,
  onStepChange
}) => {
  const [internalStep, setInternalStep] = useState(0);

  const isControlled = controlledActiveStep !== undefined;
  const activeStep = isControlled ? controlledActiveStep : internalStep;

  const handleStepClick = (idx) => {
    if (!isControlled) setInternalStep(idx);
    if (onStepChange) onStepChange(idx);
  };

  if (!steps || steps.length === 0) return null;

  const currentStep = steps[activeStep] || steps[0];

  return (
    <section className={`section ${styles.processSection}`}>
      <div className="container">
        {(eyebrow || heading || subheading) && (
          <SectionHeader
            eyebrow={eyebrow}
            heading={heading}
            subheading={subheading}
          />
        )}

        <div className={styles.journeyWrapper} style={{ marginTop: (eyebrow || heading) ? '4rem' : '0' }}>
          {/* Horizontal Timeline */}
          <div className={styles.timelineScrollContainer}>
            <div className={styles.timelineRow}>
              {/* Dynamic Connector Track */}
              <div className={styles.connectorTrack}>
                <motion.div 
                  className={styles.connectorFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeStep / (Math.max(1, steps.length - 1))) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {steps.map((stg, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                const isUpcoming = idx > activeStep;
                
                return (
                  <div
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className={`${styles.stepNode} ${isActive ? styles.activeNode : ''} ${isCompleted ? styles.completedNode : ''} ${isUpcoming ? styles.upcomingNode : ''}`}
                  >
                    <motion.div 
                      className={styles.iconCircle}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted ? <CheckCircle2 size={20} /> : (stg.icon || <CheckCircle2 size={20} />)}
                    </motion.div>
                    <span className={styles.nodeStepNum}>{stg.step || `0${idx + 1}`}</span>
                    <span className={styles.nodeTitle}>{stg.title}</span>
                    {stg.label && <span className={styles.nodeLabel}>{stg.label}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Premium Information Card */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className={`glass-panel ${styles.premiumCard}`}
            >
              <div className={styles.cardAccentBorder} />
              
              <div className={styles.premiumCardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <span className={styles.stepNumBadge}>{currentStep.badge || currentStep.step || `Phase 0${activeStep + 1}`}</span>
                    {currentStep.status && (
                      <span className={`${styles.statusBadge} ${currentStep.status === 'Completed' ? styles.statusCompleted : currentStep.status === 'Current' ? styles.statusCurrent : styles.statusUpcoming}`}>
                        {currentStep.status}
                      </span>
                    )}
                  </div>
                  {currentStep.illustration && (
                    <div className={styles.cardIllustration}>{currentStep.illustration}</div>
                  )}
                </div>
                
                <h3 className={styles.detailTitle}>{currentStep.title}</h3>
                <p className={styles.detailText}>{currentStep.desc || currentStep.description}</p>

                {/* Additional Details Grid (Only render if at least one field exists) */}
                {(currentStep.duration || currentStep.checks || currentStep.team || (currentStep.deliverables && currentStep.deliverables.length > 0)) && (
                  <div className={styles.cardGrid}>
                    {currentStep.duration && (
                      <div className={styles.gridItem}>
                        <div className={styles.gridItemHeader}>
                          <Clock size={16} className={styles.gridIcon} />
                          <strong>Duration</strong>
                        </div>
                        <p>{currentStep.duration}</p>
                      </div>
                    )}
                    
                    {currentStep.checks && (
                      <div className={styles.gridItem}>
                        <div className={styles.gridItemHeader}>
                          <ShieldCheck size={16} className={styles.gridIcon} />
                          <strong>Quality Gates</strong>
                        </div>
                        <p>{currentStep.checks}</p>
                      </div>
                    )}
                    
                    {currentStep.team && (
                      <div className={styles.gridItem}>
                        <div className={styles.gridItemHeader}>
                          <Users size={16} className={styles.gridIcon} />
                          <strong>Team & Involvement</strong>
                        </div>
                        <p>{currentStep.team}</p>
                      </div>
                    )}

                    {currentStep.deliverables && currentStep.deliverables.length > 0 && (
                      <div className={styles.gridItem}>
                        <div className={styles.gridItemHeader}>
                          <FileText size={16} className={styles.gridIcon} />
                          <strong>Deliverables</strong>
                        </div>
                        <ul className={styles.deliverablesList}>
                          {currentStep.deliverables.map((item, dIdx) => (
                            <li key={dIdx}><ChevronRight size={12} /> {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PremiumTimeline;
