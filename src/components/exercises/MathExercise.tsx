import React, { useState, useEffect } from 'react';
import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';
import { Exercise } from '../../types/curriculum';

interface MathExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const MathExercise: React.FC<MathExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [inputs, setInputs] = useState<Record<string, string>>(() => {
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
        if (parsed.inputs) return parsed.inputs;
      }
    } catch {}
    return {};
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    return !!isCompleted || (!!initialSubmission && Object.keys(initialSubmission).length > 0);
  });
  const [isCorrect, setIsCorrect] = useState<boolean>(() => !!isCompleted);
  const [showSolution, setShowSolution] = useState(false);

  // Save in-progress draft to localStorage
  useEffect(() => {
    if (!submitted && Object.keys(inputs).length > 0) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ inputs }));
      } catch {}
    }
  }, [inputs, submitted, draftKey]);

  const targetKeys = Object.keys(exercise.targetValues || {});

  const handleInputChange = (key: string, val: string) => {
    setInputs((prev) => ({ ...prev, [key]: val }));
    setSubmitted(false);
  };

  const handleCheck = () => {
    if (!exercise.targetValues) return;
    const tol = exercise.tolerance || 0.05;

    let allCorrect = true;
    for (const key of targetKeys) {
      const userVal = parseFloat(inputs[key]);
      const targetVal = Number(exercise.targetValues[key]);
      if (isNaN(userVal) || Math.abs(userVal - targetVal) > tol) {
        allCorrect = false;
        break;
      }
    }

    setSubmitted(true);
    setIsCorrect(allCorrect);

    if (allCorrect) {
      try {
        localStorage.removeItem(draftKey);
      } catch {}
      onSuccess(exercise.xp, inputs);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Target input fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {targetKeys.map((key) => {
          const userVal = parseFloat(inputs[key]);
          const targetVal = Number(exercise.targetValues?.[key]);
          const keyCorrect = submitted && !isNaN(userVal) && Math.abs(userVal - targetVal) <= (exercise.tolerance || 0.05);

          return (
            <div key={key} className="input-group">
              <label className="input-label" style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {key.replace(/([A-Z])/g, ' $1')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  step="any"
                  className="input-text"
                  placeholder="Enter computed value"
                  value={inputs[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  style={{
                    paddingRight: 36,
                    borderColor: submitted
                      ? keyCorrect
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
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {keyCorrect ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--danger)" />}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button & Solution */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleCheck} className="btn btn-primary">
            <span>Check Calculations</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => setShowSolution((s) => !s)}
            className="btn btn-secondary btn-sm"
          >
            <HelpCircle size={14} />
            <span>{showSolution ? 'Hide Formula' : 'Show Formula & Solution'}</span>
          </button>
        </div>

        {submitted && (
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              fontWeight: 600,
              background: isCorrect ? 'var(--success-muted)' : 'var(--danger-muted)',
              color: isCorrect ? 'var(--success)' : 'var(--danger)',
            }}
          >
            {isCorrect ? '✓ Calculations Correct! XP Claimed.' : '✕ Calculations incorrect. Double-check your formulas.'}
          </div>
        )}
      </div>

      {showSolution && exercise.explanation && (
        <div
          style={{
            padding: 16,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            fontSize: 13,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
            Worked Solution & Formulas:
          </div>
          {exercise.explanation}
        </div>
      )}
    </div>
  );
};
