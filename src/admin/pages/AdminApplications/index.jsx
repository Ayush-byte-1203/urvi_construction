import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { applicationsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',         label: 'ID',         width: 70 },
  { key: 'name',       label: 'Applicant' },
  { key: 'role',       label: 'Applied For' },
  { key: 'experience', label: 'Experience',  width: 110 },
  { key: 'stage',      label: 'Stage',       width: 110, render: v => <AdminBadge status={v} /> },
  { key: 'date',       label: 'Applied On',  width: 130 },
  { key: 'resume',     label: 'Resume',      width: 90, sortable: false, render: (v) => (
    <button
      onClick={() => alert(`Mock download: ${v}`)}
      style={{ display:'flex', alignItems:'center', gap:4, background:'#eff6ff', color:'#2563eb', border:'none', borderRadius:6, padding:'3px 8px', fontSize:'0.7rem', fontWeight:600, cursor:'pointer' }}
    >
      <FileText size={11} /> PDF
    </button>
  )},
];

const STAGES = ['review','interview','offer','rejected'];

const AdminApplications = () => {
  const [data, setData] = useState(applicationsAdminData);
  const [selected, setSelected] = useState(null);

  const updateStage = (id, stage) =>
    setData(d => d.map(r => r.id === id ? { ...r, stage } : r));

  return (
    <div className={s.page}>
      <AdminPageHeader title="Job Applications" subtitle={`${data.length} applications · ${data.filter(d=>d.stage==='review').length} in review`} />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' }}>
        {STAGES.map(st => (
          <div key={st} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'1rem 1.25rem' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'#0f172a' }}>{data.filter(d=>d.stage===st).length}</div>
            <AdminBadge status={st} />
          </div>
        ))}
      </div>
      <AdminTable columns={COLS} data={data} searchable searchKeys={['name','role']}
        actions={row => (
          <select
            className={s.select}
            style={{ width:'auto', padding:'0.3rem 0.6rem', fontSize:'0.75rem' }}
            value={row.stage}
            onChange={e => updateStage(row.id, e.target.value)}
          >
            {STAGES.map(st => <option key={st} value={st} style={{ textTransform:'capitalize' }}>{st.charAt(0).toUpperCase()+st.slice(1)}</option>)}
          </select>
        )}
      />
    </div>
  );
};

export default AdminApplications;
