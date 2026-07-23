import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import styles from '../../components/data/DataForm.module.css';

const PackageForm = ({ initialData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [advantages, setAdvantages] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [materialSpecs, setMaterialSpecs] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAdminAuth();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch material categories for dropdown
    axios.get('/api/package-material-categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    if (initialData?.id) {
      // Fetch nested data
      axios.get(`/api/package-advantages/?package=${initialData.id}`).then(res => {
        setAdvantages(res.data.filter(a => a.package === initialData.id) || []);
      });
      axios.get(`/api/package-faqs/?package=${initialData.id}`).then(res => {
        setFaqs(res.data.filter(f => f.package === initialData.id) || []);
      });
      axios.get(`/api/package-material-specs/?package=${initialData.id}`).then(res => {
        setMaterialSpecs(res.data.filter(m => m.package === initialData.id) || []);
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleInlineChange = (setter, index, key, value) => {
    setter(prev => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const addInline = (setter, template) => {
    setter(prev => [...prev, template]);
  };

  const removeInline = (setter, index) => {
    setter(prev => {
      const copy = [...prev];
      if (copy[index].id) {
        copy[index]._delete = true;
      } else {
        copy.splice(index, 1);
      }
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      let packageId = initialData?.id;

      // 1. Save Package
      if (packageId) {
        await axios.patch(`/api/packages/${packageId}/`, formData, { headers });
      } else {
        const res = await axios.post(`/api/packages/`, formData, { headers });
        packageId = res.data.id;
      }

      // 2. Save Advantages
      for (const item of advantages) {
        if (item._delete && item.id) {
          await axios.delete(`/api/package-advantages/${item.id}/`, { headers });
        } else if (!item._delete) {
          const payload = { ...item, package: packageId };
          if (item.id) await axios.patch(`/api/package-advantages/${item.id}/`, payload, { headers });
          else await axios.post(`/api/package-advantages/`, payload, { headers });
        }
      }

      // 3. Save FAQs
      for (const item of faqs) {
        if (item._delete && item.id) {
          await axios.delete(`/api/package-faqs/${item.id}/`, { headers });
        } else if (!item._delete) {
          const payload = { ...item, package: packageId };
          if (item.id) await axios.patch(`/api/package-faqs/${item.id}/`, payload, { headers });
          else await axios.post(`/api/package-faqs/`, payload, { headers });
        }
      }

      // 4. Save Material Specs
      for (const item of materialSpecs) {
        if (item._delete && item.id) {
          await axios.delete(`/api/package-material-specs/${item.id}/`, { headers });
        } else if (!item._delete) {
          const payload = { ...item, package: packageId };
          if (item.id) await axios.patch(`/api/package-material-specs/${item.id}/`, payload, { headers });
          else await axios.post(`/api/package-material-specs/`, payload, { headers });
        }
      }

      window.dispatchEvent(new CustomEvent('adminDataUpdated', { detail: { endpoint: 'packages' } }));
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
          <h2 className={styles.title}>{initialData ? 'Edit Package' : 'Add Package'}</h2>
          <button className={styles.closeBtn} onClick={onCancel} type="button"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.body}>
            {error && <div className={styles.errorAlert}>{error}</div>}
            
            {/* Basic Package Fields */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input type="text" className={styles.input} value={formData.name || ''} onChange={e => handleChange('name', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price</label>
              <input type="text" className={styles.input} value={formData.price || ''} onChange={e => handleChange('price', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tagline</label>
              <input type="text" className={styles.input} value={formData.tagline || ''} onChange={e => handleChange('tagline', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea className={styles.textarea} value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} rows={3} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Best For</label>
                <input type="text" className={styles.input} value={formData.best_for || ''} onChange={e => handleChange('best_for', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Project Type</label>
                <input type="text" className={styles.input} value={formData.project_type || ''} onChange={e => handleChange('project_type', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Warranty</label>
                <input type="text" className={styles.input} value={formData.warranty || ''} onChange={e => handleChange('warranty', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Timeline</label>
                <input type="text" className={styles.input} value={formData.timeline || ''} onChange={e => handleChange('timeline', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Grade</label>
                <input type="text" className={styles.input} value={formData.grade || ''} onChange={e => handleChange('grade', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Plot Size</label>
                <input type="text" className={styles.input} value={formData.plot_size || ''} onChange={e => handleChange('plot_size', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Floors</label>
                <input type="text" className={styles.input} value={formData.floors || ''} onChange={e => handleChange('floors', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Recommended Budget</label>
                <input type="text" className={styles.input} value={formData.recommended_budget || ''} onChange={e => handleChange('recommended_budget', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Order</label>
                <input type="text" className={styles.input} value={formData.order || ''} onChange={e => handleChange('order', e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Ideal Customer</label>
                <textarea className={styles.textarea} value={formData.ideal_customer || ''} onChange={e => handleChange('ideal_customer', e.target.value)} rows={2} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Limitations</label>
                <textarea className={styles.textarea} value={formData.limitations || ''} onChange={e => handleChange('limitations', e.target.value)} rows={2} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Upgrades</label>
                <textarea className={styles.textarea} value={formData.upgrades || ''} onChange={e => handleChange('upgrades', e.target.value)} rows={2} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Maintenance</label>
                <textarea className={styles.textarea} value={formData.maintenance || ''} onChange={e => handleChange('maintenance', e.target.value)} rows={2} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Why Choose</label>
                <textarea className={styles.textarea} value={formData.why_choose || ''} onChange={e => handleChange('why_choose', e.target.value)} rows={2} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Construction Quality</label>
                <textarea className={styles.textarea} value={formData.construction_quality || ''} onChange={e => handleChange('construction_quality', e.target.value)} rows={2} />
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label className={styles.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={formData.is_popular || false} onChange={e => handleChange('is_popular', e.target.checked)} />
                Is Popular Package?
              </label>
            </div>
            
            {/* Inline: Advantages */}
            <div style={{ marginTop: '2rem', borderTop: '2px solid #e2e8f0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>PACKAGE ADVANTAGES</h3>
              {advantages.filter(a => !a._delete).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <input type="text" className={styles.input} placeholder="Advantage Text" value={item.text} onChange={e => handleInlineChange(setAdvantages, idx, 'text', e.target.value)} style={{ flex: 1 }} required />
                  <input type="number" className={styles.input} placeholder="Order" value={item.order} onChange={e => handleInlineChange(setAdvantages, idx, 'order', e.target.value)} style={{ width: '80px' }} />
                  <button type="button" className={styles.removeBtn} onClick={() => removeInline(setAdvantages, idx)}><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" className={styles.addListBtn} onClick={() => addInline(setAdvantages, { text: '', order: 0 })}>+ Add another Package advantage</button>
            </div>

            {/* Inline: FAQs */}
            <div style={{ marginTop: '2rem', borderTop: '2px solid #e2e8f0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>PACKAGE FAQS</h3>
              {faqs.filter(f => !f._delete).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <input type="text" className={styles.input} placeholder="Question" value={item.question} onChange={e => handleInlineChange(setFaqs, idx, 'question', e.target.value)} required />
                    <textarea className={styles.textarea} placeholder="Answer" value={item.answer} onChange={e => handleInlineChange(setFaqs, idx, 'answer', e.target.value)} rows={2} required />
                  </div>
                  <input type="number" className={styles.input} placeholder="Order" value={item.order} onChange={e => handleInlineChange(setFaqs, idx, 'order', e.target.value)} style={{ width: '80px' }} />
                  <button type="button" className={styles.removeBtn} onClick={() => removeInline(setFaqs, idx)}><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" className={styles.addListBtn} onClick={() => addInline(setFaqs, { question: '', answer: '', order: 0 })}>+ Add another Package faq</button>
            </div>

            {/* Inline: Material Specs */}
            <div style={{ marginTop: '2rem', borderTop: '2px solid #e2e8f0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>PACKAGE MATERIAL SPECS</h3>
              {materialSpecs.filter(m => !m._delete).map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                  <select className={styles.input} value={item.category || ''} onChange={e => handleInlineChange(setMaterialSpecs, idx, 'category', e.target.value)} style={{ width: '200px' }} required>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <textarea className={styles.textarea} placeholder="Brand / Specification" value={item.brand} onChange={e => handleInlineChange(setMaterialSpecs, idx, 'brand', e.target.value)} style={{ flex: 1 }} rows={3} required />
                  <button type="button" className={styles.removeBtn} onClick={() => removeInline(setMaterialSpecs, idx)}><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" className={styles.addListBtn} onClick={() => addInline(setMaterialSpecs, { category: '', brand: '' })}>+ Add another Material spec</button>
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

export default PackageForm;
