import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  Edit2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ALL_LESSONS } from '../data/lessons';

export const NotesPage: React.FC = () => {
  const { lessonNotes, saveLessonNote } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  // Map lessonNotes entries to include lesson title and module
  const notesList = useMemo(() => {
    return Object.entries(lessonNotes)
      .map(([lessonSlug, note]) => {
        const lesson = ALL_LESSONS.find((l) => l.slug === lessonSlug);
        return {
          slug: lessonSlug,
          title: lesson?.title || lessonSlug,
          content: note.content,
          updatedAt: note.updatedAt,
          moduleId: lesson?.moduleId,
        };
      })
      .filter((n) => n.content.trim().length > 0);
  }, [lessonNotes]);

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notesList;
    const q = searchQuery.toLowerCase();
    return notesList.filter(
      (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notesList, searchQuery]);

  const handleStartEdit = (slug: string, currentContent: string) => {
    setEditingId(slug);
    setEditContent(currentContent);
  };

  const handleSaveEdit = (slug: string) => {
    saveLessonNote(slug, editContent);
    setEditingId(null);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete your note for this lesson?')) {
      saveLessonNote(slug, '');
    }
  };

  const exportAllNotes = () => {
    const text = notesList
      .map(
        (n) =>
          `## ${n.title}\n*Updated: ${new Date(n.updatedAt).toLocaleDateString()}*\n\n${n.content}`
      )
      .join('\n\n---\n\n');

    navigator.clipboard.writeText(
      `# CRO Lab: My Engineering Study Notes\nTotal Lessons Noted: ${notesList.length}\n\n` + text
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Preset recommended lessons to take notes on if notes list is empty
  const sampleLessons = ALL_LESSONS.slice(0, 4);

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={14} /> Knowledge Hub
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {notesList.length} Notes Saved
            </span>
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Curriculum Study Notes
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--color-text-secondary)', maxWidth: '650px', fontSize: '1rem', lineHeight: 1.5 }}>
            Personal code snippets, architecture observations, and key takeaways recorded across your 76 technical lessons.
          </p>
        </div>

        {notesList.length > 0 && (
          <button
            onClick={exportAllNotes}
            className="button button-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
          >
            {copied ? <Check size={16} color="var(--color-success)" /> : <Copy size={16} />}
            {copied ? 'Copied Markdown!' : 'Export All Notes'}
          </button>
        )}
      </div>

      {/* Search toolbar */}
      {notesList.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Search notes or lesson titles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: '38px', width: '100%', fontSize: '0.9rem' }}
            />
          </div>
        </div>
      )}

      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredNotes.map((note) => {
            const isEditing = editingId === note.slug;

            return (
              <div
                key={note.slug}
                className="card"
                style={{
                  padding: '20px 24px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <Link
                      to={`/lesson/${note.slug}`}
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {note.title}
                      <ExternalLink size={14} color="var(--color-text-muted)" />
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                      {note.moduleId && <span>Module {note.moduleId}</span>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => handleStartEdit(note.slug, note.content)}
                          className="button button-ghost button-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(note.slug)}
                          className="button button-ghost button-sm"
                          style={{ color: 'var(--color-danger, #ef4444)', fontSize: '0.8rem' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSaveEdit(note.slug)}
                          className="button button-primary button-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="button button-ghost button-sm"
                          style={{ fontSize: '0.8rem' }}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    rows={5}
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="input"
                    style={{ width: '100%', resize: 'vertical', fontSize: '0.9rem', lineHeight: 1.6 }}
                  />
                ) : (
                  <div
                    style={{
                      fontSize: '0.92rem',
                      lineHeight: 1.65,
                      color: 'var(--color-text-secondary)',
                      whiteSpace: 'pre-wrap',
                      background: 'var(--color-surface-hover)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontFamily: 'inherit',
                    }}
                  >
                    {note.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div
          className="card"
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            background: 'var(--color-surface)',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'var(--color-surface-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: 'var(--color-text-muted)',
            }}
          >
            <BookOpen size={30} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px' }}>
            {searchQuery ? 'No notes matching your search' : 'No Study Notes Yet'}
          </h3>
          <p style={{ margin: '0 auto 24px', color: 'var(--color-text-secondary)', maxWidth: '460px', fontSize: '0.95rem', lineHeight: 1.5 }}>
            {searchQuery
              ? 'Try searching for a different term or clear your filter.'
              : 'As you read lessons, use the "My Engineering Notes" panel on any lesson page to save implementation gotchas, formulas, and architecture snippets.'}
          </p>

          {!searchQuery && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '12px' }}>
                Recommended Lessons to Start Reading:
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {sampleLessons.map((l) => (
                  <Link
                    key={l.slug}
                    to={`/lesson/${l.slug}`}
                    className="button button-outline button-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                  >
                    <Sparkles size={14} color="var(--color-primary)" />
                    {l.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
