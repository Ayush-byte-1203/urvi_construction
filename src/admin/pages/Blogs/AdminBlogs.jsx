import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminBlogs = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/blog-categories/')
      .then(res => setCategories(res.data.map(c => ({ value: c.id, label: c.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category_name', label: 'Category' },
    { key: 'author', label: 'Author' },
    { key: 'date', label: 'Date' },
    { 
      key: 'image', 
      label: 'Image',
      render: (val) => val ? <img src={val} alt="Blog" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} /> : 'No Image'
    }
  ];

  const schema = [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'select', options: categories },
    { key: 'author', label: 'Author', type: 'text', defaultValue: 'Paramarsh Construction' },
    { key: 'content', label: 'Content', type: 'textarea', required: true },
    { key: 'image', label: 'Image', type: 'image' }
  ];

  return (
    <>
      <DataTable 
        title="Blogs"
        endpoint="blogs"
        columns={columns}
        onEdit={(item) => setEditingItem(item)}
      />
      {editingItem !== undefined && (
        <DataForm 
          title="Blog Post"
          endpoint="blogs"
          schema={schema}
          initialData={editingItem}
          onCancel={() => setEditingItem(undefined)}
          onSuccess={() => setEditingItem(undefined)}
        />
      )}
    </>
  );
};

export default AdminBlogs;
