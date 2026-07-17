import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import { isValidEmail } from '../utils/validators';
import styles from './InquiryForm.module.css';

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // idle | loading | success
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim() || !isValidEmail(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message Details are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    // Simulate API registration delay
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1200);
  };

  const handleReset = () => {
    setStatus('idle');
  };

  if (status === 'success') {
    return (
      <div className={styles.successPanel}>
        <CheckCircle2 size={56} className={styles.successIcon} />
        <h3 className={styles.successTitle}>Enquiry Logged</h3>
        <p className={styles.successDesc}>
          Thank you. We have recorded your parameters. An engineer will return calls in 2 business days.
        </p>
        <Button variant="outline" onClick={handleReset}>Submit Another Inquiry</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className={styles.formContainer}>
      <h3 className={styles.formHeader}>Project Inquiry Form</h3>
      
      <div className={styles.inputGroup}>
        <label htmlFor="inq-name" className={styles.formLabel}>Full Name *</label>
        <input 
          type="text" 
          id="inq-name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={styles.formInput} 
          disabled={status === 'loading'}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.grid2}>
        <div className={styles.inputGroup}>
          <label htmlFor="inq-email" className={styles.formLabel}>Email *</label>
          <input 
            type="email" 
            id="inq-email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.formInput} 
            disabled={status === 'loading'}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="inq-phone" className={styles.formLabel}>Phone *</label>
          <input 
            type="tel" 
            id="inq-phone" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.formInput} 
            disabled={status === 'loading'}
          />
          {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="inq-desc" className={styles.formLabel}>Message Details *</label>
        <textarea 
          id="inq-desc" 
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4" 
          className={styles.formInput} 
          style={{ resize: 'vertical' }}
          disabled={status === 'loading'}
        ></textarea>
        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
      </div>

      <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '0.5rem' }} disabled={status === 'loading'}>
        {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'} <Send size={14} style={{ marginLeft: '0.25rem' }} />
      </Button>
    </form>
  );
};

export default InquiryForm;
