import React, { useState } from 'react';
import {
  CheckSquare,
  Filter,
  FileDown,
  Printer,
  Plus,
  AlertCircle,
  CheckCircle2,
  Search,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { AUDIT_CHECKLIST } from '../data/auditChecklist';
import { useProgress } from '../context/ProgressContext';
import { AuditCategory, AuditSeverity, StoreAudit } from '../types/tools';
import { ProgressRing } from '../components/ui/ProgressRing';

export const AuditToolPage: React.FC = () => {
  const { audits, saveAuditStore, toggleAuditCheckItem, updateAuditItemNote } = useProgress();

  // Active store audit ID
  const [activeStoreId, setActiveStoreId] = useState<string>(() => {
    if (audits.length > 0) return audits[0].id;
    return 'store_default';
  });

  const activeAudit = audits.find((a) => a.id === activeStoreId) || {
    id: activeStoreId,
    storeName: 'My Client Store Audit',
    checkedItemIds: {},
    notes: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const categories: { key: AuditCategory; label: string }[] = [
    { key: 'homepage', label: 'Homepage' },
    { key: 'collection', label: 'Collection' },
    { key: 'pdp', label: 'PDP' },
    { key: 'cart', label: 'Cart Drawer' },
    { key: 'checkout', label: 'Checkout' },
    { key: 'performance', label: 'Performance' },
    { key: 'mobile', label: 'Mobile UX' },
    { key: 'trust', label: 'Trust & Anxiety' },
    { key: 'copy', label: 'Copywriting' },
    { key: 'analytics', label: 'Analytics' },
  ];

  const filteredItems = AUDIT_CHECKLIST.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (severityFilter !== 'all' && item.severity !== severityFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.fixTip.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalItems = AUDIT_CHECKLIST.length;
  const checkedCount = Object.values(activeAudit.checkedItemIds).filter(Boolean).length;
  const compliancePercentage = Math.round((checkedCount / totalItems) * 100);

  // Critical unchecked issues
  const criticalUncheckedCount = AUDIT_CHECKLIST.filter(
    (item) => item.severity === 'critical' && !activeAudit.checkedItemIds[item.id]
  ).length;

  const handleToggleCheck = (itemId: string) => {
    const isCurrentlyChecked = !!activeAudit.checkedItemIds[itemId];
    toggleAuditCheckItem(activeStoreId, itemId, !isCurrentlyChecked);
  };

  const handleCreateNewStore = () => {
    const storeName = prompt('Enter store name for new audit:');
    if (!storeName) return;
    const newStore: StoreAudit = {
      id: 'store_' + Math.random().toString(36).substring(2, 9),
      storeName,
      checkedItemIds: {},
      notes: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveAuditStore(newStore);
    setActiveStoreId(newStore.id);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    let md = `# CRO Audit Report: ${activeAudit.storeName}\n`;
    md += `Date: ${new Date().toLocaleDateString()}\n`;
    md += `Overall Compliance Score: ${compliancePercentage}% (${checkedCount}/${totalItems} items passed)\n`;
    md += `Critical Remaining Issues: ${criticalUncheckedCount}\n\n`;

    categories.forEach(({ key, label }) => {
      const items = AUDIT_CHECKLIST.filter((i) => i.category === key);
      md += `## ${label}\n`;
      items.forEach((item) => {
        const isPassed = !!activeAudit.checkedItemIds[item.id];
        const note = activeAudit.notes[item.id];
        md += `- [${isPassed ? 'x' : ' '}] **[${item.severity.toUpperCase()}] ${item.title}**\n`;
        md += `  - Issue: ${item.description}\n`;
        md += `  - Fix Tip: ${item.fixTip}\n`;
        if (note) md += `  - *Auditor Note: ${note}*\n`;
      });
      md += `\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cro-audit-${activeAudit.storeName.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Arcade Diagnostic Scanner Header */}
      <div
        className="cyber-corner-box"
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background:
            'radial-gradient(circle at 88% 20%, rgba(163, 230, 53, 0.14), transparent 45%), radial-gradient(circle at 12% 85%, rgba(34, 211, 238, 0.12), transparent 50%), var(--bg-surface)',
          border: '2px solid var(--border-default)',
          boxShadow: '0 6px 0 var(--border-default), var(--shadow-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span
              className="arcade-sticker"
              style={{ background: '#a3e635', color: '#06070b', borderColor: '#06070b' }}
            >
              <Sparkles size={12} /> HEURISTIC SCANNER DECK
            </span>
            <span className="badge badge-indigo" style={{ fontFamily: 'var(--font-mono)' }}>
              60+ VERIFIED CHECKPOINTS
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 3vw, 2.35rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: 8,
            }}
          >
            Shopify CRO Heuristic Audit Engine
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 640, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            Systematically X-ray client storefronts across 10 conversion surfaces. Track compliance, log technical surgery notes, and export executive Markdown/PDF reports.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={handleCreateNewStore} className="btn btn-secondary btn-sm">
            <Plus size={14} />
            <span>New Store Audit</span>
          </button>
          <button onClick={handleExportMarkdown} className="btn btn-secondary btn-sm">
            <FileDown size={14} />
            <span>Export Markdown</span>
          </button>
          <button onClick={handlePrint} className="btn btn-primary btn-sm">
            <Printer size={14} />
            <span>Print / PDF Report</span>
          </button>
        </div>
      </div>

      {/* Store Switcher & Score Banner */}
      <div
        style={{
          padding: '24px 28px',
          background: 'var(--bg-surface)',
          border: '2px solid var(--border-default)',
          borderRadius: '20px',
          boxShadow: '0 5px 0 var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 260 }}>
          <ProgressRing progress={compliancePercentage} size={56} strokeWidth={4} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              STORE AUDITED
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeAudit.storeName}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {checkedCount} / {totalItems} Passed ({compliancePercentage}% Compliance)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {criticalUncheckedCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--danger)', fontSize: 13, fontWeight: 600 }}>
              <AlertCircle size={18} />
              <span>{criticalUncheckedCount} Critical conversion leaks remaining</span>
            </div>
          )}

          {audits.length > 1 && (
            <select
              value={activeStoreId}
              onChange={(e) => setActiveStoreId(e.target.value)}
              className="input-select"
              style={{ width: 'auto', minWidth: 160 }}
            >
              {audits.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.storeName}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          padding: '16px 20px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200 }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            className="input-text"
            placeholder="Search audit items by keyword, fix tip..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '6px 10px', fontSize: 13 }}
          />
        </div>

        {/* Category Selector */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-select"
          style={{ width: 'auto', minWidth: 140, padding: '6px 10px', fontSize: 12 }}
        >
          <option value="all">All Surfaces (10 surfaces)</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>

        {/* Severity Selector */}
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="input-select"
          style={{ width: 'auto', minWidth: 130, padding: '6px 10px', fontSize: 12 }}
        >
          <option value="all">All Severities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Checklist Items Display */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredItems.map((item) => {
          const isPassed = !!activeAudit.checkedItemIds[item.id];
          const hasNote = !!activeAudit.notes[item.id];
          const isNoteOpen = !!expandedNotes[item.id];

          return (
            <div
              key={item.id}
              style={{
                padding: '16px 20px',
                background: 'var(--bg-surface)',
                border: isPassed ? '1px solid var(--border-subtle)' : '1px solid var(--border-muted)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                borderLeft: item.severity === 'critical'
                  ? '4px solid var(--danger)'
                  : item.severity === 'high'
                  ? '4px solid var(--warning)'
                  : '4px solid var(--accent-primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, minWidth: 0, flex: 1 }}>
                  {/* Checkbox */}
                  <div
                    onClick={() => handleToggleCheck(item.id)}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      border: isPassed ? 'none' : '1.5px solid var(--border-muted)',
                      background: isPassed ? 'var(--success)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {isPassed && <CheckCircle2 size={16} color="#fff" />}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                      <span
                        className={`badge ${
                          item.severity === 'critical'
                            ? 'badge-red'
                            : item.severity === 'high'
                            ? 'badge-amber'
                            : 'badge-indigo'
                        }`}
                      >
                        {item.severity}
                      </span>
                      <span className="badge badge-gray">{item.category}</span>
                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: isPassed ? 'var(--text-secondary)' : 'var(--text-primary)',
                          textDecoration: isPassed ? 'line-through' : 'none',
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 6 }}>
                      {item.description}
                    </p>

                    <div style={{ fontSize: 12, color: 'var(--accent-primary)', lineHeight: 1.5 }}>
                      <strong>Fix Tip:</strong> {item.fixTip}
                    </div>

                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                      <strong>Commercial Impact:</strong> {item.impact}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => setExpandedNotes((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                    className="btn btn-ghost btn-sm"
                    style={{ color: hasNote ? 'var(--accent-primary)' : 'var(--text-muted)' }}
                  >
                    <MessageSquare size={13} />
                    <span>{hasNote ? 'Note Added' : 'Add Note'}</span>
                  </button>
                </div>
              </div>

              {/* Note Drawer */}
              {isNoteOpen && (
                <div style={{ marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
                  <textarea
                    className="input-textarea"
                    placeholder="Enter store-specific findings, screenshot URLs, or developer notes..."
                    value={activeAudit.notes[item.id] || ''}
                    onChange={(e) => updateAuditItemNote(activeStoreId, item.id, e.target.value)}
                    style={{ minHeight: 60, fontSize: 12 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
