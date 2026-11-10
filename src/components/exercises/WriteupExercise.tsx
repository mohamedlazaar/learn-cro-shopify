import React, { useState, useEffect } from 'react';
import { FileText, Check, ArrowRight, Sparkles, Award, ShieldCheck, Loader2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise } from '../../types/curriculum';
import { evaluateWriteupExerciseWithAi, WriteupAiEvaluation } from '../../services/aiExerciseEvaluator';

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

  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<WriteupAiEvaluation | null>(() => {
    return initialSubmission?.aiEvaluation || null;
  });

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const targetWords = exercise.minWordCount || 100;
  const isTargetMet = wordCount >= 30; // Min threshold to trigger evaluation

  // Auto-save writeup draft
  useEffect(() => {
    if (!aiEvaluation && content && content !== exercise.starterWriteup) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ content }));
      } catch {}
    }
  }, [content, aiEvaluation, draftKey, exercise.starterWriteup]);

  const handleSubmit = async () => {
    if (wordCount < 30 || isAiEvaluating) return;

    setIsAiEvaluating(true);

    try {
      const result = await evaluateWriteupExerciseWithAi(
        exercise.title,
        exercise.prompt,
        content,
        exercise.rubric
      );

      setAiEvaluation(result);
      setIsAiEvaluating(false);

      if (result.passed) {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
        });
        try {
          localStorage.removeItem(draftKey);
        } catch {}
        onSuccess(exercise.xp, { content, wordCount, aiEvaluation: result });
      }
    } catch (err) {
      setIsAiEvaluating(false);
      console.error('Writeup evaluation error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
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
                color: wordCount >= targetWords ? 'var(--success)' : 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              {wordCount} / {targetWords} words recommended
            </span>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
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
            boxSizing: 'border-box',
          }}
          placeholder="Draft your strategic conversion writeup, hypothesis breakdown, or heuristic teardown here..."
        />
      </div>

      {/* Rubric display */}
      {exercise.rubric && (
        <div
          style={{
            padding: 14,
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color="var(--accent-primary)" />
            <span>EVALUATION RUBRIC</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {exercise.rubric.map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                • <strong style={{ color: 'var(--text-primary)' }}>{r.criterion}:</strong> {r.description} ({r.points} pts)
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action / Submit Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <button
          onClick={handleSubmit}
          disabled={wordCount < 30 || isAiEvaluating}
          className="btn btn-primary"
          style={{
            opacity: wordCount < 30 || isAiEvaluating ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {isAiEvaluating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>AI CRO Lead Evaluating Your Writeup...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} color="#facc15" />
              <span>Submit to Live AI Coach for Scoring &amp; Feedback</span>
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
            {aiEvaluation.passed
              ? `✓ Passed! AI Score: ${aiEvaluation.score}/100 (+${exercise.xp} XP)`
              : `Score: ${aiEvaluation.score}/100 (Needs Expansion)`}
          </div>
        )}
      </div>

      {/* LIVE AI WRITEUP REPORT */}
      {aiEvaluation && (
        <div
          className="animate-fade-in"
          style={{
            padding: 20,
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--accent-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 14 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Award size={18} color="var(--accent-primary)" /> AI Strategic Review
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Assessed Grade: <strong style={{ color: 'var(--accent-primary)' }}>{aiEvaluation.grade}</strong>
              </div>
            </div>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: aiEvaluation.passed ? 'var(--success-muted)' : 'var(--warning-muted)',
                color: aiEvaluation.passed ? 'var(--success)' : 'var(--warning)',
                fontWeight: 900,
                fontSize: 16,
                border: `2px solid ${aiEvaluation.passed ? 'var(--success)' : 'var(--warning)'}`,
              }}
            >
              {aiEvaluation.score}
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)', background: 'var(--bg-app)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
            <strong>Executive Assessment:</strong> {aiEvaluation.executiveSummary}
          </div>

          {/* Rubric Breakdown */}
          {aiEvaluation.rubricBreakdown && aiEvaluation.rubricBreakdown.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Rubric Criteria Scoring:
              </div>
              {aiEvaluation.rubricBreakdown.map((r, idx) => (
                <div key={idx} style={{ padding: 10, background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span>{r.criterion}</span>
                    <span style={{ color: 'var(--accent-primary)' }}>{r.pointsAwarded} / {r.maxPoints} pts</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: 2 }}>{r.feedback}</div>
                </div>
              ))}
            </div>
          )}

          {/* Strengths & Improvements */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            <div style={{ padding: 12, background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--success)', marginBottom: 4 }}>
                ✓ Core Strengths:
              </div>
              {aiEvaluation.strengths.map((s, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>
                  • {s}
                </div>
              ))}
            </div>

            <div style={{ padding: 12, background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--warning)', marginBottom: 4 }}>
                ⚠️ Recommendations to Elevate:
              </div>
              {aiEvaluation.gapsToImprove.map((g, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 3 }}>
                  • {g}
                </div>
              ))}
            </div>
          </div>

          {/* Senior Coach Advice */}
          {aiEvaluation.seniorCoachAdvice && (
            <div style={{ padding: 12, background: 'var(--accent-muted)', border: '1px solid var(--accent-subtle)', borderRadius: 'var(--radius-sm)', fontSize: 12, lineHeight: 1.5, color: 'var(--accent-primary)' }}>
              <strong>Senior CRO Coach Tip:</strong> {aiEvaluation.seniorCoachAdvice}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
