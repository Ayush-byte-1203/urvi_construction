import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { brandsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'order',    label: '#',       width: 50 },
  { key: 'name',     label: 'Brand Name' },
  { key: 'category', label: 'Category', width: 130 },
  { key: 'tier',     label: 'Tier',     width: 100, render: v => <AdminBadge status={v} /> },
  { key: 'status',   label: 'Status',   width: 100, render: v => <AdminBadge status={v} /> },
];

const EMPTY = { name:'', category:'Cement', tier:'standard', status:'draft', order:1 };

const AdminBrands = () => {
  const [data, setData]   = useState(brandsAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm({ ...EMPTY, order: data.length+1 }); setModal({ type:'add' }); };
  const openEdit = item => { setForm(item); setModal({ type:'edit', item }); };
  const openDel  = item => setModal({ type:'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id:`BR${String(d.length+1).padStart(2,'0')}` }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };
  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Material Brands" subtitle="Manage trusted partner brands shown on the website." action="Add Brand" onAction={openAdd} />
      <AdminTable columns={COLS} data={[...data].sort((a,b)=>a.order-b.order)} searchable searchKeys={['name','category']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Add Brand' : 'Edit Brand'} size="md"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Brand Name</label><input className={s.input} value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>Category</label><select className={s.select} value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}><option>Cement</option><option>Steel</option><option>Electrical</option><option>Paints</option><option>Flooring</option><option>Sanitary</option><option>Plumbing</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Partner Tier</label><select className={s.select} value={form.tier} onChange={e => setForm(f=>({...f,tier:e.target.value}))}><option value="standard">Standard</option><option value="premium">Premium</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))}><option value="draft">Draft</option><option value="active">Active</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Display Order</label><input type="number" className={s.input} value={form.order} onChange={e => setForm(f=>({...f,order:Number(e.target.value)}))} /></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Brand" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete brand <strong>{modal.item.name}</strong>?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminBrands;
