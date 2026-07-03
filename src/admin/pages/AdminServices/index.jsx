import React, { useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { servicesAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'order',       label: '#',           width: 50 },
  { key: 'id',          label: 'ID',          width: 120 },
  { key: 'title',       label: 'Title' },
  { key: 'tagline',     label: 'Tagline' },
  { key: 'status',      label: 'Status',      width: 100, render: v => <AdminBadge status={v} /> },
  { key: 'lastUpdated', label: 'Last Updated', width: 130 },
];

const EMPTY = { id: '', title: '', tagline: '', status: 'active' };

const AdminServices = () => {
  const [data, setData] = useState(servicesAdminData);
  const [modal, setModal] = useState(null); // null | { type: 'add'|'edit'|'delete', item }
  const [form, setForm] = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY);  setModal({ type: 'add' }); };
  const openEdit = (item) => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = (item) => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') {
      setData(d => [...d, { ...form, order: d.length + 1, lastUpdated: 'Just now' }]);
    } else {
      setData(d => d.map(r => r.id === form.id ? { ...form, lastUpdated: 'Just now' } : r));
    }
    close();
  };

  const del = () => {
    setData(d => d.filter(r => r.id !== modal.item.id));
    close();
  };

  return (
    <div className={s.page}>
      <AdminPageHeader
        title="Service Management"
        subtitle="Manage the services shown on the public website."
        action="Add Service"
        onAction={openAdd}
      />

      <AdminTable
        columns={COLS}
        data={data}
        searchable
        searchKeys={['title', 'tagline', 'id']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />

      {/* Add / Edit Modal */}
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal
          isOpen
          onClose={close}
          title={modal.type === 'add' ? 'Add Service' : 'Edit Service'}
          footer={
            <div className={s.modalFooterBtns}>
              <button className={s.btnSecondary} onClick={close}>Cancel</button>
              <button className={s.btnPrimary} onClick={save}>Save Service</button>
            </div>
          }
        >
          <div className={s.formGrid}>
            <div className={s.formGroup}><label className={s.label}>Service ID</label><input className={s.input} value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} placeholder="e.g. residential" /></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="active">Active</option><option value="draft">Draft</option></select></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Title</label><input className={s.input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Service title" /></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Tagline</label><input className={s.input} value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} placeholder="Short tagline" /></div>
          </div>
        </AdminModal>
      )}

      {/* Delete Confirm */}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Service" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize: '0.85rem', color: '#475569' }}>Are you sure you want to delete <strong>{modal.item.title}</strong>? This action cannot be undone.</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminServices;
