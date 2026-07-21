import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import ProjectForm from './ProjectForm';

const AdminProjects = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'title', label: 'Project Title' },
    { key: 'category_name', label: 'Category' },
    { key: 'location', label: 'Location' },
    { 
      key: 'image', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="Project" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    }
  ];

  return (
    <>
      <DataTable 
        title="Projects"
        endpoint="projects"
        columns={columns}
        onEdit={(item) => setEditingItem(item)}
      />
      {editingItem !== undefined && (
        <ProjectForm 
          initialData={editingItem}
          onCancel={() => setEditingItem(undefined)}
          onSuccess={() => setEditingItem(undefined)}
        />
      )}
    </>
  );
};

export default AdminProjects;
