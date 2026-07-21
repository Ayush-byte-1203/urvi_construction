import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminPackageAdvantages = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('/api/packages/')
      .then(res => setPackages(res.data.map(p => ({ value: p.id, label: p.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'title', label: 'Advantage Title' },
    { key: 'package', label: 'Package ID' }
  ];

  const schema = [
    { key: 'package', label: 'Package', type: 'select', options: packages, required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon_name', label: 'Icon Name (Lucide)', type: 'text' }
  ];

  return (
    <>
      <DataTable title="Package Advantages" endpoint="package-advantages" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Package Advantage" endpoint="package-advantages" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminPackageAdvantages;
