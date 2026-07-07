import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  error,
  success,
  helperText,
  icon,
  id,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`;

  const inputClasses = [
    styles.input,
    icon ? styles.inputWithIcon : '',
    error ? styles.error : '',
    success ? styles.success : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <input
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export default Input;
