import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Exercise } from '../../types/curriculum';

interface MultipleChoiceProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [selected, setSelected] = useState<number | null>(() => {
    if (initialSubmission?.selectedIndex !== undefined) return initialSubmission.selectedIndex;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (typeof parsed.selected === 'number') return parsed.selected;
      }
    } catch {}
    return null;
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    return !!isCompleted || initialSubmission?.selectedIndex !== undefined;
  });

  // Save draft if unsubmitted
  useEffect(() => {
    if (!submitted && selected !== null) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ selected }));
      } catch {}
    }
  }, [selected, submitted, draftKey]);

  const handleOptionClick = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    try {
      localStorage.removeItem(draftKey);
    } catch {}
    if (selected === exercise.correctIndex) {
      onSuccess(exercise.xp, { selectedIndex: selected });
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {exercise.options?.map((option, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === exercise.correctIndex;
          let borderColor = 'var(--border-subtle)';
          let bgColor = 'var(--bg-surface)';

          if (submitted) {
            if (isCorrect) {
              borderColor = 'var(--success)';
              bgColor = 'var(--success-muted)';
            } else if (isSelected && !isCorrect) {
              borderColor = 'var(--danger)';
              bgColor = 'var(--danger-muted)';
            }
          } else if (isSelected) {
            borderColor = 'var(--accent-primary)';
            bgColor = 'var(--accent-muted)';
          }

          return (
            <div
              key={idx}
              onClick={() => handleOptionClick(idx)}
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-sm)',
                border: `1.5px solid ${borderColor}`,
                background: bgColor,
                cursor: submitted ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-muted)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 2,
                  background: isSelected ? 'var(--accent-primary)' : 'transparent',
                }}
              >
                {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                {option}
              </div>
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="btn btn-primary"
          style={{ alignSelf: 'flex-start', opacity: selected === null ? 0.6 : 1 }}
        >
          <span>Submit Answer</span>
          <ArrowRight size={14} />
        </button>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              padding: 16,
              borderRadius: 'var(--radius-md)',
              background: selected === exercise.correctIndex ? 'var(--success-muted)' : 'var(--danger-muted)',
              border: `1px solid ${selected === exercise.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14 }}>
              {selected === exercise.correctIndex ? (
                <>
                  <CheckCircle2 size={18} color="var(--success)" />
                  <span style={{ color: 'var(--success)' }}>Correct! +{exercise.xp} XP Earned</span>
                </>
              ) : (
                <>
                  <XCircle size={18} color="var(--danger)" />
                  <span style={{ color: 'var(--danger)' }}>Incorrect Answer</span>
                </>
              )}
            </div>
            {exercise.explanation && (
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {exercise.explanation}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleRetry} className="btn btn-secondary" style={{ alignSelf: 'flex-start' }}>
              <RotateCcw size={14} />
              <span>Change Answer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
