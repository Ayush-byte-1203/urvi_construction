import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Settings, ChevronLeft, ChevronRight,
  Briefcase, FileText, Package, FolderKanban, BookOpen,
  Star, HelpCircle, Award, Users, Shield, Mail, Download,
  Image, BarChart2, Globe, MapPin, Navigation, Layers,
  Phone, MessageSquare, Bell, Search, LogOut, User,
  ChevronDown, Wrench, Database
} from 'lucide-react';
import { ADMIN_ROUTES } from '../../../constants/routes';
import { adminNotifications } from '../../data/adminDummyData';
import styles from './styles.module.css';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: ADMIN_ROUTES.ROOT, label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { to: ADMIN_ROUTES.ANALYTICS, label: 'Analytics', icon: BarChart2 },
    ]
  },
  {
    label: 'Content',
    items: [
      { to: ADMIN_ROUTES.SERVICES,     label: 'Services',      icon: Wrench },
      { to: ADMIN_ROUTES.PACKAGES,     label: 'Packages',      icon: Package },
      { to: ADMIN_ROUTES.PROJECTS,     label: 'Projects',      icon: FolderKanban },
      { to: ADMIN_ROUTES.BLOGS,        label: 'Blog / Knowledge', icon: BookOpen },
      { to: ADMIN_ROUTES.TESTIMONIALS, label: 'Testimonials',  icon: Star },
      { to: ADMIN_ROUTES.FAQ,          label: 'FAQ',           icon: HelpCircle },
      { to: ADMIN_ROUTES.BRANDS,       label: 'Material Brands', icon: Award },
    ]
  },
  {
    label: 'Leads & CRM',
    items: [
      { to: ADMIN_ROUTES.LEADS,  label: 'Lead Inbox',     icon: Phone },
      { to: ADMIN_ROUTES.QUOTES, label: 'Quote Requests', icon: FileText },
    ]
  },
  {
    label: 'HR',
    items: [
      { to: ADMIN_ROUTES.CAREERS,      label: 'Job Postings',  icon: Briefcase },
      { to: ADMIN_ROUTES.APPLICATIONS, label: 'Applications',  icon: Users },
    ]
  },
  {
    label: 'Communication',
    items: [
      { to: ADMIN_ROUTES.NEWSLETTER, label: 'Newsletter',  icon: Mail },
      { to: ADMIN_ROUTES.DOWNLOADS,  label: 'Downloads',   icon: Download },
    ]
  },
  {
    label: 'Media',
    items: [
      { to: ADMIN_ROUTES.MEDIA, label: 'Media Library', icon: Image },
    ]
  },
  {
    label: 'Authority',
    items: [
      { to: ADMIN_ROUTES.USERS, label: 'Users',              icon: User },
      { to: ADMIN_ROUTES.ROLES, label: 'Roles & Permissions', icon: Shield },
    ]
  },
  {
    label: 'Configuration',
    items: [
      { to: ADMIN_ROUTES.SEO,          label: 'SEO Manager',   icon: Globe },
      { to: ADMIN_ROUTES.PAGE_BUILDER, label: 'Page Builder',  icon: Layers },
      { to: ADMIN_ROUTES.CITIES,       label: 'Cities',        icon: MapPin },
      { to: ADMIN_ROUTES.NAVIGATION,   label: 'Navigation',    icon: Navigation },
      { to: ADMIN_ROUTES.SETTINGS,     label: 'Settings',      icon: Settings },
    ]
  },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const unread = adminNotifications.filter(n => !n.read).length;

  const getBreadcrumb = () => {
    const path = location.pathname;
    const allItems = navGroups.flatMap(g => g.items);
    const match = allItems.find(item =>
      item.exact ? path === item.to : path.startsWith(item.to) && item.to !== ADMIN_ROUTES.ROOT
    ) || allItems.find(i => i.to === ADMIN_ROUTES.ROOT);
    return match ? match.label : 'Admin';
  };

  return (
    <div className={styles.adminShell}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.sidebarCollapsed : ''} ${mobileOpen ? styles.sidebarMobileOpen : ''}`}>
        <div className={styles.sidebarBrand}>
          {!collapsed && (
            <div className={styles.brandText}>
              <span className={styles.brandName}>BuildCraft</span>
              <span className={styles.brandRole}>Admin CMS</span>
            </div>
          )}
          <button
            className={styles.collapseBtn}
            onClick={() => setCollapsed(!collapsed)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          {navGroups.map((group) => (
            <div key={group.label} className={styles.navGroup}>
              {!collapsed && (
                <span className={styles.navGroupLabel}>{group.label}</span>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? location.pathname === item.to
                  : location.pathname.startsWith(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                    title={collapsed ? item.label : ''}
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon size={18} className={styles.navIcon} />
                    {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {!collapsed && (
          <div className={styles.sidebarFooter}>
            <div className={styles.adminAvatar}>
              <span className={styles.avatarCircle}>SJ</span>
              <div>
                <span className={styles.avatarName}>Sandeep Joshi</span>
                <span className={styles.avatarRole}>Super Admin</span>
              </div>
            </div>
            <button className={styles.logoutBtn} aria-label="Sign out">
              <LogOut size={15} />
            </button>
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main area */}
      <div className={`${styles.adminMain} ${collapsed ? styles.adminMainExpanded : ''}`}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Open menu"
            >
              <Database size={20} />
            </button>
            <div className={styles.breadcrumb}>
              <span className={styles.breadcrumbRoot}>Admin</span>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>{getBreadcrumb()}</span>
            </div>
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.topbarSearch}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search anything..."
                className={styles.searchInput}
                aria-label="Admin search"
              />
            </div>

            <div className={styles.notifWrapper}>
              <button
                className={styles.notifBtn}
                onClick={() => setNotifOpen(!notifOpen)}
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unread > 0 && <span className={styles.notifBadge}>{unread}</span>}
              </button>

              {notifOpen && (
                <div className={styles.notifDropdown}>
                  <div className={styles.notifHeader}>
                    <span>Notifications</span>
                    <span className={styles.notifCount}>{unread} new</span>
                  </div>
                  {adminNotifications.map(n => (
                    <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}>
                      <span className={styles.notifMsg}>{n.message}</span>
                      <span className={styles.notifTime}>{n.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.topbarUser}>
              <span className={styles.topbarAvatarCircle}>SJ</span>
              <span className={styles.topbarUserName}>Sandeep</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className={styles.adminContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
