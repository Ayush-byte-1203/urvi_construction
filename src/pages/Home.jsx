import React, { useEffect, useContext } from 'react';
import SEO from '../components/SEO';
import LoadingSpinner from '../components/LoadingSpinner';
import { useGlobalData } from '../context/GlobalDataContext';
import { usePageData } from '../hooks/usePageData';
import { HeaderThemeContext } from '../components/Layout';

// New Homepage Sections
import HeroSection from '../components/home/HeroSection';
import TrustIntroSection from '../components/home/TrustIntroSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import ServicesSection from '../components/home/ServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ClientSpotlightSection from '../components/home/ClientSpotlightSection';
import PortfolioPreviewSection from '../components/home/PortfolioPreviewSection';

const Home = () => {
  const { setHeaderTheme } = useContext(HeaderThemeContext);
  const { siteSettings, isLoading: isGlobalLoading } = useGlobalData();
  const { pageData, isLoading: isPageLoading } = usePageData('home');
  
  const isLoading = isGlobalLoading || isPageLoading;

  useEffect(() => {
    // Dark header theme for transparent dark navigation with top gradient
    setHeaderTheme('dark');
  }, [setHeaderTheme]);

  if (isLoading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  const seoDescription = pageData?.subtitle || 'Welcome to our premium construction services. We build certainty and architectural excellence.';
  const siteName = siteSettings?.site_name || 'Premium Builder';

  return (
    <div className="home-page">
      <SEO
        title="Home"
        description={seoDescription}
        url="/"
      />

      {/* 1. Cinematic Hero */}
      <HeroSection />

      {/* 2. Trust & Intro (100% Turnkey Solutions) */}
      <TrustIntroSection />

      {/* 3. Why Choose Us (6 Features) */}
      <WhyChooseUsSection />

      {/* 4. Our Services Preview (6 Cards) */}
      <ServicesSection />

      {/* 5. How It Works (Process Narrative) */}
      <ProcessSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* 6. Testimonials (3 Client Reviews) */}
      <TestimonialsSection />

      {/* 7. Client Review Spotlight (Video + Feature Review) */}
      <ClientSpotlightSection />

      {/* 8. Portfolio Preview (3 Projects) */}
      <PortfolioPreviewSection />

    </div>
  );
};

export default Home;
