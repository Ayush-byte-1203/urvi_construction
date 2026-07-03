import React, { useState } from 'react';
import { Edit, Trash2, Star } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { testimonialsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',      label: 'ID',      width: 70 },
  { key: 'author',  label: 'Author' },
  { key: 'project', label: 'Project', width: 180 },
  { key: 'rating',  label: 'Rating',  width: 110, render: v => (
    <span style={{ display:'flex', gap:2 }}>{[...Array(5)].map((_,i) => <Star key={i} size={12} fill={i < v ? '#f59e0b' : 'none'} color={i < v ? '#f59e0b' : '#d1d5db'} />)}</span>
  )},
  { key: 'status',  label: 'Status',  width: 100, render: v => <AdminBadge status={v} /> },
  { key: 'date',    label: 'Date',    width: 130 },
];

const EMPTY = { id: '', author: '', project: '', rating: 5, status: 'pending', date: '', quote: '' };

const AdminTestimonials = () => {
  const [data, setData]   = useState(testimonialsAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id: `T${String(d.length+1).padStart(2,'0')}` }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const approve = id => setData(d => d.map(r => r.id === id ? { ...r, status: 'active' } : r));
  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Testimonials" subtitle="Manage client reviews and approval status." action="Add Testimonial" onAction={openAdd} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['author','project']}
        actions={row => (
          <>
            {row.status === 'pending' && <button className={s.iconBtn} style={{ color:'#16a34a', borderColor:'#bbf7d0' }} onClick={() => approve(row.id)} title="Approve">✓</button>}
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Add Testimonial' : 'Edit Testimonial'} size="lg"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGrid}>
            <div className={s.formGroup}><label className={s.label}>Author</label><input className={s.input} value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Project</label><input className={s.input} value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Rating</label><select className={s.select} value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))}><option value={5}>5 Stars</option><option value={4}>4 Stars</option><option value={3}>3 Stars</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="pending">Pending</option><option value="active">Active</option></select></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Quote</label><textarea className={s.textarea} value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} /></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Testimonial" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete testimonial from <strong>{modal.item.author}</strong>?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminTestimonials;
