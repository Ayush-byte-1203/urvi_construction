import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminTestimonials = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'rating', label: 'Rating' },
    { 
      key: 'profile_image', 
      label: 'Profile Image',
      render: (val) => val ? <img src={val} alt="Profile" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }} /> : 'No Image'
    },
    { 
      key: 'image', 
      label: 'Side Image',
      render: (val) => val ? <img src={val} alt="Testimonial" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    }
  ];

  const schema = [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', required: true },
    { key: 'content', label: 'Content', type: 'textarea', required: true },
    { key: 'rating', label: 'Rating (1-5)', type: 'text', defaultValue: '5' },
    { key: 'profile_image', label: 'Profile Image', type: 'image' },
    { key: 'image', label: 'Side Image', type: 'image' }
  ];

  return (
    <>
      <DataTable title="Testimonials" endpoint="testimonials" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Testimonial" endpoint="testimonials" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminTestimonials;
