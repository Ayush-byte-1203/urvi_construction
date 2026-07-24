import React from 'react';
import { useGlobalData } from '../context/GlobalDataContext';
import styles from './FloatingWhatsApp.module.css';

const FloatingWhatsApp = () => {
  const { siteSettings } = useGlobalData();
  
  const rawPhone = siteSettings?.contact_phone || '918320978291'; 
  const whatsappNumber = rawPhone.replace(/[^0-9]/g, '');
  const message = "Hi! I am looking for construction services. Can we discuss my project?";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" className={styles.whatsappIcon} xmlns="http://www.w3.org/2000/svg">
        <path d="M16.111.455c-8.621 0-15.617 6.994-15.617 15.613 0 2.766.726 5.46 2.102 7.842L.452 31.547l7.818-2.051c2.31.127 5.006 1.942 7.841 1.942 8.62 0 15.616-6.994 15.616-15.613C31.728 7.45 24.733.455 16.111.455zm.006 28.539c-2.316 0-4.582-.622-6.568-1.796l-.47-.279-4.887 1.282 1.306-4.764-.307-.488c-1.286-2.046-1.966-4.417-1.966-6.866 0-7.07 5.753-12.822 12.826-12.822 7.071 0 12.823 5.751 12.823 12.822 0 7.071-5.751 12.823-12.824 12.823l.067-.912zm7.042-9.61c-.386-.194-2.285-1.127-2.639-1.256-.353-.129-.611-.194-.868.194-.257.388-.997 1.256-1.222 1.514-.225.259-.45.291-.836.097-2.392-1.199-4.225-2.23-5.836-4.978-.256-.437.256-.407.994-1.884.129-.259.064-.485-.032-.68-.096-.194-.868-2.095-1.19-2.871-.314-.757-.633-.655-.868-.667-.225-.011-.482-.011-.74-.011-.257 0-.675.097-1.029.485-.354.388-1.35 1.319-1.35 3.214 0 1.895 1.382 3.725 1.575 3.984.193.259 2.716 4.143 6.585 5.814 2.829 1.222 3.864.971 4.57.81.791-.177 2.285-.933 2.607-1.836.321-.902.321-1.674.225-1.836-.096-.162-.353-.259-.739-.453z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
