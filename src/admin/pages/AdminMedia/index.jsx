import React, { useState } from 'react';
import { Search, Upload, Trash2, Copy, Eye, Image, Video, FileText, Grid, List } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminModal from '../../components/AdminModal';
import { mediaLibraryData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const CATEGORIES = ['All', 'Images', 'Videos', 'Documents'];

const AdminMedia = () => {
  const [data, setData]     = useState(mediaLibraryData);
  const [filter, setFilter] = useState('All');
  const [query, setQuery]   = useState('');
  const [preview, setPreview] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid | list

  const filtered = data.filter(m => {
    const catMatch = filter === 'All'
      || (filter === 'Images'    && m.type === 'image')
      || (filter === 'Videos'    && m.type === 'video')
      || (filter === 'Documents' && m.type === 'doc');
    const qMatch = !query || m.name.toLowerCase().includes(query.toLowerCase()) || m.category.toLowerCase().includes(query.toLowerCase());
    return catMatch && qMatch;
  });

  const remove = id => setData(d => d.filter(r => r.id !== id));

  const TypeIcon = ({ type }) => {
    if (type === 'image') return <Image size={14} />;
    if (type === 'video') return <Video size={14} />;
    return <FileText size={14} />;
  };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Media Library" subtitle={`${data.length} files · ${data.filter(m=>m.type==='image').length} images, ${data.filter(m=>m.type==='video').length} videos, ${data.filter(m=>m.type==='doc').length} documents`} />

      {/* Upload zone */}
      <div className={ts.uploadZone}>
        <Upload size={28} className={ts.uploadIcon} />
        <div>
          <p className={ts.uploadTitle}>Drag & Drop files here</p>
          <p className={ts.uploadSub}>Supports JPG, PNG, MP4, PDF, SVG up to 50MB</p>
        </div>
        <button className={s.btnPrimary} style={{ marginLeft:'auto' }} onClick={() => alert('Upload dialog — connect to backend storage')}>
          <Upload size={14} style={{ marginRight:6 }} />Choose Files
        </button>
      </div>

      {/* Toolbar */}
      <div className={ts.toolbar}>
        <div className={ts.filterTabs}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`${ts.filterTab} ${filter === cat ? ts.filterTabActive : ''}`} onClick={() => setFilter(cat)}>
              {cat}
            </button>
          ))}
        </div>
        <div className={ts.toolbarRight}>
          <div className={s.formGroup} style={{ position:'relative', flexDirection:'row', alignItems:'center' }}>
            <Search size={14} style={{ position:'absolute', left:8, color:'#94a3b8', pointerEvents:'none' }} />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search media..." className={s.input} style={{ paddingLeft:'2rem', width:220 }} />
          </div>
          <button className={`${ts.viewBtn} ${viewMode==='grid' ? ts.viewBtnActive : ''}`} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
          <button className={`${ts.viewBtn} ${viewMode==='list' ? ts.viewBtnActive : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className={ts.mediaGrid}>
          {filtered.map(m => (
            <div key={m.id} className={ts.mediaCard}>
              {m.type === 'image' && m.url ? (
                <img src={m.url} alt={m.name} className={ts.mediaThumb} loading="lazy" />
              ) : (
                <div className={ts.mediaPlaceholder}>
                  <TypeIcon type={m.type} />
                </div>
              )}
              <div className={ts.mediaInfo}>
                <span className={ts.mediaName}>{m.name}</span>
                <span className={ts.mediaMeta}>{m.size} · {m.category}</span>
              </div>
              <div className={ts.mediaActions}>
                <button className={s.iconBtn} onClick={() => m.type === 'image' ? setPreview(m) : alert(`Preview: ${m.name}`)} title="Preview"><Eye size={12} /></button>
                <button className={s.iconBtn} onClick={() => { navigator.clipboard?.writeText(m.url || m.name); alert('URL copied'); }} title="Copy URL"><Copy size={12} /></button>
                <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => remove(m.id)} title="Delete"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={{ color:'#94a3b8', fontSize:'0.85rem', gridColumn:'1/-1', padding:'3rem 0', textAlign:'center' }}>No files found.</p>
          )}
        </div>
      ) : (
        /* List View */
        <div className={ts.mediaListWrap}>
          <table className={ts.mediaTable}>
            <thead>
              <tr><th>Name</th><th>Type</th><th>Category</th><th>Size</th><th>Uploaded</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(m => (
                <tr key={m.id}>
                  <td style={{ display:'flex', alignItems:'center', gap:8 }}>
                    {m.type === 'image' && m.url
                      ? <img src={m.url} alt="" style={{ width:32, height:32, objectFit:'cover', borderRadius:4, flexShrink:0 }} />
                      : <div style={{ width:32, height:32, background:'#f1f5f9', borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><TypeIcon type={m.type} /></div>
                    }
                    <span style={{ fontSize:'0.8rem', color:'#0f172a', fontWeight:500 }}>{m.name}</span>
                  </td>
                  <td style={{ fontSize:'0.75rem', textTransform:'capitalize' }}>{m.type}</td>
                  <td style={{ fontSize:'0.75rem' }}>{m.category}</td>
                  <td style={{ fontSize:'0.75rem' }}>{m.size}</td>
                  <td style={{ fontSize:'0.75rem', color:'#94a3b8' }}>{m.uploaded}</td>
                  <td>
                    <div style={{ display:'flex', gap:4 }}>
                      <button className={s.iconBtn} onClick={() => m.type === 'image' ? setPreview(m) : alert(`Preview: ${m.name}`)}><Eye size={12} /></button>
                      <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => remove(m.id)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lightbox Preview */}
      {preview && (
        <AdminModal isOpen onClose={() => setPreview(null)} title={preview.name} size="lg">
          <img src={preview.url} alt={preview.name} style={{ width:'100%', borderRadius:8, objectFit:'contain', maxHeight:'60vh' }} />
          <div style={{ marginTop:'1rem', display:'flex', gap:'2rem', fontSize:'0.78rem', color:'#64748b' }}>
            <span><strong>Category:</strong> {preview.category}</span>
            <span><strong>Size:</strong> {preview.size}</span>
            <span><strong>Uploaded:</strong> {preview.uploaded}</span>
          </div>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminMedia;
