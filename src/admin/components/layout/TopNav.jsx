import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { LogOut, User } from 'lucide-react';
import styles from './TopNav.module.css';

const TopNav = () => {
  const { user, logout } = useAdminAuth();

  return (
    <header className={styles.topNav}>
      <div className={styles.titleArea}>
        <h2>Control Studio</h2>
        <span className={styles.statusBadge}>
          <span className={styles.dot}></span>
          Live Django Server
        </span>
      </div>
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>S</div>
          <span className={styles.userEmail}>{user?.email || 'Sandbox Admin'}</span>
        </div>
        <button className={styles.logoutBtn} onClick={logout} title="Log Out">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default TopNav;
