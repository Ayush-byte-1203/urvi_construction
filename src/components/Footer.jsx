import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Share2, MessageSquare, Send } from 'lucide-react';
import { appConfig } from '../data/appConfig';
import { navigationData } from '../data/navigationData';
import Logo from './Logo';
import { useGlobalData } from '../context/GlobalDataContext';
// import Newsletter from './Newsletter';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { footerLinks } = navigationData;
  const { siteSettings } = useGlobalData();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.footerGrid}`}>
        {/* Brand Column */}
        <div className={`${styles.footerCol} ${styles.footerColBrand}`}>
          <div className="mb-3">
            <Logo />
          </div>
          <p className={styles.footerDescription}>
            Your One-Point Solution for All Construction Challenges          </p>
          <div className={styles.socialLinks}>
            <a href={siteSettings?.facebook_url || appConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook Page Link"><Globe size={18} /></a>
            <a href={siteSettings?.twitter_url || appConfig.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter Page Link"><MessageSquare size={18} /></a>
            <a href={siteSettings?.instagram_url || appConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Profile Link"><Share2 size={18} /></a>
            <a href={siteSettings?.linkedin_url || appConfig.social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile Link"><Send size={18} /></a>
          </div>
        </div>

        {/* Links Column */}
        <div className={styles.footerCol}>
          <h3 className={styles.footerColTitle}>Explore</h3>
          <ul className={styles.footerLinks}>
            {footerLinks.navigation.map((link, idx) => (
              <li key={idx}><Link to={link.path}>{link.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Specialties Column */}
        <div className={styles.footerCol}>
          <h3 className={styles.footerColTitle}>Specialties</h3>
          <ul className={styles.footerLinks}>
            {footerLinks.specialties.map((link, idx) => (
              <li key={idx}><Link to={link.path}>{link.name}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contacts & Newsletter */}
        <div className={`${styles.footerCol} ${styles.footerColContact}`}>
          <h3 className={styles.footerColTitle}>Corporate Update</h3>
          <div className={styles.footerContactItems}>
            <div className={styles.footerContactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <a href={`tel:${siteSettings?.contact_phone ? siteSettings.contact_phone.replace(/\D/g, '') : appConfig.company.phoneFormatted.replace('tel:', '')}`}>{siteSettings?.contact_phone || appConfig.company.phone}</a>
            </div>
            <div className={styles.footerContactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <a href={`mailto:${siteSettings?.contact_email || appConfig.company.email}`}>{siteSettings?.contact_email || appConfig.company.email}</a>
            </div>
            <div className={styles.footerContactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <span>{siteSettings?.address || appConfig.company.address}</span>
            </div>
          </div>


        </div>
      </div>

      {/* Sub Footer links */}
      <div className={styles.subFooter}>
        <div className={`container ${styles.subFooterContent}`}>
          <p className={styles.copyright}>
            &copy; {currentYear} {siteSettings?.site_name || appConfig.company.name}. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            {footerLinks.legal.map((link, idx) => (
              <Link key={idx} to={link.path}>{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
