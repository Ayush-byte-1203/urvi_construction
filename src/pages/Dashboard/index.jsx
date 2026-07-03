import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Download, FileText, Send, User, Award, Clock, DollarSign, MessageSquare 
} from 'lucide-react';
import { appConfig } from '../../config/appConfig';
import { AppServices } from '../../services/AppServices';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/common/Button';
import styles from './styles.module.css';

const Dashboard = () => {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'assistant', text: 'Hello Dr. Sen! Ask me about your construction timeline, structural specifications, or package estimations.' }
  ]);

  useEffect(() => {
    let active = true;
    AppServices.projects.getActiveTracker()
      .then((res) => {
        if (active) {
          setProjectData(res);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      active = false;
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');

    // Simulate AI response delay
    setTimeout(() => {
      const lower = userMsg.text.toLowerCase();
      let reply = "I've recorded that query. A senior site engineer will coordinate clarifications calls.";

      if (lower.includes('timeline') || lower.includes('schedule') || lower.includes('when')) {
        reply = `According to active tracker coordinates, your next milestone "${projectData?.timelines[3]?.phase || 'Electrical Conduits'}" is scheduled for early next week.`;
      } else if (lower.includes('payment') || lower.includes('cost') || lower.includes('invoice')) {
        reply = "Your third milestone payment (20% Slab Casting) is currently pending review. You can download the ledger XLS inside the Document Center.";
      } else if (lower.includes('package') || lower.includes('elite') || lower.includes('spec')) {
        reply = "Your project is built under the Signature Elite Tier, guaranteeing 15-Yr concrete column warranties and pre-polished Italian marble.";
      }

      setChatMessages((prev) => [...prev, { sender: 'assistant', text: reply }]);
    }, 500);
  };

  if (loading) {
    return (
      <div style={{ padding: '12rem 0', display: 'flex', justifyContent: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="client-dashboard-page">
      <Helmet>
        <title>Client Portal Dashboard | {appConfig.company.name}</title>
        <meta name="description" content="Track your construction milestones, billing ledgers, and architectural blueprints layouts." />
      </Helmet>

      {/* Breadcrumb Header */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <span>Client Portal</span>
          </div>
          <h1 className="display-md" style={{ color: 'var(--text-primary)' }}>Welcome Back, Dr. Sen</h1>
          <p className="subheading" style={{ margin: '0.5rem auto 0', maxWidth: '700px' }}>
            Portal Overview &middot; {projectData?.name}
          </p>
        </div>
      </section>

      {/* Main dashboard content */}
      <section className="section container">
        <div className={styles.portalSplit}>
          {/* Left Column: Progress status + payments + documents */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Active tracker card */}
            <div className={styles.trackerCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                <div>
                  <span className="text-overline">Active Phase</span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', fontFamily: 'var(--font-family-display)', fontWeight: 600 }}>
                    {projectData?.stage}
                  </h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Site Manager</span>
                  <span style={{ display: 'block', fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{projectData?.manager}</span>
                </div>
              </div>

              {/* Progress Line bar */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Total structural completion</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{projectData?.completionPercent}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressBar} style={{ width: `${projectData?.completionPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Milestones checklist status */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 600 }}>
                Milestone Phases Timeline
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {projectData?.timelines.map((time, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-divider)', paddingBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Clock size={16} style={{ color: time.done ? 'var(--brand-success)' : 'var(--color-text-muted)' }} />
                      <span style={{ fontSize: '0.9rem', color: time.done ? 'var(--text-primary)' : 'var(--color-text-muted)' }}>
                        {time.phase}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: time.done ? 'var(--brand-success)' : 'var(--color-text-muted)' }}>
                      {time.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing installments */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', color: 'var(--accent)', marginBottom: '1.5rem', fontWeight: 600 }}>
                Payment Installments Ledger
              </h3>
              <div>
                {projectData?.payments.map((pay, idx) => (
                  <div key={idx} className={styles.milestoneRow}>
                    <span className={styles.milestoneLabel}>{pay.name}</span>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{pay.amount}</span>
                      <span style={{ fontSize: '0.75rem', color: pay.status === 'Paid' ? 'var(--brand-success)' : 'var(--accent)' }}>
                        {pay.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Downloads Center */}
            <div className="glass-panel" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-family-display)', color: 'var(--accent)', marginBottom: '1rem', fontWeight: 600 }}>
                Document Vault Center
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                Download certified load logs sheets, architectural PDFs, and bulk cost receipts drafts.
              </p>

              <div className={styles.docGrid}>
                {projectData?.documents.map((doc, idx) => (
                  <div key={idx} className={styles.docCard}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <FileText size={20} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                      <div>
                        <h4 className={styles.docTitle}>{doc.name}</h4>
                        <span className={styles.docMeta}>{doc.size} &middot; Certified PDF release</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Mock downloading initiated for ${doc.name}`)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                      aria-label={`Download file ${doc.name}`}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant Chat */}
          <div className={styles.chatPanel}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', borderBottom: '1px solid var(--color-divider)', paddingBottom: '1rem' }}>
              <MessageSquare size={20} style={{ color: 'var(--accent)' }} />
              <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-family-display)', fontWeight: 600, color: 'var(--text-primary)' }}>
                BuildCraft AI Assistant
              </h3>
            </div>

            <div className={styles.chatLog}>
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`${styles.chatBubble} ${msg.sender === 'user' ? styles.userBubble : styles.assistantBubble}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className={styles.chatInputWrapper}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about timeline or payments..."
                className={styles.chatInput}
                aria-label="Ask AI Assistant query"
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                aria-label="Send query"
              >
                <Send size={12} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
