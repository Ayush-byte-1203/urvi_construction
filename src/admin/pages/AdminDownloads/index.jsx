import React, { useState } from 'react';
import { Edit, Trash2, Download, FileText } from 'lucide-react';
import AdminPageHeader from '../../components/AdminPageHeader';
import AdminTable from '../../components/AdminTable';
import AdminBadge from '../../components/AdminBadge';
import AdminModal from '../../components/AdminModal';
import { downloadsAdminData } from '../../data/adminDummyData';
import s from '../adminShared.module.css';

const COLS = [
  { key: 'id',        label: 'ID',        width: 70 },
  { key: 'name',      label: 'Document Name' },
  { key: 'category',  label: 'Category',  width: 120 },
  { key: 'format',    label: 'Format',    width: 80 },
  { key: 'size',      label: 'Size',      width: 80 },
  { key: 'downloads', label: 'Downloads', width: 100, render: v => <span style={{ fontWeight:700, color:'#0f172a' }}>{v.toLocaleString()}</span> },
  { key: 'status',    label: 'Status',    width: 100, render: v => <AdminBadge status={v} /> },
  { key: 'uploaded',  label: 'Uploaded',  width: 130 },
];

const EMPTY = { name:'', category:'Brochures', format:'PDF', size:'', status:'draft' };

const AdminDownloads = () => {
  const [data, setData]   = useState(downloadsAdminData);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);

  const openAdd  = () => { setForm(EMPTY); setModal({ type: 'add' }); };
  const openEdit = item => { setForm(item); setModal({ type: 'edit', item }); };
  const openDel  = item => setModal({ type: 'delete', item });
  const close    = () => setModal(null);

  const save = () => {
    if (modal.type === 'add') setData(d => [...d, { ...form, id:`D${String(d.length+1).padStart(2,'0')}`, downloads:0, uploaded:'Just now' }]);
    else setData(d => d.map(r => r.id === form.id ? form : r));
    close();
  };
  const del = () => { setData(d => d.filter(r => r.id !== modal.item.id)); close(); };

  return (
    <div className={s.page}>
      <AdminPageHeader title="Downloads Manager" subtitle={`${data.filter(d=>d.status==='active').length} active documents`} action="Upload Document" onAction={openAdd} />
      <AdminTable columns={COLS} data={data} searchable searchKeys={['name','category']}
        actions={row => (
          <>
            <button className={s.iconBtn} onClick={() => alert(`Mock download: ${row.name}`)} title="Download"><Download size={13} /></button>
            <button className={s.iconBtn} onClick={() => openEdit(row)} title="Edit"><Edit size={13} /></button>
            <button className={`${s.iconBtn} ${s.iconBtnDanger}`} onClick={() => openDel(row)} title="Delete"><Trash2 size={13} /></button>
          </>
        )}
      />
      {(modal?.type === 'add' || modal?.type === 'edit') && (
        <AdminModal isOpen onClose={close} title={modal.type === 'add' ? 'Upload Document' : 'Edit Document'} size="lg"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnPrimary} onClick={save}>Save</button></div>}
        >
          <div className={s.formGrid}>
            <div className={`${s.formGroup} ${s.formGroupFull}`}><label className={s.label}>Document Name</label><input className={s.input} value={form.name} onChange={e => setForm(f=>({...f,name:e.target.value}))} /></div>
            <div className={s.formGroup}><label className={s.label}>Category</label><select className={s.select} value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}><option>Brochures</option><option>Guides</option><option>Tools</option><option>Portfolio</option><option>Corporate</option><option>Templates</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Format</label><select className={s.select} value={form.format} onChange={e => setForm(f=>({...f,format:e.target.value}))}><option>PDF</option><option>XLS</option><option>PPT</option><option>DOC</option></select></div>
            <div className={s.formGroup}><label className={s.label}>Status</label><select className={s.select} value={form.status} onChange={e => setForm(f=>({...f,status:e.target.value}))}><option value="draft">Draft</option><option value="active">Active</option></select></div>
            {modal.type === 'add' && (
              <div className={`${s.formGroup} ${s.formGroupFull}`}>
                <label className={s.label}>File Upload</label>
                <div style={{ border:'2px dashed #e2e8f0', borderRadius:8, padding:'2rem', textAlign:'center', color:'#94a3b8', fontSize:'0.82rem', cursor:'pointer', background:'#f8fafc' }}>
                  <FileText size={24} style={{ margin:'0 auto 0.5rem', color:'#cbd5e1', display:'block' }} />
                  Click to upload or drag and drop<br/>
                  <span style={{ fontSize:'0.72rem' }}>PDF, XLS, PPT up to 20MB</span>
                </div>
              </div>
            )}
          </div>
        </AdminModal>
      )}
      {modal?.type === 'delete' && (
        <AdminModal isOpen onClose={close} title="Delete Document" size="sm"
          footer={<div className={s.modalFooterBtns}><button className={s.btnSecondary} onClick={close}>Cancel</button><button className={s.btnDanger} onClick={del}>Delete</button></div>}
        >
          <p style={{ fontSize:'0.85rem', color:'#475569' }}>Delete "<strong>{modal.item.name}</strong>"?</p>
        </AdminModal>
      )}
    </div>
  );
};

export default AdminDownloads;
