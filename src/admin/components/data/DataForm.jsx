import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { X, Save, Loader2, Plus, Trash2 } from 'lucide-react';
import styles from './DataForm.module.css';
import { API_URL } from '../../../services/api';

const DataForm = ({ title, endpoint, schema, initialData, onCancel, onSuccess, lookupField = 'id' }) => {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAdminAuth();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const init = {};
      schema.forEach(field => {
        if (field.type === 'json-list') {
          init[field.key] = field.defaultValue || [];
        } else {
          init[field.key] = field.defaultValue || '';
        }
      });
      setFormData(init);
    }
  }, [initialData, schema]);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleJsonListChange = (key, index, value) => {
    const newList = [...(formData[key] || [])];
    newList[index] = value;
    handleChange(key, newList);
  };

  const addJsonListItem = (key) => {
    const newList = [...(formData[key] || []), ''];
    handleChange(key, newList);
  };

  const removeJsonListItem = (key, index) => {
    const newList = [...(formData[key] || [])];
    newList.splice(index, 1);
    handleChange(key, newList);
  };

  const handleFileChange = (key, file) => {
    setFiles(prev => ({ ...prev, [key]: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [key]: url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create a clean copy of formData
      let cleanFormData = { ...formData };
      
      // Remove file fields from payload if they are just string URLs (not newly uploaded files)
      // This prevents DRF from throwing "The submitted data was not a file" when sending a PATCH request without a new file.
      schema.forEach(field => {
        if ((field.type === 'image' || field.type === 'video')) {
          if (!files[field.key]) {
            delete cleanFormData[field.key];
          }
        }
      });

      const isFormData = Object.keys(files).length > 0;
      let payload;
      let headers = { Authorization: `Bearer ${token}` };

      if (isFormData) {
        payload = new FormData();
        Object.entries(cleanFormData).forEach(([k, v]) => {
          if (files[k]) {
            payload.append(k, files[k]);
          } else if (v === null || v === undefined) {
            // skip null
          } else if (Array.isArray(v)) {
            // Send JSON as a string if using FormData
            payload.append(k, JSON.stringify(v));
          } else {
            payload.append(k, v);
          }
        });
      } else {
        payload = cleanFormData;
      }

      if (initialData && initialData[lookupField]) {
        await axios.patch(`${API_URL}/${endpoint}/${initialData[lookupField]}/`, payload, { headers });
      } else {
        await axios.post(`${API_URL}/${endpoint}/`, payload, { headers });
      }

      onSuccess();
    } catch (err) {
      console.error('Save failed', err);
      setError(err.response?.data ? JSON.stringify(err.response.data) : 'Failed to save data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{initialData ? 'Edit' : 'Add'} {title}</h2>
          <button className={styles.closeBtn} onClick={onCancel} type="button">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.body}>
            {error && <div className={styles.errorAlert}>{error}</div>}

            {schema.map(field => (
              <div key={field.key} className={styles.formGroup}>
                <label className={styles.label}>{field.label}</label>

                {field.type === 'text' && (
                  <input
                    type="text"
                    className={styles.input}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                  />
                )}

                {field.type === 'date' && (
                  <input
                    type="date"
                    className={styles.input}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                  />
                )}

                {field.type === 'select' && (
                  <select
                    className={styles.input}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Select an option...</option>
                    {field.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                )}

                {field.type === 'textarea' && (
                  <textarea
                    className={styles.textarea}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    rows={4}
                  />
                )}

                {field.type === 'json-list' && (
                  <div className={styles.jsonList}>
                    {(formData[field.key] || []).map((item, index) => (
                      <div key={index} className={styles.jsonListItem}>
                        <input
                          type="text"
                          className={styles.input}
                          value={item}
                          onChange={(e) => handleJsonListChange(field.key, index, e.target.value)}
                        />
                        <button type="button" className={styles.removeBtn} onClick={() => removeJsonListItem(field.key, index)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    <button type="button" className={styles.addListBtn} onClick={() => addJsonListItem(field.key)}>
                      <Plus size={16} /> Add Item
                    </button>
                  </div>
                )}

                {field.type === 'image' && (
                  <div className={styles.imageUpload}>
                    {formData[field.key] && (
                      <div className={styles.imagePreview}>
                        <img src={formData[field.key]} alt="Preview" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(field.key, e.target.files[0])}
                    />
                  </div>
                )}

                {field.type === 'video' && (
                  <div className={styles.imageUpload}>
                    {formData[field.key] && (
                      <div className={styles.imagePreview}>
                        <video src={formData[field.key]} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(field.key, e.target.files[0])}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? <Loader2 size={16} className={styles.spinner} /> : <Save size={16} />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DataForm;
