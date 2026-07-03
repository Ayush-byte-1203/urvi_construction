import React, { useState } from 'react';
import { Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { faqAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'order',    label: '#',        width: 50 },
  { key: 'id',       label: 'ID',       width: 70 },
  { key: 'question', label: 'Question' },
  { key: 'category', label: 'Category', width: 110 },
  { key: 'status',   label: 'Status',   width: 100, render: v => <AdminBadge status={v} /> },
];

const EMPTY = { id: '', question: '', category: 'general', status: 'active', order: 1 };

const AdminFAQ = () => {
  const [data, setData]   = useState(faqAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm({ ...EMPTY, order: data.length + 1 }); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id: `F${String(d.length+1).padStart(2,'0')}` }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const toggle = id => setData(d => d.map(r => r.id === id ? { ...r, status: r.status === 'active' ? 'hidden' : 'active' } : r));
  const del    = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="FAQ Manager" subtitle={`${data.filter(d => d.status === 'active').length} active · ${data.filter(d => d.status === 'hidden').length} hidden`} action="Add FAQ" onAction={openAdd} />
      <AdminTable columns={COLS} data={[...data].sort((a,b) => a.order - b.order)} searchable searchKeys={['question','category']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => toggle(row.id)} title="Toggle status" style={{ fontSize:'0.65rem', padding:'0 6px', width:'auto' }}>{row.status === 'active' ? 'Hide' : 'Show'}</button>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Add FAQ' : 'Edit FAQ'} size="lg"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save FAQ</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Question</label><input className={s.input} value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="FAQ question..." /></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Answer</label><textarea className={s.textarea} style={{ minHeight:100 }} placeholder="Detailed answer..." /></div>
            <div className={s.formGroup}><label className={s.label}>Category</label><select className={s.select} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option value="general">General</option><option value="pricing">Pricing</option><option value="process">Process</option><option value="warranty">Warranty</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="active">Active</option><option value="hidden">Hidden</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Display Order</label><input type="number" className={s.input} value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} /></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete FAQ" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete this FAQ?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminFAQ;
