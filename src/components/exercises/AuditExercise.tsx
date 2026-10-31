import React, { useState, useEffect, useMemo } from 'react';
import { CheckSquare, ShieldCheck, ArrowLeft, ArrowRight, Eye, EyeOff, BookOpenCheck } from 'lucide-react';
import { Exercise } from '../../types/curriculum';
import { MockApparelStore, APPAREL_SURFACES, MockSurfaceKey } from './MockApparelStore';

interface AuditExerciseProps {
  exercise: Exercise;
  onSuccess: (xp: number, submission: any) => void;
  isCompleted?: boolean;
  initialSubmission?: any;
}

export const AuditExercise: React.FC<AuditExerciseProps> = ({
  exercise,
  onSuccess,
  isCompleted,
  initialSubmission,
}) => {
  const draftKey = `cro_ex_draft_${exercise.slug}`;

  const defaultSurfaces = [
    { surface: 'Product Detail Page (PDP)', issue: '', fix: '' },
    { surface: 'Cart Drawer', issue: '', fix: '' },
    { surface: 'Collection Grid', issue: '', fix: '' },
    { surface: 'Homepage Hero', issue: '', fix: '' },
    { surface: 'Mobile Navigation', issue: '', fix: '' },
  ];

  const [findings, setFindings] = useState<Array<{ surface: string; issue: string; fix: string }>>(() => {
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

  const [submitted, setSubmitted] = useState<boolean>(() => !!isCompleted || !!initialSubmission?.findings);

  // Auto-save draft
  useEffect(() => {
    if (!submitted) {
      try {
        localStorage.setItem(draftKey, JSON.stringify({ findings }));
      } catch {}
    }
  }, [findings, submitted, draftKey]);

  const handleUpdate = (idx: number, field: 'issue' | 'fix', val: string) => {
    setFindings((prev) => prev.map((f, i) => (i === idx ? { ...f, [field]: val } : f)));
    setSubmitted(false);
  };

  // ---- Mock store mode ----
  const hasMockStore = exercise.mockStore === 'apparel';
  const [activeSurface, setActiveSurface] = useState<MockSurfaceKey>('home');
  const [showHints, setShowHints] = useState(false);

  const isValid = (f: { issue: string; fix: string }) => f.issue.trim().length > 10 && f.fix.trim().length > 10;

  const findingIndexFor = (key: MockSurfaceKey) => {
    const meta = APPAREL_SURFACES.find((s) => s.key === key)!;
    return findings.findIndex((f) => f.surface === meta.surface);
  };

  const doneKeys = useMemo(() => {
    const set = new Set<MockSurfaceKey>();
    APPAREL_SURFACES.forEach((s) => {
      const f = findings.find((x) => x.surface === s.surface);
      if (f && isValid(f)) set.add(s.key);
    });
    return set;
  }, [findings]);

  const handleComplete = () => {
    const validCount = findings.filter((f) => f.issue.trim().length > 10 && f.fix.trim().length > 10).length;
    if (validCount >= 3) {
      setSubmitted(true);
      try {
        localStorage.removeItem(draftKey);
      } catch {}
      onSuccess(exercise.xp, { findings });
    }
  };

  const validCount = findings.filter((f) => f.issue.trim().length > 10 && f.fix.trim().length > 10).length;

  if (hasMockStore) {
    const surfaceIdx = APPAREL_SURFACES.findIndex((s) => s.key === activeSurface);
    const meta = APPAREL_SURFACES[surfaceIdx];
    const fIdx = findingIndexFor(activeSurface);
    const finding = findings[fIdx];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Client brief */}
        <div className="au-brief">
          <div className="au-brief-emoji" aria-hidden="true">
            🕵️
          </div>
          <div className="au-brief-text">
            <strong>Client: Loom &amp; Lane</strong>, a DTC linen apparel brand stuck at a <strong>2.1% CVR</strong>.
            Click through the 5 store surfaces below, spot what's hurting conversions, and log one flaw + fix per
            surface. Stuck? Turn on hints to reveal where the problems are.
          </div>
          <button
            id="audit-toggle-hints"
            type="button"
            className={`au-hint-toggle${showHints ? ' is-on' : ''}`}
            onClick={() => setShowHints((v) => !v)}
          >
            {showHints ? <EyeOff size={14} /> : <Eye size={14} />}
            {showHints ? 'Hide hints' : 'Show hints'}
          </button>
        </div>

        <MockApparelStore
          active={activeSurface}
          onSelect={setActiveSurface}
          showHints={showHints}
          doneKeys={doneKeys}
        />

        {/* Finding for the active surface */}
        {finding && (
          <div className="au-finding" key={activeSurface}>
            <div className="au-finding-head">
              <div className="au-finding-title">
                <span aria-hidden="true">{meta.emoji}</span>
                Surface {surfaceIdx + 1}: {finding.surface}
              </div>
              <div className={`au-finding-status${doneKeys.has(activeSurface) ? ' is-done' : ''}`}>
                {doneKeys.has(activeSurface) ? '✓ Logged' : 'Not logged yet'}
              </div>
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor={`audit-issue-${activeSurface}`}>
                🔍 What friction did you spot?
              </label>
              <textarea
                id={`audit-issue-${activeSurface}`}
                className="input-textarea"
                placeholder="Describe the flaw and why it costs conversions…"
                value={finding.issue}
                onChange={(e) => handleUpdate(fIdx, 'issue', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label" htmlFor={`audit-fix-${activeSurface}`}>
                🛠️ Your technical fix (Liquid / CSS / JS)
              </label>
              <textarea
                id={`audit-fix-${activeSurface}`}
                className="input-textarea"
                placeholder="How would you implement the fix in a Shopify theme?"
                value={finding.fix}
                onChange={(e) => handleUpdate(fIdx, 'fix', e.target.value)}
              />
            </div>
            <div className="au-finding-nav">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                disabled={surfaceIdx === 0}
                style={{ opacity: surfaceIdx === 0 ? 0.4 : 1 }}
                onClick={() => setActiveSurface(APPAREL_SURFACES[surfaceIdx - 1].key)}
              >
                <ArrowLeft size={13} /> Previous surface
              </button>
              {surfaceIdx < APPAREL_SURFACES.length - 1 && (
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActiveSurface(APPAREL_SURFACES[surfaceIdx + 1].key)}
                >
                  Next surface <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Rubric */}
        {exercise.rubric && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--text-secondary)' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="var(--accent-primary)" /> EVALUATION RUBRIC
            </div>
            {exercise.rubric.map((r, i) => (
              <div key={i}>
                • <strong style={{ color: 'var(--text-primary)' }}>{r.criterion}:</strong> {r.description} ({r.points} pts)
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <button
            id="audit-submit"
            onClick={handleComplete}
            disabled={validCount < 3}
            className="btn btn-primary"
            style={{ opacity: validCount < 3 ? 0.6 : 1 }}
          >
            <CheckSquare size={14} />
            <span>
              Submit Audit ({validCount}/5 logged{validCount < 3 ? ', min 3' : ''})
            </span>
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
              }}
            >
              ✓ Audit submitted! +{exercise.xp} XP claimed
            </div>
          )}
        </div>

        {/* Expert answer key, revealed after submission */}
        {submitted && (
          <div className="au-key">
            <div className="au-key-title">
              <BookOpenCheck size={18} color="#a3e635" /> Expert Audit: compare your findings
            </div>
            <div className="au-key-sub">Every flaw planted in the Loom &amp; Lane store, with a production-grade fix.</div>
            {APPAREL_SURFACES.map((s, i) => {
              const yours = findings.find((f) => f.surface === s.surface);
              return (
                <details key={s.key} className="au-key-surface" open={i === 0}>
                  <summary>
                    <span aria-hidden="true">{s.emoji}</span> {s.surface}
                    <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-muted)' }}>
                      {s.answerKey.length} flaws
                    </span>
                  </summary>
                  <div className="au-key-items">
                    {yours && yours.issue.trim() && <div className="au-key-yours">You logged: “{yours.issue}”</div>}
                    {s.answerKey.map((k, j) => (
                      <div key={j} className="au-key-item">
                        <div className="au-key-flaw">
                          <b>Flaw</b>
                          {k.flaw}
                        </div>
                        <div className="au-key-fix">
                          <b>Fix</b>
                          {k.fix}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Rubric Points */}
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

      {/* Surface inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {findings.map((finding, idx) => (
          <div
            key={idx}
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
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
              Surface {idx + 1}: {finding.surface}
            </div>
            <div className="input-group">
              <label className="input-label">Observed Friction / Usability Obstacle:</label>
              <input
                type="text"
                className="input-text"
                placeholder="e.g. Sizing chart hidden in footer, causing 30% drop-off on mobile"
                value={finding.issue}
                onChange={(e) => handleUpdate(idx, 'issue', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Technical Recommendation (Liquid / CSS / JS):</label>
              <input
                type="text"
                className="input-text"
                placeholder="e.g. Implement modal drawer size guide anchored above Add to Cart button"
                value={finding.fix}
                onChange={(e) => handleUpdate(idx, 'fix', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <button
          onClick={handleComplete}
          disabled={validCount < 3}
          className="btn btn-primary"
          style={{ opacity: validCount < 3 ? 0.6 : 1 }}
        >
          <CheckSquare size={14} />
          <span>Submit Audit Findings ({validCount}/5 completed)</span>
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
            }}
          >
            ✓ Audit Rubric Passed! +{exercise.xp} XP Claimed
          </div>
        )}
      </div>
    </div>
  );
};
