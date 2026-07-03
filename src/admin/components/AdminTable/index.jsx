import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './styles.module.css';

const PAGE_SIZE = 8;

const AdminTable = ({
  columns,
  data,
  searchable = true,
  searchKeys = [],
  actions,
  emptyMessage = 'No records found.',
}) => {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query || !searchKeys.length) return data;
    const q = query.toLowerCase();
    return data.filter(row =>
      searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(q))
    );
  }, [data, query, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      return sortDir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  const handleSearch = (e) => { setQuery(e.target.value); setPage(1); };

  return (
    <div className={styles.wrapper}>
      {searchable && (
        <div className={styles.tableToolbar}>
          <div className={styles.searchWrap}>
            <Search size={14} className={styles.searchIcon} />
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search..."
              className={styles.searchInput}
              aria-label="Search table"
            />
          </div>
          <span className={styles.resultCount}>{sorted.length} record{sorted.length !== 1 ? 's' : ''}</span>
        </div>
      )}

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`${styles.th} ${col.sortable !== false ? styles.thSortable : ''}`}
                  onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                  style={{ width: col.width }}
                >
                  <span>{col.label}</span>
                  {col.sortable !== false && sortKey === col.key && (
                    sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                  )}
                </th>
              ))}
              {actions && <th className={styles.th} style={{ width: 100 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className={styles.emptyCell}>
                  {emptyMessage}
                </td>
              </tr>
            ) : paged.map((row, i) => (
              <tr key={row.id ?? i} className={styles.tr}>
                {columns.map(col => (
                  <td key={col.key} className={styles.td}>
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '—')}
                  </td>
                ))}
                {actions && (
                  <td className={styles.td}>
                    <div className={styles.actionRow}>
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={14} />
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
