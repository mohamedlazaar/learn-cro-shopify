import React, { useState, useMemo } from 'react';
import {
  BookMarked,
  Search,
  Plus,
  Copy,
  Check,
  Trash2,
  Edit3,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  HelpCircle,
  Tag,
  ArrowRight,
} from 'lucide-react';
import {
  loadKnowledgeBase,
  addKnowledgeEntry,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  searchKnowledgeBase,
} from '../services/knowledgeBaseService';
import { KnowledgeEntry, KnowledgeCategory } from '../types/microlearning';
import { useLanguage } from '../context/LanguageContext';
import './KnowledgeBasePage.css';

export const KnowledgeBasePage: React.FC = () => {
  const { t, isArabic } = useLanguage();
  const [entries, setEntries] = useState<KnowledgeEntry[]>(() => loadKnowledgeBase());
  const [activeCategory, setActiveCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<KnowledgeEntry | null>(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalCategory, setModalCategory] = useState<KnowledgeCategory>('explanation');
  const [modalContent, setModalContent] = useState('');
  const [modalExplanation, setModalExplanation] = useState('');
  const [modalTags, setModalTags] = useState('');

  const filteredEntries = useMemo(() => {
    return searchKnowledgeBase(searchQuery, activeCategory);
  }, [searchQuery, activeCategory, entries]);

  const handleOpenAdd = () => {
    setEditingEntry(null);
    setModalTitle('');
    setModalCategory('explanation');
    setModalContent('');
    setModalExplanation('');
    setModalTags('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entry: KnowledgeEntry) => {
    setEditingEntry(entry);
    setModalTitle(entry.title);
    setModalCategory(entry.category);
    setModalContent(entry.content);
    setModalExplanation(entry.userSelfExplanation || '');
    setModalTags(entry.tags.join(', '));
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalTitle.trim() || !modalContent.trim()) return;

    const tagsArray = modalTags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingEntry) {
      const updated = updateKnowledgeEntry(editingEntry.id, {
        title: modalTitle,
        category: modalCategory,
        content: modalContent,
        userSelfExplanation: modalExplanation,
        tags: tagsArray,
      });
      setEntries(updated);
    } else {
      addKnowledgeEntry({
        title: modalTitle,
        category: modalCategory,
        content: modalContent,
        userSelfExplanation: modalExplanation,
        tags: tagsArray,
      });
      setEntries(loadKnowledgeBase());
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this knowledge entry?')) {
      const updated = deleteKnowledgeEntry(id);
      setEntries(updated);
    }
  };

  const handleExportMarkdown = () => {
    const md = entries
      .map((e) => {
        return `## [${e.category.toUpperCase()}] ${e.title}\n*Saved: ${new Date(e.createdAt).toLocaleDateString()} | Tags: ${e.tags.join(', ')}*\n\n${e.content}\n${
          e.userSelfExplanation ? `\n> **My Own Words:** ${e.userSelfExplanation}` : ''
        }\n\n---`;
      })
      .join('\n\n');

    navigator.clipboard.writeText(`# My Personal CRO Knowledge Base\nTotal Entries: ${entries.length}\n\n` + md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const categoryTabs = [
    { id: 'all' as const, label: isArabic ? 'كافة المعارف' : 'All Knowledge', icon: <BookMarked size={14} /> },
    { id: 'explanation' as const, label: isArabic ? 'شروحاتي بأسلوبي' : 'In My Own Words', icon: <Sparkles size={14} /> },
    { id: 'principle' as const, label: isArabic ? 'مبادئ التحويل' : 'Core Principles', icon: <Lightbulb size={14} /> },
    { id: 'store_observation' as const, label: isArabic ? 'ملاحظات المتاجر' : 'Store Observations', icon: <Tag size={14} /> },
    { id: 'hypothesis' as const, label: isArabic ? 'فرضيات وحلول' : 'Hypotheses & Fixes', icon: <Sparkles size={14} /> },
    { id: 'corrected_mistake' as const, label: isArabic ? 'أخطاء تم تصحيحها' : 'Corrected Mistakes', icon: <AlertTriangle size={14} /> },
    { id: 'unresolved_question' as const, label: isArabic ? 'أسئلة تحتاج بحثاً' : 'Unresolved Questions', icon: <HelpCircle size={14} /> },
  ];

  return (
    <div className="kb-container animate-fade-in">
      {/* Header */}
      <div className="kb-header-card">
        <div>
          <div className="kb-kicker">
            <BookMarked size={14} /> {isArabic ? 'قاعدة معرفتك الهندسية' : 'Personal CRO Knowledge Base'}
          </div>
          <h1 className="kb-title">
            {isArabic ? 'مستودع أفكارك في تحسين متاجر شوبيفاي' : 'Your Brain on Shopify Optimization'}
          </h1>
          <p className="kb-subtitle">
            {isArabic
              ? 'مستودع تراكمي للمبادئ، وملاحظات المتاجر، والشروحات الذاتية المكتوبة بأسلوبك، والأخطاء المصححة أثناء تدريبك العملي.'
              : 'A compounding repository of principles, store observations, self-written explanations, and corrected misconceptions recorded during your practice.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary" onClick={handleExportMarkdown}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied
              ? isArabic ? 'تم النسخ للحافظة!' : 'Copied to Clipboard!'
              : isArabic ? 'تصدير كملف Markdown' : 'Export All as Markdown'}
          </button>
          <button type="button" className="btn btn-primary" onClick={handleOpenAdd}>
            <Plus size={16} /> {isArabic ? 'إضافة تدوينة جديدة' : 'Add Personal Insight'}
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="kb-category-tabs">
        {categoryTabs.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`kb-cat-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 18px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <Search size={16} color="var(--text-muted)" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isArabic ? 'ابحث بالكلمات المفتاحية، أو المبدأ، أو الوسوم...' : 'Search by keyword, principle, or tag...'}
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: 14,
            width: '100%',
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 13 }}
          >
            {isArabic ? 'مسح' : 'Clear'}
          </button>
        )}
      </div>

      {/* Entries List */}
      <div className="kb-entries-grid">
        {filteredEntries.length === 0 ? (
          <div
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-muted)',
            }}
          >
            No entries match your filter. Complete a micro-session or add a new personal insight above!
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <div key={entry.id} className="kb-entry-card animate-fade-in">
              <div className="kb-entry-top">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge badge-indigo" style={{ textTransform: 'capitalize' }}>
                    {entry.category.replace('_', ' ')}
                  </span>
                  {entry.sourceLessonTitle && (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      From: {entry.sourceLessonTitle}
                    </span>
                  )}
                  {entry.storeName && (
                    <span style={{ fontSize: 12, color: 'var(--accent-primary)', fontWeight: 600 }}>
                      Store: {entry.storeName}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(entry)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Edit entry"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    title="Delete entry"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                {entry.title}
              </h3>

              <div style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
                {entry.content}
              </div>

              {entry.userSelfExplanation && (
                <div className="kb-user-explanation-box">
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: 4 }}>
                    My Own Words:
                  </div>
                  <div>"{entry.userSelfExplanation}"</div>
                </div>
              )}

              {entry.tags.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                  {entry.tags.map((tag, idx) => (
                    <span key={idx} className="kb-tag-pill">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="kb-modal-overlay animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="kb-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
              {editingEntry ? 'Edit Knowledge Entry' : 'Add Personal Insight'}
            </h2>

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Title</label>
                <input
                  type="text"
                  className="input"
                  required
                  placeholder="e.g. Free shipping progress bar psychological threshold"
                  value={modalTitle}
                  onChange={(e) => setModalTitle(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Category</label>
                <select
                  className="input-select"
                  value={modalCategory}
                  onChange={(e) => setModalCategory(e.target.value as KnowledgeCategory)}
                >
                  <option value="explanation">In My Own Words</option>
                  <option value="principle">Core Principle</option>
                  <option value="store_observation">Store Observation</option>
                  <option value="hypothesis">Hypothesis & Fix</option>
                  <option value="corrected_mistake">Corrected Mistake</option>
                  <option value="unresolved_question">Unresolved Question</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Core Content / Principle</label>
                <textarea
                  className="mls-textarea"
                  rows={4}
                  required
                  placeholder="Write the technical concept, observation, or test setup..."
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  In My Own Words (Feynman Breakdown)
                </label>
                <textarea
                  className="mls-textarea"
                  rows={2}
                  placeholder="How you intuitively understand and remember this..."
                  value={modalExplanation}
                  onChange={(e) => setModalExplanation(e.target.value)}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Tags (comma-separated)</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. PDP, Cart, Mobile, Psychology"
                  value={modalTags}
                  onChange={(e) => setModalTags(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save to Knowledge Base
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
