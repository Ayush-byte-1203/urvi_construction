import React, { useState } from 'react';
import { Edit, Trash2, MapPin } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { citiesAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',       label: 'ID',       width: 70 },
  { key: 'name',     label: 'City' },
  { key: 'state',    label: 'State',    width: 120 },
  { key: 'packages', label: 'Packages', width: 100, render: v => <strong style={{ color:'#0f172a' }}>{v}</strong> },
  { key: 'leads',    label: 'Leads',    width: 100, render: v => <strong style={{ color:'#0f172a' }}>{v}</strong> },
  { key: 'active',   label: 'Status',   width: 100, render: v => <AdminBadge status={v ? 'active' : 'draft'} custom={v ? 'Active' : 'Inactive'} /> },
];

const EMPTY = { name:'', state:'Gujarat', active:false };

const AdminCities = () => {
  const [data, setData]   = useState(citiesAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type:'add' }); };
  const openEdit = item => { setForm(item); setModal({ type:'edit', item }); };
  const openDel  = item => setModal({ type:'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id:`C${String(d.length+1).padStart(2,'0')}`, packages:0, leads:0 }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };
  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Cities" subtitle="Manage active service cities and package coverage." action="Add City" onAction={openAdd} actionIcon={MapPin} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['name','state']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Add City' : 'Edit City'} size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGrid}>
            <div className={s.formGroup}><label className={s.label}>City Name</label><input className={s.input} value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>State</label><input className={s.input} value={form.state} onChange={e => setForm(f=>({...f,state:e.target.value}))} /></div>
            <div className={s.formGroup}><label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.82rem', color:'#475569', cursor:'pointer' }}><input type="checkbox" checked={form.active} onChange={e => setForm(f=>({...f,active:e.target.checked}))} /> Active City</label></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete City" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete <strong>{modal.item.name}</strong>?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminCities;
