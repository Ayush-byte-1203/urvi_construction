import React from 'react';
import AdminPageHeader from '../../components/AdminPageHeader';
import { monthlyLeads, leadsBySource, pageViews, adminStats } from '../../data/adminDummyData';
import { Users, FileText, Layers, BookOpen, Mail, TrendingUp } from 'lucide-react';
import s from '../adminShared.module.css';
import ts from './styles.module.css';

const maxLeads   = Math.max(...monthlyLeads.map(m => m.leads));
const maxViews   = Math.max(...pageViews.map(p => p.views));
const totalSrc   = leadsBySource.reduce((acc, d) => acc + d.count, 0);

const ICON_MAP  = { users: Users, 'file-text': FileText, layers: Layers, 'book-open': BookOpen, mail: Mail, 'trending-up': TrendingUp };
const COLOR_MAP = { users:'#3b82f6', 'file-text':'#f59e0b', layers:'#8b5cf6', 'book-open':'#10b981', mail:'#06b6d4', 'trending-up':'#ec4899' };

const AdminAnalytics = () => (
  <div className={s.page}>
    <AdminPageHeader title="Analytics Dashboard" subtitle="Engagement, traffic and lead performance overview." />

    {/* Stat Cards */}
    <div className={ts.statsRow}>
      {adminStats.map(stat => {
        const Icon = ICON_MAP[stat.icon] || TrendingUp;
        return (
          <div key={stat.id} className={ts.statCard}>
            <div className={ts.statIcon} style={{ background:`${COLOR_MAP[stat.icon]}18`, color:COLOR_MAP[stat.icon] }}><Icon size={18} /></div>
            <div className={ts.statVal}>{typeof stat.value === 'number' && stat.value >= 1000 ? stat.value.toLocaleString() : stat.value}{stat.unit}</div>
            <div className={ts.statLabel}>{stat.label}</div>
            <div className={ts.statTrend} style={{ color: stat.trend >= 0 ? '#16a34a' : '#dc2626' }}>
              {stat.trend >= 0 ? '▲' : '▼'} {Math.abs(stat.trend)}% vs last month
            </div>
          </div>
        );
      })}
    </div>

    {/* Charts Row */}
    <div className={ts.chartsGrid}>
      {/* Monthly Leads Bar Chart */}
      <div className={ts.chartCard}>
        <h3 className={ts.chartTitle}>Monthly Lead Volume</h3>
        <p className={ts.chartSub}>Jan – Dec 2026 · Total: {monthlyLeads.reduce((a,m)=>a+m.leads,0)} leads</p>
        <div className={ts.barChart}>
          {monthlyLeads.map(m => (
            <div key={m.month} className={ts.barGroup}>
              <span className={ts.barVal}>{m.leads}</span>
              <div className={ts.barWrap}>
                <div className={ts.bar} style={{ height:`${(m.leads/maxLeads)*100}%` }} />
              </div>
              <span className={ts.barLabel}>{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Source Donut */}
      <div className={ts.chartCard}>
        <h3 className={ts.chartTitle}>Leads by Source</h3>
        <p className={ts.chartSub}>Total: {totalSrc} leads</p>
        <div className={ts.donutWrap}>
          <svg viewBox="0 0 120 120" className={ts.donut}>
            {(() => {
              let offset = 0;
              const r = 45, circ = 2*Math.PI*r;
              return leadsBySource.map(s => {
                const pct = s.count/totalSrc;
                const dash = pct * circ;
                const el = <circle key={s.source} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="18" strokeDasharray={`${dash} ${circ-dash}`} strokeDashoffset={-offset*circ} transform="rotate(-90 60 60)" />;
                offset += pct;
                return el;
              });
            })()}
            <text x="60" y="57" textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">{totalSrc}</text>
            <text x="60" y="70" textAnchor="middle" fontSize="7" fill="#94a3b8">leads</text>
          </svg>
          <div className={ts.legend}>
            {leadsBySource.map(s => (
              <div key={s.source} className={ts.legendRow}>
                <span className={ts.legendDot} style={{ background:s.color }} />
                <span className={ts.legendLabel}>{s.source}</span>
                <span className={ts.legendPct}>{Math.round(s.count/totalSrc*100)}%</span>
                <span className={ts.legendVal}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Page views horizontal bars */}
    <div className={ts.chartCard}>
      <h3 className={ts.chartTitle}>Page Views by Section</h3>
      <p className={ts.chartSub}>Monthly sessions breakdown</p>
      <div className={ts.hbars}>
        {pageViews.map(p => (
          <div key={p.page} className={ts.hbarRow}>
            <span className={ts.hbarPage}>{p.page}</span>
            <div className={ts.hbarTrack}>
              <div className={ts.hbarFill} style={{ width:`${(p.views/maxViews)*100}%` }} />
            </div>
            <span className={ts.hbarVal}>{p.views.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminAnalytics;
