
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
  fetchBlogs,
  fetchGalleryImages,
  fetchJourneyMilestones
} from '../services/api';

import { dummySiteSettings } from '../data/dummySiteSettings';
import { dummyServices } from '../data/dummyServices';
import { dummyPackages } from '../data/dummyPackages';
import { dummyProjects } from '../data/dummyProjects';
import { dummyTestimonials } from '../data/dummyTestimonials';
import { dummyFAQs } from '../data/dummyFAQs';
import { dummyCoreValues } from '../data/dummyCoreValues';
import { dummyBlogs } from '../data/dummyBlogs';
import { dummyGalleryImages } from '../data/dummyGallery';

const GlobalDataContext = createContext();

export const useGlobalData = () => useContext(GlobalDataContext);

export const GlobalDataProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState({
    siteSettings: dummySiteSettings,
    services: dummyServices,
    packages: dummyPackages,
    projects: dummyProjects,
    testimonials: dummyTestimonials,
    faqs: dummyFAQs,
    coreValues: dummyCoreValues,
    blogCategories: [],
    blogs: dummyBlogs,
    galleryImages: dummyGalleryImages,
    journey: [],
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
          blogsRes,
          galleryImagesRes,
          journeyRes
        ] = await Promise.all([
          fetchSiteSettings(),
          fetchServices(),
          fetchPackages(),
          fetchProjects(),
          fetchTestimonials(),
          fetchFAQs(),
          fetchCoreValues(),
          fetchBlogCategories(),
          fetchBlogs(),
          fetchGalleryImages(),
          fetchJourneyMilestones()
        ]);

        setGlobalData({
          siteSettings: (settingsRes && settingsRes.length > 0) ? settingsRes[0] : dummySiteSettings,
          services: (servicesRes && servicesRes.length > 0) ? servicesRes : dummyServices,
          packages: (packagesRes && packagesRes.length > 0) ? packagesRes : dummyPackages,
          projects: (projectsRes && projectsRes.length > 0) ? projectsRes : dummyProjects,
          testimonials: (testimonialsRes && testimonialsRes.length > 0) ? testimonialsRes : dummyTestimonials,
          faqs: (faqsRes && faqsRes.length > 0) ? faqsRes : dummyFAQs,
          coreValues: (coreValuesRes && coreValuesRes.length > 0) ? coreValuesRes : dummyCoreValues,
          blogCategories: blogCategoriesRes || [],
          blogs: (blogsRes && blogsRes.length > 0) ? blogsRes : dummyBlogs,
          galleryImages: (galleryImagesRes && galleryImagesRes.length > 0) ? galleryImagesRes : dummyGalleryImages,
          journey: journeyRes || [],
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
