import React from 'react';
import { LayoutDashboard, Database, Link } from 'lucide-react';

const Dashboard = () => {
  return (
    <div style={{ maxWidth: '1000px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>
        Welcome to Control Studio
      </h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        Monitor your catalog statistics and keep your database updated in real-time.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Core Data Models</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>4</span>
            <div style={{ padding: '0.5rem', backgroundColor: '#fff7ed', color: '#ea580c', borderRadius: '0.5rem' }}>
              <Database size={20} />
            </div>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Site Content Sections</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a' }}>8</span>
            <div style={{ padding: '0.5rem', backgroundColor: '#ecfdf5', color: '#10b981', borderRadius: '0.5rem' }}>
              <LayoutDashboard size={20} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#0f172a', color: 'white', padding: '2rem', borderRadius: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Link size={20} />
          Live Django Backend Connected
        </h2>
        <p style={{ color: '#94a3b8', lineHeight: 1.6, maxWidth: '600px' }}>
          Database operations are synchronizing perfectly. Any changes made to projects, services, packages, or site settings will propagate live to all customers instantly.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
