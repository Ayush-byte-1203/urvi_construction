import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Settings, Users, 
  HelpCircle, Briefcase, Award, Image as ImageIcon, CheckCircle, Clock, Map, Star, Shield, List
} from 'lucide-react';
import styles from './Sidebar.module.css';
import logoImg from '../../../Images/logo.png';
import { useGlobalData } from '../../../context/GlobalDataContext';

const Sidebar = () => {
  const { siteSettings } = useGlobalData();
  const currentLogo = siteSettings?.logo || logoImg;

  const menuGroups = [

    {
      title: 'CORE',
      items: [
        { name: 'Blog categorys', icon: <Map size={18} />, path: '/admin/blog-categories' },
        { name: 'Blog posts', icon: <FileText size={18} />, path: '/admin/blogs' },
        { name: 'Core values', icon: <Shield size={18} />, path: '/admin/core-values' },
        { name: 'FAQ Categories', icon: <Map size={18} />, path: '/admin/faq-categories' },
        { name: 'Faqs', icon: <HelpCircle size={18} />, path: '/admin/faqs' },
        { name: 'Package Material Categories', icon: <LayoutDashboard size={18} />, path: '/admin/package-material-categories' },
        { name: 'Packages', icon: <FileText size={18} />, path: '/admin/packages' },
        { name: 'Page contents', icon: <LayoutDashboard size={18} />, path: '/admin/pages' },
        { name: 'Project Categories', icon: <Map size={18} />, path: '/admin/project-categories' },
        { name: 'Projects', icon: <Briefcase size={18} />, path: '/admin/projects' },
        { name: 'Service Categories', icon: <Map size={18} />, path: '/admin/service-categories' },
        { name: 'Services', icon: <Award size={18} />, path: '/admin/services' },
        { name: 'Site Settings', icon: <Settings size={18} />, path: '/admin/settings' },
        { name: 'Testimonials', icon: <Star size={18} />, path: '/admin/testimonials' },
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
        
        {menuGroups.map(group => (
          <div key={group.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>
            {group.items.map((item) => (
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
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
