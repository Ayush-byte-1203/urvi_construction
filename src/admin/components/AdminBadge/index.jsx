import React from 'react';

const STATUS_MAP = {
  active:       { bg: '#f0fdf4', color: '#16a34a', label: 'Active' },
  draft:        { bg: '#fafafa', color: '#64748b', label: 'Draft' },
  published:    { bg: '#f0fdf4', color: '#16a34a', label: 'Published' },
  pending:      { bg: '#fffbeb', color: '#d97706', label: 'Pending' },
  reviewed:     { bg: '#eff6ff', color: '#2563eb', label: 'Reviewed' },
  sent:         { bg: '#f5f3ff', color: '#7c3aed', label: 'Sent' },
  closed:       { bg: '#fef2f2', color: '#dc2626', label: 'Closed' },
  new:          { bg: '#eff6ff', color: '#2563eb', label: 'New' },
  contacted:    { bg: '#fff7ed', color: '#ea580c', label: 'Contacted' },
  converted:    { bg: '#f0fdf4', color: '#16a34a', label: 'Converted' },
  ongoing:      { bg: '#eff6ff', color: '#2563eb', label: 'Ongoing' },
  completed:    { bg: '#f0fdf4', color: '#16a34a', label: 'Completed' },
  hidden:       { bg: '#fef2f2', color: '#dc2626', label: 'Hidden' },
  suspended:    { bg: '#fef2f2', color: '#dc2626', label: 'Suspended' },
  unsubscribed: { bg: '#fef2f2', color: '#dc2626', label: 'Unsubscribed' },
  review:       { bg: '#fffbeb', color: '#d97706', label: 'In Review' },
  interview:    { bg: '#eff6ff', color: '#2563eb', label: 'Interview' },
  offer:        { bg: '#f0fdf4', color: '#16a34a', label: 'Offer' },
  rejected:     { bg: '#fef2f2', color: '#dc2626', label: 'Rejected' },
  high:         { bg: '#fef2f2', color: '#dc2626', label: 'High' },
  medium:       { bg: '#fffbeb', color: '#d97706', label: 'Medium' },
  low:          { bg: '#f0fdf4', color: '#16a34a', label: 'Low' },
  premium:      { bg: '#f5f3ff', color: '#7c3aed', label: 'Premium' },
  standard:     { bg: '#f0fdf4', color: '#16a34a', label: 'Standard' },
};

const AdminBadge = ({ status, custom }) => {
  const cfg = STATUS_MAP[status] ?? { bg: '#f1f5f9', color: '#475569', label: custom ?? status };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      background: cfg.bg,
      color: cfg.color,
      fontSize: '0.68rem',
      fontWeight: 700,
      padding: '0.2rem 0.6rem',
      borderRadius: '999px',
      whiteSpace: 'nowrap',
      textTransform: 'capitalize',
      letterSpacing: '0.02em',
    }}>
      {cfg.label}
    </span>
  );
};

export default AdminBadge;
