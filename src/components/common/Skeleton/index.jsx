import React from 'react';
import styles from './styles.module.css';

const Skeleton = ({
  width = '100%',
  height,
  variant = 'rect',
  className = '',
  style,
  ...props
}) => {
  const classes = [
    styles.skeleton,
    styles[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      style={{
        width,
        height,
        ...style
      }}
      {...props}
    />
  );
};

export default Skeleton;
