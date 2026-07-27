import React, { useState, useEffect } from 'react';
import { X, Shield, Lock, User as UserIcon, Mail, CheckCircle2 } from 'lucide-react';
import styles from './UserModalForm.module.css';

const MODULES = [
  { key: 'projects', label: 'Projects & Categories' },
  { key: 'services', label: 'Services & Categories' },
  { key: 'packages', label: 'Packages & Material Specs' },
  { key: 'blogs', label: 'Blog Posts & Categories' },
  { key: 'testimonials', label: 'Client Testimonials' },
  { key: 'faqs', label: 'FAQs & FAQ Categories' },
  { key: 'gallery', label: 'Gallery Images' },
  { key: 'core_values', label: 'Core Values & Journey' },
  { key: 'pages', label: 'Page Contents' },
  { key: 'settings', label: 'Site Settings' },
  { key: 'users', label: 'User & Permission Management' }
];

const UserModalForm = ({ isOpen, onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    is_superuser: false,
    permissions: {}
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (editingUser) {
      setFormData({
        username: editingUser.username || '',
        email: editingUser.email || '',
        password: '', // blank unless changing
        is_superuser: Boolean(editingUser.is_superuser),
        permissions: editingUser.permissions || {}
      });
    } else {
      // Default initial state for new user
      const initialPerms = {};
      MODULES.forEach(m => {
        initialPerms[m.key] = { view: true, edit: true };
      });
      setFormData({
        username: '',
        email: '',
        password: '',
        is_superuser: false,
        permissions: initialPerms
      });
    }
    setErrorMsg('');
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  const handlePermissionToggle = (moduleKey, action) => {
    setFormData(prev => {
      const currentModulePerm = prev.permissions[moduleKey] || { view: false, edit: false };
      const updatedModulePerm = {
        ...currentModulePerm,
        [action]: !currentModulePerm[action]
      };
      // If edit is turned on, view should also be turned on
      if (action === 'edit' && updatedModulePerm.edit) {
        updatedModulePerm.view = true;
      }
      // If view is turned off, edit should also be turned off
      if (action === 'view' && !updatedModulePerm.view) {
        updatedModulePerm.edit = false;
      }

      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [moduleKey]: updatedModulePerm
        }
      };
    });
  };

  const handleSelectAll = (enable) => {
    const updated = {};
    MODULES.forEach(m => {
      updated[m.key] = { view: enable, edit: enable };
    });
    setFormData(prev => ({ ...prev, permissions: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.username.trim()) {
      setErrorMsg('Username is required.');
      return;
    }
    if (!editingUser && !formData.password) {
      setErrorMsg('Password is required for new users.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave(formData, editingUser?.id);
      onClose();
    } catch (err) {
      console.error('Error saving user:', err);
      setErrorMsg(err.response?.data?.username?.[0] || err.response?.data?.email?.[0] || 'Failed to save user account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{editingUser ? 'Edit User & Permissions' : 'Create New Admin User'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {errorMsg && <div className={styles.errorAlert}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Account Credentials</h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label><UserIcon size={14} /> Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. jondoe"
                  required
                />
              </div>

              <div className={styles.field}>
                <label><Mail size={14} /> Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div className={styles.field}>
                <label><Lock size={14} /> {editingUser ? 'Password (leave blank to keep unchanged)' : 'Password'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required={!editingUser}
                />
              </div>

              <div className={styles.fieldFull}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.is_superuser}
                    onChange={(e) => setFormData({ ...formData, is_superuser: e.target.checked })}
                  />
                  <span className={styles.checkboxText}>
                    <strong>Superadmin / Full System Access</strong>
                    <span className={styles.checkboxDesc}>Superadmins bypass all module restrictions and have full control over everything.</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {!formData.is_superuser && (
            <div className={styles.section}>
              <div className={styles.permHeader}>
                <h3 className={styles.sectionTitle}>Module Permissions</h3>
                <div className={styles.bulkActions}>
                  <button type="button" onClick={() => handleSelectAll(true)}>Grant All</button>
                  <button type="button" onClick={() => handleSelectAll(false)}>Revoke All</button>
                </div>
              </div>

              <div className={styles.permTableWrapper}>
                <table className={styles.permTable}>
                  <thead>
                    <tr>
                      <th>Module / Feature</th>
                      <th style={{ textAlign: 'center', width: '100px' }}>View</th>
                      <th style={{ textAlign: 'center', width: '100px' }}>Edit / Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MODULES.map(m => {
                      const perm = formData.permissions[m.key] || { view: false, edit: false };
                      return (
                        <tr key={m.key}>
                          <td>
                            <strong>{m.label}</strong>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={Boolean(perm.view)}
                              onChange={() => handlePermissionToggle(m.key, 'view')}
                            />
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            <input
                              type="checkbox"
                              checked={Boolean(perm.edit)}
                              onChange={() => handlePermissionToggle(m.key, 'edit')}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModalForm;
