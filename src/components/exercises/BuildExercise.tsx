import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { Exercise } from '../../types/curriculum';

interface BuildExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const BuildExercise: React.FC<BuildExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const checklist = exercise.buildChecklist || [];
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>(() => {
    if (initialSubmission?.checkedItems) return initialSubmission.checkedItems;
    if (isCompleted) {
      const all: Record<number, boolean> = {};
      checklist.forEach((_, i) => { all[i] = true; });
      return all;
    }
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.checkedItems) return parsed.checkedItems;
      }
    } catch {}
    return {};
  });

  const [submitted, setSubmitted] = useState<boolean>(() => !!isCompleted || !!initialSubmission?.checkedItems);

  // Auto-save draft
  useEffect(() => {
    if (!submitted && Object.keys(checkedItems).length > 0) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ checkedItems }));
      } catch {}
    }
  }, [checkedItems, submitted, draftKey]);

  const toggleItem = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
    setSubmitted(false);
  };

  const totalCount = checklist.length;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const isAllChecked = totalCount > 0 && completedCount === totalCount;

  const handleComplete = () => {
    if (!isAllChecked) return;
    setSubmitted(true);
    try {
      localStorage.removeItem(draftKey);
    } catch {}
    onSuccess(exercise.xp, { checkedItems });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {checklist.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                background: isChecked ? 'var(--bg-surface-active)' : 'var(--bg-surface)',
                border: isChecked ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  border: isChecked ? 'none' : '1.5px solid var(--border-muted)',
                  background: isChecked ? 'var(--accent-primary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
              </div>
              <span
                style={{
                  fontSize: 13,
                  color: isChecked ? 'var(--text-primary)' : 'var(--text-secondary)',
                  textDecoration: isChecked ? 'line-through' : 'none',
                  opacity: isChecked ? 0.8 : 1,
                }}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button
          onClick={handleComplete}
          disabled={!isAllChecked}
          className="btn btn-primary"
          style={{ opacity: !isAllChecked ? 0.6 : 1 }}
        >
          <span>Complete Build Checklist ({completedCount}/{totalCount})</span>
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
            <CheckCircle2 size={16} />
            <span>Build Verified! +{exercise.xp} XP Claimed</span>
          </div>
        )}
      </div>
    </div>
  );
};
