import React from 'react';
import { Sparkles, Trophy, Flame, CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../../types/user';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  const getIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'xp':
        return <Sparkles size={16} color="#818cf8" />;
      case 'level':
        return <Trophy size={16} color="#fbbf24" />;
      case 'streak':
        return <Flame size={16} color="#f97316" />;
      case 'badge':
        return <Trophy size={16} color="#ec4899" />;
      case 'success':
        return <CheckCircle size={16} color="#10b981" />;
      default:
        return <Info size={16} color="#60a5fa" />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 360,
        width: 'calc(100% - 48px)',
        pointerEvents: 'none',
      }}
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-muted)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            animation: 'fadeIn 0.2s ease-out',
            borderLeft: toast.type === 'xp'
              ? '3px solid var(--accent-primary)'
              : toast.type === 'level'
              ? '3px solid var(--warning)'
              : '3px solid var(--success)',
          }}
        >
          <div style={{ marginTop: 2, flexShrink: 0 }}>{getIcon(toast.type)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              {toast.title}
            </div>
            {toast.message && (
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {toast.message}
              </div>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: 2,
              borderRadius: 4,
            }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
