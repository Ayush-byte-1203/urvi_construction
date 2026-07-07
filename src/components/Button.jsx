import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.btn,
    styles[variant],
    loading ? styles.loading : '',
    (disabled || loading) ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner}></span>}
      {!loading && iconLeft && <span style={{ display: 'inline-flex' }}>{iconLeft}</span>}
      {children}
      {!loading && iconRight && <span style={{ display: 'inline-flex' }}>{iconRight}</span>}
    </button>
  );
};

export default Button;
