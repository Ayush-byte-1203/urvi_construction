import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import styles from './DataTable.module.css';

const DataTable = ({ title, endpoint, columns, onEdit }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(`/api/${endpoint}/`);
  const { token } = useAdminAuth();

  useEffect(() => {
    setCurrentUrl(`/api/${endpoint}/`);
  }, [endpoint]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // We use absolute URL or relative URL from currentUrl
        const res = await axios.get(currentUrl.startsWith('http') ? currentUrl : currentUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && res.data.results !== undefined) {
          setData(res.data.results);
          setNextUrl(res.data.next);
          setPrevUrl(res.data.previous);
        } else {
          setData(res.data);
          setNextUrl(null);
          setPrevUrl(null);
        }
      } catch (err) {
        console.error('Failed to fetch data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentUrl, token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/${endpoint}/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // re-fetch current page
      const res = await axios.get(currentUrl, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data && res.data.results !== undefined) {
        setData(res.data.results);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
      } else {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to delete item', err);
      alert('Error deleting item');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input type="text" placeholder="Search..." className={styles.searchInput} />
          </div>
          <button className={styles.addBtn} onClick={() => onEdit(null)}>
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className={styles.loaderContainer}>
            <Loader2 className={styles.spinner} size={32} />
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th className={styles.actionsCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className={styles.actionsCell}>
                    <button className={styles.iconBtn} onClick={() => onEdit(item)}>
                      <Edit2 size={16} />
                    </button>
                    <button className={`${styles.iconBtn} ${styles.deleteBtn}`} onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className={styles.emptyState}>
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {(nextUrl || prevUrl) && (
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn} 
            disabled={!prevUrl} 
            onClick={() => prevUrl && setCurrentUrl(prevUrl)}
          >
            Previous
          </button>
          <button 
            className={styles.pageBtn} 
            disabled={!nextUrl} 
            onClick={() => nextUrl && setCurrentUrl(nextUrl)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
