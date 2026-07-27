import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminJourney = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'year', label: 'Year' },
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' }
  ];

  const schema = [
    { key: 'year', label: 'Year (e.g. 2016, 2024)', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'image', label: 'Milestone Image', type: 'image' },
    { key: 'order', label: 'Order', type: 'text', defaultValue: '0' }
  ];

  return (
    <>
      <DataTable title="Company Journey & Timeline" endpoint="journey" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Journey Milestone" endpoint="journey" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};

export default AdminJourney;
