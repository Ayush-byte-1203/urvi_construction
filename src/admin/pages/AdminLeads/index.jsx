import React, { useState } from 'react';
import { Edit, Trash2, Phone, Mail } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { leadsData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',      label: 'ID',       width: 70 },
  { key: 'name',    label: 'Name' },
  { key: 'phone',   label: 'Phone',    width: 160 },
  { key: 'city',    label: 'City',     width: 110 },
  { key: 'service', label: 'Interest', width: 130 },
  { key: 'source',  label: 'Source',   width: 110 },
  { key: 'status',  label: 'Status',   width: 110, render: v => <AdminBadge status={v} /> },
  { key: 'date',    label: 'Date',     width: 130 },
];

const STATUSES = ['new','contacted','converted','closed'];

const AdminLeads = () => {
  const [data, setData]   = useState(leadsData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({});

  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => { setData(d => d.map(r => r.id === form.id ? form : r)); close(); };
  const del  = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  const stats = {
    new:       data.filter(d => d.status === 'new').length,
    contacted: data.filter(d => d.status === 'contacted').length,
    converted: data.filter(d => d.status === 'converted').length,
    closed:    data.filter(d => d.status === 'closed').length,
  };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Lead Inbox" subtitle={`${data.length} total leads · ${stats.new} new`} />

      {/* Quick stats strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        {STATUSES.map(st => (
          <div key={st} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'1rem 1.25rem' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'#0f172a' }}>{stats[st]}</div>
            <div style={{ fontSize:'0.75rem', color:'#64748b', textTransform:'capitalize', marginTop:4 }}>{st}</div>
          </div>
        ))}
      </div>

      <AdminTable columns={COLS} data={data} searchable searchKeys={['name','email','city','service','source']}
        actions={row => (
          <>
            <a href={`tel:${row.phone}`} className={s.iconBtn} title="Call" style={{ color:'#16a34a', borderColor:'#bbf7d0' }}><Phone size={13} /></a>
            <a href={`mailto:${row.email}`} className={s.iconBtn} title="Email" style={{ color:'#3b82f6', borderColor:'#bfdbfe' }}><Mail size={13} /></a>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Update Status"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />

      {modal?.type === 'edit' && (
        <AdminModal isOpen onClose={close} title="Update Lead Status" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div style={{ marginBottom:'1rem' }}>
            <strong style={{ display:'block', fontSize:'0.9rem', color:'#0f172a', marginBottom:4 }}>{form.name}</strong>
            <span style={{ fontSize:'0.78rem', color:'#64748b' }}>{form.phone} · {form.email}</span>
          </div>
          <div className={s.formGroup}>
            <label className={s.label}>Status</label>
            <select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {STATUSES.map(st => <option key={st} value={st} style={{ textTransform:'capitalize' }}>{st.charAt(0).toUpperCase()+st.slice(1)}</option>)}
            </select>
          </div>
          <div className={s.formGroup} style={{ marginTop:'1rem' }}>
            <label className={s.label}>Notes</label>
            <textarea className={s.textarea} placeholder="Add follow-up notes..." style={{ minHeight:70 }} />
          </div>
        </AdminModal>
      )}

      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Lead" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete lead from <strong>{modal.item.name}</strong>?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminLeads;
