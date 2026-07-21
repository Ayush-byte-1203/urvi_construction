import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminPackageFAQs = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('/api/packages/')
      .then(res => setPackages(res.data.map(p => ({ value: p.id, label: p.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'question', label: 'Question' },
    { key: 'package', label: 'Package ID' }
  ];

  const schema = [
    { key: 'package', label: 'Package', type: 'select', options: packages, required: true },
    { key: 'question', label: 'Question', type: 'text', required: true },
    { key: 'answer', label: 'Answer', type: 'textarea', required: true }
  ];

  return (
    <>
      <DataTable title="Package FAQs" endpoint="package-faqs" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Package FAQ" endpoint="package-faqs" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminPackageFAQs;
