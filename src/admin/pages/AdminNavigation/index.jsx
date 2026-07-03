import React, { useState } from 'react';
import { Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminBadge from '../../components/AdminBadge';
import { navigationAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const AdminNavigation = () => {
  const [items, setItems] = useState(navigationAdminData);
  const [saved, setSaved] = useState(false);

  const toggle      = id => setItems(ns => ns.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  const toggleFoot  = id => setItems(ns => ns.map(n => n.id === id ? { ...n, inFooter: !n.inFooter } : n));
  const move        = (id, dir) => {
    setItems(ns => {
      const arr  = [...ns].sort((a,b)=>a.order-b.order);
      const idx  = arr.findIndex(n=>n.id===id);
      const swap = idx+dir;
      if (swap<0||swap>=arr.length) return ns;
      const o1=arr[idx].order, o2=arr[swap].order;
      return ns.map(n=>n.id===arr[idx].id?{...n,order:o2}:n.id===arr[swap].id?{...n,order:o1}:n);
    });
  };

  const save = () => { setSaved(true); setTimeout(()=>setSaved(false),2000); alert('Navigation saved (mock).'); };

  const sorted = [...items].sort((a,b)=>a.order-b.order);

  return (
    <div className={s.page}>
      <AdminPageHeader title="Navigation Manager" subtitle="Control which items appear in the navbar and footer." />

      <div className={ts.navToolbar}>
        <div className={ts.navLegend}>
          <span className={ts.navLegendItem}><Eye size={12} /> Navbar</span>
          <span className={ts.navLegendItem} style={{ marginLeft:12 }}>Footer</span>
        </div>
        <button className={s.btnPrimary} onClick={save}>{saved ? '✓ Saved!' : 'Save Navigation'}</button>
      </div>

      <div className={ts.navList}>
        <div className={ts.navHeader}>
          <span>Order</span><span>Menu Label</span><span>Path</span><span>Navbar</span><span>Footer</span><span>Reorder</span>
        </div>
        {sorted.map((item, idx) => (
          <div key={item.id} className={`${ts.navRow} ${!item.enabled ? ts.navRowDisabled : ''}`}>
            <span className={ts.navOrder}>{item.order}</span>
            <span className={ts.navLabel}>{item.label}</span>
            <span className={ts.navPath}>{item.path}</span>
            <label className={s.toggle}>
              <input type="checkbox" checked={item.enabled} onChange={() => toggle(item.id)} />
              <span className={s.toggleSlider} />
            </label>
            <label className={s.toggle}>
              <input type="checkbox" checked={item.inFooter} onChange={() => toggleFoot(item.id)} />
              <span className={s.toggleSlider} />
            </label>
            <div style={{ display:'flex', gap:2 }}>
              <button className={s.iconBtn} onClick={()=>move(item.id,-1)} disabled={idx===0}><ChevronUp size={13}/></button>
              <button className={s.iconBtn} onClick={()=>move(item.id,1)} disabled={idx===sorted.length-1}><ChevronDown size={13}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNavigation;
