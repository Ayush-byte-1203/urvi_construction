import React, { Component } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Detect chunk load errors or MIME type errors caused by stale deployments
    const isChunkLoadError = error?.name === 'ChunkLoadError' || 
                             (error?.message && error.message.includes('MIME type')) ||
                             (error?.message && error.message.includes('dynamically imported module'));
                             
    if (isChunkLoadError) {
      console.warn('Stale deployment detected. Reloading page to fetch new assets...');
      window.location.reload();
      return;
    }

    this.setState({ errorInfo });
    console.group("🔴 React Component Mounting Crash Detected");
    console.error("Error Message:", error.message);
    console.error("Stack Trace:", error.stack);
    console.error("Component Stack:", errorInfo?.componentStack);
    console.error("Current Route:", window.location.pathname);
    console.groupEnd();
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/'; // Reset by sending user back to home
  };

  render() {
    if (this.state.hasError) {
      const isDev = true;
      return (
        <div 
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-primary, #f8fafc)',
            color: 'var(--text-primary, #1c1917)',
            padding: '2.5rem',
            textAlign: 'center',
            fontFamily: 'var(--font-body, system-ui, sans-serif)'
          }}
        >
          <div className="glass-panel" style={{ padding: '3.5rem', maxWidth: isDev ? '800px' : '580px', width: '100%', borderRadius: 'var(--radius-md, 12px)', border: '1px solid var(--border-color, #e2e8f0)', background: 'var(--card-bg, #ffffff)' }}>
            <AlertTriangle size={54} className="accent-text mb-4" style={{ margin: '0 auto', color: '#ff6b35', animation: 'float 4s ease-in-out infinite' }} />
            <span className="accent-text" style={{ fontSize: '0.8rem', letterSpacing: '0.15em', fontWeight: 'bold', color: '#ff6b35' }}>SYSTEM ERROR</span>
            <h1 className="title-large mb-3" style={{ fontSize: '2.25rem', fontFamily: 'var(--font-display, inherit)', marginTop: '0.5rem' }}>Structural Crash Detected</h1>
            <p className="subtitle mb-6" style={{ margin: '0 auto 1.5rem', fontSize: '0.95rem', color: 'var(--text-muted, #64748b)' }}>
              An unexpected layout conflict has occurred during component mounting. Our engineering desk has been notified.
            </p>

            {isDev && this.state.error && (
              <div style={{ textAlign: 'left', background: '#f1f5f9', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', marginBottom: '2rem', border: '1px solid #cbd5e1', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                <div style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  [{this.state.error.name || 'Error'}]: {this.state.error.message}
                </div>
                <div style={{ color: '#1c1917', fontWeight: 'bold', marginBottom: '0.25rem' }}>Route: {window.location.pathname}</div>
                <div style={{ whiteSpace: 'pre-wrap', color: '#475569', marginBottom: '0.75rem', maxHeight: '150px', overflowY: 'auto' }}>
                  {this.state.error.stack}
                </div>
                {this.state.errorInfo && (
                  <>
                    <div style={{ color: '#1c1917', fontWeight: 'bold', marginBottom: '0.25rem' }}>Component Stack Trace:</div>
                    <div style={{ whiteSpace: 'pre-wrap', color: '#64748b', maxHeight: '150px', overflowY: 'auto' }}>
                      {this.state.errorInfo.componentStack}
                    </div>
                  </>
                )}
              </div>
            )}

            <button 
              onClick={this.handleReset}
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#ff6b35', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              <RotateCcw size={16} /> Reset System Session
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

