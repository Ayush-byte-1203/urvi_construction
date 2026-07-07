import { useState, useEffect } from 'react';
import { THEME } from '@constants/theme';

export const useViewport = () => {
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width <= THEME.breakpoints.mobile,
    isTablet: width <= THEME.breakpoints.tablet,
    isDesktop: width > THEME.breakpoints.tablet && width <= THEME.breakpoints.desktop,
    isLargeDesktop: width > THEME.breakpoints.largeDesktop
  };
};

export default useViewport;
