import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';

const Login = lazy(() => import('../pages/Login/Login'));
const DashboardLayout = lazy(() => import('../components/layout/DashboardLayout'));
const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'));
const AdminProjects = lazy(() => import('../pages/Projects/AdminProjects'));
const AdminServices = lazy(() => import('../pages/Services/AdminServices'));
const AdminPackages = lazy(() => import('../pages/Packages/AdminPackages'));
const AdminBlogs = lazy(() => import('../pages/Blogs/AdminBlogs'));
const AdminTestimonials = lazy(() => import('../pages/SiteContent/AdminTestimonials'));
const AdminFAQs = lazy(() => import('../pages/SiteContent/AdminFAQs'));
const AdminCoreValues = lazy(() => import('../pages/SiteContent/AdminCoreValues'));
const AdminGallery = lazy(() => import('../pages/SiteContent/AdminGallery'));

const AdminPageContents = lazy(() => import('../pages/SiteContent/AdminPageContents'));
const AdminProjectCategories = lazy(() => import('../pages/Categories/AdminProjectCategories'));
const AdminServiceCategories = lazy(() => import('../pages/Categories/AdminServiceCategories'));
const AdminFAQCategories = lazy(() => import('../pages/Categories/AdminFAQCategories'));
const AdminBlogCategories = lazy(() => import('../pages/Categories/AdminBlogCategories'));
const AdminSiteSettings = lazy(() => import('../pages/Settings/AdminSiteSettings'));
const AdminPackageAdvantages = lazy(() => import('../pages/Packages/AdminPackageAdvantages'));
const AdminPackageMaterialCategories = lazy(() => import('../pages/Packages/AdminPackageMaterialCategories'));
const AdminPackageMaterialSpecs = lazy(() => import('../pages/Packages/AdminPackageMaterialSpecs'));
const AdminPackageFAQs = lazy(() => import('../pages/Packages/AdminPackageFAQs'));
const AdminProjectImages = lazy(() => import('../pages/Projects/AdminProjectImages'));

const AdminRoutes = () => {
  return (
    <AdminAuthProvider>
      <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading Admin...</div>}>
        <Routes>
          <Route path="login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="packages" element={<AdminPackages />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="faqs" element={<AdminFAQs />} />
              <Route path="core-values" element={<AdminCoreValues />} />
              <Route path="gallery" element={<AdminGallery />} />

              <Route path="pages" element={<AdminPageContents />} />
              <Route path="project-categories" element={<AdminProjectCategories />} />
              <Route path="service-categories" element={<AdminServiceCategories />} />
              <Route path="faq-categories" element={<AdminFAQCategories />} />
              <Route path="blog-categories" element={<AdminBlogCategories />} />
              <Route path="settings" element={<AdminSiteSettings />} />
              <Route path="package-advantages" element={<AdminPackageAdvantages />} />
              <Route path="package-material-categories" element={<AdminPackageMaterialCategories />} />
              <Route path="package-material-specs" element={<AdminPackageMaterialSpecs />} />
              <Route path="package-faqs" element={<AdminPackageFAQs />} />
              <Route path="project-images" element={<AdminProjectImages />} />
            </Route>
          </Route>

          <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AdminAuthProvider>
  );
};

export default AdminRoutes;
