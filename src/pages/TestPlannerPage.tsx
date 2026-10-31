import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Users,
  TrendingUp,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import {
  calculateSampleSizePerVariant,
  calculateTestDurationDays,
  computeSignificance,
} from '../services/stats';
import { Experiment } from '../types/tools';

export const TestPlannerPage: React.FC = () => {
  const { experiments, saveExperiment, deleteExperiment } = useProgress();

  // Statistical Parameters
  const [baselineCvr, setBaselineCvr] = useState<number>(2.5); // %
  const [mde, setMde] = useState<number>(10.0); // % relative
  const [confidence, setConfidence] = useState<number>(95); // %
  const [power, setPower] = useState<number>(80); // %
  const [dailySessions, setDailySessions] = useState<number>(4000);
  const [variantsCount, setVariantsCount] = useState<number>(2);

  // Hypothesis Builder State
  const [testTitle, setTestTitle] = useState('Sticky Mobile Add-to-Cart Bar');
  const [becauseText, setBecauseText] = useState('42% of mobile PDP visitors scroll into reviews and abandon before finding the CTA');
  const [weBelieveText, setWeBelieveText] = useState('introducing a sticky floating bottom Add-to-Cart bar with variant thumbnail');
  const [forAudienceText, setForAudienceText] = useState('all mobile visitors on iOS and Android');
  const [willImpactText, setWillImpactText] = useState('PDP-to-ATC rate by +10% relative without increasing return rates');
  const [targetMetric, setTargetMetric] = useState('PDP to Add-to-Cart Rate');

  // Significance Calculator modal/drawer state
  const [activeSignificanceTestId, setActiveSignificanceTestId] = useState<string | null>(null);
  const [visitorsA, setVisitorsA] = useState(25000);
  const [conversionsA, setConversionsA] = useState(500);
  const [visitorsB, setVisitorsB] = useState(25000);
  const [conversionsB, setConversionsB] = useState(560);

  // Computed statistical numbers
  const samplePerVariant = calculateSampleSizePerVariant(baselineCvr / 100, mde / 100, confidence, power);
  const totalSample = samplePerVariant * variantsCount;
  const rawDays = calculateTestDurationDays(samplePerVariant, dailySessions, variantsCount);
  const roundedWeekDays = Math.max(14, Math.ceil(rawDays / 7) * 7); // minimum 2 complete weeks

  const handleSaveExperiment = () => {
    if (!testTitle.trim()) return;
    const newExp: Experiment = {
      id: 'exp_' + Math.random().toString(36).substring(2, 9),
      title: testTitle,
      status: 'planned',
      hypothesis: {
        because: becauseText,
        weBelieve: weBelieveText,
        forAudience: forAudienceText,
        willImpact: willImpactText,
        targetMetric,
      },
      baselineCvr,
      mde,
      confidence,
      power,
      dailySessions,
      sampleSizePerVariant: samplePerVariant,
      totalSampleSize: totalSample,
      estimatedDays: roundedWeekDays,
      variantsCount,
      createdAt: new Date().toISOString(),
    };
    saveExperiment(newExp);
  };

  const sigResult = computeSignificance(visitorsA, conversionsA, visitorsB, conversionsB, 95);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Arcade Statistical Lab Header */}
      <div
        className="cyber-corner-box"
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background:
            'radial-gradient(circle at 88% 18%, rgba(34, 211, 238, 0.14), transparent 45%), radial-gradient(circle at 12% 85%, rgba(163, 230, 53, 0.12), transparent 50%), var(--bg-surface)',
          border: '2px solid var(--border-default)',
          boxShadow: '0 6px 0 var(--border-default), var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <span
            className="arcade-sticker"
            style={{ background: '#22d3ee', color: '#06070b', borderColor: '#06070b' }}
          >
            <Sparkles size={12} /> A/B POWER SYNTHESIZER
          </span>
          <span className="badge badge-indigo" style={{ fontFamily: 'var(--font-mono)' }}>
            EVAN MILLER STATISTICAL ENGINE
          </span>
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 3vw, 2.35rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: 8,
          }}
        >
          Statistical Test Planner & Hypothesis Backlog
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 680, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Pre-calculate statistical power, sample sizes, and required business cycle durations before launching experiments. Eliminate the Peeking Problem and build an empirical backlog.
        </p>
      </div>

      {/* Main Grid: Inputs on Left, Computed Stats on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {/* Left: Interactive Sliders & Inputs */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '2px solid var(--border-default)',
            borderRadius: '20px',
            boxShadow: '0 5px 0 var(--border-default)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <h3 style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Compass size={18} color="var(--accent-primary)" />
            <span>Statistical Test Inputs</span>
          </h3>

          {/* Baseline CVR */}
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <label className="input-label">Baseline Conversion Rate (CVR)</label>
              <strong style={{ color: 'var(--text-primary)' }}>{baselineCvr.toFixed(1)}%</strong>
            </div>
            <input
              type="range"
              min="0.5"
              max="15.0"
              step="0.1"
              value={baselineCvr}
              onChange={(e) => setBaselineCvr(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>

          {/* MDE % */}
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <label className="input-label">Minimum Detectable Effect (MDE)</label>
              <strong style={{ color: 'var(--text-primary)' }}>{mde.toFixed(1)}% relative lift</strong>
            </div>
            <input
              type="range"
              min="2.0"
              max="35.0"
              step="0.5"
              value={mde}
              onChange={(e) => setMde(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Target variation CVR: {(baselineCvr * (1 + mde / 100)).toFixed(2)}%
            </span>
          </div>

          {/* Confidence buttons */}
          <div className="input-group">
            <label className="input-label">Statistical Confidence Level (1 - α)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[80, 90, 95, 99].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setConfidence(lvl)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: confidence === lvl ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: confidence === lvl ? 'var(--accent-muted)' : 'var(--bg-app)',
                    color: confidence === lvl ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {lvl}% {lvl === 95 && '(Standard)'}
                </button>
              ))}
            </div>
          </div>

          {/* Statistical Power */}
          <div className="input-group">
            <label className="input-label">Statistical Power (1 - β)</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[70, 80, 90].map((pwr) => (
                <button
                  key={pwr}
                  type="button"
                  onClick={() => setPower(pwr)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: power === pwr ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    background: power === pwr ? 'var(--accent-muted)' : 'var(--bg-app)',
                    color: power === pwr ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  {pwr}% {pwr === 80 && '(Standard)'}
                </button>
              ))}
            </div>
          </div>

          {/* Daily Sessions */}
          <div className="input-group">
            <label className="input-label">Daily Relevant Store Sessions</label>
            <input
              type="number"
              className="input-text"
              value={dailySessions}
              onChange={(e) => setDailySessions(Math.max(10, parseInt(e.target.value) || 10))}
            />
          </div>
        </div>

        {/* Right: Live Calculated Statistical Engine Card */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: 4 }}>
              SAMPLE SIZE & RUNTIME CALCULATION
            </div>
            <h3 style={{ fontSize: 20, marginBottom: 16 }}>Experiment Requirements</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 20 }}>
              <div style={{ background: 'var(--bg-app)', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Sample Size / Variant</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
                  {samplePerVariant.toLocaleString()}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Unique visitors</div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Experiment Sample</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
                  {totalSample.toLocaleString()}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Across {variantsCount} variants</div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Estimated Duration</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
                  {roundedWeekDays} Days
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                  ({Math.round(roundedWeekDays / 7)} complete 7-day cycles)
                </div>
              </div>

              <div style={{ background: 'var(--bg-app)', padding: 14, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Statistical Feasibility</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: roundedWeekDays <= 35 ? 'var(--success)' : 'var(--warning)', marginTop: 6 }}>
                  {roundedWeekDays <= 35 ? '✓ Highly Feasible' : '⚠ Long Duration'}
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                  {roundedWeekDays <= 35 ? 'Safe from seasonal drift' : 'Consider testing higher MDE'}
                </div>
              </div>
            </div>

            {/* Scientific Caveat notice */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid var(--accent-glow)',
                fontSize: 12,
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
              }}
            >
              <strong>Peeking Protection Rule:</strong> This test MUST run for the full {roundedWeekDays} days even if p &lt; 0.05 appears on Day 3. Stopping early inflates false positives up to 30%.
            </div>
          </div>
        </div>
      </div>

      {/* Hypothesis Builder Section */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 18 }}>Scientific Hypothesis Builder</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
              Format your experiment into the standard 5-part engineering hypothesis.
            </p>
          </div>
          <button onClick={handleSaveExperiment} className="btn btn-primary">
            <Plus size={14} />
            <span>Add to Experiment Backlog</span>
          </button>
        </div>

        <div className="input-group">
          <label className="input-label">Experiment Title</label>
          <input
            type="text"
            className="input-text"
            value={testTitle}
            onChange={(e) => setTestTitle(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          <div className="input-group">
            <label className="input-label">BECAUSE (Observed data / customer friction)</label>
            <textarea
              className="input-textarea"
              rows={2}
              value={becauseText}
              onChange={(e) => setBecauseText(e.target.value)}
              style={{ minHeight: 65 }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">WE BELIEVE (Specific technical change)</label>
            <textarea
              className="input-textarea"
              rows={2}
              value={weBelieveText}
              onChange={(e) => setWeBelieveText(e.target.value)}
              style={{ minHeight: 65 }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">FOR (Target visitor audience / device)</label>
            <input
              type="text"
              className="input-text"
              value={forAudienceText}
              onChange={(e) => setForAudienceText(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">WILL RESULT IN (Expected outcome & guardrail)</label>
            <input
              type="text"
              className="input-text"
              value={willImpactText}
              onChange={(e) => setWillImpactText(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Experiment Backlog Manager */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ fontSize: 18 }}>Experiment Backlog ({experiments.length})</h3>

        {experiments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
            <p>No experiments added yet. Use the Hypothesis Builder above to plan your first test!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {experiments.map((exp) => (
              <div
                key={exp.id}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  flexWrap: 'wrap',
                  gap: 14,
                }}
              >
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span
                      className={`badge ${
                        exp.status === 'done'
                          ? 'badge-green'
                          : exp.status === 'running'
                          ? 'badge-amber'
                          : 'badge-gray'
                      }`}
                    >
                      {exp.status}
                    </span>
                    <h4 style={{ fontSize: 16 }}>{exp.title}</h4>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <strong>Hypothesis:</strong> Because {exp.hypothesis.because}, we believe {exp.hypothesis.weBelieve} for {exp.hypothesis.forAudience} will {exp.hypothesis.willImpact}.
                  </p>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                    Sample: {exp.sampleSizePerVariant.toLocaleString()} / variant · Duration: {exp.estimatedDays} days · MDE: {exp.mde}%
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => deleteExperiment(exp.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ color: 'var(--danger)' }}
                    aria-label="Delete experiment"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Two-Tailed Significance Calculator Tool Section */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Sparkles size={18} color="var(--accent-primary)" />
          <h3 style={{ fontSize: 18 }}>Post-Test Two-Tailed Significance Engine</h3>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
          Enter observed visitors and completed orders for Control (A) and Variation (B) to determine statistical validity and p-value.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 20 }}>
          <div className="input-group">
            <label className="input-label">Control Visitors (A)</label>
            <input
              type="number"
              className="input-text"
              value={visitorsA}
              onChange={(e) => setVisitorsA(Number(e.target.value) || 1)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Control Conversions (A)</label>
            <input
              type="number"
              className="input-text"
              value={conversionsA}
              onChange={(e) => setConversionsA(Number(e.target.value) || 0)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Variation Visitors (B)</label>
            <input
              type="number"
              className="input-text"
              value={visitorsB}
              onChange={(e) => setVisitorsB(Number(e.target.value) || 1)}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Variation Conversions (B)</label>
            <input
              type="number"
              className="input-text"
              value={conversionsB}
              onChange={(e) => setConversionsB(Number(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Results of Significance test */}
        <div
          style={{
            padding: 20,
            background: sigResult.isSignificant ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-app)',
            border: sigResult.isSignificant ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 14,
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Control CVR</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
              {sigResult.observedCvrA.toFixed(2)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Variant CVR</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
              {sigResult.observedCvrB.toFixed(2)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Observed Lift</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: sigResult.relativeLift > 0 ? 'var(--success)' : 'var(--danger)' }}>
              {sigResult.relativeLift > 0 ? '+' : ''}{sigResult.relativeLift.toFixed(2)}%
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>P-Value / Confidence</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: sigResult.isSignificant ? 'var(--success)' : 'var(--text-muted)' }}>
              p = {sigResult.pValue.toFixed(4)} ({sigResult.confidence.toFixed(1)}%)
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Outcome Verdict</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: sigResult.isSignificant ? 'var(--success)' : 'var(--warning)', marginTop: 4 }}>
              {sigResult.isSignificant ? '✓ Statistically Significant' : 'Inconclusive / Neutral'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
