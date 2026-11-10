import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, HelpCircle, AlertCircle, Sparkles, Loader2, Award, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise } from '../../types/curriculum';
import { evaluateCodeExerciseWithAi, CodeAiEvaluation } from '../../services/aiExerciseEvaluator';

interface CodeExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const CodeExercise: React.FC<CodeExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [code, setCode] = useState(() => {
    if (initialSubmission?.code) return initialSubmission.code;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.code) return parsed.code;
      }
    } catch {}
    return exercise.starterCode || '';
  });

  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    passed: boolean;
    message: string;
  } | null>(() => {
    if (isCompleted) {
      return {
        tested: true,
        passed: true,
        message: 'Verified and saved solution.',
      };
    }
    return null;
  });

  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<CodeAiEvaluation | null>(() => {
    return initialSubmission?.aiEvaluation || null;
  });

  const [showSolution, setShowSolution] = useState(false);

  // Auto-save code draft
  useEffect(() => {
    if (code && code !== exercise.starterCode && !validationResult?.passed) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ code }));
      } catch {}
    }
  }, [code, validationResult, draftKey, exercise.starterCode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleTestAndAiReview = async () => {
    const trimmed = code.trim();
    let localPassed = false;
    let localMessage = '';

    // Exercise-specific quick syntax tests
    if (exercise.slug === 'web-pixel-product-added-to-cart') {
      const hasSubscribe = trimmed.includes('analytics.subscribe') && trimmed.includes('product_added_to_cart');
      const hasDataLayer = trimmed.includes('dataLayer.push') || trimmed.includes('window.dataLayer');
      const hasAddToCartEvent = trimmed.includes("'add_to_cart'") || trimmed.includes('"add_to_cart"');

      if (!hasSubscribe) {
        localMessage = 'Missing analytics.subscribe("product_added_to_cart", ...) handler.';
      } else if (!hasDataLayer) {
        localMessage = 'Must push event to window.dataLayer.';
      } else if (!hasAddToCartEvent) {
        localMessage = 'Must include GA4 event name "add_to_cart" in payload.';
      } else {
        localPassed = true;
        localMessage = 'Syntax assertions passed! Now running Live AI Code Evaluation...';
      }
    } else if (exercise.slug === 'implement-client-side-ab-test') {
      const hasStorage = trimmed.includes('localStorage.getItem') || trimmed.includes('localStorage.setItem');
      const hasClass = trimmed.includes('classList.add');
      const hasExposure = trimmed.includes('experiment_exposure');

      if (!hasStorage) {
        localMessage = 'Must read and persist variant in localStorage.';
      } else if (!hasClass) {
        localMessage = 'Must apply CSS variation class to document.documentElement.';
      } else if (!hasExposure) {
        localMessage = 'Must push experiment_exposure event to window.dataLayer.';
      } else {
        localPassed = true;
        localMessage = 'Syntax assertions passed! Running Live AI Code Evaluation...';
      }
    } else {
      localPassed = trimmed.length > (exercise.starterCode?.length || 0) + 15;
      localMessage = localPassed ? 'Syntax checks passed! Running Live AI Code Evaluation...' : 'Please write your code implementation.';
    }

    setValidationResult({ tested: true, passed: localPassed, message: localMessage });

    if (!localPassed) return;

    // Trigger Live AI Code Evaluation
    setIsAiEvaluating(true);

    try {
      const aiResult = await evaluateCodeExerciseWithAi(
        exercise.title,
        exercise.prompt,
        code,
        exercise.solution
      );

      setAiEvaluation(aiResult);
      setIsAiEvaluating(false);

      if (aiResult.passed) {
        setValidationResult({ tested: true, passed: true, message: aiResult.verdict });
        confetti({
          particleCount: 65,
          spread: 50,
          origin: { y: 0.6 },
        });
        try {
          localStorage.removeItem(draftKey);
        } catch {}
        onSuccess(exercise.xp, { code, aiEvaluation: aiResult });
      } else {
        setValidationResult({ tested: true, passed: false, message: aiResult.verdict });
      }
    } catch (err) {
      setIsAiEvaluating(false);
      console.error('AI code evaluation error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Editor Box */}
      <div
        style={{
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          background: '#090b10',
        }}
      >
        <div
          style={{
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}
        >
          <span>EDITOR (JavaScript / TypeScript)</span>
          <button
            onClick={() => setCode(exercise.starterCode || '')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
            }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>

        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setValidationResult(null);
          }}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{
            width: '100%',
            minHeight: 220,
            padding: 16,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f1f5f9',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.6,
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={handleTestAndAiReview}
            disabled={isAiEvaluating}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            {isAiEvaluating ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>AI Reviewing Code...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} color="#facc15" />
                <span>Run Tests &amp; Live AI Review</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowSolution((s) => !s)}
            className="btn btn-secondary btn-sm"
          >
            <HelpCircle size={14} />
            <span>{showSolution ? 'Hide Solution' : 'Model Solution'}</span>
          </button>
        </div>

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
              : `Score: ${aiEvaluation.score}/100`}
          </div>
        )}
      </div>

      {/* Local Validation Status */}
      {validationResult && !aiEvaluation && (
        <div
          style={{
            padding: 14,
            borderRadius: 'var(--radius-sm)',
            background: validationResult.passed ? 'var(--success-muted)' : 'var(--danger-muted)',
            border: `1px solid ${validationResult.passed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 13,
            color: validationResult.passed ? 'var(--success)' : 'var(--danger)',
          }}
        >
          {validationResult.passed ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{validationResult.message}</span>
        </div>
      )}

      {/* LIVE AI CODE EVALUATION REPORT */}
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
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="var(--accent-primary)" />
              <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>
                AI Senior Engineer Code Review
              </div>
            </div>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: aiEvaluation.passed ? 'var(--success-muted)' : 'var(--warning-muted)',
                color: aiEvaluation.passed ? 'var(--success)' : 'var(--warning)',
                fontWeight: 900,
                fontSize: 15,
                border: `2px solid ${aiEvaluation.passed ? 'var(--success)' : 'var(--warning)'}`,
              }}
            >
              {aiEvaluation.score}
            </div>
          </div>

          <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)', background: 'var(--bg-app)', padding: 12, borderRadius: 'var(--radius-sm)' }}>
            <strong>Analysis:</strong> {aiEvaluation.codeQualityAnalysis}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {aiEvaluation.strengths.length > 0 && (
              <div style={{ padding: 10, background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: 12 }}>
                <span style={{ fontWeight: 700, color: 'var(--success)' }}>✓ Strengths: </span>
                {aiEvaluation.strengths.join('; ')}
              </div>
            )}
            {aiEvaluation.improvements.length > 0 && (
              <div style={{ padding: 10, background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: 12 }}>
                <span style={{ fontWeight: 700, color: 'var(--warning)' }}>⚠️ Optimizations: </span>
                {aiEvaluation.improvements.join('; ')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Model Solution Display */}
      {showSolution && exercise.solution && (
        <div
          style={{
            padding: 16,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
            Model Reference Solution:
          </div>
          <pre
            style={{
              padding: 14,
              background: '#090b10',
              borderRadius: 'var(--radius-sm)',
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              overflowX: 'auto',
              color: '#38bdf8',
              margin: 0,
            }}
          >
            {exercise.solution}
          </pre>
          {exercise.explanation && (
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong>Architecture Note:</strong> {exercise.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
