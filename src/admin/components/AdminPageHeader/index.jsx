import React from 'react';
import { Plus } from 'lucide-react';
import styles from './styles.module.css';

const AdminPageHeader = ({ title, subtitle, action, onAction, actionIcon: ActionIcon = Plus }) => (
  <div className={styles.header}>
    <div>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
    {action && (
      <button className={styles.actionBtn} onClick={onAction}>
        <ActionIcon size={16} />
        {action}
      </button>
    )}
  </div>
);

export default AdminPageHeader;
