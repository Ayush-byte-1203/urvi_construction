import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminFAQs = () => {
  const [editingItem, setEditingItem] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/api/faq-categories/')
      .then(res => setCategories(res.data.map(c => ({ value: c.id, label: c.name }))))
      .catch(err => console.error(err));
  }, []);

  const columns = [
    { key: 'question', label: 'Question' },
    { key: 'category_name', label: 'Category' }
  ];

  const schema = [
    { key: 'category', label: 'Category', type: 'select', options: categories },
    { key: 'question', label: 'Question', type: 'text', required: true },
    { key: 'answer', label: 'Answer', type: 'textarea', required: true }
  ];

  return (
    <>
      <DataTable title="FAQs" endpoint="faqs" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="FAQ" endpoint="faqs" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminFAQs;
