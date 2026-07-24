import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminServices = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories for the dropdown
    axios.get('/api/service-categories/')
      .then(res => {
        setCategories(res.data.map(c => ({ value: c.id, label: c.name })));
      })
      .catch(err => console.error("Failed to load service categories", err));
  }, []);

  const columns = [
    { key: 'title', label: 'Service Title' },
    { key: 'category_name', label: 'Category' },
    { key: 'icon_name', label: 'Lucide Icon' },
    { key: 'tagline', label: 'Tagline' },
    { 
      key: 'image', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="Service" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    }
  ];

  const schema = [
    { key: 'title', label: 'Service Title', type: 'text', required: true },
    { key: 'description', label: 'Short Description (Side Box & Card)', type: 'textarea', required: true },
    { key: 'icon_name', label: 'Icon Name (Lucide)', type: 'text', required: true },
    { key: 'image', label: 'Card Image', type: 'image' },
    { key: 'category', label: 'Category', type: 'select', options: categories },
    { key: 'features', label: 'Key Deliverables (Side Box features)', type: 'json-list' },
    { key: 'estimated_timeline', label: 'Estimated Timeline (Side Box)', type: 'text' },
    { key: 'tagline', label: 'Hero Tagline (Detailed Page)', type: 'text' },
    { key: 'detail_image', label: 'Hero Image (Detailed Page)', type: 'image' },
    { key: 'scope_text', label: 'Scope text (Detailed Page)', type: 'textarea' },
    { key: 'benefits', label: 'Engineering Benefits (Detailed Page)', type: 'json-list' },
    { key: 'workflow_steps', label: 'Workflow steps (Detailed Page)', type: 'json-list' },
    { key: 'video_url', label: 'Video url (Detailed Page)', type: 'text' },
    { key: 'included_features', label: 'Included Features', type: 'json-list' },
    { key: 'excluded_features', label: 'Excluded Features', type: 'json-list' },
  ];

  return (
    <>
      <DataTable 
        title="Services"
        endpoint="services"
        columns={columns}
        onEdit={(item) => setEditingItem(item)}
      />
      {editingItem !== undefined && (
        <DataForm 
          title="Service"
          endpoint="services"
          schema={schema}
          initialData={editingItem}
          onCancel={() => setEditingItem(undefined)}
          onSuccess={() => setEditingItem(undefined)}
        />
      )}
    </>
  );
};

export default AdminServices;
