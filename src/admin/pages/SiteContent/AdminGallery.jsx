import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminGallery = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { 
      key: 'image', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="Gallery" style={{ width: 100, height: 60, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    },
    { key: 'caption', label: 'Caption' },
    { key: 'order', label: 'Order' }
  ];

  const schema = [
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'caption', label: 'Caption', type: 'text' },
    { key: 'order', label: 'Order', type: 'number', required: true }
  ];

  return (
    <>
      <DataTable 
        title="Operations Gallery" 
        endpoint="gallery-images" 
        columns={columns} 
        onEdit={(item) => setEditingItem(item)} 
      />
      {editingItem !== undefined && (
        <DataForm 
          title="Gallery Image" 
          endpoint="gallery-images" 
          schema={schema} 
          initialData={editingItem} 
          onCancel={() => setEditingItem(undefined)} 
          onSuccess={() => setEditingItem(undefined)} 
        />
      )}
    </>
  );
};

export default AdminGallery;
