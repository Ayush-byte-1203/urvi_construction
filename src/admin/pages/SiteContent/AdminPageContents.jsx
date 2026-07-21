import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminPageContents = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'page', label: 'Page' },
    { key: 'title', label: 'Title' }
  ];

  const schema = [
    { key: 'page', label: 'Page Identifier', type: 'select', required: true, options: [
      {value: 'home', label: 'Home'},
      {value: 'about', label: 'About'},
      {value: 'services', label: 'Services'},
      {value: 'packages', label: 'Packages'},
      {value: 'projects', label: 'Projects'},
      {value: 'process', label: 'Process'},
      {value: 'contact', label: 'Contact'}
    ]},
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'hero_image', label: 'Hero Image', type: 'image' },
    { key: 'hero_video', label: 'Hero Video', type: 'video' }
  ];

  return (
    <>
      <DataTable title="Page Contents" endpoint="pages" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Page Content" endpoint="pages" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminPageContents;
