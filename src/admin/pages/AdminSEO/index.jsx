import React, { useState } from 'react';
import { Edit, Globe, Check } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminModal from '../../components/AdminModal';
import { seoAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const AdminSEO = () => {
  const [data, setData]   = useState(seoAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({});
  const [saved, setSaved] = useState(null);

  const openEdit = item => { setForm({ ...item }); setModal({ type: 'edit', item }); };
  const close    = () => setModal(null);

  const save = () => {
    setData(d => d.map(r => r.id === form.id ? form : r));
    setSaved(form.id);
    setTimeout(() => setSaved(null), 2000);
    close();
  };

  return (
    <div className={s.page}>
      <AdminPageHeader title="SEO Manager" subtitle="Manage titles, descriptions, Open Graph, Twitter Cards and canonical URLs for all pages." />

      <div className={ts.seoList}>
        {data.map(row => (
          <div key={row.id} className={`${ts.seoRow} ${saved === row.id ? ts.seoRowSaved : ''}`}>
            <div className={ts.seoLeft}>
              <div className={ts.seoRoute}>
                <Globe size={13} color="#3b82f6" />
                <span>{row.route}</span>
              </div>
              <h4 className={ts.seoPage}>{row.page}</h4>
              <span className={ts.seoTitle}>{row.title}</span>
              <span className={ts.seoDsc}>{row.description}</span>
            </div>
            <div className={ts.seoMeta}>
              <div className={ts.seoMetaItem}><span className={ts.seoMetaLabel}>Schema</span><span className={ts.seoMetaVal}>{row.schema}</span></div>
              <div className={ts.seoMetaItem}><span className={ts.seoMetaLabel}>OG Image</span><span className={ts.seoMetaVal}>{row.ogImage}</span></div>
              <div className={ts.seoMetaItem}><span className={ts.seoMetaLabel}>Canonical</span><span className={ts.seoMetaVal} style={{ wordBreak:'break-all', fontSize:'0.68rem' }}>{row.canonical}</span></div>
            </div>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit SEO"><Edit size={14} /></button>
          </div>
        ))}
      </div>

      {modal?.type === 'edit' && (
        <AdminModal isOpen onClose={close} title={`Edit SEO — ${form.page}`} size="xl"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save SEO</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}>
              <label className={s.label}>Page Title <span style={{ fontWeight:400, color:'#94a3b8' }}>(50–60 chars recommended)</span></label>
              <input className={s.input} value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} />
              <span style={{ fontSize:'0.68rem', color: form.title.length > 60 ? '#dc2626' : '#94a3b8', marginTop:4 }}>{form.title.length} / 60 characters</span>
            </div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}>
              <label className={s.label}>Meta Description <span style={{ fontWeight:400, color:'#94a3b8' }}>(150–160 chars recommended)</span></label>
              <textarea className={s.textarea} value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} style={{ minHeight:70 }} />
              <span style={{ fontSize:'0.68rem', color: form.description.length > 160 ? '#dc2626' : '#94a3b8', marginTop:4 }}>{form.description.length} / 160 characters</span>
            </div>
            <div className={s.formGroup}><label className={s.label}>OG Image filename</label><input className={s.input} value={form.ogImage} onChange={e => setForm(f=>({...f,ogImage:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>Schema Type</label><select className={s.select} value={form.schema} onChange={e => setForm(f=>({...f,schema:e.target.value}))}><option>WebSite</option><option>AboutPage</option><option>Service</option><option>Product</option><option>ItemList</option><option>Blog</option><option>FAQPage</option><option>ContactPage</option></select></div>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Canonical URL</label><input className={s.input} value={form.canonical} onChange={e => setForm(f=>({...f,canonical:e.target.value}))} /></div>

            {/* Twitter Card */}
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label} style={{ borderTop:'1px solid #e2e8f0', paddingTop:'1rem', marginTop:'0.5rem' }}>Twitter Card Type</label><select className={s.select}><option value="summary_large_image">Summary Large Image</option><option value="summary">Summary</option></select></div>

            {/* Google Preview */}
            <div className={`${s.formGroup} ${s.formGroupFull}`}>
              <label className={s.label}>Google SERP Preview</label>
              <div className={ts.serpPreview}>
                <span className={ts.serpUrl}>{form.canonical}</span>
                <span className={ts.serpTitle}>{form.title || 'Page Title'}</span>
                <span className={ts.serpDesc}>{form.description?.slice(0,160) || 'Meta description...'}</span>
              </div>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminSEO;
