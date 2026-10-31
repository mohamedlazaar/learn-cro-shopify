import React, { useState } from 'react';
import {
  LineChart,
  HelpCircle,
  Sparkles,
  Info,
  Shield,
  Zap,
  ArrowRight,
} from 'lucide-react';
import {
  standardNormalPdf,
  calculateSampleSizePerVariant,
} from '../services/stats';

export const StatsExplainerPage: React.FC = () => {
  const [confidence, setConfidence] = useState<number>(95);
  const [power, setPower] = useState<number>(80);
  const [mde, setMde] = useState<number>(10);
  const [baselineCvr, setBaselineCvr] = useState<number>(2.5);

  const sampleSize = calculateSampleSizePerVariant(baselineCvr / 100, mde / 100, confidence, power);

  // Generate SVG bell curve path points
  const pointsH0: string[] = [];
  const pointsH1: string[] = [];
  const svgWidth = 600;
  const svgHeight = 220;

  const mean0 = 200;
  const mean1 = 360;
  const std = 55;

  for (let x = 40; x <= 560; x += 4) {
    const y0 = svgHeight - 20 - standardNormalPdf((x - mean0) / std) * 240;
    const y1 = svgHeight - 20 - standardNormalPdf((x - mean1) / std) * 240;
    pointsH0.push(`${x},${y0.toFixed(1)}`);
    pointsH1.push(`${x},${y1.toFixed(1)}`);
  }

  const dPath0 = `M ${pointsH0.join(' L ')}`;
  const dPath1 = `M ${pointsH1.join(' L ')}`;

  const criticalZ = mean0 + 1.96 * std; // Z=1.96 threshold

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span className="badge badge-indigo">Statistical Mastery</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Interactive Visual Guide</span>
        </div>
        <h1 style={{ fontSize: 28, letterSpacing: '-0.02em' }}>Statistical Significance & Power Visualizer</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 680, marginTop: 4, fontSize: 14 }}>
          Understand the mathematical engine under every A/B test. Explore how p-values, Type I/II errors, and statistical power interact to prevent false winners.
        </p>
      </div>

      {/* Interactive Bell Curve Graph */}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 18 }}>Null vs Alternative Hypothesis Distribution</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              Critical threshold line separates random noise from statistically significant lift.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, background: '#64748b', borderRadius: 2 }} />
              <span>H₀: Null (No Lift)</span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, background: 'var(--accent-primary)', borderRadius: 2 }} />
              <span>H₁: Variation (True Effect)</span>
            </span>
          </div>
        </div>

        {/* SVG Normal Distribution Canvas */}
        <div style={{ width: '100%', overflowX: 'auto', background: '#090a0f', borderRadius: 'var(--radius-md)', padding: '16px 0' }}>
          <svg viewBox="0 0 600 240" style={{ width: '100%', maxHeight: 260, display: 'block' }}>
            {/* Critical threshold line */}
            <line
              x1={criticalZ}
              y1={20}
              x2={criticalZ}
              y2={210}
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text x={criticalZ - 6} y={35} fill="#f59e0b" fontSize="11" textAnchor="end" fontWeight="600">
              Critical Cutoff (Z = 1.96)
            </text>

            {/* Null Curve H0 */}
            <path d={dPath0} fill="none" stroke="#64748b" strokeWidth="2.5" />

            {/* Alternative Curve H1 */}
            <path d={dPath1} fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" />

            {/* Alpha Area Note */}
            <text x={criticalZ + 8} y={190} fill="#ef4444" fontSize="11" fontWeight="700">
              Alpha (α = 0.05)
            </text>

            {/* Baseline axis */}
            <line x1={30} y1={210} x2={570} y2={210} stroke="#334155" strokeWidth="1.5" />
            <text x={mean0} y={225} fill="#94a3b8" fontSize="11" textAnchor="middle">
              Mean 0 (Control)
            </text>
            <text x={mean1} y={225} fill="var(--accent-primary)" fontSize="11" textAnchor="middle" fontWeight="600">
              Mean 1 (Variation Lift)
            </text>
          </svg>
        </div>

        {/* Interactive Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 8 }}>
          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <label className="input-label">Statistical Confidence Level</label>
              <strong>{confidence}%</strong>
            </div>
            <input
              type="range"
              min="80"
              max="99"
              value={confidence}
              onChange={(e) => setConfidence(parseInt(e.target.value))}
              style={{ accentColor: 'var(--accent-primary)' }}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Type I Error Rate (Alpha): {(100 - confidence)}%
            </span>
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <label className="input-label">Statistical Power</label>
              <strong>{power}%</strong>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              value={power}
              onChange={(e) => setPower(parseInt(e.target.value))}
              style={{ accentColor: 'var(--accent-primary)' }}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Type II Error Rate (Beta): {(100 - power)}%
            </span>
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <label className="input-label">Minimum Detectable Effect (MDE)</label>
              <strong>{mde}% relative</strong>
            </div>
            <input
              type="range"
              min="3"
              max="25"
              value={mde}
              onChange={(e) => setMde(parseInt(e.target.value))}
              style={{ accentColor: 'var(--accent-primary)' }}
            />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Required sample: {sampleSize.toLocaleString()} / variant
            </span>
          </div>
        </div>
      </div>

      {/* Plain-English Concept Explanations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
        <div className="card">
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary)', marginBottom: 6 }}>
            1. P-VALUE & STATISTICAL SIGNIFICANCE
          </div>
          <h4 style={{ fontSize: 16, marginBottom: 8 }}>What p &lt; 0.05 Really Means</h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            A p-value measures the probability that you would observe this result purely by chance if the variation had zero true effect. A 95% confidence level means you accept at most a 5% risk of declaring a winner when none exists (False Positive / Type I error).
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#10b981', marginBottom: 6 }}>
            2. STATISTICAL POWER (1 - β)
          </div>
          <h4 style={{ fontSize: 16, marginBottom: 8 }}>Why 80% Power Is Required</h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Power is the probability that your test will detect a true lift if one exists. Underpowered tests (e.g. 50% power) are like flipping a coin — they frequently discard genuine winning variations as "inconclusive" (False Negative / Type II error).
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginBottom: 6 }}>
            3. MINIMUM DETECTABLE EFFECT (MDE)
          </div>
          <h4 style={{ fontSize: 16, marginBottom: 8 }}>The Inverse Square Law</h4>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Detecting a subtle 2% lift requires roughly 25 times more visitors than detecting a 10% lift. If traffic is limited, you must test bolder, high-contrast variations with higher MDEs to reach statistical significance.
          </p>
        </div>
      </div>
    </div>
  );
};
