import React, { useState } from 'react';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { usersAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',        label: 'ID',        width: 70 },
  { key: 'name',      label: 'Name' },
  { key: 'email',     label: 'Email' },
  { key: 'role',      label: 'Role',      width: 150 },
  { key: 'lastLogin', label: 'Last Login', width: 130 },
  { key: 'status',    label: 'Status',     width: 100, render: v => <AdminBadge status={v} /> },
];

const ROLES = ['Super Admin', 'Content Editor', 'Sales Manager', 'HR Manager', 'Viewer'];
const EMPTY = { name:'', email:'', role:'Content Editor', status:'active' };

const AdminUsers = () => {
  const [data, setData]   = useState(usersAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id:`U${String(d.length+1).padStart(2,'0')}`, lastLogin:'Never', email: form.email || `${form.name.toLowerCase().replace(' ','.')}@buildcraft.com` }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const toggleStatus = id => setData(d => d.map(r => r.id === id ? { ...r, status: r.status === 'active' ? 'suspended' : 'active' } : r));
  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="User Management" subtitle={`${data.filter(d=>d.status==='active').length} active users`} action="Invite User" onAction={openAdd} actionIcon={UserPlus} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['name','email','role']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => toggleStatus(row.id)} style={{ fontSize:'0.65rem', width:'auto', padding:'0 8px' }}>
              {row.status === 'active' ? 'Suspend' : 'Activate'}
            </button>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Invite New User' : 'Edit User'} size="md"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>{modal.type === 'add' ? 'Send Invite' : 'Save'}</button></div>}
        >
          <div className={s.formGrid}>
            <div className={s.formGroup}><label className={s.label}>Full Name</label><input className={s.input} value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>Email</label><input type="email" className={s.input} value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>Role</label><select className={s.select} value={form.role} onChange={e => setForm(f=>({...f,role:e.target.value}))}>{ROLES.map(r => <option key={r}>{r}</option>)}</select></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))}><option value="active">Active</option><option value="suspended">Suspended</option></select></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete User" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete user <strong>{modal.item.name}</strong>? This is permanent.</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminUsers;
