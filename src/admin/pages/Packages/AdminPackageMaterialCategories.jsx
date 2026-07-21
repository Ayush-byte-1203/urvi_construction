import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminPackageMaterialCategories = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('/api/packages/')
      .then(res => setPackages(res.data.map(p => ({ value: p.id, label: p.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'name', label: 'Category Name' },
    { key: 'package', label: 'Package ID' }
  ];

  const schema = [
    { key: 'package', label: 'Package', type: 'select', options: packages, required: true },
    { key: 'name', label: 'Category Name', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="Package Material Categories" endpoint="package-material-categories" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Material Category" endpoint="package-material-categories" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminPackageMaterialCategories;
