import React, { useState } from 'react';
import { GripVertical, Eye, EyeOff, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminBadge from '../../components/AdminBadge';
import { homeSectionsData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const AdminPageBuilder = () => {
  const [sections, setSections] = useState(homeSectionsData);
  const [editing, setEditing]   = useState(null);
  const [saved, setSaved]       = useState(false);

  const toggle = id =>
    setSections(ss => ss.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));

  const move = (id, dir) => {
    setSections(ss => {
      const arr   = [...ss].sort((a,b) => a.order - b.order);
      const idx   = arr.findIndex(s => s.id === id);
      const swap  = idx + dir;
      if (swap < 0 || swap >= arr.length) return ss;
      const o1 = arr[idx].order;
      const o2 = arr[swap].order;
      return ss.map(s => s.id === arr[idx].id ? { ...s, order: o2 } : s.id === arr[swap].id ? { ...s, order: o1 } : s);
    });
  };

  const saveCTA = (id, ctaText) => {
    setSections(ss => ss.map(s => s.id === id ? { ...s, ctaText } : s));
    setEditing(null);
  };

  const handleSaveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    alert('Homepage layout saved (mock). Connect to backend to persist.');
  };

  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className={s.page}>
      <AdminPageHeader title="Homepage Page Builder" subtitle="Enable / disable sections, reorder them, and manage CTA text." />

      <div className={ts.builderToolbar}>
        <div className={ts.builderInfo}>
          <span className={ts.builderInfoDot} style={{ background:'#16a34a' }} /> {sections.filter(s=>s.enabled).length} enabled
          <span className={ts.builderInfoDot} style={{ background:'#94a3b8', marginLeft:12 }} /> {sections.filter(s=>!s.enabled).length} disabled
        </div>
        <button className={s.btnPrimary} onClick={handleSaveAll}>
          {saved ? '✓ Saved!' : 'Save Layout'}
        </button>
      </div>

      <div className={ts.sectionList}>
        {sorted.map((sec, idx) => (
          <div key={sec.id} className={`${ts.sectionRow} ${!sec.enabled ? ts.sectionDisabled : ''}`}>
            <div className={ts.dragHandle}><GripVertical size={16} color="#cbd5e1" /></div>

            <div className={ts.sectionOrder}>{sec.order}</div>

            <div className={ts.sectionInfo}>
              <span className={ts.sectionName}>{sec.name}</span>
              <span className={ts.sectionNote}>{sec.note}</span>
            </div>

            {/* CTA Text */}
            <div className={ts.ctaArea}>
              {editing === sec.id ? (
                <form onSubmit={e => { e.preventDefault(); saveCTA(sec.id, e.target.cta.value); }} style={{ display:'flex', gap:6 }}>
                  <input name="cta" defaultValue={sec.ctaText} className={s.input} style={{ width:200, padding:'0.35rem 0.6rem' }} placeholder="CTA button text" />
                  <button type="submit" className={s.btnPrimary} style={{ padding:'0.35rem 0.75rem', fontSize:'0.75rem' }}>Save</button>
                  <button type="button" className={s.btnSecondary} style={{ padding:'0.35rem 0.75rem', fontSize:'0.75rem' }} onClick={() => setEditing(null)}>✕</button>
                </form>
              ) : (
                <div className={ts.ctaDisplay}>
                  <span className={ts.ctaText}>{sec.ctaText || <em style={{ color:'#94a3b8' }}>No CTA</em>}</span>
                  <button className={s.iconBtn} onClick={() => setEditing(sec.id)} title="Edit CTA"><Edit size={12} /></button>
                </div>
              )}
            </div>

            <div className={ts.rowActions}>
              <button className={s.iconBtn} onClick={() => move(sec.id, -1)} disabled={idx === 0} title="Move up"><ChevronUp size={14} /></button>
              <button className={s.iconBtn} onClick={() => move(sec.id, 1)} disabled={idx === sorted.length-1} title="Move down"><ChevronDown size={14} /></button>
              <button
                className={`${s.iconBtn} ${sec.enabled ? '' : s.iconBtnDanger}`}
                onClick={() => toggle(sec.id)}
                title={sec.enabled ? 'Disable section' : 'Enable section'}
              >
                {sec.enabled ? <Eye size={14} color="#16a34a" /> : <EyeOff size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPageBuilder;
