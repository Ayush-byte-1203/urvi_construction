
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
  fetchJourneyMilestones,
  fetchWhyChooseUs,
  fetchProcessSteps,
  fetchTrustFeatures,
  fetchProjectCategories,
  fetchPaymentTerms
} from '../services/api';

import { dummySiteSettings } from '../data/dummySiteSettings';
import { dummyServices } from '../data/dummyServices';
import { dummyPackages } from '../data/dummyPackages';
import { dummyProjects } from '../data/dummyProjects';
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
    testimonials: [],
    faqs: dummyFAQs,
    coreValues: dummyCoreValues,
    blogCategories: [],
    blogs: dummyBlogs,
    galleryImages: dummyGalleryImages,
    journey: [],
    whyChooseUs: [],
    processSteps: [],
    trustFeatures: [],
    projectCategories: [],
    paymentTerms: [],
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
          journeyRes,
          whyRes,
          processRes,
          trustRes,
          projectCategoriesRes,
          paymentTermsRes
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
          fetchJourneyMilestones(),
          fetchWhyChooseUs(),
          fetchProcessSteps(),
          fetchTrustFeatures(),
          fetchProjectCategories(),
          fetchPaymentTerms()
        ]);

        setGlobalData({
          siteSettings: (settingsRes && settingsRes.length > 0) ? settingsRes[0] : dummySiteSettings,
          services: (servicesRes && servicesRes.length > 0) ? servicesRes : dummyServices,
          packages: (packagesRes && packagesRes.length > 0) ? packagesRes : dummyPackages,
          projects: (projectsRes && projectsRes.length > 0) ? projectsRes : dummyProjects,
          testimonials: Array.isArray(testimonialsRes) ? testimonialsRes : [],
          faqs: (faqsRes && faqsRes.length > 0) ? faqsRes : dummyFAQs,
          coreValues: (coreValuesRes && coreValuesRes.length > 0) ? coreValuesRes : dummyCoreValues,
          blogCategories: blogCategoriesRes || [],
          blogs: (blogsRes && blogsRes.length > 0) ? blogsRes : dummyBlogs,
          galleryImages: (galleryImagesRes && galleryImagesRes.length > 0) ? galleryImagesRes : dummyGalleryImages,
          journey: journeyRes || [],
          whyChooseUs: whyRes || [],
          processSteps: processRes || [],
          trustFeatures: trustRes || [],
          projectCategories: projectCategoriesRes || [],
          paymentTerms: paymentTermsRes || [],
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
