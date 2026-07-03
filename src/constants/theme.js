export const THEME = {
  breakpoints: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
    largeDesktop: 1280
  },
  animations: {
    durations: {
      fast: 0.2,     // in seconds
      normal: 0.35,
      slow: 0.6
    },
    ease: [0.25, 1, 0.5, 1] // Custom cubic-bezier for premium feel
  },
  zIndex: {
    header: 100,
    menuOverlay: 101,
    modal: 200,
    notification: 300
  },
  iconSizes: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48
  },
  buttonSizes: {
    small: {
      padding: '0.6rem 1.25rem',
      fontSize: '0.875rem'
    },
    medium: {
      padding: '1rem 2rem',
      fontSize: '0.95rem'
    }
  }
};
