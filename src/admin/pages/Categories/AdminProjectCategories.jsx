import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminProjectCategories = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Category Name' }
  ];

  const schema = [
    { key: 'name', label: 'Category Name', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="Project Categories" endpoint="project-categories" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Project Category" endpoint="project-categories" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminProjectCategories;
