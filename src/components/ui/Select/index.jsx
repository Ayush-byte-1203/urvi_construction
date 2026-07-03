import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './styles.module.css';

const Select = ({
  label,
  options = [],
  error,
  helperText,
  id,
  disabled = false,
  className = '',
  placeholder = 'Select an option',
  ...props
}) => {
  const selectId = id || `select-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`;

  const selectClasses = [
    styles.select,
    error ? styles.error : '',
    disabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.formGroup}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt, idx) => {
            const isObj = typeof opt === 'object';
            const value = isObj ? opt.value : opt;
            const text = isObj ? opt.label : opt;
            return (
              <option key={idx} value={value} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                {text}
              </option>
            );
          })}
        </select>
        <span className={styles.arrowIcon}>
          <ChevronDown size={18} />
        </span>
      </div>
      {error && <span className={styles.errorMsg}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
};

export default Select;
