import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminServiceCategories = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Category Name' }
  ];

  const schema = [
    { key: 'name', label: 'Category Name', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="Service Categories" endpoint="service-categories" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Service Category" endpoint="service-categories" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminServiceCategories;
