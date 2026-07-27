import React, { useEffect, useContext, useState } from 'react';
import SEO from '../components/SEO';
import { HeaderThemeContext } from '../components/Layout';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './Contact.module.css';

const Contact = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings } = useGlobalData();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    setHeaderTheme('light');
  }, [setHeaderTheme]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted (Stub):", formData);
    alert("Thank you for your message. We will get back to you shortly.");
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="page-wrapper">
      <SEO 
        title="Contact Us | Reach Our Experts"
        description="Get in touch with our construction and design experts for a free consultation or project estimation."
      />

      <header className="subpage-header" style={{ backgroundImage: `linear-gradient(rgba(8, 12, 24, 0.72), rgba(8, 12, 24, 0.60)), url('https://images.unsplash.com/photo-1590495914106-4d048d6db95a?auto=format&fit=crop&w=1920&q=80')` }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="breadcrumbs">
              <a href="/">Home</a>
              <span>/</span>
              <span>Contact</span>
            </div>
            <h1>Let's Build Something Great</h1>
            <p className="subtitle">
              Whether you have a completed architectural plan or just a rough idea, our experts are ready to guide you.
            </p>
          </motion.div>
        </div>
      </header>

      <section className={`section container ${styles.contactSection}`}>
        <div className={styles.grid}>
          
          {/* Left: Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.infoCol}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.cardTitle}>Head Office</h3>
              <p className={styles.cardDesc}>Visit our experience center to discuss your project over coffee.</p>
              
              <ul className={styles.contactList}>
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}><MapPin size={20} /></div>
                  <div>
                    <strong>Address</strong>
                    <p style={{ whiteSpace: 'pre-wrap' }}>{siteSettings?.address || '45, 100 Feet Road, Indiranagar,\nBengaluru, Karnataka 560038'}</p>
                  </div>
                </li>
                
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}><Phone size={20} /></div>
                  <div>
                    <strong>Phone</strong>
                    <p><a href={`tel:${siteSettings?.contact_phone ? siteSettings.contact_phone.replace(/\D/g, '') : '+919876543210'}`}>{siteSettings?.contact_phone || '+91 98765 43210'}</a></p>
                  </div>
                </li>
                
                <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}><Mail size={20} /></div>
                  <div>
                    <strong>Email</strong>
                    <p><a href={`mailto:${siteSettings?.contact_email || 'hello@premiumbuilder.in'}`}>{siteSettings?.contact_email || 'hello@premiumbuilder.in'}</a></p>
                  </div>
                </li>
                
                {/* <li className={styles.contactItem}>
                  <div className={styles.iconWrapper}><Clock size={20} /></div>
                  <div>
                    <strong>Business Hours</strong>
                    <p>Mon - Sat: 9:00 AM - 6:30 PM<br/>Sunday: By Appointment</p>
                  </div>
                </li> */}
              </ul>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={styles.formCol}
          >
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <form onSubmit={handleSubmit} className={styles.form}>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      className="form-control" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="form-control" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Project Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-control" 
                    rows="5"
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Submit Inquiry <Send size={16} style={{ marginLeft: '8px' }} />
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
