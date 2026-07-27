import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Plus, Edit2, Trash2, ShieldCheck, ShieldAlert, CheckCircle, Lock } from 'lucide-react';
import UserModalForm from './UserModalForm';
import { useAdminAuth } from '../../context/AdminAuthContext';
import styles from './AdminUsers.module.css';

const AdminUsers = () => {
  const { user: currentUser, hasPermission } = useAdminAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const canEdit = hasPermission('users', 'edit');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/users/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load users', err);
      setError('Failed to load admin user list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenCreateModal = () => {
    if (!canEdit) return;
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (userToEdit) => {
    if (!canEdit) return;
    setEditingUser(userToEdit);
    setIsModalOpen(true);
  };

  const handleSaveUser = async (formData, userId) => {
    if (!canEdit) return;
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    if (userId) {
      // Edit User
      await axios.put(`/api/users/${userId}/`, formData, { headers });
    } else {
      // Create User
      await axios.post('/api/users/', formData, { headers });
    }
    fetchUsers();
  };

  const handleDeleteUser = async (userToDelete) => {
    if (!canEdit) return;
    if (userToDelete.id === currentUser?.id) {
      alert("You cannot delete your own active user account.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete user "${userToDelete.username}"?`)) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/users/${userToDelete.id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) {
        console.error('Failed to delete user', err);
        alert('Failed to delete user.');
      }
    }
  };

  const renderPermissionBadges = (userObj) => {
    if (userObj.is_superuser) {
      return <span className={`${styles.badge} ${styles.badgeSuper}`}>Full Access (Superadmin)</span>;
    }
    if (!userObj.permissions || Object.keys(userObj.permissions).length === 0) {
      return <span className={`${styles.badge} ${styles.badgeNone}`}>No Access</span>;
    }

    const permittedModules = Object.entries(userObj.permissions)
      .filter(([_, p]) => p.view || p.edit)
      .map(([mKey, p]) => `${mKey} (${p.edit ? 'Edit' : 'View'})`);

    if (permittedModules.length === 0) {
      return <span className={`${styles.badge} ${styles.badgeNone}`}>No Access</span>;
    }

    return (
      <div className={styles.badgeList}>
        {permittedModules.map((pm, idx) => (
          <span key={idx} className={`${styles.badge} ${styles.badgePerm}`}>
            {pm}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>
            <Users size={24} /> Admin Users & Permissions
          </h1>
          <p className={styles.pageSubtitle}>
            Manage administrator accounts and configure module access permissions.
          </p>
        </div>
        {canEdit && (
          <button className={styles.addBtn} onClick={handleOpenCreateModal}>
            <Plus size={18} /> Add New Admin User
          </button>
        )}
      </div>

      {error && <div className={styles.errorAlert}>{error}</div>}

      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loading}>Loading Users...</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User Info</th>
                <th>Role</th>
                <th>Granted Module Permissions</th>
                {canEdit && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {u.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className={styles.username}>
                          {u.username} {u.id === currentUser?.id && <span className={styles.youTag}>(You)</span>}
                        </div>
                        <div className={styles.userEmail}>{u.email || 'No email provided'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {u.is_superuser ? (
                      <span className={`${styles.roleBadge} ${styles.roleSuper}`}>
                        <ShieldCheck size={14} /> Superadmin
                      </span>
                    ) : (
                      <span className={`${styles.roleBadge} ${styles.roleCustom}`}>
                        <Lock size={14} /> Custom Admin
                      </span>
                    )}
                  </td>
                  <td>{renderPermissionBadges(u)}</td>
                  {canEdit && (
                    <td style={{ textAlign: 'right' }}>
                      <div className={styles.actionBtns}>
                        <button
                          className={styles.editBtn}
                          onClick={() => handleOpenEditModal(u)}
                          title="Edit User & Permissions"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        {u.id !== currentUser?.id && (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteUser(u)}
                            title="Delete User"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <UserModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        editingUser={editingUser}
      />
    </div>
  );
};

export default AdminUsers;
