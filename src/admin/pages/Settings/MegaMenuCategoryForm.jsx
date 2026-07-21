import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import styles from '../../components/data/DataForm.module.css';

const MegaMenuCategoryForm = ({ initialData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [links, setLinks] = useState([]);
  const [menus, setMenus] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAdminAuth();

  useEffect(() => {
    axios.get('/api/mega-menus/').then(res => setMenus(res.data)).catch(console.error);

    if (initialData?.id) {
      axios.get(`/api/mega-menu-links/?category=${initialData.id}`).then(res => {
        setLinks(res.data.filter(l => l.category === initialData.id) || []);
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
  const handleLinkChange = (index, key, value) => {
    setLinks(prev => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const addLink = () => setLinks(prev => [...prev, { title: '', path: '', order: 0 }]);
  const removeLink = (index) => {
    setLinks(prev => {
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
      let categoryId = initialData?.id;

      if (categoryId) {
        await axios.patch(`/api/mega-menu-categories/${categoryId}/`, formData, { headers });
      } else {
        const res = await axios.post(`/api/mega-menu-categories/`, formData, { headers });
        categoryId = res.data.id;
      }

      for (const item of links) {
        if (item._delete && item.id) {
          await axios.delete(`/api/mega-menu-links/${item.id}/`, { headers });
        } else if (!item._delete) {
          const payload = { ...item, category: categoryId };
          if (item.id) await axios.patch(`/api/mega-menu-links/${item.id}/`, payload, { headers });
          else await axios.post(`/api/mega-menu-links/`, payload, { headers });
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
          <h2 className={styles.title}>{initialData ? 'Edit Menu Category' : 'Add Menu Category'}</h2>
          <button className={styles.closeBtn} onClick={onCancel} type="button"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.body}>
            {error && <div className={styles.errorAlert}>{error}</div>}
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Parent Mega Menu</label>
              <select className={styles.input} value={formData.menu || ''} onChange={e => handleChange('menu', e.target.value)} required>
                <option value="">Select Mega Menu</option>
                {menus.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Group Title</label>
                <input type="text" className={styles.input} value={formData.group_title || ''} onChange={e => handleChange('group_title', e.target.value)} required />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Order</label>
                <input type="number" className={styles.input} value={formData.order || 0} onChange={e => handleChange('order', e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '4px solid #475569', paddingTop: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>MEGA MENU LINKS</h3>
              
              {links.filter(l => !l._delete).map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0' }}>
                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.label}>Title</label>
                    <input type="text" className={styles.input} value={item.title || ''} onChange={e => handleLinkChange(idx, 'title', e.target.value)} required />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.label}>Path</label>
                    <input type="text" className={styles.input} value={item.path || ''} onChange={e => handleLinkChange(idx, 'path', e.target.value)} required />
                  </div>
                  <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                    <label className={styles.label}>Description</label>
                    <input type="text" className={styles.input} value={item.description || ''} onChange={e => handleLinkChange(idx, 'description', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 40px', gap: '1rem', alignItems: 'end' }}>
                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                      <label className={styles.label}>Icon Name</label>
                      <input type="text" className={styles.input} value={item.icon_name || ''} onChange={e => handleLinkChange(idx, 'icon_name', e.target.value)} />
                    </div>
                    <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                      <label className={styles.label}>Order</label>
                      <input type="number" className={styles.input} value={item.order || 0} onChange={e => handleLinkChange(idx, 'order', e.target.value)} />
                    </div>
                    <button type="button" className={styles.removeBtn} onClick={() => removeLink(idx)} style={{ height: '38px', marginBottom: '2px' }}><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              <button type="button" className={styles.addListBtn} onClick={addLink}>+ Add another Mega menu link</button>
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

export default MegaMenuCategoryForm;
