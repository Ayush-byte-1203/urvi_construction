import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Button from './Button';
import { isValidEmail } from '../utils/validators';
import { appConfig } from '../data/appConfig';
import emailjs from '@emailjs/browser';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './InquiryForm.module.css';

const InquiryForm = () => {
  const { siteSettings } = useGlobalData();
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

    // Generate WhatsApp Message
    const generateWhatsAppMessage = () => {
      return `Hello Paramarsh Construction,

I have submitted an inquiry on your website. Here are my details:

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}

*Message:*
${formData.message}

Looking forward to hearing from you!`;
    };

    setStatus('loading');

    const emailHtml = `
    <h2 style="color: #ff6b35; margin-top: 0; margin-bottom: 5px; font-size: 24px;">New General Inquiry</h2>
    <p style="color: #64748b; font-size: 14px; margin-top: 0; margin-bottom: 25px;">A new project inquiry has been submitted via the contact form.</p>

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
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email:</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #475569;">${formData.email}</td>
      </tr>
    </table>

    <h3 style="background-color: #f1f5f9; padding: 10px 15px; border-radius: 4px; font-size: 16px; margin-bottom: 15px; color: #334155;">Message Content</h3>
    <div style="background-color: #ffffff; border: 1px solid #e2e8f0; padding: 15px; border-radius: 4px; font-size: 14px; color: #475569; white-space: pre-wrap; line-height: 1.5;">
      ${formData.message}
    </div>
    `;

    const templateParams = {
      admin_email: appConfig.company.email,
      user_name: formData.name,
      user_phone: formData.phone,
      user_email: formData.email,
      project_type: 'General Website Inquiry',
      addons: formData.message, // Fallback
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

    // Create a new window immediately to bypass browser popup blockers
    const whatsappWindow = window.open('', '_blank');

    // Simulate API registration delay
    setTimeout(() => {
      setStatus('success');
      
      // WhatsApp Redirection
      const whatsappNumber = appConfig.company.phoneFormatted;
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      
      // Set the URL of the previously opened window
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        // Fallback if popup was still blocked
        window.location.href = whatsappUrl;
      }
      
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
