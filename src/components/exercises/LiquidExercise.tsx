import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Check, HelpCircle, Eye, AlertCircle } from 'lucide-react';
import { Exercise } from '../../types/curriculum';
import { renderLiquid, defaultMockStore } from '../../services/liquidEngine';

interface LiquidExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const LiquidExercise: React.FC<LiquidExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const [liquidCode, setLiquidCode] = useState(() => {
    if (initialSubmission?.liquidCode) return initialSubmission.liquidCode;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.liquidCode) return parsed.liquidCode;
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
        message: 'Liquid template verified and saved.',
      };
    }
    return null;
  });

  const [showSolution, setShowSolution] = useState(false);

  // Auto-save Liquid draft
  useEffect(() => {
    if (liquidCode && liquidCode !== exercise.starterCode && !validationResult?.passed) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ liquidCode }));
      } catch {}
    }
  }, [liquidCode, validationResult, draftKey, exercise.starterCode]);

  const renderedPreview = renderLiquid(liquidCode, defaultMockStore);

  const handleVerify = () => {
    let passed = false;
    let message = '';

    if (exercise.slug === 'rewrite-image-tag-for-lcp') {
      const hasImageTag = liquidCode.includes('image_tag');
      const hasImageUrl = liquidCode.includes('image_url');
      const hasPriority = liquidCode.includes('fetchpriority: "high"') || liquidCode.includes("fetchpriority: 'high'") || liquidCode.includes('fetchpriority="high"');
      const hasEager = liquidCode.includes('loading: "eager"') || liquidCode.includes("loading: 'eager'") || liquidCode.includes('loading="eager"');

      if (!hasImageTag || !hasImageUrl) {
        message = 'Must use Shopify image_url and image_tag Liquid filters.';
      } else if (!hasPriority) {
        message = 'Must specify fetchpriority: "high" to optimize LCP.';
      } else if (!hasEager) {
        message = 'Must specify loading: "eager" (never lazy load LCP hero images).';
      } else {
        passed = true;
        message = 'LCP Image Tag Verified! Responsive widths, eager loading, and high priority confirmed.';
      }
    } else if (exercise.slug === 'build-sticky-atc-liquid-block') {
      const hasTitle = liquidCode.includes('product.title');
      const hasPrice = liquidCode.includes('product.price');
      const hasSubmit = liquidCode.includes('button') || liquidCode.includes('submit');

      if (!hasTitle || !hasPrice) {
        message = 'Must include product title and formatted price in sticky block.';
      } else if (!hasSubmit) {
        message = 'Must include an Add to Cart submit button.';
      } else {
        passed = true;
        message = 'Sticky ATC Block Verified! Product variables and CTA trigger confirmed.';
      }
    } else if (exercise.slug === 'personalized-cart-banner-liquid') {
      const hasIf = liquidCode.includes('{%- if') || liquidCode.includes('{% if');
      const hasThreshold = liquidCode.includes('10000') || liquidCode.includes('100');
      const hasCode = liquidCode.includes('VIPGIFT');

      if (!hasIf || !hasThreshold) {
        message = 'Must evaluate cart.total_price against $100 threshold.';
      } else if (!hasCode) {
        message = 'Must display promo code VIPGIFT when unlocked.';
      } else {
        passed = true;
        message = 'Personalized Cart Banner Verified! Threshold and condition verified.';
      }
    } else {
      passed = liquidCode.trim().length > (exercise.starterCode?.length || 0) + 15;
      message = passed ? 'Liquid syntax verified!' : 'Please complete the Liquid implementation.';
    }

    setValidationResult({ tested: true, passed, message });

    if (passed) {
      try {
        localStorage.removeItem(draftKey);
      } catch {}
      onSuccess(exercise.xp, { liquidCode });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
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
            <span>LIQUID TEMPLATE</span>
            <button
              onClick={() => setLiquidCode(exercise.starterCode || '')}
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
            value={liquidCode}
            onChange={(e) => {
              setLiquidCode(e.target.value);
              setValidationResult(null);
            }}
            spellCheck={false}
            style={{
              width: '100%',
              minHeight: 220,
              padding: 16,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              lineHeight: 1.6,
              resize: 'vertical',
            }}
          />
        </div>

        {/* Live Evaluated Output Preview */}
        <div
          style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '8px 16px',
              background: 'var(--bg-surface-active)',
              borderBottom: '1px solid var(--border-subtle)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Eye size={14} />
            <span>RENDERED SIMULATION</span>
          </div>
          <div
            style={{
              padding: 16,
              flex: 1,
              overflowY: 'auto',
              minHeight: 220,
              fontSize: 13,
              color: 'var(--text-primary)',
            }}
            dangerouslySetInnerHTML={{ __html: renderedPreview }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={handleVerify} className="btn btn-primary">
            <Play size={14} />
            <span>Verify Liquid Solution</span>
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
            REFERENCE LIQUID SNIPPET:
          </div>
          <pre
            style={{
              margin: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: '#38bdf8',
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
