import React, { useState, useEffect } from 'react';
import { 
  Calculator, Send, CheckCircle2, ChevronRight, ChevronLeft, MapPin, 
  Layers, HardHat, ShieldCheck, HelpCircle, FileText, Landmark, Phone 
} from 'lucide-react';
import { appConfig } from '../data/appConfig';
import SectionHeader from './SectionHeader';
import MotionWrapper from './MotionWrapper';
import styles from './QuoteWizard.module.css';

const QuoteWizard = () => {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState('vadodara');
  const [projectType, setProjectType] = useState('residential');
  const [packageTier, setPackageTier] = useState('executive');
  
  // Plot details
  const [plotLength, setPlotLength] = useState(50);
  const [plotWidth, setPlotWidth] = useState(30);
  const [plotArea, setPlotArea] = useState(1500);
  const [isManualArea, setIsManualArea] = useState(false);

  // Construction options
  const [floorsCount, setFloorsCount] = useState(1);
  const [hasBasement, setHasBasement] = useState(false);
  const [hasParking, setHasParking] = useState(true);
  
  // Budget
  const [budgetRange, setBudgetRange] = useState('50'); // 20: 20-30L, 30: 30-50L, 50: 50-75L, 75: 75L+
  
  // Chips
  const [additionalReqs, setAdditionalReqs] = useState([]);

  // Contact
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredTime, setPreferredTime] = useState('morning');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quoteWizardProgress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.step) setStep(parsed.step);
        if (parsed.city) setCity(parsed.city);
        if (parsed.projectType) setProjectType(parsed.projectType);
        if (parsed.packageTier) setPackageTier(parsed.packageTier);
        if (parsed.plotLength) setPlotLength(parsed.plotLength);
        if (parsed.plotWidth) setPlotWidth(parsed.plotWidth);
        if (parsed.plotArea) setPlotArea(parsed.plotArea);
        if (parsed.floorsCount) setFloorsCount(parsed.floorsCount);
        if (parsed.hasBasement) setHasBasement(parsed.hasBasement);
        if (parsed.hasParking) setHasParking(parsed.hasParking);
        if (parsed.budgetRange) setBudgetRange(parsed.budgetRange);
        if (parsed.additionalReqs) setAdditionalReqs(parsed.additionalReqs);
        if (parsed.name) setName(parsed.name);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.email) setEmail(parsed.email);
      } catch (e) {
        console.error("Failed to load QuoteWizard progress", e);
      }
    }
  }, []);

  // Save progress to localStorage when state changes
  useEffect(() => {
    const dataToSave = {
      step, city, projectType, packageTier, plotLength, plotWidth, plotArea,
      floorsCount, hasBasement, hasParking, budgetRange, additionalReqs,
      name, phone, email
    };
    localStorage.setItem('quoteWizardProgress', JSON.stringify(dataToSave));
  }, [
    step, city, projectType, packageTier, plotLength, plotWidth, plotArea,
    floorsCount, hasBasement, hasParking, budgetRange, additionalReqs,
    name, phone, email
  ]);

  // Auto calculate area when length/width change
  useEffect(() => {
    if (!isManualArea) {
      setPlotArea(plotLength * plotWidth);
    }
  }, [plotLength, plotWidth, isManualArea]);

  // Calculations Formulas
  const getRate = () => {
    if (packageTier === 'core') return 1499;
    if (packageTier === 'executive') return 1799;
    return 2111;
  };

  const getBuiltUpArea = () => {
    return plotArea * floorsCount;
  };

  const getBaseCost = () => {
    return getBuiltUpArea() * getRate();
  };

  const getAddonsCost = () => {
    let addonTotal = 0;
    if (hasBasement) addonTotal += plotArea * 1800; // basement excavation is costly
    if (additionalReqs.includes('pool')) addonTotal += 800000;
    if (additionalReqs.includes('lift')) addonTotal += 600000;
    if (additionalReqs.includes('solar')) addonTotal += 250000;
    if (additionalReqs.includes('theatre')) addonTotal += 400000;
    return addonTotal;
  };

  const getTotalCost = () => {
    return getBaseCost() + getAddonsCost();
  };

  const getTimelineMonths = () => {
    let base = 8;
    if (floorsCount > 1) base += (floorsCount - 1) * 3;
    if (hasBasement) base += 2;
    return base;
  };

  // EMI Calculator logic
  const getEMI = () => {
    const principle = getTotalCost() * 0.8; // 80% loan
    const rate = 8.5 / 12 / 100; // 8.5% interest rate
    const n = 15 * 12; // 15 years tenure
    const emi = (principle * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    return Math.round(emi).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    });
  };

  const toggleChip = (chipId) => {
    setAdditionalReqs(prev => 
      prev.includes(chipId) ? prev.filter(c => c !== chipId) : [...prev, chipId]
    );
  };

  const handleNext = () => setStep(prev => Math.min(prev + 1, 10));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  const handleReset = () => {
    localStorage.removeItem('quoteWizardProgress');
    setStep(1);
    setName('');
    setPhone('');
    setEmail('');
    setAdditionalReqs([]);
    setConsent(false);
  };

  return (
    <section className={styles.wizardSection} id="wizard">
      <div className={`container ${styles.splitLayout}`}>
        {/* Left Info Column */}
        <div className={styles.leftInfoSection}>
          <span className={styles.smallLabel}>Estimation Engine</span>
          <h2 className={styles.largeHeading}>Estimate Your Specifications</h2>
          <p className={styles.infoDescription}>
            Configure your custom site properties, select package tiers, calculate structural load pricing, and plan callback schedules coordinates.
          </p>
          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <ShieldCheck size={20} className={styles.detailIcon} />
              <span>Lab Verified Materials & Steel Grades</span>
            </div>
            <div className={styles.detailItem}>
              <Calculator size={20} className={styles.detailIcon} />
              <span>Real-time Civil Calculations & Estimates</span>
            </div>
          </div>
        </div>

        {/* Right Configurator Card Column */}
        <div className={styles.configuratorCard}>
          {/* Stepper Progress bar */}
          {step < 10 && (
            <div className={styles.stepper}>
              <div className={styles.progressBarWrapper}>
                <div className={styles.progressBar} style={{ width: `${(step / 9) * 100}%` }} />
              </div>
              <div className={styles.stepsLabelRow}>
                <span>Step 0{step} / 09</span>
                <span>{Math.round((step / 9) * 100)}% Complete</span>
              </div>
            </div>
          )}

          {/* Form panel bodies */}
          <div className={styles.wizardBody}>
          {step === 1 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Select Active Location</h3>
              <p className={styles.stepDesc}>We currently coordinate site checkups in Vadodara. Future cities updates are loaded dynamically.</p>
              
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Active City</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <MapPin size={18} className={styles.inputIcon} />
                  <div 
                    className={styles.input}
                    style={{ paddingLeft: '2.75rem', display: 'flex', alignItems: 'center', background: '#f8fafc', color: '#64748b', cursor: 'default' }}
                  >
                    Vadodara, Gujarat
                  </div>
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleNext} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </MotionWrapper>
          )}

          {step === 2 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Choose Project Format</h3>
              <p className={styles.stepDesc}>Select the structural build class for your site staging coordinates.</p>

              <div className="grid-3" style={{ gap: '1rem' }}>
                {[
                  { id: 'residential', label: 'Residential Home', desc: 'Custom villas construction' },
                  { id: 'villa', label: 'Signature Villa', desc: 'Premium luxury estates' },
                  { id: 'commercial', label: 'Commercial Space', desc: 'Office towers and Plazas' },
                  { id: 'renovation', label: 'Renovation Work', desc: 'Interior and remodeling' },
                  { id: 'smarthome', label: 'Smart Home Upgrades', desc: 'Low-voltage automations' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setProjectType(item.id)}
                    className={`${styles.optionCard} ${projectType === item.id ? styles.optionSelected : ''}`}
                  >
                    <Layers size={22} className={projectType === item.id ? styles.cardIconActive : styles.cardIcon} />
                    <strong>{item.label}</strong>
                    <span>{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 3 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Select Specifications Package</h3>
              <p className={styles.stepDesc}>Choose raw concrete grades and structural steel certifications.</p>

              <div className="grid-3" style={{ gap: '1rem' }}>
                {[
                  { id: 'core', name: 'Core Shell Build', price: '₹1,499/sqft', timeline: '8 Months', quality: 'Standard Civil' },
                  { id: 'executive', name: 'Executive Smart', price: '₹1,799/sqft', timeline: '10 Months', quality: 'Premium Civil' },
                  { id: 'signature', name: 'Premium Elite', price: '₹2,111/sqft', timeline: '12 Months', quality: 'Luxury Bespoke' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setPackageTier(item.id)}
                    className={`${styles.optionCard} ${packageTier === item.id ? styles.optionSelected : ''}`}
                  >
                    <HardHat size={22} className={packageTier === item.id ? styles.cardIconActive : styles.cardIcon} />
                    <strong>{item.name}</strong>
                    <span className={styles.priceHighlight}>{item.price}</span>
                    <span className={styles.timelineSpan}>Timeline: {item.timeline}</span>
                  </div>
                ))}
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 4 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Plot Dimensions & Area</h3>
              <p className={styles.stepDesc}>Calculate built-up margins based on plot measurements.</p>

              <div className={styles.toggleRow}>
                <button 
                  onClick={() => setIsManualArea(false)} 
                  className={`${styles.toggleBtn} ${!isManualArea ? styles.toggleActive : ''}`}
                >
                  Enter Length & Width
                </button>
                <button 
                  onClick={() => setIsManualArea(true)} 
                  className={`${styles.toggleBtn} ${isManualArea ? styles.toggleActive : ''}`}
                >
                  Enter Direct Area
                </button>
              </div>

              {!isManualArea ? (
                <div className="grid-2" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Plot Length (Feet)</label>
                    <input 
                      type="number" 
                      value={plotLength} 
                      onChange={(e) => setPlotLength(Number(e.target.value))} 
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Plot Width (Feet)</label>
                    <input 
                      type="number" 
                      value={plotWidth} 
                      onChange={(e) => setPlotWidth(Number(e.target.value))} 
                      className={styles.input}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.fieldGroup} style={{ marginTop: '1.5rem' }}>
                  <label className={styles.label}>Plot Area (Sq. Ft.)</label>
                  <input 
                    type="number" 
                    value={plotArea} 
                    onChange={(e) => setPlotArea(Number(e.target.value))} 
                    className={styles.input}
                  />
                </div>
              )}

              <div className={styles.areaSummary}>
                <span>Calculated Plot Area:</span>
                <strong>{plotArea} Sq. Ft.</strong>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 5 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Construction details</h3>
              <p className={styles.stepDesc}>Configure floors count and underground basement works.</p>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Number of Floors</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                  {[1, 2, 3].map(f => (
                    <button
                      key={f}
                      onClick={() => setFloorsCount(f)}
                      className={`${styles.numberBtn} ${floorsCount === f ? styles.numberActive : ''}`}
                    >
                      {f === 1 ? 'Ground Only' : f === 2 ? 'G + 1 Floor' : 'G + 2 Floors'}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.checkboxGrid} style={{ marginTop: '2rem' }}>
                <div className={styles.checkCard} onClick={() => setHasBasement(!hasBasement)}>
                  <input type="checkbox" checked={hasBasement} onChange={() => {}} />
                  <div>
                    <strong>Include Basement Work</strong>
                    <span>Adds earthwork excavation staging</span>
                  </div>
                </div>

                <div className={styles.checkCard} onClick={() => setHasParking(!hasParking)}>
                  <input type="checkbox" checked={hasParking} onChange={() => {}} />
                  <div>
                    <strong>Include Covered Parking</strong>
                    <span>Staging dedicated beam support spans</span>
                  </div>
                </div>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 6 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Budget Targets Range</h3>
              <p className={styles.stepDesc}>Select your desired structural cost limits.</p>

              <div className={styles.sliderContainer} style={{ marginTop: '2rem' }}>
                {/* Premium slider pill badge */}
                <div className={styles.badgeContainer} style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                  <span className={styles.premiumBadge}>
                    Active Value: {budgetRange === '20' ? 'Below ₹30 Lakhs' : budgetRange === '50' ? '₹50L - ₹75L' : budgetRange === '75' ? '₹75L - ₹1 Crore' : 'Above ₹1 Crore'}
                  </span>
                </div>

                <input
                  type="range"
                  min="20"
                  max="100"
                  step="25"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className={styles.rangeSlider}
                />
                <div className={styles.sliderLabels}>
                  <span>₹20L &ndash; ₹30L</span>
                  <span>₹30L &ndash; ₹50L</span>
                  <span>₹50L &ndash; ₹75L</span>
                  <span>₹75L+</span>
                </div>
              </div>

              <div className={styles.areaSummary} style={{ marginTop: '3rem' }}>
                <span>Selected cost Target:</span>
                <strong>
                  {budgetRange === '20' ? 'Below ₹30 Lakhs' : budgetRange === '50' ? '₹50L - ₹75L' : budgetRange === '75' ? '₹75L - ₹1 Crore' : 'Above ₹1 Crore'}
                </strong>
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 7 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Additional structural additions</h3>
              <p className={styles.stepDesc}>Select luxury add-ons coordinates for site scheduling plans.</p>

              <div className={styles.chipsWrapper} style={{ marginTop: '2rem' }}>
                {[
                  { id: 'pool', label: 'Swimming Pool (+₹8L)' },
                  { id: 'lift', label: 'Structural Elevator (+₹6L)' },
                  { id: 'solar', label: 'Solar Rooftop Grid (+₹2.5L)' },
                  { id: 'theatre', label: 'Acoustic Theatre Room (+₹4L)' }
                ].map(chip => (
                  <button
                    key={chip.id}
                    onClick={() => toggleChip(chip.id)}
                    className={`${styles.chip} ${additionalReqs.includes(chip.id) ? styles.chipActive : ''}`}
                  >
                    {additionalReqs.includes(chip.id) ? '✓ ' : '+ '}
                    {chip.label}
                  </button>
                ))}
              </div>

              <div className={styles.buttonRow}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 8 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Estimate Summary & Breakdown</h3>
              <p className={styles.stepDesc}>Dynamic cost draft based on selected structural specifications.</p>

              <div className={styles.summaryGrid} style={{ marginTop: '1.5rem' }}>
                {/* Left Col: cost stats */}
                <div className={styles.statsCard}>
                  <div className={styles.totalBlock}>
                    <span>Estimated Construction Cost</span>
                    <h2>
                      {getTotalCost().toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                      })}
                    </h2>
                    <span className={styles.disclaimerText}>* Approximate values. Final BOQ depends on geotech soils.</span>
                  </div>

                  <div className={styles.specMetaGrid}>
                    <div className={styles.specMetaItem}>
                      <strong>Built-up Area:</strong>
                      <span>{getBuiltUpArea()} Sq. Ft.</span>
                    </div>
                    <div className={styles.specMetaItem}>
                      <strong>Est. Duration:</strong>
                      <span>{getTimelineMonths()} Months</span>
                    </div>
                    <div className={styles.specMetaItem}>
                      <strong>Materials Quality:</strong>
                      <span>{packageTier === 'core' ? 'ISO Standard' : packageTier === 'executive' ? 'Premium Specs' : 'Bespoke Luxury'}</span>
                    </div>
                  </div>
                </div>

                {/* Right Col: Budget allocation progress bars */}
                <div className={`glass-panel ${styles.breakdownCard}`}>
                  <h4 className={styles.cardHeading}>Cost Allocation Planner</h4>
                  
                  <div className={styles.progressRow}>
                    <div className={styles.progressLabel}>
                      <span>Civil Foundation (15%)</span>
                      <strong>{(getTotalCost() * 0.15).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</strong>
                    </div>
                    <div className={styles.barOuter}><div className={styles.barInner} style={{ width: '15%', backgroundColor: '#22c55e' }} /></div>
                  </div>

                  <div className={styles.progressRow}>
                    <div className={styles.progressLabel}>
                      <span>RCC structural frames (35%)</span>
                      <strong>{(getTotalCost() * 0.35).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</strong>
                    </div>
                    <div className={styles.barOuter}><div className={styles.barInner} style={{ width: '35%', backgroundColor: '#ff6b35' }} /></div>
                  </div>

                  <div className={styles.progressRow}>
                    <div className={styles.progressLabel}>
                      <span>MEP utilities routing (15%)</span>
                      <strong>{(getTotalCost() * 0.15).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</strong>
                    </div>
                    <div className={styles.barOuter}><div className={styles.barInner} style={{ width: '15%', backgroundColor: '#eab308' }} /></div>
                  </div>

                  <div className={styles.progressRow}>
                    <div className={styles.progressLabel}>
                      <span>Premium Finishes (25%)</span>
                      <strong>{(getTotalCost() * 0.25).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</strong>
                    </div>
                    <div className={styles.barOuter}><div className={styles.barInner} style={{ width: '25%', backgroundColor: '#ec4899' }} /></div>
                  </div>
                </div>
              </div>

              {/* Loan EMI Calculator */}
              <div className={`glass-panel ${styles.emiBlock}`} style={{ marginTop: '2rem' }}>
                <Landmark size={22} className={styles.emiIcon} />
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Loan EMI Calculator estimate</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Based on 80% financing limit at 8.5% interest rate over 15 years.
                  </p>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <strong style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 800 }}>{getEMI()}</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>per Month</span>
                </div>
              </div>

              <div className={styles.buttonRow} style={{ marginTop: '2.5rem' }}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button onClick={handleNext} className="btn btn-primary">Next <ChevronRight size={14} /></button>
              </div>
            </MotionWrapper>
          )}

          {step === 9 && (
            <MotionWrapper variant="fadeIn" className={styles.stepContainer}>
              <h3 className={styles.stepTitle}>Submit Estimator File</h3>
              <p className={styles.stepDesc}>Enter contact details to secure municipal permit reviews drafts.</p>

              <div className={styles.contactFormWrapper} style={{ marginTop: '1.5rem', textAlign: 'left' }}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Full Name *</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                    required 
                    className={styles.input}
                  />
                </div>

                <div className="grid-2" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Phone Number *</label>
                    <input 
                      type="tel" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      placeholder="Enter mobile number" 
                      required 
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Email Address *</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="Enter email" 
                      required 
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className="grid-2" style={{ gap: '1.5rem', marginTop: '1rem' }}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Preferred Callback Time</label>
                    <select 
                      value={preferredTime} 
                      onChange={(e) => setPreferredTime(e.target.value)} 
                      className={styles.select}
                    >
                      <option value="morning">Morning (9 AM &ndash; 12 PM)</option>
                      <option value="afternoon">Afternoon (12 PM &ndash; 4 PM)</option>
                      <option value="evening">Evening (4 PM &ndash; 7 PM)</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Consent Checkbox *</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.75rem' }}>
                      <input 
                        type="checkbox" 
                        checked={consent} 
                        onChange={(e) => setConsent(e.target.checked)} 
                        id="consent" 
                      />
                      <label htmlFor="consent" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
                        I agree to terms and callback schedule coordinates policies.
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.buttonRow} style={{ marginTop: '2.5rem' }}>
                <button onClick={handleBack} className="btn btn-secondary"><ChevronLeft size={14} /> Back</button>
                <button 
                  onClick={handleNext} 
                  disabled={!name || !phone || !email || !consent}
                  className="btn btn-primary"
                >
                  Submit Estimate File <Send size={14} style={{ marginLeft: '4px' }} />
                </button>
              </div>
            </MotionWrapper>
          )}

          {step === 10 && (
            <MotionWrapper variant="fadeIn" className={styles.successPanel}>
              <CheckCircle2 size={64} className={styles.successIcon} />
              <h2 className={styles.successTitle}>Estimate logged successfully!</h2>
              <p className={styles.successDesc}>
                Thank you, {name}. We have registered your built-up area estimation file of <strong>{getTotalCost().toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}</strong>. A scheduling manager will call you at {preferredTime}.
              </p>

              <div className={styles.successButtons}>
                <button onClick={handleReset} className="btn btn-secondary">Start New Estimate</button>
                <a 
                  href={`https://wa.me/${appConfig.company.phoneFormatted.replace(/[^0-9]/g, '')}?text=Hi%20BuildCraft,%20I've%20just%20calculated%20a%20cost%20of%20${getTotalCost().toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })}%20for%20my%20${getBuiltUpArea()}%20sqft%20site.`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Connect on WhatsApp
                </a>
              </div>
            </MotionWrapper>
          )}
        </div>
      </div>
    </div>
  </section>
);
};

export default QuoteWizard;
