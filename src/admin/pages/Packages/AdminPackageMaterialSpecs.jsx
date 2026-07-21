import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminPackageMaterialSpecs = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/packages/')
      .then(res => setPackages(res.data.map(p => ({ value: p.id, label: p.name }))))
      .catch(err => console.error(err));

    axios.get('/api/package-material-categories/')
      .then(res => setCategories(res.data.map(c => ({ value: c.id, label: c.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'name', label: 'Material Name' },
    { key: 'category_name', label: 'Category' },
    { key: 'package', label: 'Package ID' }
  ];

  const schema = [
    { key: 'package', label: 'Package', type: 'select', options: packages, required: true },
    { key: 'category', label: 'Category', type: 'select', options: categories, required: true },
    { key: 'name', label: 'Material Name', type: 'text', required: true },
    { key: 'value', label: 'Value/Description', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="Package Material Specs" endpoint="package-material-specs" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Material Spec" endpoint="package-material-specs" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminPackageMaterialSpecs;
