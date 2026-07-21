import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <TopNav />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
