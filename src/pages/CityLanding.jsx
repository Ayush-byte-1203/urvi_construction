import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import { HeaderThemeContext } from '../components/Layout';

// Reuse Homepage Sections
import HeroSection from '../components/home/HeroSection';
import TrustIntroSection from '../components/home/TrustIntroSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ClientSpotlightSection from '../components/home/ClientSpotlightSection';
import PortfolioPreviewSection from '../components/home/PortfolioPreviewSection';

const CityLanding = () => {
  const { citySlug } = useParams();
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, isLoading: isPageLoading } = usePageData('home'); // We reuse home data for the structure
  
  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    setHeaderTheme('none');
  }, [setHeaderTheme]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  // Format the city name
  const cityName = citySlug ? citySlug.charAt(0).toUpperCase() + citySlug.slice(1).replace(/-/g, ' ') : '';
  const seoDescription = `Premium construction and architectural services in ${cityName}. We build certainty and architectural excellence.`;

  return (
    <div className="home-page city-landing">
      <SEO
        title={`Construction Services in ${cityName}`}
        description={seoDescription}
        url={`/${citySlug}`}
      />

      {/* 1. Cinematic Hero with City Context */}
      <HeroSection cityContext={cityName} />

      {/* 2. Trust & Intro */}
      <TrustIntroSection />

      {/* 3. Why Choose Us */}
      <WhyChooseUsSection />

      {/* 4. Our Services Preview */}
      <ServicesSection />

      {/* 5. How It Works */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. Client Review Spotlight */}
      <ClientSpotlightSection />

      {/* 8. Portfolio Preview */}
      <PortfolioPreviewSection />

    </div>
  );
};

export default CityLanding;
