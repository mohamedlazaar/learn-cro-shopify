import React, { useState, useEffect } from 'react';
import { Check, CheckCircle2, Sparkles, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise } from '../../types/curriculum';
import { evaluateBuildExerciseWithAi, BuildAiEvaluation } from '../../services/aiExerciseEvaluator';

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

  const [studentNotes, setStudentNotes] = useState<string>(() => {
    if (initialSubmission?.studentNotes) return initialSubmission.studentNotes;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.studentNotes) return parsed.studentNotes;
      }
    } catch {}
    return '';
  });

  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<BuildAiEvaluation | null>(
    initialSubmission?.aiEvaluation || null
  );

  const [submitted, setSubmitted] = useState<boolean>(() => !!isCompleted || !!initialSubmission?.checkedItems);

  // Auto-save draft
  useEffect(() => {
    if (!submitted) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ checkedItems, studentNotes }));
      } catch {}
    }
  }, [checkedItems, studentNotes, submitted, draftKey]);

  const toggleItem = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalCount = checklist.length;
  const completedList = checklist.filter((_, idx) => !!checkedItems[idx]);
  const completedCount = completedList.length;
  const isAllChecked = totalCount > 0 && completedCount === totalCount;

  const handleAiPreFlightReview = async () => {
    setIsAiEvaluating(true);
    try {
      const evalResult = await evaluateBuildExerciseWithAi(
        exercise.title,
        exercise.prompt,
        checklist,
        completedList,
        studentNotes
      );
      setAiEvaluation(evalResult);

      if (evalResult.passed && isAllChecked) {
        setSubmitted(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
        try {
          localStorage.removeItem(draftKey);
        } catch {}
        onSuccess(exercise.xp, { checkedItems, studentNotes, aiEvaluation: evalResult });
      }
    } catch (err) {
      console.error('Build evaluation failed:', err);
    } finally {
      setIsAiEvaluating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* Checklist Gate Items */}
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

      {/* Optional Implementation Notes for AI Architect Review */}
      <div
        style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
            IMPLEMENTATION STRATEGY &amp; TECHNICAL NOTES (OPTIONAL FOR AI REVIEW)
          </label>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            Paste code snippets, testing logs, or edge-case handling
          </span>
        </div>
        <textarea
          value={studentNotes}
          onChange={(e) => setStudentNotes(e.target.value)}
          placeholder="e.g. Tested on iPhone 15 Pro iOS 17 Safari. Verified experiment_exposure event firing in GTM Preview. Tested cart drawer state persistence across currency switches..."
          rows={3}
          style={{
            width: '100%',
            padding: 10,
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text-primary)',
            fontSize: 13,
            lineHeight: 1.5,
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <button
          onClick={handleAiPreFlightReview}
          disabled={isAiEvaluating || completedCount === 0}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {isAiEvaluating ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>AI Architect Assessing Deployment...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} color="#facc15" />
              <span>Verify Gates &amp; Run AI Pre-Flight Audit ({completedCount}/{totalCount})</span>
            </>
          )}
        </button>

        {aiEvaluation && (
          <div
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              background: aiEvaluation.passed ? 'var(--success-muted)' : 'var(--warning-muted)',
              color: aiEvaluation.passed ? 'var(--success)' : 'var(--warning)',
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {aiEvaluation.readinessLevel} • AI Score: {aiEvaluation.score}/100
          </div>
        )}
      </div>

      {/* LIVE AI PRE-FLIGHT AUDIT REPORT */}
      {aiEvaluation && (
        <div
          className="animate-fade-in"
          style={{
            padding: 20,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ShieldCheck size={20} color="#10b981" />
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                Shopify Plus Pre-Flight Architecture Report
              </h4>
            </div>
            <div
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                fontWeight: 700,
                background: aiEvaluation.passed ? 'var(--success-muted)' : 'var(--danger-muted)',
                color: aiEvaluation.passed ? 'var(--success)' : 'var(--danger)',
              }}
            >
              {aiEvaluation.readinessLevel}
            </div>
          </div>

          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {aiEvaluation.executiveSummary}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            <div
              style={{
                padding: 14,
                background: 'var(--bg-app)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid var(--accent-primary)',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 6 }}>
                ARCHITECTURAL CONSIDERATIONS:
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {aiEvaluation.architecturalConsiderations.map((c, i) => (
                  <li key={i} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                padding: 14,
                background: 'var(--bg-app)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: '3px solid #f59e0b',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                <AlertTriangle size={12} />
                <span>CRITICAL PRODUCTION GOTCHAS:</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {aiEvaluation.edgeCasesAndGotchas.map((g, i) => (
                  <li key={i} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              padding: 14,
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              color: 'var(--text-primary)',
              lineHeight: 1.6,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: '#818cf8', marginBottom: 4 }}>
              SENIOR ARCHITECT DEPLOYMENT ADVICE:
            </div>
            {aiEvaluation.seniorArchitectAdvice}
          </div>
        </div>
      )}

      {submitted && !aiEvaluation && (
        <div
          style={{
            padding: '8px 14px',
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
  );
};
