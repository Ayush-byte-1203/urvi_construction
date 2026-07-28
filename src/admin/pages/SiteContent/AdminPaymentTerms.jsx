import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminPaymentTerms = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'stage_name', label: 'Stage Name' },
    { key: 'percentage_or_condition', label: 'Payment Terms / Percentage' },
    { key: 'order', label: 'Order' }
  ];

  const schema = [
    { key: 'stage_name', label: 'Stage Name (e.g. Advance Payment for Material dumping)', type: 'text', required: true },
    { key: 'percentage_or_condition', label: 'Percentage / Condition (e.g. 10% Based on Total Slab Area)', type: 'text', required: true },
    { key: 'note', label: 'Additional Note (Optional)', type: 'textarea' },
    { key: 'order', label: 'Display Order', type: 'text', defaultValue: '0' }
  ];

  return (
    <>
      <DataTable title="Payment Terms & Conditions" endpoint="payment-terms" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Payment Term" endpoint="payment-terms" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};

export default AdminPaymentTerms;
