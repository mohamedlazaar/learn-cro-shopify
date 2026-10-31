import React, { useState, useEffect } from 'react';
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react';
import { Exercise } from '../../types/curriculum';

interface FillBlankExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const FillBlankExercise: React.FC<FillBlankExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (initialSubmission && typeof initialSubmission === 'object') {
      const res: Record<string, string> = {};
      Object.keys(initialSubmission).forEach((k) => {
        res[k] = String(initialSubmission[k]);
      });
      return res;
    }
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.answers) return parsed.answers;
      }
    } catch {}
    return {};
  });

  const [submitted, setSubmitted] = useState<boolean>(() => !!isCompleted || (!!initialSubmission && Object.keys(initialSubmission).length > 0));
  const [isCorrect, setIsCorrect] = useState<boolean>(() => !!isCompleted);
  const [showHints, setShowHints] = useState(false);

  // Auto-save draft
  useEffect(() => {
    if (!submitted && Object.keys(answers).length > 0) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ answers }));
      } catch {}
    }
  }, [answers, submitted, draftKey]);

  const blanks = exercise.blanks || [];

  const handleInputChange = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
    setSubmitted(false);
  };

  const handleCheck = () => {
    let allValid = true;
    for (const b of blanks) {
      const userVal = (answers[b.id] || '').trim().toLowerCase();
      const expectedVal = b.answer.trim().toLowerCase();
      if (userVal !== expectedVal) {
        allValid = false;
        break;
      }
    }

    setSubmitted(true);
    setIsCorrect(allValid);

    if (allValid) {
      try {
        localStorage.removeItem(draftKey);
      } catch {}
      onSuccess(exercise.xp, answers);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        {blanks.map((b) => {
          const userVal = (answers[b.id] || '').trim().toLowerCase();
          const expectedVal = b.answer.trim().toLowerCase();
          const itemCorrect = submitted && userVal === expectedVal;

          return (
            <div key={b.id} className="input-group">
              <label className="input-label">{b.label}</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className="input-text"
                  placeholder="Enter term..."
                  value={answers[b.id] || ''}
                  onChange={(e) => handleInputChange(b.id, e.target.value)}
                  style={{
                    paddingRight: 36,
                    borderColor: submitted
                      ? itemCorrect
                        ? 'var(--success)'
                        : 'var(--danger)'
                      : undefined,
                  }}
                />
                {submitted && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {itemCorrect ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}
                  </div>
                )}
              </div>
              {showHints && b.hint && (
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  Hint: {b.hint}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleCheck} className="btn btn-primary">
            <span>Verify Terms</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setShowHints((h) => !h)}
            className="btn btn-secondary btn-sm"
          >
            <HelpCircle size={14} />
            <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
          </button>
        </div>

        {submitted && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: isCorrect ? 'var(--success-muted)' : 'var(--danger-muted)',
              color: isCorrect ? 'var(--success)' : 'var(--danger)',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {isCorrect ? '✓ All Terms Correct! +XP Earned' : '✕ Some terms are incorrect. Review hints.'}
          </div>
        )}
      </div>

      {exercise.explanation && (
        <div
          style={{
            padding: 14,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            fontSize: 12,
            color: 'var(--text-secondary)',
          }}
        >
          {exercise.explanation}
        </div>
      )}
    </div>
  );
};
