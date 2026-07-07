import React, { useState, useEffect } from 'react';
import styles from './Textarea.module.css';

const Textarea = ({
  label,
  error,
  helperText,
  id,
  disabled = false,
  maxLength,
  value = '',
  onChange,
  className = '',
  rows = 4,
  ...props
}) => {
  const textareaId = id || `textarea-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`;
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(value ? value.toString().length : 0);
  }, [value]);

  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) onChange(e);
  };

  const textareaClasses = [
    styles.textarea,
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.formGroup}>
      <div className={styles.labelWrapper}>
        {label && (
          <label htmlFor={textareaId} className={styles.label}>
            {label}
          </label>
        )}
        {maxLength && (
          <span className={styles.counter}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        className={textareaClasses}
        disabled={disabled}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        rows={rows}
        {...props}
      />
      {error && <span className={styles.errorMsg}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export default Textarea;
