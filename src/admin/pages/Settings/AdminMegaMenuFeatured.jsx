import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminMegaMenuFeatured = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('/api/mega-menus/')
      .then(res => setMenus(res.data.map(m => ({ value: m.id, label: m.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'title', label: 'Featured Title' },
    { key: 'mega_menu', label: 'Mega Menu ID' },
    {
      key: 'image',
      label: 'Image',
      render: (val) => val ? <img src={val} alt="Featured" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    }
  ];

  const schema = [
    { key: 'mega_menu', label: 'Mega Menu', type: 'select', options: menus, required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'link_text', label: 'Link Text', type: 'text' },
    { key: 'link_url', label: 'Link URL', type: 'text' }
  ];

  return (
    <>
      <DataTable title="Mega Menu Featured" endpoint="mega-menu-featured" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Featured Item" endpoint="mega-menu-featured" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminMegaMenuFeatured;
