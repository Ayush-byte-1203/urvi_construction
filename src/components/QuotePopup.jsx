import React, { useState, useEffect } from 'react';
import { X, ClipboardList } from 'lucide-react';
import styles from './QuotePopup.module.css';

const QuotePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openQuotePopup', handleOpen);
    return () => window.removeEventListener('openQuotePopup', handleOpen);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // STUB: Wire this to a real backend like Formspree, EmailJS, or custom API
    console.log('Form Submitted (Stub):', formData);
    alert('Thank you for your inquiry. This is a stub submission.');
    setIsOpen(false);
  };

  return (
    <>
      {/* Persistent Trigger Button */}
      <button 
        className={styles.persistentTrigger} 
        onClick={() => setIsOpen(true)}
        aria-label="Get Free Quote"
      >
        <ClipboardList size={20} />
        <span>Get Quote</span>
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleClose} aria-label="Close modal">
              <X size={18} />
            </button>
            
            <span className={styles.badge}>GET FREE QUOTE</span>
            
            <h2 className={styles.title}>Start Your Home Plan</h2>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="form-control"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuotePopup;
