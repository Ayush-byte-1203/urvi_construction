import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './QuotePopup.module.css';
import emailjs from '@emailjs/browser';
import { useGlobalData } from '../context/GlobalDataContext';
import { appConfig } from '../data/appConfig';
const QuotePopup = () => {
  const { siteSettings } = useGlobalData();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    // Check if the popup has been shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenQuotePopup');
    
    if (!hasSeenPopup) {
      // Show popup after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenQuotePopup', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
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
    
    const whatsappNumber = '919428694361'; // Using footer number as default
    const text = `Hello, I'm interested in starting a home plan. 
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    
    const emailHtml = `
    <h2 style="color: #ff6b35; margin-top: 0; margin-bottom: 5px; font-size: 24px;">New Quote Request</h2>
    <p style="color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 25px;">A new quick quote request has been submitted from the website popup.</p>

    <h3 style="background-color: #f1f5f9; padding: 10px 15px; border-radius: 4px; font-size: 16px; margin-bottom: 15px; color: #334155;">Client Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 35%;">Name:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${formData.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Phone:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${formData.phone}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold;">Email:</td>
        <td style="padding: 8px 0; color: #475569;">${formData.email}</td>
      </tr>
    </table>
    `;

    const templateParams = {
      admin_email: appConfig.company.email,
      user_name: formData.name,
      user_phone: formData.phone,
      user_email: formData.email,
      project_type: 'Quick Quote Popup Inquiry',
      message_html: emailHtml
    };

    emailjs.send(
      siteSettings?.emailjs_service_id || 'service_y7swanm', 
      siteSettings?.emailjs_template_id || 'template_3m9a5ed', 
      templateParams, 
      siteSettings?.emailjs_public_key || 'jmcjMXdDCWLbDjHav'
    ).then((response) => {
      console.log('SUCCESS! Email sent.', response.status, response.text);
    }).catch((error) => {
      console.error('FAILED to send email.', error);
    });

    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
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
              className={styles.input} 
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
              className={styles.input} 
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
              className={styles.input} 
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className={styles.submitBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuotePopup;
