import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import { rolesAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const MODULES  = ['dashboard', 'content', 'leads', 'hr', 'media', 'config'];
const PERMS    = ['read', 'write', 'delete'];

const AdminRoles = () => {
  const [roles, setRoles] = useState(rolesAdminData);
  const [activeRole, setActiveRole] = useState(rolesAdminData[0].id);

  const role = roles.find(r => r.id === activeRole);

  const hasPerm = (module, perm) =>
    role?.permissions[module]?.includes(perm) ?? false;

  const togglePerm = (module, perm) => {
    setRoles(rs => rs.map(r => {
      if (r.id !== activeRole) return r;
      const current = r.permissions[module] ?? [];
      const updated  = current.includes(perm)
        ? current.filter(p => p !== perm)
        : [...current, perm];
      return { ...r, permissions: { ...r.permissions, [module]: updated } };
    }));
  };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Roles & Permissions" subtitle="Define what each role can read, write, or delete." />

      <div className={ts.layout}>
        {/* Role selector */}
        <div className={ts.roleList}>
          {roles.map(r => (
            <button
              key={r.id}
              className={`${ts.roleItem} ${r.id === activeRole ? ts.roleItemActive : ''}`}
              onClick={() => setActiveRole(r.id)}
            >
              <span className={ts.roleName}>{r.name}</span>
              <span className={ts.roleDesc}>{r.description}</span>
            </button>
          ))}
        </div>

        {/* Permission matrix */}
        <div className={ts.permPanel}>
          <h3 className={ts.permTitle}>{role?.name}</h3>
          <p className={ts.permDesc}>{role?.description}</p>

          <table className={ts.permTable}>
            <thead>
              <tr>
                <th>Module</th>
                {PERMS.map(p => <th key={p} style={{ textTransform:'capitalize' }}>{p}</th>)}
              </tr>
            </thead>
            <tbody>
              {MODULES.map(mod => (
                <tr key={mod}>
                  <td style={{ fontWeight:600, textTransform:'capitalize', fontSize:'0.82rem', color:'#0f172a' }}>{mod}</td>
                  {PERMS.map(perm => (
                    <td key={perm}>
                      <button
                        className={`${ts.permBtn} ${hasPerm(mod, perm) ? ts.permBtnOn : ''}`}
                        onClick={() => role?.name !== 'Super Admin' && togglePerm(mod, perm)}
                        disabled={role?.name === 'Super Admin'}
                        title={role?.name === 'Super Admin' ? 'Super Admin cannot be restricted' : `Toggle ${perm}`}
                      >
                        {hasPerm(mod, perm) ? <Check size={14} /> : <X size={14} />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {role?.name !== 'Super Admin' && (
            <div style={{ marginTop:'1rem', display:'flex', justifyContent:'flex-end' }}>
              <button className={s.btnPrimary} onClick={() => alert('Permissions saved (mock)')}>Save Permissions</button>
            </div>
          )}
          {role?.name === 'Super Admin' && (
            <div className={s.infoAlert} style={{ marginTop:'1rem' }}>
              Super Admin always has full access to all modules and cannot be restricted.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRoles;
