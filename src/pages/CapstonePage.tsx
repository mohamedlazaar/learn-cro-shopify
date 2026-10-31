import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  Clock,
  Circle,
  ExternalLink,
  Sparkles,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Zap,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { CapstoneDeliverable } from '../types/tools';

export const CapstonePage: React.FC = () => {
  const { capstoneDeliverables, updateCapstoneDeliverable, triggerConfetti } = useProgress();
  const [filterPhase, setFilterPhase] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [copied, setCopied] = useState(false);

  const completedCount = capstoneDeliverables.filter((d) => d.status === 'completed').length;
  const inProgressCount = capstoneDeliverables.filter((d) => d.status === 'in-progress').length;
  const percentComplete = Math.round((completedCount / capstoneDeliverables.length) * 100);

  const filteredDeliverables = capstoneDeliverables.filter((d) => {
    if (filterPhase !== 'all' && !d.phase.toLowerCase().includes(filterPhase.toLowerCase())) return false;
    if (filterStatus !== 'all' && d.status !== filterStatus) return false;
    return true;
  });

  const handleStatusChange = (id: number, status: CapstoneDeliverable['status']) => {
    updateCapstoneDeliverable(id, { status });
  };

  const handleEvidenceChange = (id: number, evidenceUrl: string) => {
    updateCapstoneDeliverable(id, { evidenceUrl });
  };

  const handleNotesChange = (id: number, notes: string) => {
    updateCapstoneDeliverable(id, { notes });
  };

  const copyDeliverablesSummary = () => {
    const text = capstoneDeliverables
      .map(
        (d) =>
          `[${d.status === 'completed' ? 'x' : ' '}] #${d.id} ${d.title} (${d.phase})\n` +
          `    Evidence: ${d.evidenceUrl || 'N/A'}\n` +
          `    Notes: ${d.notes || 'N/A'}`
      )
      .join('\n\n');

    navigator.clipboard.writeText(
      `# CRO Lab Capstone Deliverables Progress (${completedCount}/10 Completed)\n\n` + text
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Top Banner / Celebration if 10/10 */}
      {completedCount === 10 && (
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(16, 185, 129, 0.2))',
            borderColor: 'var(--color-primary)',
            padding: '24px 28px',
            marginBottom: '32px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 0 24px rgba(99, 102, 241, 0.5)',
                }}
              >
                <Trophy size={30} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
                    Master Capstone Completed!
                  </h2>
                  <span className="badge badge-success">Master Rank</span>
                </div>
                <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
                  You have verified and shipped all 10 enterprise Shopify CRO deliverables. Your portfolio case study is ready to publish.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={triggerConfetti} className="button button-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> Celebrate
              </button>
              <Link to="/portfolio" className="button button-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={16} /> Open Case Study Builder
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Header section */}
      <div
        className="cyber-corner-box"
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background:
            'radial-gradient(circle at 88% 18%, rgba(251, 113, 133, 0.14), transparent 45%), radial-gradient(circle at 12% 85%, rgba(163, 230, 53, 0.12), transparent 50%), var(--bg-surface)',
          border: '2px solid var(--border-default)',
          boxShadow: '0 6px 0 var(--border-default), var(--shadow-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '28px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span
              className="arcade-sticker"
              style={{ background: '#fb7185', color: '#06070b', borderColor: '#06070b' }}
            >
              <Award size={12} /> MASTER GUILD CAPSTONE
            </span>
            <span className="badge badge-indigo" style={{ fontFamily: 'var(--font-mono)' }}>
              10 ENTERPRISE DELIVERABLES
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.35rem)',
              fontWeight: 800,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Real-World Capstone Deliverables
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)', maxWidth: '680px', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Theoretical knowledge isn&apos;t enough. Build, verify, and ship these 10 production-grade Shopify CRO deliverables across your store or development theme to unlock Master Guild certification.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={copyDeliverablesSummary}
            className="btn btn-secondary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
            {copied ? 'Copied Markdown!' : 'Export Summary'}
          </button>
          <Link
            to="/portfolio"
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FileText size={16} /> Build Case Study
          </Link>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div
        className="card"
        style={{
          padding: '24px',
          marginBottom: '28px',
          background: 'var(--color-surface)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Overall Completion
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>
              {percentComplete}%
            </span>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              ({completedCount}/10 Shipped)
            </span>
          </div>
          <div
            style={{
              height: '8px',
              borderRadius: '999px',
              background: 'var(--color-surface-hover)',
              marginTop: '12px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${percentComplete}%`,
                background: percentComplete === 100 ? 'var(--color-success)' : 'var(--color-primary)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Status Breakdown
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="var(--color-success)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{completedCount} Done</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={16} color="var(--color-warning)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{inProgressCount} In Progress</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Circle size={16} color="var(--color-text-muted)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{10 - completedCount - inProgressCount} Pending</span>
            </div>
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--color-border)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
            Gamification Reward
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <Zap size={20} color="var(--color-warning)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-warning)' }}>
              +{completedCount * 200} / 2,000 XP
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            +200 XP earned per verified deliverable
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map((p) => (
            <button
              key={p}
              onClick={() => setFilterPhase(p)}
              className={`button button-sm ${filterPhase === p ? 'button-primary' : 'button-outline'}`}
              style={{ fontSize: '0.85rem' }}
            >
              {p === 'all' ? 'All Phases' : p}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Status:</span>
          {['all', 'pending', 'in-progress', 'completed'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`button button-sm ${filterStatus === st ? 'button-secondary' : 'button-ghost'}`}
              style={{ fontSize: '0.85rem', textTransform: 'capitalize' }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Deliverables List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredDeliverables.map((item) => {
          const isExpanded = expandedId === item.id;
          const isDone = item.status === 'completed';
          const isInProgress = item.status === 'in-progress';

          return (
            <div
              key={item.id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                borderColor: isDone ? 'rgba(16, 185, 129, 0.4)' : isInProgress ? 'rgba(245, 158, 11, 0.4)' : 'var(--color-border)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              {/* Header row */}
              <div
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: isExpanded ? 'var(--color-surface-hover)' : 'var(--color-surface)',
                  gap: '16px',
                }}
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: isDone
                        ? 'rgba(16, 185, 129, 0.15)'
                        : isInProgress
                        ? 'rgba(245, 158, 11, 0.15)'
                        : 'var(--color-surface-hover)',
                      color: isDone ? 'var(--color-success)' : isInProgress ? 'var(--color-warning)' : 'var(--color-text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flexShrink: 0,
                    }}
                  >
                    #{item.id}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-text)' }}>
                        {item.title}
                      </h3>
                      <span className="badge badge-secondary" style={{ fontSize: '0.75rem' }}>
                        {item.phase}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-secondary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                  <select
                    value={item.status}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleStatusChange(item.id, e.target.value as CapstoneDeliverable['status']);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="input"
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.85rem',
                      borderRadius: '6px',
                      fontWeight: 600,
                      color: isDone ? 'var(--color-success)' : isInProgress ? 'var(--color-warning)' : 'var(--color-text-secondary)',
                      background: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed ✓</option>
                  </select>

                  <button
                    className="button button-ghost button-icon"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              </div>

              {/* Expanded details body */}
              {isExpanded && (
                <div style={{ padding: '24px', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      Deliverable Scope & Specification
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text)', lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Verification Criteria */}
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                      Acceptance Verification Criteria
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {item.criteria.map((criterion, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            padding: '8px 12px',
                            background: 'var(--color-surface-hover)',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                          }}
                        >
                          <CheckCircle2
                            size={16}
                            style={{
                              color: isDone ? 'var(--color-success)' : 'var(--color-text-muted)',
                              marginTop: '2px',
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ color: 'var(--color-text)' }}>{criterion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence URL Input */}
                  <div style={{ marginBottom: '20px' }}>
                    <label
                      htmlFor={`evidence-${item.id}`}
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        marginBottom: '6px',
                      }}
                    >
                      Proof of Delivery (GitHub PR, Store URL, Screencast, or Loom Link)
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        id={`evidence-${item.id}`}
                        type="url"
                        placeholder="https://github.com/your-org/theme/pull/42 or https://store.myshopify.com"
                        value={item.evidenceUrl || ''}
                        onChange={(e) => handleEvidenceChange(item.id, e.target.value)}
                        className="input"
                        style={{ flex: 1, fontSize: '0.9rem' }}
                      />
                      {item.evidenceUrl && (
                        <a
                          href={item.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="button button-outline"
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
                        >
                          <ExternalLink size={15} /> Visit
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Implementation Notes */}
                  <div style={{ marginBottom: '20px' }}>
                    <label
                      htmlFor={`notes-${item.id}`}
                      style={{
                        display: 'block',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text-secondary)',
                        marginBottom: '6px',
                      }}
                    >
                      Engineering Notes & Reflection (Auto-syncs to Portfolio Builder)
                    </label>
                    <textarea
                      id={`notes-${item.id}`}
                      rows={3}
                      placeholder="Describe technical architecture, Liquid hooks used, performance tradeoffs, and observed metric lift..."
                      value={item.notes || ''}
                      onChange={(e) => handleNotesChange(item.id, e.target.value)}
                      className="input"
                      style={{ width: '100%', resize: 'vertical', fontSize: '0.9rem', lineHeight: 1.5 }}
                    />
                  </div>

                  {/* Action Bar */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-border)',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {item.completedAt
                        ? `Completed on ${new Date(item.completedAt).toLocaleDateString()}`
                        : 'Unlocks +200 XP upon completion'}
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {item.status !== 'completed' ? (
                        <button
                          onClick={() => handleStatusChange(item.id, 'completed')}
                          className="button button-primary"
                          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}
                        >
                          <CheckCircle2 size={16} /> Mark as Complete (+200 XP)
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(item.id, 'in-progress')}
                          className="button button-outline"
                          style={{ fontSize: '0.85rem' }}
                        >
                          Reopen Deliverable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
