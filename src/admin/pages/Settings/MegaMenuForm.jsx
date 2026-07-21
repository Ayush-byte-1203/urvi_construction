import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import styles from '../../components/data/DataForm.module.css';

const MegaMenuForm = ({ initialData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [featured, setFeatured] = useState({});
  const [categories, setCategories] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAdminAuth();

  useEffect(() => {
    if (initialData?.id) {
      axios.get(`/api/mega-menu-featured/`).then(res => {
        const found = res.data.find(f => f.menu === initialData.id);
        if (found) setFeatured(found);
      });
      axios.get(`/api/mega-menu-categories/?menu=${initialData.id}`).then(res => {
        setCategories(res.data.filter(c => c.menu === initialData.id) || []);
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  const handleFeaturedChange = (key, value) => setFeatured(prev => ({ ...prev, [key]: value }));
  const handleCategoryChange = (index, key, value) => {
    setCategories(prev => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const addCategory = () => setCategories(prev => [...prev, { group_title: '', order: 0 }]);
  const removeCategory = (index) => {
    setCategories(prev => {
      const copy = [...prev];
      if (copy[index].id) copy[index]._delete = true;
      else copy.splice(index, 1);
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const multiHeaders = { ...headers, 'Content-Type': 'multipart/form-data' };
      let menuId = initialData?.id;

      if (menuId) {
        await axios.patch(`/api/mega-menus/${menuId}/`, formData, { headers });
      } else {
        const res = await axios.post(`/api/mega-menus/`, formData, { headers });
        menuId = res.data.id;
      }

      if (featured.title || featured.description || featuredImageFile || featured.id) {
        const featuredPayload = new FormData();
        featuredPayload.append('menu', menuId);
        if (featured.title) featuredPayload.append('title', featured.title);
        if (featured.description) featuredPayload.append('description', featured.description);
        if (featured.path) featuredPayload.append('path', featured.path);
        if (featured.link_text) featuredPayload.append('link_text', featured.link_text);
        if (featured.image_url) featuredPayload.append('image_url', featured.image_url);
        
        if (featuredImageFile) {
          featuredPayload.append('image', featuredImageFile);
        } else if (featured.image && !featured.image.startsWith('http')) {
          featuredPayload.append('image', featured.image);
        }

        if (featured.id) {
          await axios.patch(`/api/mega-menu-featured/${featured.id}/`, featuredPayload, { headers: multiHeaders });
        } else {
          await axios.post(`/api/mega-menu-featured/`, featuredPayload, { headers: multiHeaders });
        }
      }

      for (const item of categories) {
        if (item._delete && item.id) {
          await axios.delete(`/api/mega-menu-categories/${item.id}/`, { headers });
        } else if (!item._delete) {
          const payload = { ...item, menu: menuId };
          if (item.id) await axios.patch(`/api/mega-menu-categories/${item.id}/`, payload, { headers });
          else await axios.post(`/api/mega-menu-categories/`, payload, { headers });
        }
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      setError('Failed to save data. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} style={{ maxWidth: '800px' }}>
        <div className={styles.header}>
          <h2 className={styles.title}>{initialData ? 'Edit Mega Menu' : 'Add Mega Menu'}</h2>
          <button className={styles.closeBtn} onClick={onCancel} type="button"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.body}>
            {error && <div className={styles.errorAlert}>{error}</div>}
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input type="text" className={styles.input} value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} required placeholder="e.g., 'home', 'about', 'services'" />
            </div>
            
            <div style={{ marginTop: '2rem', borderTop: '4px solid #475569', paddingTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>MEGA MENU FEATURED</h3>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Title</label>
                <input type="text" className={styles.input} value={featured.title || ''} onChange={e => handleFeaturedChange('title', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} value={featured.description || ''} onChange={e => handleFeaturedChange('description', e.target.value)} rows={3} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {featured.image && <img src={featured.image} alt="Preview" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />}
                  <input type="file" accept="image/*" onChange={(e) => {
                    setFeaturedImageFile(e.target.files[0]);
                    if (e.target.files[0]) handleFeaturedChange('image', URL.createObjectURL(e.target.files[0]));
                  }} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Image URL (Fallback)</label>
                <input type="url" className={styles.input} value={featured.image_url || ''} onChange={e => handleFeaturedChange('image_url', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Path</label>
                  <input type="text" className={styles.input} value={featured.path || ''} onChange={e => handleFeaturedChange('path', e.target.value)} placeholder="e.g., '/contact'" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Link Text</label>
                  <input type="text" className={styles.input} value={featured.link_text || ''} onChange={e => handleFeaturedChange('link_text', e.target.value)} placeholder="e.g., 'Explore'" />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '4px solid #475569', paddingTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>MEGA MENU CATEGORIES</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 40px', gap: '1rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: '#64748b' }}>
                <div>GROUP TITLE</div>
                <div>ORDER</div>
                <div>DEL</div>
              </div>
              {categories.filter(c => !c._delete).map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 40px', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <input type="text" className={styles.input} placeholder="Group Title" value={item.group_title} onChange={e => handleCategoryChange(idx, 'group_title', e.target.value)} required />
                  <input type="number" className={styles.input} value={item.order} onChange={e => handleCategoryChange(idx, 'order', e.target.value)} />
                  <button type="button" className={styles.removeBtn} onClick={() => removeCategory(idx)}><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" className={styles.addListBtn} onClick={addCategory}>+ Add another Mega menu category</button>
            </div>

          </div>

          <div className={styles.footer} style={{ position: 'sticky', bottom: 0, background: 'white', padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? <Loader2 size={16} className={styles.spinner} /> : <Save size={16} />} Save All
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MegaMenuForm;
