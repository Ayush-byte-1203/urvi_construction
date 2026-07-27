import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminWhyChooseUs = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'icon_name', label: 'Icon' },
    { key: 'order', label: 'Order' }
  ];

  const schema = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'icon_name', label: 'Icon Name (Lucide)', type: 'text', required: true, defaultValue: 'ShieldCheck' },
    { key: 'order', label: 'Order', type: 'text', defaultValue: '0' }
  ];

  return (
    <>
      <DataTable title="Why Choose Us Features" endpoint="why-choose-us" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Why Choose Us Item" endpoint="why-choose-us" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};

export default AdminWhyChooseUs;
