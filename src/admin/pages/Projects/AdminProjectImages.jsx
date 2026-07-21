import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminProjectImages = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects/')
      .then(res => setProjects(res.data.map(p => ({ value: p.id, label: p.title }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'project', label: 'Project ID' },
    {
      key: 'image',
      label: 'Image',
      render: (val) => val ? <img src={val} alt="Project" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    }
  ];

  const schema = [
    { key: 'project', label: 'Project', type: 'select', options: projects, required: true },
    { key: 'image', label: 'Image', type: 'image', required: true }
  ];

  return (
    <>
      <DataTable title="Project Images" endpoint="project-images" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Project Image" endpoint="project-images" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminProjectImages;
