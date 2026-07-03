import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from '../../common/Button';
import { isValidEmail } from '../../../utils/validators';
import styles from './styles.module.css';

const InquiryForm = ({ defaultService = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    serviceType: defaultService,
    budgetRange: '',
    message: '',
    consent: false
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const serviceOptions = [
    { value: 'residential', label: 'Residential Construction' },
    { value: 'commercial', label: 'Commercial Developments' },
    { value: 'industrial', label: 'Industrial Facilities' },
    { value: 'architecture', label: 'Architecture & Engineering' },
    { value: 'renovation', label: 'Interior Renovation & Fit-outs' },
    { value: 'sustainable', label: 'Sustainable Construction' }
  ];

  const budgetOptions = [
    { value: 'under-50L', label: 'Under ₹50 Lakhs' },
    { value: '50L-1Cr', label: '₹50 Lakhs - ₹1 Crore' },
    { value: '1Cr-5Cr', label: '₹1 Crore - ₹5 Crores' },
    { value: 'above-5Cr', label: 'Above ₹5 Crores' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!isValidEmail(formData.email)) newErrors.email = 'Enter a valid corporate email';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.serviceType) newErrors.serviceType = 'Select a service type';
    if (!formData.budgetRange) newErrors.budgetRange = 'Select a budget range';
    if (!formData.consent) newErrors.consent = 'Consent is required to submit';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    // Simulate API registration delay
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        serviceType: defaultService,
        budgetRange: '',
        message: '',
        consent: false
      });
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className={styles.successPanel}>
        <CheckCircle2 size={48} className={styles.successIcon} style={{ color: 'var(--brand-success)' }} />
        <h4 className={styles.successTitle}>Inquiry Logged Successfully</h4>
        <p className={styles.successDesc}>
          An engineering coordinator from our civil planning desk will review your spatial requirements and contact you within 24 business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.form}>
      <div className={styles.grid}>
        {/* Name */}
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry-name" className={styles.label}>Full Name</label>
          <input
            id="inquiry-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={styles.input}
            disabled={status === 'loading'}
          />
          {errors.name && <span className={styles.errorText}>{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry-phone" className={styles.label}>Phone Number</label>
          <input
            id="inquiry-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className={styles.input}
            disabled={status === 'loading'}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>
      </div>

      <div className={styles.grid}>
        {/* Email */}
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry-email" className={styles.label}>Corporate Email</label>
          <input
            id="inquiry-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@company.com"
            className={styles.input}
            disabled={status === 'loading'}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        {/* City */}
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry-city" className={styles.label}>Project City</label>
          <input
            id="inquiry-city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Bangalore"
            className={styles.input}
            disabled={status === 'loading'}
          />
          {errors.city && <span className={styles.errorText}>{errors.city}</span>}
        </div>
      </div>

      <div className={styles.grid}>
        {/* Service Type */}
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry-service" className={styles.label}>Service division</label>
          <select
            id="inquiry-service"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className={styles.select}
            disabled={status === 'loading'}
          >
            <option value="">Select Specialty</option>
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.value === defaultService ? `✓ ${opt.label}` : opt.label}</option>
            ))}
          </select>
          {errors.serviceType && <span className={styles.errorText}>{errors.serviceType}</span>}
        </div>

        {/* Budget Range */}
        <div className={styles.inputGroup}>
          <label htmlFor="inquiry-budget" className={styles.label}>Budget Bracket</label>
          <select
            id="inquiry-budget"
            name="budgetRange"
            value={formData.budgetRange}
            onChange={handleChange}
            className={styles.select}
            disabled={status === 'loading'}
          >
            <option value="">Select Range</option>
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {errors.budgetRange && <span className={styles.errorText}>{errors.budgetRange}</span>}
        </div>
      </div>

      {/* Message */}
      <div className={styles.inputGroup}>
        <label htmlFor="inquiry-message" className={styles.label}>Project Specifications / Notes (Optional)</label>
        <textarea
          id="inquiry-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Briefly state plot coordinates, layout areas, or special material demands..."
          className={styles.textarea}
          disabled={status === 'loading'}
        />
      </div>

      {/* Consent Checkbox */}
      <div className={styles.inputGroup}>
        <label className={styles.checkboxContainer}>
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className={styles.checkbox}
            disabled={status === 'loading'}
          />
          <span className={styles.checkboxText}>
            I consent to BuildCraft storing these details under corporate data policies and routing estimates drafts to my contact coordinates.
          </span>
        </label>
        {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        variant="primary" 
        disabled={status === 'loading'}
        iconRight={<Send size={16} />}
        style={{ marginTop: '0.5rem' }}
      >
        {status === 'loading' ? 'Transmitting Specs...' : 'Request Initial Feasibility Assessment'}
      </Button>
    </form>
  );
};

export default InquiryForm;
