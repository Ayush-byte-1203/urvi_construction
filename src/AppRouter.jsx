import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RouteScrollToTop from './components/RouteScrollToTop';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import { ROUTES } from './data/routes';

// ── Public pages ──────────────────────────────────────────────────────────────
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'));
const Packages = lazy(() => import('./pages/Packages.jsx'));
// PackageDetail route removed
const Projects = lazy(() => import('./pages/Projects.jsx'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsConditions = lazy(() => import('./pages/TermsConditions.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const CityLanding = lazy(() => import('./pages/CityLanding.jsx'));
const AdminRoutes = lazy(() => import('./admin/routes/AdminRoutes.jsx'));

const AppRouter = () => (
  <BrowserRouter>
    <RouteScrollToTop />
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    }>
      <Routes>
        {/* ── Admin Area (No Layout) ── */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* ── Public website with Layout ── */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.ABOUT} element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/packages" element={<Packages />} />
              {/* PackageDetail removed */}
              <Route path={ROUTES.PROJECTS} element={<Projects />} />
              <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetail />} />
              <Route path={ROUTES.CONTACT} element={<Contact />} />
              <Route path={ROUTES.PRIVACY} element={<PrivacyPolicy />} />
              <Route path={ROUTES.TERMS} element={<TermsConditions />} />
              <Route path={ROUTES.BLOG} element={<Blog />} />
              <Route path={ROUTES.BLOG_DETAIL} element={<BlogDetail />} />
              {/* Dynamic City Landing page - catches unmatched root slugs */}
              <Route path="/:citySlug" element={<CityLanding />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
