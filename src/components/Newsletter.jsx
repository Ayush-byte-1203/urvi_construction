import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { isValidEmail } from '@utils/validators';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid engineering coordinates email address.');
      return;
    }

    setStatus('loading');

    // Simulate API registration delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <div className={styles.container}>
      {status === 'success' ? (
        <span className={styles.successText}>
          ✓ Successfully registered for BuildCraft estimates.
        </span>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter business email"
            className={styles.input}
            disabled={status === 'loading'}
            aria-label="Newsletter email address"
          />
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Loading...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && <span className={styles.errorText}>{errorMsg}</span>}
      
      <p className={styles.privacyText}>
        * By signing up, you consent to BuildCraft storing email specifications under data policies.
      </p>
    </div>
  );
};

export default Newsletter;
