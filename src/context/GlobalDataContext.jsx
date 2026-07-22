import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchSiteSettings,
  fetchServices,
  fetchPackages,
  fetchProjects,
  fetchTestimonials,
  fetchFAQs,
  fetchCoreValues,
  fetchBlogCategories,
  fetchBlogs
} from '../services/api';

const GlobalDataContext = createContext();

export const useGlobalData = () => useContext(GlobalDataContext);

export const GlobalDataProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    siteSettings: null,
    services: [],
    packages: [],
    projects: [],
    testimonials: [],
    faqs: [],
    coreValues: [],
    blogCategories: [],
    blogs: [],
    isLoading: true,
  });

  useEffect(() => {
    const loadGlobalData = async () => {
      try {
        const [
          settingsRes,
          servicesRes, 
          packagesRes, 
          projectsRes, 
          testimonialsRes, 
          faqsRes,
          coreValuesRes,
          blogCategoriesRes,
          blogsRes
        ] = await Promise.all([
          fetchSiteSettings(),
          fetchServices(),
          fetchPackages(),
          fetchProjects(),
          fetchTestimonials(),
          fetchFAQs(),
          fetchCoreValues(),
          fetchBlogCategories(),
          fetchBlogs()
        ]);
        
        setGlobalData({
          siteSettings: settingsRes && settingsRes.length > 0 ? settingsRes[0] : null,
          services: servicesRes || [],
          packages: packagesRes || [],
          projects: projectsRes || [],
          testimonials: testimonialsRes || [],
          faqs: faqsRes || [],
          coreValues: coreValuesRes || [],
          blogCategories: blogCategoriesRes || [],
          blogs: blogsRes || [],
          isLoading: false,
        });
      } catch (error) {
        console.error("Failed to load global data", error);
        setGlobalData(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadGlobalData();
  }, []);

  return (
    <GlobalDataContext.Provider value={globalData}>
      {children}
    </GlobalDataContext.Provider>
  );
};
