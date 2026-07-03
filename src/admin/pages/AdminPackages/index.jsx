import React, { useState } from 'react';
import { Edit, Trash2, Star } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { packagesAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',      label: 'ID',      width: 70 },
  { key: 'name',    label: 'Package Name' },
  { key: 'city',    label: 'City',    width: 110 },
  { key: 'price',   label: 'Price/sqft', width: 110 },
  { key: 'tier',    label: 'Tier',    width: 90,  render: v => <AdminBadge status={v} /> },
  { key: 'popular', label: 'Popular', width: 90,  render: v => v ? <AdminBadge status="active" custom="Yes" /> : <span style={{ color:'#94a3b8', fontSize:'0.72rem' }}>No</span> },
  { key: 'status',  label: 'Status',  width: 90,  render: v => <AdminBadge status={v} /> },
];

const EMPTY = { id: '', name: '', city: 'Vadodara', price: '', tier: 'basic', popular: false, status: 'active' };

const AdminPackages = () => {
  const [data, setData]   = useState(packagesAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, form]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Package Management" subtitle="Manage city-based construction cost packages." action="Add Package" onAction={openAdd} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['name', 'city', 'id']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Add Package' : 'Edit Package'}
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGrid}>
            <div className={s.formGroup}><label className={s.label}>Package Name</label><input className={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>City</label><select className={s.select} value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}><option>Vadodara</option><option>Surat</option><option>Anand</option><option>Bharuch</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Price/sqft</label><input className={s.input} value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. ₹1,650" /></div>
            <div className={s.formGroup}><label className={s.label}>Tier</label><select className={s.select} value={form.tier} onChange={e => setForm(f => ({ ...f, tier: e.target.value }))}><option value="basic">Basic</option><option value="mid">Mid</option><option value="premium">Premium</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="active">Active</option><option value="draft">Draft</option></select></div>
            <div className={s.formGroup} style={{ justifyContent:'flex-end', alignItems:'flex-end' }}><label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.82rem', color:'#475569', cursor:'pointer' }}><input type="checkbox" checked={form.popular} onChange={e => setForm(f => ({ ...f, popular: e.target.checked }))} /> Mark as Popular</label></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Package" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete <strong>{modal.item.name}</strong> ({modal.item.city})?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminPackages;
