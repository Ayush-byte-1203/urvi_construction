import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { projectsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',            label: 'ID',         width: 70 },
  { key: 'name',          label: 'Project Name' },
  { key: 'location',      label: 'Location',   width: 120 },
  { key: 'category',      label: 'Category',   width: 120 },
  { key: 'value',         label: 'Value',      width: 100 },
  { key: 'completionPct', label: 'Progress',   width: 120, render: v => (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <div style={{ flex:1, height:6, background:'#e2e8f0', borderRadius:999, overflow:'hidden' }}>
        <div style={{ width:`${v}%`, height:'100%', background:'linear-gradient(90deg,#3b82f6,#6366f1)', borderRadius:999 }} />
      </div>
      <span style={{ fontSize:'0.72rem', fontWeight:700, color:'#3b82f6', minWidth:32 }}>{v}%</span>
    </div>
  )},
  { key: 'status',   label: 'Status',   width: 110, render: v => <AdminBadge status={v} /> },
  { key: 'featured', label: 'Featured', width: 90,  render: v => v ? <AdminBadge status="active" custom="Yes" /> : <span style={{ color:'#94a3b8', fontSize:'0.72rem' }}>No</span> },
];

const EMPTY = { id: '', name: '', location: '', category: 'Residential', value: '', completionPct: 0, status: 'ongoing', featured: false, client: '', startDate: '' };

const AdminProjects = () => {
  const [data, setData]   = useState(projectsAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id: `PR${String(d.length+1).padStart(2,'0')}` }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Projects Management" subtitle="Manage portfolio projects and case studies." action="Add Project" onAction={openAdd} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['name','location','category','client']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Add Project' : 'Edit Project'} size="lg"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save Project</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Project Name</label><input className={s.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Location</label><input className={s.input} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Category</label><select className={s.select} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}><option>Residential</option><option>Commercial</option><option>Industrial</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Client</label><input className={s.input} value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Project Value</label><input className={s.input} value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="e.g. ₹4.2 Cr" /></div>
            <div className={s.formGroup}><label className={s.label}>Start Date</label><input className={s.input} value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Completion %</label><input type="number" min="0" max="100" className={s.input} value={form.completionPct} onChange={e => setForm(f => ({ ...f, completionPct: Number(e.target.value) }))} /></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option value="ongoing">Ongoing</option><option value="completed">Completed</option></select></div>
            <div className={s.formGroup}><label style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.82rem', color:'#475569', cursor:'pointer', marginTop:'1.5rem' }}><input type="checkbox" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} /> Featured Project</label></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Project" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete <strong>{modal.item.name}</strong>?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminProjects;
