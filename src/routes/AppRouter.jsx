import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../layouts/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ROUTES } from '../constants/routes';

// ── Public pages ──────────────────────────────────────────────────────────────
const Home             = lazy(() => import('../pages/Home'));
const Dashboard        = lazy(() => import('../pages/Dashboard'));
const About            = lazy(() => import('../pages/About'));
const Services         = lazy(() => import('../pages/Services'));
const ServiceDetail    = lazy(() => import('../pages/ServiceDetail'));
const Packages         = lazy(() => import('../pages/Packages'));
const PackageDetail    = lazy(() => import('../pages/PackageDetail'));
const Projects         = lazy(() => import('../pages/Projects'));
const ProjectDetail    = lazy(() => import('../pages/ProjectDetail'));
const Process          = lazy(() => import('../pages/Process'));
const Testimonials     = lazy(() => import('../pages/Testimonials'));
const Blog             = lazy(() => import('../pages/Blog'));
const BlogDetail       = lazy(() => import('../pages/BlogDetail'));
const FAQ              = lazy(() => import('../pages/FAQ'));
const Careers          = lazy(() => import('../pages/Careers'));
const Contact          = lazy(() => import('../pages/Contact'));
const PrivacyPolicy    = lazy(() => import('../pages/PrivacyPolicy'));
const TermsConditions  = lazy(() => import('../pages/TermsConditions'));
const CookiePolicy     = lazy(() => import('../pages/CookiePolicy'));
const NotFound         = lazy(() => import('../pages/NotFound'));

// ── Admin CMS ─────────────────────────────────────────────────────────────────
const AdminLayout      = lazy(() => import('../admin/layouts/AdminLayout'));
const AdminDashboard   = lazy(() => import('../admin/pages/AdminDashboard'));
const AdminServices    = lazy(() => import('../admin/pages/AdminServices'));
const AdminPackages    = lazy(() => import('../admin/pages/AdminPackages'));
const AdminProjects    = lazy(() => import('../admin/pages/AdminProjects'));
const AdminBlogs       = lazy(() => import('../admin/pages/AdminBlogs'));
const AdminTestimonials= lazy(() => import('../admin/pages/AdminTestimonials'));
const AdminFAQ         = lazy(() => import('../admin/pages/AdminFAQ'));
const AdminBrands      = lazy(() => import('../admin/pages/AdminBrands'));
const AdminLeads       = lazy(() => import('../admin/pages/AdminLeads'));
const AdminQuotes      = lazy(() => import('../admin/pages/AdminQuotes'));
const AdminCareers     = lazy(() => import('../admin/pages/AdminCareers'));
const AdminApplications= lazy(() => import('../admin/pages/AdminApplications'));
const AdminNewsletter  = lazy(() => import('../admin/pages/AdminNewsletter'));
const AdminDownloads   = lazy(() => import('../admin/pages/AdminDownloads'));
const AdminMedia       = lazy(() => import('../admin/pages/AdminMedia'));
const AdminUsers       = lazy(() => import('../admin/pages/AdminUsers'));
const AdminRoles       = lazy(() => import('../admin/pages/AdminRoles'));
const AdminSEO         = lazy(() => import('../admin/pages/AdminSEO'));
const AdminPageBuilder = lazy(() => import('../admin/pages/AdminPageBuilder'));
const AdminCities      = lazy(() => import('../admin/pages/AdminCities'));
const AdminNavigation  = lazy(() => import('../admin/pages/AdminNavigation'));
const AdminAnalytics   = lazy(() => import('../admin/pages/AdminAnalytics'));
const AdminSettings    = lazy(() => import('../admin/pages/AdminSettings'));

const AppRouter = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LoadingSpinner />
        </div>
      }>
        <Routes>
          {/* ── Admin CMS ── */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index                         element={<AdminDashboard />} />
            <Route path="content/services"       element={<AdminServices />} />
            <Route path="content/packages"       element={<AdminPackages />} />
            <Route path="content/projects"       element={<AdminProjects />} />
            <Route path="content/blogs"          element={<AdminBlogs />} />
            <Route path="content/testimonials"   element={<AdminTestimonials />} />
            <Route path="content/faq"            element={<AdminFAQ />} />
            <Route path="content/brands"         element={<AdminBrands />} />
            <Route path="leads"                  element={<AdminLeads />} />
            <Route path="quotes"                 element={<AdminQuotes />} />
            <Route path="careers"                element={<AdminCareers />} />
            <Route path="applications"           element={<AdminApplications />} />
            <Route path="newsletter"             element={<AdminNewsletter />} />
            <Route path="downloads"              element={<AdminDownloads />} />
            <Route path="media"                  element={<AdminMedia />} />
            <Route path="users"                  element={<AdminUsers />} />
            <Route path="roles"                  element={<AdminRoles />} />
            <Route path="seo"                    element={<AdminSEO />} />
            <Route path="page-builder"           element={<AdminPageBuilder />} />
            <Route path="cities"                 element={<AdminCities />} />
            <Route path="navigation"             element={<AdminNavigation />} />
            <Route path="analytics"              element={<AdminAnalytics />} />
            <Route path="settings"              element={<AdminSettings />} />
          </Route>

          {/* ── Public website ── */}
          <Route path={ROUTES.HOME}           element={<Home />} />
          <Route path={ROUTES.DASHBOARD}      element={<Dashboard />} />
          <Route path={ROUTES.ABOUT}          element={<About />} />
          <Route path={ROUTES.SERVICES}       element={<Services />} />
          <Route path={ROUTES.SERVICE_DETAIL} element={<ServiceDetail />} />
          <Route path={ROUTES.PACKAGES}       element={<Packages />} />
          <Route path={ROUTES.PACKAGE_DETAIL} element={<PackageDetail />} />
          <Route path={ROUTES.PROJECTS}       element={<Projects />} />
          <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetail />} />
          <Route path={ROUTES.PROCESS}        element={<Process />} />
          <Route path={ROUTES.TESTIMONIALS}   element={<Testimonials />} />
          <Route path={ROUTES.BLOG}           element={<Blog />} />
          <Route path={ROUTES.BLOG_DETAIL}    element={<BlogDetail />} />
          <Route path={ROUTES.FAQ}            element={<FAQ />} />
          <Route path={ROUTES.CAREERS}        element={<Careers />} />
          <Route path={ROUTES.CONTACT}        element={<Contact />} />
          <Route path={ROUTES.PRIVACY}        element={<PrivacyPolicy />} />
          <Route path={ROUTES.TERMS}          element={<TermsConditions />} />
          <Route path={ROUTES.COOKIES}        element={<CookiePolicy />} />
          <Route path="*"                     element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default AppRouter;
