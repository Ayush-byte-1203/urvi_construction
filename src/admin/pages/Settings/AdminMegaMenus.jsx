import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import MegaMenuForm from './MegaMenuForm';

const AdminMegaMenus = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Menu Identifier' }
  ];

  return (
    <>
      <DataTable title="Mega Menus" endpoint="mega-menus" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <MegaMenuForm initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminMegaMenus;
