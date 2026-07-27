import React, { useState, useMemo } from 'react';
import { useGlobalData } from '../context/GlobalDataContext';
import { Link } from 'react-router-dom';
import { Calculator, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import styles from './CostCalculator.module.css'; // Reuse existing CSS

const CostCalculatorSection = () => {
  const { packages } = useGlobalData();

  // State
  const [area, setArea] = useState(1500);
  const [floors, setFloors] = useState('Ground Floor');
  const [packageId, setPackageId] = useState(packages?.[0]?.id || 1);
  const [propertyType, setPropertyType] = useState('Residential');

  // Sync packageId when packages load
  React.useEffect(() => {
    if (packages && packages.length > 0 && !packages.find(p => String(p.id) === String(packageId))) {
      setPackageId(packages[0].id);
    }
  }, [packages, packageId]);

  const parsePrice = (priceVal, defaultVal = 1800) => {
    if (typeof priceVal === 'number' && !isNaN(priceVal)) return priceVal;
    if (!priceVal) return defaultVal;
    const clean = String(priceVal).replace(/[^0-9.]/g, '');
    const num = parseFloat(clean);
    return isNaN(num) || num <= 0 ? defaultVal : num;
  };

  // Calculation
  const selectedPackage = useMemo(() => {
    if (!packages || packages.length === 0) {
      return { name: 'Essential Tier', price: 1800 };
    }
    const found = packages.find(p => String(p.id) === String(packageId));
    return found || packages[0];
  }, [packages, packageId]);

  const baseRate = useMemo(() => parsePrice(selectedPackage?.price, 1800), [selectedPackage]);

  const floorsMultiplier = useMemo(() => {
    switch (floors) {
      case 'G+1': return 1.05;
      case 'G+2': return 1.10;
      case 'G+3': return 1.15;
      case 'G+4': return 1.20;
      case 'Ground Floor':
      default: return 1.0;
    }
  }, [floors]);

  const propertyMultiplier = useMemo(() => {
    return propertyType === 'Commercial' ? 1.12 : 1.0;
  }, [propertyType]);

  const effectiveRate = useMemo(() => {
    return Math.round(baseRate * floorsMultiplier * propertyMultiplier);
  }, [baseRate, floorsMultiplier, propertyMultiplier]);

  const estimatedCost = useMemo(() => {
    return area * effectiveRate;
  }, [area, effectiveRate]);

  // Range: +/- 10%
  const lowRange = estimatedCost * 0.9;
  const highRange = estimatedCost * 1.1;

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <section id="cost-calculator" className="section container">
      <SectionHeader
        eyebrow="Estimate Your Build"
        heading="Construction Cost Calculator"
        subheading="Get a realistic estimate for your dream home or commercial space based on our transparent pricing tiers."
        center
      />

      <div className={styles.calculatorGrid} style={{ marginTop: '3rem' }}>

        {/* Inputs */}
        <div className={styles.inputPanel}>
          <div className={styles.panelHeader}>
            <Calculator className="text-accent" size={24} />
            <h3>Project Details</h3>
          </div>

          <div className="form-group">
            <label className="form-label">Built-up Area (sq.ft)</label>
            <input
              type="number"
              className="form-control"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              min="500"
              step="100"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Number of Floors</label>
            <select
              className="form-control"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
            >
              <option value="Ground Floor">Ground Floor</option>
              <option value="G+1">G+1 (Ground + 1)</option>
              <option value="G+2">G+2 (Ground + 2)</option>
              <option value="G+3">G+3 (Ground + 3)</option>
              <option value="G+4">G+4 (Ground + 4)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Construction Package</label>
            <select
              className="form-control"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
            >
              {packages?.map(p => (
                <option key={p.id} value={p.id}>{p.name} - ₹{parsePrice(p.price, 1800)}/sq.ft</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Property Type</label>
            <select
              className="form-control"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
        </div>

        {/* Output Panel */}
        <div className={styles.outputPanel}>
          <div className={styles.outputHeader}>
            <span className={styles.badge}>Live Estimate</span>
            <h2>{formatCurrency(estimatedCost)}</h2>
            <p className={styles.rangeText}>Approx. Range: {formatCurrency(lowRange)} – {formatCurrency(highRange)}</p>
          </div>

          <div className={styles.breakdown}>
            <h4 className={styles.breakdownTitle}>Cost Breakdown</h4>
            <div className={styles.breakdownItem}>
              <span>Built-up Area</span>
              <strong>{area} sq.ft</strong>
            </div>
            <div className={styles.breakdownItem}>
              <span>Property & Floors</span>
              <strong>{propertyType} ({floors})</strong>
            </div>
            <div className={styles.breakdownItem}>
              <span>Package Selected</span>
              <strong>{selectedPackage.name}</strong>
            </div>
            <div className={styles.breakdownItem}>
              <span>Base Rate</span>
              <strong>₹{baseRate} / sq.ft</strong>
            </div>
            {effectiveRate !== baseRate && (
              <div className={styles.breakdownItem}>
                <span>Effective Rate (incl. structure/type)</span>
                <strong>₹{effectiveRate} / sq.ft</strong>
              </div>
            )}
            <div className={styles.divider}></div>
            <div className={styles.breakdownItem} style={{ fontSize: '1.125rem', color: 'var(--text-primary)' }}>
              <strong>Total Estimated Cost</strong>
              <strong>{formatCurrency(estimatedCost)}</strong>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <p>* This is an approximate estimate. Actual cost may vary based on structural design, exact location, and specific material upgrades.</p>
          </div>

          <div className={styles.actions}>
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%', background: 'var(--accent)', borderColor: 'var(--accent)', color: '#fff' }}>
              Get Detailed Quote <ChevronRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CostCalculatorSection;
