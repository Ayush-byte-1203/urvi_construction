import React, { useState, useEffect } from 'react';
import { 
  Calculator, Send, CheckCircle2, ChevronRight, ChevronLeft, MapPin, 
  Layers, HardHat, ShieldCheck, HelpCircle, FileText, Landmark, Phone 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
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
  const [budgetRange, setBudgetRange] = useState('1'); // 0: 20-30L, 1: 30-50L, 2: 50-75L, 3: 75L+
  
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
    if (hasParking) addonTotal += 150000; // parking shed / structural span
    if (additionalReqs.includes('pool')) addonTotal += 800000;
    if (additionalReqs.includes('lift')) addonTotal += 600000;
    if (additionalReqs.includes('solar')) addonTotal += 250000;
    if (additionalReqs.includes('theatre')) addonTotal += 400000;
    return addonTotal;
  };

  const getWhatsAppMessage = () => {
    let msg = `*New Estimate Inquiry*\n\n`;
    msg += `*Name:* ${name}\n`;
    msg += `*Phone:* ${phone}\n`;
    msg += `*Email:* ${email}\n`;
    msg += `*Callback:* ${preferredTime}\n\n`;
    msg += `*-- Project Details --*\n`;
    msg += `*Location:* ${city}\n`;
    msg += `*Project Type:* ${projectType}\n`;
    msg += `*Package:* ${packageTier} (₹${getRate()}/sqft)\n`;
    msg += `*Plot Area:* ${plotArea} sqft (L: ${plotLength}, W: ${plotWidth})\n`;
    msg += `*Floors:* ${floorsCount}\n`;
    msg += `*Basement:* ${hasBasement ? 'Yes' : 'No'}\n`;
    msg += `*Parking:* ${hasParking ? 'Yes' : 'No'}\n`;
    msg += `*Add-ons:* ${additionalReqs.length > 0 ? additionalReqs.join(', ') : 'None'}\n`;
    msg += `*Target Budget:* ${budgetRange === '0' ? '₹20L - ₹30L' : budgetRange === '1' ? '₹30L - ₹50L' : budgetRange === '2' ? '₹50L - ₹75L' : '₹75L+'}\n\n`;
    msg += `*-- Estimated Cost --*\n`;
    msg += `*Built-up Area:* ${getBuiltUpArea()} sqft\n`;
    msg += `*Base Cost:* ₹${getBaseCost().toLocaleString('en-IN')}\n`;
    msg += `*Add-ons Cost:* ₹${getAddonsCost().toLocaleString('en-IN')}\n`;
    msg += `*Total Estimated Cost:* ₹${getTotalCost().toLocaleString('en-IN')}\n`;
    
    return encodeURIComponent(msg);
  };

  const sendEmailNotification = () => {
    const templateParams = {
      admin_email: appConfig.company.email, // Dynamic recipient if needed
      user_name: name,
      user_phone: phone,
      user_email: email,
      callback_time: preferredTime,
      location: city,
      project_type: projectType,
      package_tier: `${packageTier} (₹${getRate()}/sqft)`,
      plot_area: `${plotArea} sqft (L: ${plotLength}, W: ${plotWidth})`,
      floors: floorsCount,
      basement: hasBasement ? 'Yes' : 'No',
      parking: hasParking ? 'Yes' : 'No',
      addons: additionalReqs.length > 0 ? additionalReqs.join(', ') : 'None',
      target_budget: budgetRange === '0' ? '₹20L - ₹30L' : budgetRange === '1' ? '₹30L - ₹50L' : budgetRange === '2' ? '₹50L - ₹75L' : '₹75L+',
      built_up_area: `${getBuiltUpArea()} sqft`,
      base_cost: `₹${getBaseCost().toLocaleString('en-IN')}`,
      addons_cost: `₹${getAddonsCost().toLocaleString('en-IN')}`,
      total_cost: `₹${getTotalCost().toLocaleString('en-IN')}`
    };

    const emailHtml = `
    <h2 style="color: #ff6b35; margin-top: 0; margin-bottom: 5px; font-size: 24px;">New Estimate Inquiry</h2>
    <p style="color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 25px;">A new cost estimation has been submitted via QuoteWizard.</p>

    <!-- Client Details -->
    <h3 style="background-color: #f1f5f9; padding: 10px 15px; border-radius: 4px; font-size: 16px; margin-bottom: 15px; color: #334155;">Client Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%;">Name:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${phone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Callback Preference:</td>
        <td style="padding: 8px 0; color: #475569; text-transform: capitalize;">${preferredTime}</td>
      </tr>
    </table>

    <!-- Project Specifications -->
    <h3 style="background-color: #f1f5f9; padding: 10px 15px; border-radius: 4px; font-size: 16px; margin-bottom: 15px; color: #334155;">Project Specifications</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%;">Location:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569; text-transform: capitalize;">${city}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Project Type:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569; text-transform: capitalize;">${projectType}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Package:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569; text-transform: capitalize;">${packageTier}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Plot Area:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${plotArea} sqft</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Floors:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${floorsCount}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Basement:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${hasBasement ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Parking:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${hasParking ? 'Yes' : 'No'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Add-ons:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569; text-transform: capitalize;">${additionalReqs.length > 0 ? additionalReqs.join(', ') : 'None'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Target Budget:</td>
        <td style="padding: 8px 0; color: #475569;">${budgetRange === '0' ? '₹20L - ₹30L' : budgetRange === '1' ? '₹30L - ₹50L' : budgetRange === '2' ? '₹50L - ₹75L' : '₹75L+'}</td>
      </tr>
    </table>

    <!-- Cost Breakdown -->
    <h3 style="background-color: #eff6ff; padding: 10px 15px; border-radius: 4px; font-size: 16px; margin-bottom: 15px; color: #1e3a8a;">Estimated Cost Breakdown</h3>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 35%;">Built-up Area:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">${getBuiltUpArea()} sqft</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Base Cost:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">₹${getBaseCost().toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 2px solid #cbd5e1; font-weight: bold;">Add-ons Cost:</td>
        <td style="padding: 10px 0; border-bottom: 2px solid #cbd5e1; color: #475569;">₹${getAddonsCost().toLocaleString('en-IN')}</td>
      </tr>
      <tr>
        <td style="padding: 15px 0; font-weight: 800; font-size: 16px; color: #1e293b;">Total Estimate:</td>
        <td style="padding: 15px 0; font-weight: 800; font-size: 18px; color: #ff6b35;">₹${getTotalCost().toLocaleString('en-IN')}</td>
      </tr>
    </table>
    `;
    
    templateParams.message_html = emailHtml;

    // NOTE: Replace these placeholders with your actual EmailJS keys!
    emailjs.send(
      'service_y7swanm', 
      'template_3m9a5ed', 
      templateParams, 
      'jmcjMXdDCWLbDjHav'
    )
    .then((response) => {
      console.log('SUCCESS! Email sent.', response.status, response.text);
    }, (error) => {
      console.error('FAILED to send email.', error);
    });
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
          <div className={styles.wizardBody} aria-live="polite">
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
                <button 
                  onClick={handleNext} 
                  disabled={!isManualArea ? (plotLength <= 0 || plotWidth <= 0) : plotArea <= 0}
                  className="btn btn-primary"
                >
                  Next <ChevronRight size={14} />
                </button>
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

              <div className="grid-2" style={{ marginTop: '2rem', gap: '1rem' }}>
                {[
                  { id: '0', label: '₹20L - ₹30L', desc: 'Compact / Core Build' },
                  { id: '1', label: '₹30L - ₹50L', desc: 'Standard Residential' },
                  { id: '2', label: '₹50L - ₹75L', desc: 'Premium Villa' },
                  { id: '3', label: '₹75L+', desc: 'Luxury Bespoke' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => setBudgetRange(item.id)}
                    className={`${styles.optionCard} ${budgetRange === item.id ? styles.optionSelected : ''}`}
                    style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
                  >
                    <div style={{ marginBottom: '0.5rem' }}>
                      <input 
                        type="radio" 
                        checked={budgetRange === item.id} 
                        onChange={() => setBudgetRange(item.id)}
                        style={{ accentColor: 'var(--accent)', transform: 'scale(1.2)' }}
                      />
                    </div>
                    <strong>{item.label}</strong>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{item.desc}</span>
                  </div>
                ))}
              </div>

              <div className={styles.areaSummary} style={{ marginTop: '3rem' }}>
                <span>Selected cost Target:</span>
                <strong>
                  {budgetRange === '0' ? '₹20L - ₹30L' : budgetRange === '1' ? '₹30L - ₹50L' : budgetRange === '2' ? '₹50L - ₹75L' : '₹75L+'}
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
              {/* Formula and EMI blocks removed as requested */}

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
                    <div className={styles.inputSelectWrapper}>
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
                  onClick={() => {
                    handleNext();
                    sendEmailNotification();
                    const wpUrl = `https://wa.me/${appConfig.company.phoneFormatted.replace(/[^0-9]/g, '')}?text=${getWhatsAppMessage()}`;
                    window.open(wpUrl, '_blank');
                  }}
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
                  href={`https://wa.me/${appConfig.company.phoneFormatted.replace(/[^0-9]/g, '')}?text=${getWhatsAppMessage()}`}
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
