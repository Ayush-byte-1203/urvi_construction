import { useState, useEffect } from 'react';
import { fetchPageContent } from '../services/api';

export const usePageData = (pageName) => {
  const [pageData, setPageData] = useState(null);
  const [sections, setSections] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPageData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPageContent(pageName);
        if (data) {
          setPageData(data);
          
          // Map sections array to an object keyed by section_name for easy access
          if (data.sections) {
            const sectionsMap = data.sections.reduce((acc, sec) => {
              acc[sec.section_name] = sec;
              return acc;
            }, {});
            setSections(sectionsMap);
          }
        }
      } catch (error) {
        console.error(`Failed to load page data for ${pageName}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    if (pageName) {
      loadPageData();
    }
  }, [pageName]);

  return { pageData, sections, isLoading };
};
