import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import styles from '../../components/data/DataForm.module.css';

const ProjectForm = ({ initialData, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState({}); // To hold image files for nested project images
  const [mainImageFile, setMainImageFile] = useState(null); // To hold main project image
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAdminAuth();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch project categories
    axios.get('/api/project-categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    if (initialData?.id) {
      axios.get(`/api/project-images/?project=${initialData.id}`).then(res => {
        setImages(res.data.filter(i => i.project === initialData.id) || []);
      });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleInlineChange = (index, key, value) => {
    setImages(prev => {
      const copy = [...prev];
      copy[index][key] = value;
      return copy;
    });
  };

  const handleInlineFileChange = (index, file) => {
    setFiles(prev => ({ ...prev, [`image_${index}`]: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      handleInlineChange(index, 'image', url);
    }
  };

  const addInline = () => {
    setImages(prev => [...prev, { stage: 'Finished', caption: '', order: 0, _tempIndex: Date.now() }]);
  };

  const removeInline = (index) => {
    setImages(prev => {
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
      let headers = { Authorization: `Bearer ${token}` };
      let projectId = initialData?.id;

      // 1. Save Project
      const projectPayload = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'image' && mainImageFile) {
          projectPayload.append('image', mainImageFile);
        } else if (v !== null && v !== undefined && k !== 'images') {
          if (typeof v !== 'string' || !v.startsWith('http')) {
            projectPayload.append(k, v);
          }
        }
      });

      const multiHeaders = { ...headers, 'Content-Type': 'multipart/form-data' };
      if (projectId) {
        await axios.patch(`/api/projects/${projectId}/`, projectPayload, { headers: multiHeaders });
      } else {
        const res = await axios.post(`/api/projects/`, projectPayload, { headers: multiHeaders });
        projectId = res.data.id;
      }

      // 2. Save Images
      for (let idx = 0; idx < images.length; idx++) {
        const item = images[idx];
        if (item._delete && item.id) {
          await axios.delete(`/api/project-images/${item.id}/`, { headers });
        } else if (!item._delete) {
          const payload = new FormData();
          payload.append('project', projectId);
          payload.append('stage', item.stage || 'Finished');
          if (item.caption) payload.append('caption', item.caption);
          if (item.order !== undefined) payload.append('order', item.order);
          
          if (files[`image_${idx}`]) {
            payload.append('image', files[`image_${idx}`]);
          } else if (item.image && !item.image.startsWith('http')) {
             payload.append('image', item.image);
          }
          
          // Only send if it has an image or id (we don't want empty rows erroring out)
          if (files[`image_${idx}`] || item.id) {
            if (item.id) await axios.patch(`/api/project-images/${item.id}/`, payload, { headers: multiHeaders });
            else await axios.post(`/api/project-images/`, payload, { headers: multiHeaders });
          }
        }
      }

      window.dispatchEvent(new CustomEvent('adminDataUpdated', { detail: { endpoint: 'projects' } }));
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
          <h2 className={styles.title}>{initialData ? 'Edit Project' : 'Add Project'}</h2>
          <button className={styles.closeBtn} onClick={onCancel} type="button"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.body}>
            {error && <div className={styles.errorAlert}>{error}</div>}
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Project Title</label>
              <input type="text" className={styles.input} value={formData.title || ''} onChange={e => handleChange('title', e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select className={styles.input} value={formData.category || ''} onChange={e => handleChange('category', e.target.value)}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Main Image</label>
              <div className={styles.imageUpload}>
                {formData.image && (
                  <div className={styles.imagePreview}>
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => {
                  setMainImageFile(e.target.files[0]);
                  if (e.target.files[0]) handleChange('image', URL.createObjectURL(e.target.files[0]));
                }} />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Location</label>
              <input type="text" className={styles.input} value={formData.location || ''} onChange={e => handleChange('location', e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea className={styles.textarea} value={formData.description || ''} onChange={e => handleChange('description', e.target.value)} rows={3} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Completion Date</label>
                <input type="date" className={styles.input} value={formData.completion_date || ''} onChange={e => handleChange('completion_date', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Client Name</label>
                <input type="text" className={styles.input} value={formData.client_name || ''} onChange={e => handleChange('client_name', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Built Area</label>
                <input type="text" className={styles.input} value={formData.built_area || ''} onChange={e => handleChange('built_area', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Floors Count</label>
                <input type="text" className={styles.input} value={formData.floors_count || ''} onChange={e => handleChange('floors_count', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Material Grade</label>
                <input type="text" className={styles.input} value={formData.material_grade || ''} onChange={e => handleChange('material_grade', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Seismic Protection</label>
                <input type="text" className={styles.input} value={formData.seismic_protection || ''} onChange={e => handleChange('seismic_protection', e.target.value)} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Architect Name</label>
                <input type="text" className={styles.input} value={formData.architect_name || ''} onChange={e => handleChange('architect_name', e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Completion Year</label>
                <input type="text" className={styles.input} value={formData.completion_year || ''} onChange={e => handleChange('completion_year', e.target.value)} placeholder="e.g. 2024" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Duration</label>
                <input type="text" className={styles.input} value={formData.duration || ''} onChange={e => handleChange('duration', e.target.value)} placeholder="e.g. 18 Months" />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Budget Range</label>
                <input type="text" className={styles.input} value={formData.budget_range || ''} onChange={e => handleChange('budget_range', e.target.value)} placeholder="e.g. ₹5 Cr - ₹7 Cr" />
              </div>
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label className={styles.label}>Challenges (Case Study)</label>
              <textarea className={styles.textarea} value={formData.challenges || ''} onChange={e => handleChange('challenges', e.target.value)} rows={3} />
            </div>

            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label className={styles.label}>Solutions (Case Study)</label>
              <textarea className={styles.textarea} value={formData.solutions || ''} onChange={e => handleChange('solutions', e.target.value)} rows={3} />
            </div>


            <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
              <label className={styles.label}>Client Requirements</label>
              <textarea className={styles.textarea} value={formData.client_requirements || ''} onChange={e => handleChange('client_requirements', e.target.value)} rows={3} />
            </div>
            
            {/* Inline: Project Images */}
            <div style={{ marginTop: '2rem', borderTop: '2px solid #e2e8f0', paddingTop: '1rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#0f172a' }}>PROJECT IMAGES</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr 80px 40px', gap: '1rem', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.875rem', color: '#64748b' }}>
                <div>IMAGE</div>
                <div>STAGE</div>
                <div>CAPTION</div>
                <div>ORDER</div>
                <div>DEL</div>
              </div>
              {images.filter(i => !i._delete).map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr 80px 40px', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {item.image && <img src={item.image} alt="preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />}
                    <input type="file" accept="image/*" onChange={(e) => handleInlineFileChange(idx, e.target.files[0])} style={{ width: '100%' }} />
                  </div>
                  <select className={styles.input} value={item.stage || 'Finished'} onChange={e => handleInlineChange(idx, 'stage', e.target.value)}>
                    <option value="Planning">Planning</option>
                    <option value="Design">Design</option>
                    <option value="Structure">Structure</option>
                    <option value="Finished">Finished</option>
                  </select>
                  <input type="text" className={styles.input} placeholder="Caption" value={item.caption || ''} onChange={e => handleInlineChange(idx, 'caption', e.target.value)} />
                  <input type="number" className={styles.input} value={item.order || 0} onChange={e => handleInlineChange(idx, 'order', e.target.value)} />
                  <button type="button" className={styles.removeBtn} onClick={() => removeInline(idx)}><Trash2 size={16} /></button>
                </div>
              ))}
              <button type="button" className={styles.addListBtn} onClick={addInline}>+ Add another Project image</button>
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

export default ProjectForm;
