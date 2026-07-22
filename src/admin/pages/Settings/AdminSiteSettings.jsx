import React, { useState } from 'react';
import DataTable from '../../components/data/DataTable';
import DataForm from '../../components/data/DataForm';

const AdminSiteSettings = () => {
  const [editingItem, setEditingItem] = useState(undefined);

  const columns = [
    { key: 'site_name', label: 'Site Name' },
    { key: 'contact_email', label: 'Contact Email' }
  ];

  const schema = [
    { key: 'site_name', label: 'Site Name', type: 'text', required: true },
    { key: 'logo', label: 'Logo', type: 'image' },
    { key: 'contact_email', label: 'Contact Email', type: 'text' },
    { key: 'contact_phone', label: 'Contact Phone', type: 'text' },
    { key: 'address', label: 'Address', type: 'textarea' },
    { key: 'facebook_url', label: 'Facebook URL', type: 'text' },
    { key: 'twitter_url', label: 'Twitter URL', type: 'text' },
    { key: 'linkedin_url', label: 'LinkedIn URL', type: 'text' },
    { key: 'instagram_url', label: 'Instagram URL', type: 'text' },
    { key: 'hero_headline', label: 'Hero Headline', type: 'textarea' },
    { key: 'hero_video_url', label: 'Hero Video URL', type: 'text' },
    { key: 'hero_poster_url', label: 'Hero Poster URL', type: 'text' },
    { key: 'emailjs_service_id', label: 'EmailJS Service ID', type: 'text' },
    { key: 'emailjs_template_id', label: 'EmailJS Template ID', type: 'text' },
    { key: 'emailjs_public_key', label: 'EmailJS Public Key', type: 'text' },
    { key: 'emailjs_private_key', label: 'EmailJS Private Key', type: 'text' }
  ];

  return (
    <>
      <DataTable title="Site Settings" endpoint="settings" columns={columns} onEdit={(item) => setEditingItem(item)} />
      {editingItem !== undefined && (
        <DataForm title="Site Settings" endpoint="settings" schema={schema} initialData={editingItem} onCancel={() => setEditingItem(undefined)} onSuccess={() => setEditingItem(undefined)} />
      )}
    </>
  );
};
export default AdminSiteSettings;
