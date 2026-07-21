import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import PackageForm from './PackageForm';

const AdminPackages = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'name', label: 'Package Name' },
    { key: 'price', label: 'Price' },
    { key: 'recommended_budget', label: 'Recommended Budget' },
    { key: 'is_popular', label: 'Popular?' },
    { key: 'order', label: 'Order' },
  ];

  return (
    <>
      <DataTable 
        title="Packages"
        endpoint="packages"
        columns={columns}
        onEdit={(item) => setEditingItem(item)}
      />
      {editingItem !== undefined && (
        <PackageForm 
          initialData={editingItem}
          onCancel={() => setEditingItem(undefined)}
          onSuccess={() => setEditingItem(undefined)}
        />
      )}
    </>
  );
};

export default AdminPackages;
