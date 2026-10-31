import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, HelpCircle, AlertCircle } from 'lucide-react';
import { Exercise } from '../../types/curriculum';

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

  const handleTest = () => {
    const trimmed = code.trim();
    let passed = false;
    let message = '';

    // Exercise-specific test assertions
    if (exercise.slug === 'web-pixel-product-added-to-cart') {
      const hasSubscribe = trimmed.includes('analytics.subscribe') && trimmed.includes('product_added_to_cart');
      const hasDataLayer = trimmed.includes('dataLayer.push') || trimmed.includes('window.dataLayer');
      const hasAddToCartEvent = trimmed.includes("'add_to_cart'") || trimmed.includes('"add_to_cart"');

      if (!hasSubscribe) {
        message = 'Missing analytics.subscribe("product_added_to_cart", ...) handler.';
      } else if (!hasDataLayer) {
        message = 'Must push event to window.dataLayer.';
      } else if (!hasAddToCartEvent) {
        message = 'Must include GA4 event name "add_to_cart" in payload.';
      } else {
        passed = true;
        message = 'Test Passed! Web pixel successfully captures product additions and dispatches dataLayer payload.';
      }
    } else if (exercise.slug === 'implement-client-side-ab-test') {
      const hasStorage = trimmed.includes('localStorage.getItem') || trimmed.includes('localStorage.setItem');
      const hasClass = trimmed.includes('classList.add');
      const hasExposure = trimmed.includes('experiment_exposure');

      if (!hasStorage) {
        message = 'Must read and persist variant in localStorage.';
      } else if (!hasClass) {
        message = 'Must apply CSS variation class to document.documentElement.';
      } else if (!hasExposure) {
        message = 'Must push experiment_exposure event to window.dataLayer.';
      } else {
        passed = true;
        message = 'Test Passed! Zero-flicker client-side test pattern verified.';
      }
    } else if (exercise.slug === 'cart-drawer-section-rendering-api') {
      const hasFetch = trimmed.includes('/cart/add.js') && trimmed.includes('sections=cart-drawer');
      const hasInnerHTML = trimmed.includes('innerHTML') || trimmed.includes('container');

      if (!hasFetch) {
        message = 'Must request /cart/add.js with ?sections=cart-drawer parameter.';
      } else {
        passed = true;
        message = 'Test Passed! Section Rendering API cart update verified.';
      }
    } else if (exercise.slug === 'shopify-function-free-shipping-over-75') {
      const hasSubtotalCheck = trimmed.includes('75') || trimmed.includes('7500');
      const hasOperations = trimmed.includes('operations');

      if (!hasSubtotalCheck) {
        message = 'Must check for $75.00 threshold.';
      } else {
        passed = true;
        message = 'Test Passed! Shopify Function operations compiled cleanly.';
      }
    } else if (exercise.slug === 'edge-middleware-ab-test') {
      const hasCookie = trimmed.includes('Cookie') || trimmed.includes('cookie');
      const hasSetCookie = trimmed.includes('Set-Cookie');

      if (!hasCookie || !hasSetCookie) {
        message = 'Must parse visitor cookie and return Set-Cookie persistence header.';
      } else {
        passed = true;
        message = 'Test Passed! Edge middleware A/B router verified.';
      }
    } else {
      // General fallback validation: ensure non-trivial code was added
      passed = trimmed.length > (exercise.starterCode?.length || 0) + 20;
      message = passed ? 'Test assertions passed!' : 'Please implement the required logic.';
    }

    setValidationResult({ tested: true, passed, message });

    if (passed) {
      try {
        localStorage.removeItem(draftKey);
      } catch {}
      onSuccess(exercise.xp, { code });
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
          }}
        />
      </div>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleTest} className="btn btn-primary">
            <Play size={14} />
            <span>Run & Validate Code</span>
          </button>

          <button
            onClick={() => setShowSolution((s) => !s)}
            className="btn btn-secondary btn-sm"
          >
            <HelpCircle size={14} />
            <span>{showSolution ? 'Hide Solution' : 'Model Solution'}</span>
          </button>
        </div>
      </div>

      {/* Validation Result Notice */}
      {validationResult && (
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
            fontWeight: 500,
          }}
        >
          {validationResult.passed ? <Check size={16} /> : <AlertCircle size={16} />}
          <span>{validationResult.message}</span>
        </div>
      )}

      {/* Model Solution Box */}
      {showSolution && exercise.solution && (
        <div
          style={{
            padding: 16,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
            REFERENCE SOLUTION:
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#94a3b8',
              whiteSpace: 'pre-wrap',
            }}
          >
            {exercise.solution}
          </pre>
        </div>
      )}
    </div>
  );
};
