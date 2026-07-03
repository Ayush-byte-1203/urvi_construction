import React from 'react';
import { motion } from 'framer-motion';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  }
};

const MotionWrapper = ({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.5,
  triggerOnce = true,
  className = '',
  style = {},
  ...props
}) => {
  // Respect prefers-reduced-motion — render children directly without animation
  if (prefersReducedMotion) {
    return (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    );
  }

  const selectedAnimation = animations[variant] || animations.fadeIn;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, amount: 0.15 }}
      variants={selectedAnimation}
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1]
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
