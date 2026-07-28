import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Settings, Users, 
  HelpCircle, Briefcase, Award, Image as ImageIcon, CheckCircle, Clock, Map, Star, Shield, List
} from 'lucide-react';
import styles from './Sidebar.module.css';
import logoImg from '../../../Images/logo.png';
import { useGlobalData } from '../../../context/GlobalDataContext';
import { useAdminAuth } from '../../context/AdminAuthContext';

const Sidebar = () => {
  const { siteSettings } = useGlobalData();
  const { hasPermission } = useAdminAuth();
  const currentLogo = siteSettings?.logo || logoImg;

  const menuGroups = [
    {
      title: 'MANAGEMENT',
      items: [
        { name: 'Users & Permissions', icon: <Users size={18} />, path: '/admin/users', moduleKey: 'users' },
      ]
    },
    {
      title: 'CORE CONTENT',
      items: [
        { name: 'Blog Categories', icon: <Map size={18} />, path: '/admin/blog-categories', moduleKey: 'blogs' },
        { name: 'Blog Posts', icon: <FileText size={18} />, path: '/admin/blogs', moduleKey: 'blogs' },
        { name: 'Core Values', icon: <Shield size={18} />, path: '/admin/core-values', moduleKey: 'core_values' },
        { name: 'Journey Milestones', icon: <Clock size={18} />, path: '/admin/journey', moduleKey: 'core_values' },
        { name: 'FAQ Categories', icon: <Map size={18} />, path: '/admin/faq-categories', moduleKey: 'faqs' },
        { name: 'FAQs', icon: <HelpCircle size={18} />, path: '/admin/faqs', moduleKey: 'faqs' },
        { name: 'Gallery', icon: <ImageIcon size={18} />, path: '/admin/gallery', moduleKey: 'gallery' },
        { name: 'Package Categories', icon: <LayoutDashboard size={18} />, path: '/admin/package-material-categories', moduleKey: 'packages' },
        { name: 'Packages', icon: <FileText size={18} />, path: '/admin/packages', moduleKey: 'packages' },
        { name: 'Payment Terms', icon: <CheckCircle size={18} />, path: '/admin/payment-terms', moduleKey: 'packages' },
        { name: 'Page Contents', icon: <LayoutDashboard size={18} />, path: '/admin/pages', moduleKey: 'pages' },
        { name: 'Process Steps', icon: <List size={18} />, path: '/admin/process-steps', moduleKey: 'pages' },
        { name: 'Project Categories', icon: <Map size={18} />, path: '/admin/project-categories', moduleKey: 'projects' },
        { name: 'Projects', icon: <Briefcase size={18} />, path: '/admin/projects', moduleKey: 'projects' },
        { name: 'Service Categories', icon: <Map size={18} />, path: '/admin/service-categories', moduleKey: 'services' },
        { name: 'Services', icon: <Award size={18} />, path: '/admin/services', moduleKey: 'services' },
        { name: 'Site Settings', icon: <Settings size={18} />, path: '/admin/settings', moduleKey: 'settings' },
        { name: 'Testimonials', icon: <Star size={18} />, path: '/admin/testimonials', moduleKey: 'testimonials' },
        { name: 'Trust Features', icon: <CheckCircle size={18} />, path: '/admin/trust-features', moduleKey: 'pages' },
        { name: 'Why Choose Us', icon: <Shield size={18} />, path: '/admin/why-choose-us', moduleKey: 'pages' },
      ]
    }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <img src={currentLogo} alt="Logo" className={styles.logo} />
        <span className={styles.companyName}>{siteSettings?.site_name || 'Paramarsh Construction'}</span>
      </div>
      <nav className={styles.nav}>
        <NavLink end to="/admin/dashboard" className={({ isActive }) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}>
          <LayoutDashboard size={18} />
          <span>Dashboard Overview</span>
        </NavLink>
        
        {menuGroups.map(group => {
          const visibleItems = group.items.filter(item => hasPermission(item.moduleKey, 'view'));
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              {visibleItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
                  }
                >
                  {item.icon}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
