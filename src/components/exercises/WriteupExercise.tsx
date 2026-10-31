import React, { useState, useEffect } from 'react';
import { FileText, Check, ArrowRight } from 'lucide-react';
import { Exercise } from '../../types/curriculum';

interface WriteupExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const WriteupExercise: React.FC<WriteupExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [content, setContent] = useState(() => {
    if (initialSubmission?.content) return initialSubmission.content;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.content) return parsed.content;
      }
    } catch {}
    return exercise.starterWriteup || '';
  });

  const [submitted, setSubmitted] = useState<boolean>(() => !!isCompleted || !!initialSubmission?.content);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const targetWords = exercise.minWordCount || 200;
  const isTargetMet = wordCount >= targetWords;

  // Auto-save writeup draft
  useEffect(() => {
    if (!submitted && content && content !== exercise.starterWriteup) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ content }));
      } catch {}
    }
  }, [content, submitted, draftKey, exercise.starterWriteup]);

  const handleSubmit = () => {
    if (!isTargetMet) return;
    setSubmitted(true);
    try {
      localStorage.removeItem(draftKey);
    } catch {}
    onSuccess(exercise.xp, { content, wordCount });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Editor container */}
      <div
        style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
        }}
      >
        <div
          style={{
            padding: '10px 16px',
            background: 'var(--bg-surface-active)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileText size={14} />
            <span>WRITEUP ARTIFACT (Markdown formatted)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                color: isTargetMet ? 'var(--success)' : 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              {wordCount} / {targetWords} words
            </span>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setSubmitted(false);
          }}
          spellCheck={true}
          style={{
            width: '100%',
            minHeight: 280,
            padding: 16,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            lineHeight: 1.6,
            resize: 'vertical',
          }}
        />
      </div>

      {/* Footer controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button
          onClick={handleSubmit}
          disabled={!isTargetMet}
          className="btn btn-primary"
          style={{ opacity: !isTargetMet ? 0.6 : 1 }}
        >
          <span>Save & Submit Writeup</span>
          <ArrowRight size={14} />
        </button>

        {submitted && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--success-muted)',
              color: 'var(--success)',
              fontWeight: 600,
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Check size={14} />
            <span>Writeup Artifact Saved! +{exercise.xp} XP</span>
          </div>
        )}
      </div>
    </div>
  );
};
