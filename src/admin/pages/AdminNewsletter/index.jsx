import React, { useState } from 'react';
import { Trash2, Download } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import { newsletterData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',          label: 'ID',          width: 80 },
  { key: 'email',       label: 'Email' },
  { key: 'subscribed',  label: 'Subscribed',  width: 140 },
  { key: 'source',      label: 'Source',      width: 150 },
  { key: 'status',      label: 'Status',      width: 120, render: v => <AdminBadge status={v} /> },
];

const AdminNewsletter = () => {
  const [data, setData] = useState(newsletterData);

  const active       = data.filter(d => d.status === 'active').length;
  const unsubscribed = data.filter(d => d.status === 'unsubscribed').length;

  const remove = id => setData(d => d.filter(r => r.id !== id));

  return (
    <div className={s.page}>
      <AdminPageHeader title="Newsletter Subscribers"
        subtitle={`${active} active · ${unsubscribed} unsubscribed`}
      />
      <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap' }}>
        <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'1rem 1.5rem', display:'flex', gap:'1.5rem', alignItems:'center' }}>
          <div><div style={{ fontSize:'1.75rem', fontWeight:800, color:'#0f172a' }}>{active}</div><div style={{ fontSize:'0.72rem', color:'#64748b' }}>Active Subscribers</div></div>
          <div><div style={{ fontSize:'1.75rem', fontWeight:800, color:'#94a3b8' }}>{unsubscribed}</div><div style={{ fontSize:'0.72rem', color:'#64748b' }}>Unsubscribed</div></div>
        </div>
        <button
          onClick={() => alert('Mock CSV export triggered')}
          style={{ display:'flex', alignItems:'center', gap:6, background:'#f0fdf4', color:'#16a34a', border:'1px solid #bbf7d0', borderRadius:8, padding:'0.6rem 1.25rem', fontWeight:600, fontSize:'0.82rem', cursor:'pointer' }}
        >
          <Download size={15} /> Export CSV
        </button>
      </div>
      <AdminTable columns={COLS} data={data} searchable searchKeys={['email','source']}
        actions={row => (
          <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => remove(row.id)} title="Remove"><Trash2 size={13} /></button>
        )}
      />
    </div>
  );
};

export default AdminNewsletter;
