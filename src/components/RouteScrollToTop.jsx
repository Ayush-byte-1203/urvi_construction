import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let attempts = 0;
      const findAndScroll = () => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (!findAndScroll()) {
        const interval = setInterval(() => {
          attempts++;
          if (findAndScroll() || attempts >= 30) {
            clearInterval(interval);
          }
        }, 100);

        return () => clearInterval(interval);
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash]);

  return null;
};

export default RouteScrollToTop;
