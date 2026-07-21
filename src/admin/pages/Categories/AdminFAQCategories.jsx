import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminFAQCategories = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Category Name' }
  ];

  const schema = [
    { key: 'name', label: 'Category Name', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="FAQ Categories" endpoint="faq-categories" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="FAQ Category" endpoint="faq-categories" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminFAQCategories;
