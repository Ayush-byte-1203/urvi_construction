import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Layers, BookOpen, Mail, TrendingUp, CheckSquare, Square, ExternalLink } from 'lucide-react';
import AdminStatCard from '../../components/AdminStatCard';
import AdminBadge from '../../components/AdminBadge';
import { adminStats, monthlyLeads, leadsBySource, leadsData, quotesData, projectsAdminData, blogsAdminData, adminTasks, adminNotifications } from '../../data/adminDummyData';
import { ADMIN_ROUTES } from '../../../constants/routes';
import styles from './styles.module.css';

const ICON_MAP = { users: Users, 'file-text': FileText, layers: Layers, 'book-open': BookOpen, mail: Mail, 'trending-up': TrendingUp };
const COLOR_MAP = { users: '#3b82f6', 'file-text': '#f59e0b', layers: '#8b5cf6', 'book-open': '#10b981', mail: '#06b6d4', 'trending-up': '#ec4899' };

const maxLeads = Math.max(...monthlyLeads.map(m => m.leads));
const totalLeadSource = leadsBySource.reduce((s, d) => s + d.count, 0);

const AdminDashboard = () => {
  const [tasks, setTasks] = useState(adminTasks);

  const toggleTask = (id) =>
    setTasks(t => t.map(task => task.id === id ? { ...task, done: !task.done } : task));

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Overview Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back, Sandeep. Here's what's happening today.</p>
        </div>
        <span className={styles.dateBadge}>
          {new Date().toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
        </span>
      </div>

      {/* KPI Row */}
      <div className={styles.statsGrid}>
        {adminStats.map(stat => {
          const Icon = ICON_MAP[stat.icon] || TrendingUp;
          return (
            <AdminStatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              trend={stat.trend}
              icon={Icon}
              color={COLOR_MAP[stat.icon]}
            />
          );
        })}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        {/* Bar Chart — Monthly Leads */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Monthly Leads Trend</h3>
            <span className={styles.chartSub}>Jan – Dec 2026</span>
          </div>
          <div className={styles.barChart}>
            {monthlyLeads.map(m => (
              <div key={m.month} className={styles.barGroup}>
                <div className={styles.barWrap}>
                  <div
                    className={styles.bar}
                    style={{ height: `${(m.leads / maxLeads) * 100}%` }}
                    title={`${m.leads} leads`}
                  />
                </div>
                <span className={styles.barLabel}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut — Leads by Source */}
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Leads by Source</h3>
            <span className={styles.chartSub}>All time</span>
          </div>
          <div className={styles.donutWrap}>
            <svg viewBox="0 0 120 120" className={styles.donut}>
              {(() => {
                let offset = 0;
                const r = 45, circ = 2 * Math.PI * r;
                return leadsBySource.map(s => {
                  const pct = s.count / totalLeadSource;
                  const dash = pct * circ;
                  const el = (
                    <circle
                      key={s.source}
                      cx="60" cy="60" r={r}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="18"
                      strokeDasharray={`${dash} ${circ - dash}`}
                      strokeDashoffset={-offset * circ}
                      transform="rotate(-90 60 60)"
                    />
                  );
                  offset += pct;
                  return el;
                });
              })()}
              <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" fontSize="14" fontWeight="800" fill="#0f172a">
                {totalLeadSource}
              </text>
              <text x="60" y="74" textAnchor="middle" fontSize="7" fill="#94a3b8">total</text>
            </svg>
            <div className={styles.donutLegend}>
              {leadsBySource.map(s => (
                <div key={s.source} className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: s.color }} />
                  <span className={styles.legendLabel}>{s.source}</span>
                  <span className={styles.legendVal}>{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className={styles.tablesRow}>
        {/* Recent Leads */}
        <div className={styles.tableCard}>
          <div className={styles.tableCardHeader}>
            <h3 className={styles.tableCardTitle}>Recent Leads</h3>
            <Link to={ADMIN_ROUTES.LEADS} className={styles.viewAllLink}>View all <ExternalLink size={12}/></Link>
          </div>
          <table className={styles.miniTable}>
            <thead>
              <tr>
                <th>Name</th><th>Service</th><th>City</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leadsData.slice(0, 5).map(l => (
                <tr key={l.id}>
                  <td><span className={styles.leadName}>{l.name}</span><br/><span className={styles.leadMeta}>{l.date}</span></td>
                  <td>{l.service}</td>
                  <td>{l.city}</td>
                  <td><AdminBadge status={l.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Quotes */}
        <div className={styles.tableCard}>
          <div className={styles.tableCardHeader}>
            <h3 className={styles.tableCardTitle}>Recent Quote Requests</h3>
            <Link to={ADMIN_ROUTES.QUOTES} className={styles.viewAllLink}>View all <ExternalLink size={12}/></Link>
          </div>
          <table className={styles.miniTable}>
            <thead>
              <tr>
                <th>Name</th><th>Package</th><th>Budget</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotesData.slice(0, 5).map(q => (
                <tr key={q.id}>
                  <td><span className={styles.leadName}>{q.name}</span><br/><span className={styles.leadMeta}>{q.city}</span></td>
                  <td style={{ fontSize: '0.76rem' }}>{q.package}</td>
                  <td style={{ fontSize: '0.78rem', fontWeight: 600 }}>{q.budget}</td>
                  <td><AdminBadge status={q.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Row: Tasks + Notifications + Active Projects */}
      <div className={styles.bottomRow}>
        {/* Tasks */}
        <div className={styles.taskCard}>
          <div className={styles.tableCardHeader}>
            <h3 className={styles.tableCardTitle}>Upcoming Tasks</h3>
            <span className={styles.taskCount}>{tasks.filter(t => !t.done).length} pending</span>
          </div>
          <div className={styles.taskList}>
            {tasks.map(task => (
              <div key={task.id} className={`${styles.taskItem} ${task.done ? styles.taskDone : ''}`}>
                <button
                  className={styles.taskCheck}
                  onClick={() => toggleTask(task.id)}
                  aria-label={task.done ? 'Mark incomplete' : 'Mark complete'}
                >
                  {task.done ? <CheckSquare size={16} color="#3b82f6" /> : <Square size={16} color="#94a3b8" />}
                </button>
                <div className={styles.taskBody}>
                  <span className={styles.taskTitle}>{task.title}</span>
                  <span className={styles.taskMeta}>{task.due}</span>
                </div>
                <AdminBadge status={task.priority} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Projects */}
        <div className={styles.taskCard}>
          <div className={styles.tableCardHeader}>
            <h3 className={styles.tableCardTitle}>Active Projects</h3>
            <Link to={ADMIN_ROUTES.PROJECTS} className={styles.viewAllLink}>View all <ExternalLink size={12}/></Link>
          </div>
          <div className={styles.projectList}>
            {projectsAdminData.filter(p => p.status === 'ongoing').map(proj => (
              <div key={proj.id} className={styles.projectItem}>
                <div className={styles.projectInfo}>
                  <span className={styles.projectName}>{proj.name}</span>
                  <span className={styles.projectMeta}>{proj.location} · {proj.category}</span>
                </div>
                <div className={styles.projectProgress}>
                  <div className={styles.progressRow}>
                    <span className={styles.progressLabel}>{proj.completionPct}%</span>
                  </div>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressBar} style={{ width: `${proj.completionPct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blog + Notifications */}
        <div className={styles.taskCard}>
          <div className={styles.tableCardHeader}>
            <h3 className={styles.tableCardTitle}>Recent Articles</h3>
            <Link to={ADMIN_ROUTES.BLOGS} className={styles.viewAllLink}>View all <ExternalLink size={12}/></Link>
          </div>
          <div className={styles.blogList}>
            {blogsAdminData.slice(0, 4).map(b => (
              <div key={b.id} className={styles.blogItem}>
                <div className={styles.blogInfo}>
                  <span className={styles.blogTitle}>{b.title}</span>
                  <span className={styles.blogMeta}>{b.author} · {b.date}</span>
                </div>
                <AdminBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
