import React, { useState } from 'react';
import { Save, Building, Globe, Clock, Phone, Mail, MapPin } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import { settingsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const TABS = ['Company Info', 'Social Links', 'Appearance', 'Maintenance'];

const AdminSettings = () => {
  const [tab, setTab]       = useState('Company Info');
  const [settings, setSett] = useState(settingsAdminData);
  const [saved, setSaved]   = useState(false);

  const upd = (section, key, val) =>
    setSett(s => ({ ...s, [section]: { ...s[section], [key]: val } }));

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    alert('Settings saved (mock). Connect to backend API to persist.');
  };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Website Settings" subtitle="Configure company info, social links, theme and maintenance mode." />

      <div className={ts.settingsLayout}>
        {/* Tabs */}
        <div className={ts.tabList}>
          {TABS.map(t => (
            <button key={t} className={`${ts.tabBtn} ${tab === t ? ts.tabBtnActive : ''}`} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className={ts.tabPanel}>
          {tab === 'Company Info' && (
            <div className={s.formGrid}>
              <div className={s.formGroup}><label className={s.label}><Building size={12} /> Company Name</label><input className={s.input} value={settings.company.name} onChange={e=>upd('company','name',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}>Tagline</label><input className={s.input} value={settings.company.tagline} onChange={e=>upd('company','tagline',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}><Phone size={12} /> Phone</label><input className={s.input} value={settings.company.phone} onChange={e=>upd('company','phone',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}><Mail size={12} /> Email</label><input type="email" className={s.input} value={settings.company.email} onChange={e=>upd('company','email',e.target.value)} /></div>
              <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}><MapPin size={12} /> Address</label><textarea className={s.textarea} style={{ minHeight:60 }} value={settings.company.address} onChange={e=>upd('company','address',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}><Clock size={12} /> Business Hours</label><input className={s.input} value={settings.company.businessHours} onChange={e=>upd('company','businessHours',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}>WhatsApp Number</label><input className={s.input} value={settings.company.whatsapp} onChange={e=>upd('company','whatsapp',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}>GST Number</label><input className={s.input} value={settings.company.gstNumber} onChange={e=>upd('company','gstNumber',e.target.value)} /></div>
              <div className={s.formGroup}><label className={s.label}>RERA Number</label><input className={s.input} value={settings.company.reraNumber} onChange={e=>upd('company','reraNumber',e.target.value)} /></div>
            </div>
          )}

          {tab === 'Social Links' && (
            <div className={s.formGrid}>
              {Object.entries(settings.social).map(([key, val]) => (
                <div key={key} className={s.formGroup}>
                  <label className={s.label} style={{ textTransform:'capitalize' }}>{key}</label>
                  <input className={s.input} value={val} onChange={e=>upd('social',key,e.target.value)} placeholder={`https://${key}.com/...`} />
                </div>
              ))}
            </div>
          )}

          {tab === 'Appearance' && (
            <div className={s.formGrid}>
              <div className={s.formGroup}>
                <label className={s.label}>Accent Colour</label>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <input type="color" value={settings.theme.accentColor} onChange={e=>upd('theme','accentColor',e.target.value)} style={{ width:40, height:40, border:'1px solid #e2e8f0', borderRadius:8, cursor:'pointer', padding:2 }} />
                  <input className={s.input} value={settings.theme.accentColor} onChange={e=>upd('theme','accentColor',e.target.value)} style={{ width:120 }} />
                </div>
                <span style={{ fontSize:'0.72rem', color:'#94a3b8', marginTop:4 }}>Changes the accent/CTA colour site-wide (cosmetic preview only)</span>
              </div>
            </div>
          )}

          {tab === 'Maintenance' && (
            <div className={s.formGrid}>
              <div className={`${s.formGroup} ${s.formGroupFull}`}>
                <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', fontSize:'0.875rem', color:'#0f172a', fontWeight:600 }}>
                  <input type="checkbox" checked={settings.maintenance.enabled} onChange={e=>upd('maintenance','enabled',e.target.checked)} />
                  Enable Maintenance Mode
                </label>
                <p style={{ fontSize:'0.78rem', color:'#64748b', margin:'0.5rem 0 0' }}>When enabled, the public website shows a maintenance message to visitors.</p>
              </div>
              <div className={`${s.formGroup} ${s.formGroupFull}`}>
                <label className={s.label}>Maintenance Message</label>
                <textarea className={s.textarea} style={{ minHeight:80 }} value={settings.maintenance.message} onChange={e=>upd('maintenance','message',e.target.value)} />
              </div>
              {settings.maintenance.enabled && (
                <div className={`${s.formGroup} ${s.formGroupFull}`}>
                  <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:8, padding:'0.875rem 1rem', fontSize:'0.78rem', color:'#dc2626', fontWeight:600 }}>
                    ⚠ Maintenance mode is ON. The public website is currently inaccessible to visitors.
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'1.5rem', borderTop:'1px solid #e2e8f0', paddingTop:'1.25rem' }}>
            <button className={s.btnPrimary} onClick={save} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <Save size={15} /> {saved ? '✓ Settings Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
