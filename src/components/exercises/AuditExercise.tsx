import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  ExternalLink,
  Globe,
  Store,
  RefreshCw,
  Award,
  AlertTriangle,
  Lightbulb,
  Wrench,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise } from '../../types/curriculum';
import { MockApparelStore, APPAREL_SURFACES, MockSurfaceKey } from './MockApparelStore';
import {
  evaluateAuditExerciseWithAi,
  AuditAiEvaluation,
  SurfaceFinding,
} from '../../services/aiExerciseEvaluator';

interface AuditExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

const REAL_STORE_PRESETS = [
  { name: 'Gymshark', url: 'https://www.gymshark.com', category: 'Fitness Apparel' },
  { name: 'Allbirds', url: 'https://www.allbirds.com', category: 'Sustainable Footwear' },
  { name: 'Chubbies', url: 'https://www.chubbieshorts.com', category: 'DTC Apparel' },
  { name: 'Death Wish Coffee', url: 'https://www.deathwishcoffee.com', category: 'CPG High-Conversion' },
];

export const AuditExercise: React.FC<AuditExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  // Store Mode: 'mock' (simulated store) or 'real' (live Shopify store URL)
  const [storeMode, setStoreMode] = useState<'mock' | 'real'>(() => {
    if (initialSubmission?.storeMode) return initialSubmission.storeMode;
    return 'mock';
  });

  const [realStoreUrl, setRealStoreUrl] = useState<string>(() => {
    return initialSubmission?.realStoreUrl || 'https://www.gymshark.com';
  });

  const defaultSurfaces: SurfaceFinding[] = [
    { surface: 'Homepage Hero', issue: '', fix: '', category: 'Clarity' },
    { surface: 'Mobile Navigation', issue: '', fix: '', category: 'Mobile UX' },
    { surface: 'Collection Grid', issue: '', fix: '', category: 'Value' },
    { surface: 'Product Detail Page (PDP)', issue: '', fix: '', category: 'Friction' },
    { surface: 'Cart Drawer', issue: '', fix: '', category: 'Trust & Anxiety' },
  ];

  const [findings, setFindings] = useState<SurfaceFinding[]>(() => {
    if (initialSubmission?.findings) return initialSubmission.findings;
    try {
      const draft = localStorage.getItem(draftKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.findings) return parsed.findings;
      }
    } catch {}
    return defaultSurfaces;
  });

  const [activeSurfaceKey, setActiveSurfaceKey] = useState<MockSurfaceKey>('home');
  const [showHints, setShowHints] = useState(false);

  // AI Evaluation State
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<AuditAiEvaluation | null>(() => {
    return initialSubmission?.aiEvaluation || null;
  });
  const [evalStepMessage, setEvalStepMessage] = useState<string>('Analyzing your observations...');

  const activeSurfaceIndex = APPAREL_SURFACES.findIndex((s) => s.key === activeSurfaceKey);
  const currentMeta = APPAREL_SURFACES[activeSurfaceIndex] || APPAREL_SURFACES[0];
  const currentFindingIndex = findings.findIndex((f) => f.surface === currentMeta.surface);
  const currentFinding = findings[currentFindingIndex] || findings[0];

  const isValid = (f: SurfaceFinding) => f.issue.trim().length > 10 && f.fix.trim().length > 10;
  const validCount = findings.filter(isValid).length;

  const doneKeys = useMemo(() => {
    const set = new Set<MockSurfaceKey>();
    APPAREL_SURFACES.forEach((s) => {
      const f = findings.find((x) => x.surface === s.surface);
      if (f && isValid(f)) set.add(s.key);
    });
    return set;
  }, [findings]);

  // Auto-save draft
  useEffect(() => {
    if (!aiEvaluation) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ findings, storeMode, realStoreUrl }));
      } catch {}
    }
  }, [findings, storeMode, realStoreUrl, aiEvaluation, draftKey]);

  const handleUpdate = (idx: number, field: keyof SurfaceFinding, val: string) => {
    setFindings((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: val } : f)));
  };

  // Submit to Live AI Coach
  const handleSubmitToAi = async () => {
    if (validCount < 3) return;

    setIsAiEvaluating(true);
    setEvalStepMessage('Auditing friction mapping across surfaces...');

    const timer1 = setTimeout(() => {
      setEvalStepMessage('Validating Shopify Liquid & CSS technical feasibility...');
    }, 1200);

    const timer2 = setTimeout(() => {
      setEvalStepMessage('Benchmarking against high-converting Shopify Plus stores...');
    }, 2400);

    const storeContext = storeMode === 'mock' ? 'Loom & Lane (Simulated DTC Apparel Store)' : realStoreUrl;

    try {
      const result = await evaluateAuditExerciseWithAi(storeContext, findings, exercise.prompt);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setAiEvaluation(result);
      setIsAiEvaluating(false);

      if (result.passed) {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
        onSuccess(exercise.xp, {
          findings,
          storeMode,
          realStoreUrl,
          aiEvaluation: result,
        });
      }
    } catch (err) {
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsAiEvaluating(false);
      console.error('Audit evaluation error:', err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Store Mode Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '12px 16px',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
            AUDIT TARGET:
          </span>
          <div style={{ display: 'flex', gap: 6, background: 'var(--bg-app)', padding: 3, borderRadius: 'var(--radius-sm)' }}>
            <button
              type="button"
              onClick={() => setStoreMode('mock')}
              className={`btn btn-sm ${storeMode === 'mock' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: 12, padding: '4px 12px' }}
            >
              <Store size={14} /> Interactive Simulated Store
            </button>
            <button
              type="button"
              onClick={() => setStoreMode('real')}
              className={`btn btn-sm ${storeMode === 'real' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: 12, padding: '4px 12px' }}
            >
              <Globe size={14} /> Audit a Real Live Store
            </button>
          </div>
        </div>

        {storeMode === 'mock' && (
          <button
            type="button"
            className={`btn btn-sm btn-secondary ${showHints ? 'is-active' : ''}`}
            onClick={() => setShowHints((v) => !v)}
            style={{ fontSize: 12 }}
          >
            {showHints ? <EyeOff size={14} /> : <Eye size={14} />}
            {showHints ? 'Hide Hints' : 'Show Heuristic Hints'}
          </button>
        )}
      </div>

      {/* Real Store Target Configurator */}
      {storeMode === 'real' && (
        <div
          style={{
            padding: 16,
            background: 'var(--bg-surface)',
            border: '1px solid var(--accent-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                🌐 Live Storefront Inspector
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                Audit any live Shopify store or select one of our curated high-scale benchmark brands:
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {REAL_STORE_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setRealStoreUrl(p.url)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    fontSize: 11,
                    padding: '4px 8px',
                    borderColor: realStoreUrl === p.url ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    color: realStoreUrl === p.url ? 'var(--accent-primary)' : 'inherit',
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="url"
              className="input-text"
              placeholder="https://client-store.com"
              value={realStoreUrl}
              onChange={(e) => setRealStoreUrl(e.target.value)}
              style={{ flex: 1, fontFamily: 'monospace', fontSize: 13 }}
            />
            <a
              href={realStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              Open Store <ExternalLink size={13} />
            </a>
            <a
              href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(realStoreUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ whiteSpace: 'nowrap' }}
            >
              Check CWV / Speed <ExternalLink size={13} />
            </a>
          </div>

          {/* Quick Surface Deep-Links */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', fontSize: 11, color: 'var(--text-secondary)' }}>
            <span style={{ fontWeight: 600 }}>Quick Navigation Links:</span>
            <a href={`${realStoreUrl.replace(/\/$/, '')}/`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
              1. Homepage
            </a>
            <span>•</span>
            <a href={`${realStoreUrl.replace(/\/$/, '')}/collections/all`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
              2. Collection Page (/collections/all)
            </a>
            <span>•</span>
            <a href={`${realStoreUrl.replace(/\/$/, '')}/cart`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>
              3. Cart (/cart)
            </a>
          </div>
        </div>
      )}

      {/* Simulated Store Viewer (if mock store mode) */}
      {storeMode === 'mock' && (
        <MockApparelStore
          active={activeSurfaceKey}
          onSelect={setActiveSurfaceKey}
          showHints={showHints}
          doneKeys={doneKeys}
        />
      )}

      {/* Surface Selector Pills (For easy jumping in both modes) */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {APPAREL_SURFACES.map((s, idx) => {
          const isDone = doneKeys.has(s.key);
          const isActive = s.key === activeSurfaceKey;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveSurfaceKey(s.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                background: isActive ? 'var(--accent-muted)' : 'var(--bg-surface)',
                color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                fontSize: 12,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{s.emoji}</span>
              <span>
                Surface {idx + 1}: {s.tab}
              </span>
              {isDone && <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* Active Surface Finding Logger */}
      <div
        style={{
          padding: 20,
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 20 }}>{currentMeta.emoji}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                Auditing: {currentMeta.surface}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Target: {storeMode === 'mock' ? 'Loom & Lane DTC Store' : realStoreUrl}
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
              background: isValid(currentFinding) ? 'var(--success-muted)' : 'var(--bg-app)',
              color: isValid(currentFinding) ? 'var(--success)' : 'var(--text-muted)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {isValid(currentFinding) ? '✓ Logged' : 'Needs Flaw + Technical Fix'}
          </div>
        </div>

        {/* Category Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>
            Friction Dimension:
          </span>
          {['Clarity & UVP', 'Trust & Anxiety', 'Visual Distraction', 'Value & Pricing', 'Mobile Thumb UX', 'Page Speed / CWV'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleUpdate(currentFindingIndex, 'category', cat)}
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: currentFinding.category === cat ? 'var(--accent-primary)' : 'var(--border-subtle)',
                background: currentFinding.category === cat ? 'var(--accent-muted)' : 'transparent',
                color: currentFinding.category === cat ? 'var(--accent-primary)' : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Input 1: Flaw */}
        <div className="input-group">
          <label className="input-label" htmlFor={`audit-issue-${currentFinding.surface}`}>
            🔍 Observed Friction Flaw (What hurts conversion?):
          </label>
          <textarea
            id={`audit-issue-${currentFinding.surface}`}
            className="input-textarea"
            rows={3}
            placeholder="e.g. Hero carousel auto-rotates every 3 seconds before first-time visitors can read the headline; CTA contrast is 2.1:1, failing WCAG accessibility."
            value={currentFinding.issue}
            onChange={(e) => handleUpdate(currentFindingIndex, 'issue', e.target.value)}
          />
        </div>

        {/* Input 2: Technical Fix */}
        <div className="input-group">
          <label className="input-label" htmlFor={`audit-fix-${currentFinding.surface}`}>
            🛠️ Production Technical Recommendation (Liquid / CSS / JS / Theme Blocks):
          </label>
          <textarea
            id={`audit-fix-${currentFinding.surface}`}
            className="input-textarea"
            rows={3}
            placeholder="e.g. Replace carousel with a static hero section block. Add fetchpriority='high' to the hero image_tag, and style the primary CTA with #000 background for 12:1 contrast ratio."
            value={currentFinding.fix}
            onChange={(e) => handleUpdate(currentFindingIndex, 'fix', e.target.value)}
          />
        </div>

        {/* Surface Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            disabled={activeSurfaceIndex === 0}
            style={{ opacity: activeSurfaceIndex === 0 ? 0.4 : 1 }}
            onClick={() => setActiveSurfaceKey(APPAREL_SURFACES[activeSurfaceIndex - 1].key)}
          >
            <ArrowLeft size={13} /> Previous Surface
          </button>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Surface {activeSurfaceIndex + 1} of {APPAREL_SURFACES.length}
          </span>
          {activeSurfaceIndex < APPAREL_SURFACES.length - 1 ? (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveSurfaceKey(APPAREL_SURFACES[activeSurfaceIndex + 1].key)}
            >
              Next Surface <ArrowRight size={13} />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Rubric Points */}
      {exercise.rubric && (
        <div style={{ padding: 14, background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} color="var(--accent-primary)" /> EVALUATION RUBRIC
          </div>
          {exercise.rubric.map((r, i) => (
            <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              • <strong style={{ color: 'var(--text-primary)' }}>{r.criterion}:</strong> {r.description} ({r.points} pts)
            </div>
          ))}
        </div>
      )}

      {/* Live AI Submit Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <button
          id="audit-submit-ai"
          type="button"
          onClick={handleSubmitToAi}
          disabled={validCount < 3 || isAiEvaluating}
          className="btn btn-primary"
          style={{
            padding: '12px 24px',
            fontSize: 14,
            fontWeight: 700,
            opacity: validCount < 3 || isAiEvaluating ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {isAiEvaluating ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>{evalStepMessage}</span>
            </>
          ) : (
            <>
              <Sparkles size={16} color="#facc15" />
              <span>
                Submit to Live AI for Real-Time Correction ({validCount}/5 logged{validCount < 3 ? ', min 3' : ''})
              </span>
            </>
          )}
        </button>

        {aiEvaluation && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
              {aiEvaluation.passed ? `✓ Passed! Score: ${aiEvaluation.overallScore}/100 (+${exercise.xp} XP)` : `Score: ${aiEvaluation.overallScore}/100 (Needs Revision)`}
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleSubmitToAi}
              disabled={isAiEvaluating}
            >
              <RefreshCw size={13} /> Re-Evaluate
            </button>
          </div>
        )}
      </div>

      {/* LIVE AI AUDIT REPORT */}
      {aiEvaluation && (
        <div
          className="animate-fade-in"
          style={{
            marginTop: 8,
            padding: 24,
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--accent-primary)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Header Score Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 16,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={20} color="var(--accent-primary)" />
                <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Live AI CRO Consultant Evaluation
                </h3>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
                Evaluated against senior Shopify Plus architectural & experimentation benchmarks
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Assessed Grade
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {aiEvaluation.grade}
                </div>
              </div>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: aiEvaluation.passed ? 'var(--success-muted)' : 'var(--warning-muted)',
                  color: aiEvaluation.passed ? 'var(--success)' : 'var(--warning)',
                  fontWeight: 900,
                  fontSize: 18,
                  border: `2px solid ${aiEvaluation.passed ? 'var(--success)' : 'var(--warning)'}`,
                }}
              >
                {aiEvaluation.overallScore}
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div
            style={{
              padding: 14,
              background: 'var(--bg-app)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--text-primary)',
              borderLeft: '4px solid var(--accent-primary)',
            }}
          >
            <strong>Lead Auditor Verdict:</strong> {aiEvaluation.executiveSummary}
          </div>

          {/* Surface-by-Surface Critiques */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Surface Breakdown & Exact Technical Corrections:
            </div>

            {aiEvaluation.surfaceCritiques.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-app)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>
                    {c.surface}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        background:
                          c.status === 'strong'
                            ? 'var(--success-muted)'
                            : c.status === 'good'
                            ? 'var(--warning-muted)'
                            : 'var(--danger-muted)',
                        color:
                          c.status === 'strong'
                            ? 'var(--success)'
                            : c.status === 'good'
                            ? 'var(--warning)'
                            : 'var(--danger)',
                      }}
                    >
                      {c.status.toUpperCase()} ({c.score}/20 pts)
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓ What You Nailed: </span>
                  {c.whatYouNailed}
                </div>

                <div style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--warning)', fontWeight: 700 }}>⚠️ Critical Blindspot: </span>
                  {c.criticalBlindspots}
                </div>

                <div
                  style={{
                    padding: 10,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px dashed var(--accent-subtle)',
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Wrench size={12} /> Expert Production Fix:
                  </div>
                  <div style={{ color: 'var(--text-secondary)' }}>{c.expertShopifyFix}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus Agency Recommendations */}
          {aiEvaluation.bonusRecommendations && aiEvaluation.bonusRecommendations.length > 0 && (
            <div
              style={{
                padding: 14,
                background: 'var(--bg-app)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Lightbulb size={14} /> BONUS HIGH-IMPACT EXPERIMENTS IDENTIFIED BY AI:
              </div>
              {aiEvaluation.bonusRecommendations.map((b, idx) => (
                <div key={idx} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                  • {b}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
