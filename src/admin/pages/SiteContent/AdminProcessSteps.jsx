import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminProcessSteps = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'step_number', label: 'Step #' },
    { key: 'title', label: 'Title' },
    { key: 'icon_name', label: 'Icon' },
    { key: 'order', label: 'Order' }
  ];

  const schema = [
    { key: 'step_number', label: 'Step Number (e.g. 01, 02)', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'icon_name', label: 'Icon Name (Lucide)', type: 'text', required: true, defaultValue: 'FileText' },
    { key: 'image', label: 'Step Image', type: 'image' },
    { key: 'video_url', label: 'Step Video URL', type: 'text' },
    { key: 'order', label: 'Order', type: 'text', defaultValue: '0' }
  ];

  return (
    <>
      <DataTable title="Process Steps / How It Works" endpoint="process-steps" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Process Step" endpoint="process-steps" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};

export default AdminProcessSteps;
