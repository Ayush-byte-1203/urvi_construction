import React, { useState, useEffect } from 'react';
import Button from '@components/Button';
import styles from './CookieConsent.module.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('buildcraft-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAction = (type) => {
    localStorage.setItem('buildcraft-cookie-consent', type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-labelledby="cookie-title">
      <div>
        <h4 id="cookie-title" className={styles.title}>Cookie Preferences</h4>
        <p className={styles.text} style={{ marginTop: '0.25rem' }}>
          We use analytics cookies to optimize layout loading speeds and portfolio sorting options.
        </p>
      </div>

      <div className={styles.buttons}>
        <Button 
          variant="ghost" 
          onClick={() => handleAction('rejected')}
          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
        >
          Reject All
        </Button>
        <Button 
          variant="primary" 
          onClick={() => handleAction('accepted')}
          style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
        >
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;
