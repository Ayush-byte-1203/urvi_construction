import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Edit } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { quotesData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const STATUSES = ['pending','reviewed','sent','closed'];

const AdminQuotes = () => {
  const [data, setData]     = useState(quotesData);
  const [expanded, setExp]  = useState(null);
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState({});

  const toggle  = id  => setExp(e => e === id ? null : id);
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const close    = () => setModal(null);
  const save     = () => { setData(d => d.map(r => r.id === form.id ? form : r)); close(); };

  const pending  = data.filter(d => d.status === 'pending').length;
  const reviewed = data.filter(d => d.status === 'reviewed').length;

  return (
    <div className={s.page}>
      <AdminPageHeader title="Quote Requests" subtitle={`${data.length} total · ${pending} pending review`} />

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        {STATUSES.map(st => (
          <div key={st} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'1rem 1.25rem' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'#0f172a' }}>{data.filter(d => d.status === st).length}</div>
            <div style={{ fontSize:'0.75rem', color:'#64748b', textTransform:'capitalize', marginTop:4 }}>{st}</div>
          </div>
        ))}
      </div>

      <div className={ts.accordionList}>
        {data.map(q => (
          <div key={q.id} className={ts.accordionItem}>
            <div className={ts.accordionHeader} onClick={() => toggle(q.id)}>
              <div className={ts.quoteLeft}>
                <span className={ts.quoteId}>{q.id}</span>
                <div>
                  <span className={ts.quoteName}>{q.name}</span>
                  <span className={ts.quoteMeta}>{q.city} · {q.date}</span>
                </div>
              </div>
              <div className={ts.quoteRight}>
                <span className={ts.quotePackage}>{q.package}</span>
                <span className={ts.quoteBudget}>{q.budget}</span>
                <AdminBadge status={q.status} />
                <button className={s.iconBtn} onClick={e => { e.stopPropagation(); openEdit(q); }} title="Update"><Edit size={13} /></button>
                {expanded === q.id ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
              </div>
            </div>
            {expanded === q.id && (
              <div className={ts.accordionBody}>
                <div className={ts.detailGrid}>
                  <div><span className={ts.detailLabel}>Plot Size</span><span className={ts.detailVal}>{q.plotSize}</span></div>
                  <div><span className={ts.detailLabel}>Budget</span><span className={ts.detailVal}>{q.budget}</span></div>
                  <div><span className={ts.detailLabel}>Phone</span><span className={ts.detailVal}>{q.phone}</span></div>
                  <div><span className={ts.detailLabel}>Package</span><span className={ts.detailVal}>{q.package}</span></div>
                </div>
                <div className={ts.quoteActions}>
                  <a href={`tel:${q.phone}`} className={s.iconBtn} style={{ color:'#16a34a', borderColor:'#bbf7d0', width:'auto', padding:'0 10px', fontSize:'0.75rem', fontWeight:600, gap:4, display:'flex', alignItems:'center' }}>
                    <Phone size={13}/> Call Now
                  </a>
                  <select
                    className={s.select}
                    style={{ width:'auto', padding:'0.4rem 0.75rem', fontSize:'0.78rem' }}
                    value={q.status}
                    onChange={e => setData(d => d.map(r => r.id === q.id ? { ...r, status: e.target.value } : r))}
                  >
                    {STATUSES.map(st => <option key={st} value={st} style={{ textTransform:'capitalize' }}>{st.charAt(0).toUpperCase()+st.slice(1)}</option>)}
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {modal?.type === 'edit' && (
        <AdminModal isOpen onClose={close} title="Update Quote Status" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGroup} style={{ marginBottom:'1rem' }}>
            <label className={s.label}>Status</label>
            <select className={s.select} value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
              {STATUSES.map(st => <option key={st} value={st}>{st.charAt(0).toUpperCase()+st.slice(1)}</option>)}
            </select>
          </div>
          <div className={s.formGroup}>
            <label className={s.label}>Internal Notes</label>
            <textarea className={s.textarea} placeholder="Add notes for this quote..." style={{ minHeight:80 }} />
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminQuotes;
