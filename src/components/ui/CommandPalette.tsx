import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Wrench,
  FileCode,
  Calculator,
  Compass,
  CheckSquare,
  Sparkles,
  Settings,
  ArrowRight,
  Sun,
  Moon,
  X,
} from 'lucide-react';
import { ALL_LESSONS } from '../../data/lessons';
import { MODULES } from '../../data/modules';
import { ALL_EXERCISES } from '../../data/exercises';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Lessons' | 'Modules' | 'Exercises' | 'Tools' | 'Actions';
  icon: React.ReactNode;
  url?: string;
  action?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { resetProgress, exportJSON } = useProgress();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Static Tools & Actions
  const staticItems: SearchItem[] = [
    {
      id: 'tool-audit',
      title: 'CRO Audit Tool',
      subtitle: '60+ item diagnostic checklist for store surfaces',
      category: 'Tools',
      icon: <CheckSquare size={16} color="#6366f1" />,
      url: '/audit-tool',
    },
    {
      id: 'tool-planner',
      title: 'A/B Test Planner',
      subtitle: 'Sample size calculator & hypothesis backlog',
      category: 'Tools',
      icon: <Compass size={16} color="#10b981" />,
      url: '/test-planner',
    },
    {
      id: 'tool-metrics',
      title: 'CRO Metrics Calculator',
      subtitle: 'CVR, AOV, RPS & benchmark comparison table',
      category: 'Tools',
      icon: <Calculator size={16} color="#f59e0b" />,
      url: '/metrics',
    },
    {
      id: 'tool-playground',
      title: 'Liquid & HTML Sandbox Playground',
      subtitle: 'Live simulated Shopify theme preview',
      category: 'Tools',
      icon: <FileCode size={16} color="#ec4899" />,
      url: '/playground',
    },
    {
      id: 'tool-capstone',
      title: 'Capstone Deliverables Tracker',
      subtitle: '10 proof-of-work project milestones',
      category: 'Tools',
      icon: <Sparkles size={16} color="#818cf8" />,
      url: '/capstone',
    },
    {
      id: 'action-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Toggle interface visual theme',
      category: 'Actions',
      icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'action-export',
      title: 'Export Learning Data (JSON)',
      subtitle: 'Download complete backup of progress, notes, and audits',
      category: 'Actions',
      icon: <Settings size={16} />,
      action: () => {
        const data = exportJSON();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cro-lab-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        onClose();
      },
    },
  ];

  // Dynamic search items from lessons, modules, and exercises
  const allItems: SearchItem[] = [
    ...staticItems,
    ...MODULES.map((m) => ({
      id: `module-${m.id}`,
      title: m.title,
      subtitle: `Module ${m.order} · ${m.estimatedMinutes} mins`,
      category: 'Modules' as const,
      icon: <BookOpen size={16} color="#38bdf8" />,
      url: `/curriculum/${m.phaseId}/${m.id}`,
    })),
    ...ALL_LESSONS.map((l) => ({
      id: `lesson-${l.slug}`,
      title: l.title,
      subtitle: `${l.estimatedMinutes} mins · ${l.objectives[0] || ''}`,
      category: 'Lessons' as const,
      icon: <FileCode size={16} color="#94a3b8" />,
      url: `/lesson/${l.slug}`,
    })),
    ...ALL_EXERCISES.map((ex) => ({
      id: `ex-${ex.slug}`,
      title: ex.title,
      subtitle: `${ex.type.toUpperCase()} · ${ex.xp} XP`,
      category: 'Exercises' as const,
      icon: <Wrench size={16} color="#a855f7" />,
      url: `/exercises/${ex.slug}`,
    })),
  ];

  const filteredItems = query.trim() === ''
    ? staticItems
    : allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 12);

  const handleSelect = (item: SearchItem) => {
    if (item.action) {
      item.action();
    } else if (item.url) {
      navigate(item.url);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-muted)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'fadeIn 0.15s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '14px 18px',
            borderBottom: '1px solid var(--border-subtle)',
            gap: 12,
          }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search lessons, modules, tools, or actions... (Esc to close)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 15,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <kbd
            style={{
              padding: '2px 6px',
              fontSize: 11,
              borderRadius: 4,
              background: 'var(--bg-surface-active)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: '8px' }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
              No results found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--bg-surface-hover)' : 'transparent',
                    borderLeft: isSelected ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: 'var(--bg-surface-active)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: isSelected ? 'var(--text-primary)' : 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div
                          style={{
                            fontSize: 11,
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        padding: '2px 6px',
                        borderRadius: 4,
                        background: 'var(--bg-surface-active)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight size={14} color="var(--accent-primary)" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            padding: '8px 16px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-active)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'var(--text-muted)',
          }}
        >
          <span>Use ↑ ↓ to navigate, ↵ to select</span>
          <span>Command Palette (Cmd+K)</span>
        </div>
      </div>
    </div>
  );
};
