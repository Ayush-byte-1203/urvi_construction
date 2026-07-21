import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminMegaMenuLinks = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/mega-menu-categories/')
      .then(res => setCategories(res.data.map(c => ({ value: c.id, label: c.title }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'label', label: 'Link Label' },
    { key: 'url', label: 'URL' },
    { key: 'category', label: 'Category ID' }
  ];

  const schema = [
    { key: 'category', label: 'Menu Category', type: 'select', options: categories, required: true },
    { key: 'label', label: 'Link Label', type: 'text', required: true },
    { key: 'url', label: 'URL', type: 'text', required: true }
  ];

  return (
    <>
      <DataTable title="Mega Menu Links" endpoint="mega-menu-links" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Menu Link" endpoint="mega-menu-links" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminMegaMenuLinks;
