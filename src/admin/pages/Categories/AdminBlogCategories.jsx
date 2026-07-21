import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminBlogCategories = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Category Name' }
  ];

  const schema = [
    { key: 'name', label: 'Category Name', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="Blog Categories" endpoint="blog-categories" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Blog Category" endpoint="blog-categories" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminBlogCategories;
