import React, { useState } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { blogsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',       label: 'ID',       width: 70 },
  { key: 'title',    label: 'Title' },
  { key: 'category', label: 'Category', width: 130 },
  { key: 'author',   label: 'Author',   width: 170 },
  { key: 'views',    label: 'Views',    width: 80, render: v => <span style={{ fontWeight:700, color: v > 0 ? '#0f172a' : '#94a3b8' }}>{v > 0 ? v.toLocaleString() : '—'}</span> },
  { key: 'status',   label: 'Status',   width: 110, render: v => <AdminBadge status={v} /> },
  { key: 'date',     label: 'Date',     width: 130 },
];

const EMPTY = { id: '', title: '', category: 'Guides', author: '', status: 'draft', date: '', views: 0 };

const AdminBlogs = () => {
  const [data, setData]   = useState(blogsAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id: `B${String(d.length+1).padStart(2,'0')}` }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  const totalPublished = data.filter(d => d.status === 'published').length;
  const totalDraft = data.filter(d => d.status === 'draft').length;

  return (
    <div className={s.page}>
      <AdminPageHeader title="Blog / Knowledge Center" subtitle={`${totalPublished} published · ${totalDraft} drafts`} action="New Article" onAction={openAdd} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['title','category','author']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'New Article' : 'Edit Article'} size="lg"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save Article</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Title</label><input className={s.input} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Article title" /></div>
            <div className={s.formGroup}><label className={s.label}>Category</label><select className={s.select} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option>Guides</option><option>Materials</option><option>Technology</option><option>Design</option><option>Legal</option><option>Construction</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Author</label><input className={s.input} value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="draft">Draft</option><option value="published">Published</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Publish Date</label><input type="date" className={s.input} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Excerpt / Summary</label><textarea className={s.textarea} placeholder="Brief summary of the article..." /></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Article" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete <strong>"{modal.item.title}"</strong>?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminBlogs;
