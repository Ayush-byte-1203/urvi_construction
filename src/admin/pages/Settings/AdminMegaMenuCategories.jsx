import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import MegaMenuCategoryForm from './MegaMenuCategoryForm';

const AdminMegaMenuCategories = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'group_title', label: 'Group Title' },
    { key: 'order', label: 'Order' },
  ];

  return (
    <>
      <DataTable title="Menu Categories" endpoint="mega-menu-categories" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <MegaMenuCategoryForm initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminMegaMenuCategories;
