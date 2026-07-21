import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminCoreValues = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'icon_name', label: 'Icon' },
    { key: 'order', label: 'Order' }
  ];

  const schema = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'icon_name', label: 'Icon Name (Lucide)', type: 'text', required: true },
    { key: 'order', label: 'Order', type: 'text', defaultValue: '0' }
  ];

  return (
    <>
      <DataTable title="Core Values" endpoint="core-values" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Core Value" endpoint="core-values" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminCoreValues;
