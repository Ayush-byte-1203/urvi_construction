import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteScrollToTop from './components/RouteScrollToTop';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { ROUTES } from './data/routes';

// ── Public pages ──────────────────────────────────────────────────────────────
const Home             = lazy(() => import('./pages/Home.jsx'));
const About            = lazy(() => import('./pages/About.jsx'));
const Services         = lazy(() => import('./pages/Services.jsx'));
const ServiceDetail    = lazy(() => import('./pages/ServiceDetail.jsx'));
const Packages         = lazy(() => import('./pages/Packages.jsx'));
const PackageDetail    = lazy(() => import('./pages/PackageDetail.jsx'));
const Projects         = lazy(() => import('./pages/Projects.jsx'));
const ProjectDetail    = lazy(() => import('./pages/ProjectDetail.jsx'));
const Process          = lazy(() => import('./pages/Process.jsx'));
const Testimonials     = lazy(() => import('./pages/Testimonials.jsx'));
const FAQ              = lazy(() => import('./pages/FAQ.jsx'));
const Contact          = lazy(() => import('./pages/Contact.jsx'));
const PrivacyPolicy    = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsConditions  = lazy(() => import('./pages/TermsConditions.jsx'));
const Blog             = lazy(() => import('./pages/Blog.jsx'));
const BlogDetail       = lazy(() => import('./pages/BlogDetail.jsx'));
const NotFound         = lazy(() => import('./pages/NotFound.jsx'));

const AppRouter = () => (
  <BrowserRouter>
    <RouteScrollToTop />
    <Layout>
      <Suspense fallback={
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner />
        </div>
      }>
        <Routes>
          {/* ── Public website ── */}
          <Route path={ROUTES.HOME}           element={<Home />} />
          <Route path={ROUTES.ABOUT}          element={<About />} />
          <Route path={ROUTES.SERVICES}       element={<Services />} />
          <Route path={ROUTES.SERVICE_DETAIL} element={<ServiceDetail />} />
          <Route path={ROUTES.PACKAGES}       element={<Packages />} />
          <Route path={ROUTES.PACKAGE_DETAIL} element={<PackageDetail />} />
          <Route path={ROUTES.PROJECTS}       element={<Projects />} />
          <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetail />} />
          <Route path={ROUTES.PROCESS}        element={<Process />} />
          <Route path={ROUTES.TESTIMONIALS}   element={<Testimonials />} />
          <Route path={ROUTES.FAQ}            element={<FAQ />} />
          <Route path={ROUTES.CONTACT}        element={<Contact />} />
          <Route path={ROUTES.PRIVACY}        element={<PrivacyPolicy />} />
          <Route path={ROUTES.TERMS}          element={<TermsConditions />} />
          <Route path={ROUTES.BLOG}           element={<Blog />} />
          <Route path={ROUTES.BLOG_DETAIL}    element={<BlogDetail />} />
          <Route path="*"                     element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default AppRouter;
