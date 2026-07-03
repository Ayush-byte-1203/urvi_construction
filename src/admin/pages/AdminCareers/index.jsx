import React, { useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { careersAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',           label: 'ID',          width: 70 },
  { key: 'title',        label: 'Job Title' },
  { key: 'department',   label: 'Department',  width: 140 },
  { key: 'type',         label: 'Type',        width: 110 },
  { key: 'location',     label: 'Location',    width: 110 },
  { key: 'applications', label: 'Applications',width: 110, render: v => <span style={{ fontWeight:700, color:'#0f172a' }}>{v}</span> },
  { key: 'status',       label: 'Status',      width: 100, render: v => <AdminBadge status={v} /> },
  { key: 'posted',       label: 'Posted',      width: 130 },
];

const EMPTY = { id:'', title:'', department:'Engineering', type:'full-time', location:'Vadodara', status:'draft', applications:0, posted:'' };

const AdminCareers = () => {
  const [data, setData]   = useState(careersAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id:`JB${String(d.length+1).padStart(2,'0')}`, posted:'Just now' }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };

  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Job Postings" subtitle={`${data.filter(d=>d.status==='active').length} active openings`} action="Post New Job" onAction={openAdd} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['title','department','location']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Post New Job' : 'Edit Job Posting'} size="lg"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Job Title</label><input className={s.input} value={form.title} onChange={e => setForm(f => ({...f, title:e.target.value}))} placeholder="e.g. Senior Civil Engineer" /></div>
            <div className={s.formGroup}><label className={s.label}>Department</label><select className={s.select} value={form.department} onChange={e => setForm(f => ({...f, department:e.target.value}))}><option>Engineering</option><option>Design</option><option>PMC</option><option>Operations</option><option>Sales</option><option>HR</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Employment Type</label><select className={s.select} value={form.type} onChange={e => setForm(f => ({...f, type:e.target.value}))}><option value="full-time">Full-time</option><option value="part-time">Part-time</option><option value="contract">Contract</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Location</label><input className={s.input} value={form.location} onChange={e => setForm(f => ({...f, location:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f => ({...f, status:e.target.value}))}><option value="draft">Draft</option><option value="active">Active</option><option value="closed">Closed</option></select></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Job Description</label><textarea className={s.textarea} style={{ minHeight:100 }} placeholder="Role responsibilities, requirements..." /></div>
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Job Posting" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete "<strong>{modal.item.title}</strong>"?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminCareers;
