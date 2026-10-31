import React, { useState, useMemo } from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ChevronRight,
  BookMarked,
  Info,
  Layers,
  ShoppingBag,
  Smartphone,
  Eye,
} from 'lucide-react';
import { CRO_LAB_SCENARIOS } from '../data/croLabScenarios';
import { CroLabScenario, StorefrontSurface } from '../types/microlearning';
import { addKnowledgeEntry } from '../services/knowledgeBaseService';
import { useProgress } from '../context/ProgressContext';
import './CroLabPage.css';

export const CroLabPage: React.FC = () => {
  const { triggerConfetti } = useProgress();

  const [activeSurface, setActiveSurface] = useState<StorefrontSurface | 'all'>('all');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CRO_LAB_SCENARIOS[0].id);

  // Form state for current scenario
  const [analysis, setAnalysis] = useState<Record<string, {
    evidence: string;
    interpretation: string;
    hypothesis: string;
    change: string;
    measurement: string;
  }>>({});

  const [showWorkedExample, setShowWorkedExample] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filteredScenarios = useMemo(() => {
    if (activeSurface === 'all') return CRO_LAB_SCENARIOS;
    return CRO_LAB_SCENARIOS.filter((s) => s.surface === activeSurface);
  }, [activeSurface]);

  const activeScenario: CroLabScenario = useMemo(() => {
    const found = CRO_LAB_SCENARIOS.find((s) => s.id === selectedScenarioId);
    return found || filteredScenarios[0] || CRO_LAB_SCENARIOS[0];
  }, [selectedScenarioId, filteredScenarios]);

  const currentAnalysis = analysis[activeScenario.id] || {
    evidence: '',
    interpretation: '',
    hypothesis: '',
    change: '',
    measurement: '',
  };

  const handleUpdateField = (field: keyof typeof currentAnalysis, val: string) => {
    setAnalysis((prev) => ({
      ...prev,
      [activeScenario.id]: {
        ...(prev[activeScenario.id] || {
          evidence: '',
          interpretation: '',
          hypothesis: '',
          change: '',
          measurement: '',
        }),
        [field]: val,
      },
    }));
  };

  const handleSaveToKnowledgeBase = () => {
    addKnowledgeEntry({
      title: `Storefront Audit: ${activeScenario.storeContext.name} (${activeScenario.surfaceLabel})`,
      category: 'store_observation',
      content: `Observed Evidence:\n${currentAnalysis.evidence || activeScenario.observedEvidence.join('\n')}\n\nInterpretation:\n${currentAnalysis.interpretation}\n\nHypothesis:\n${currentAnalysis.hypothesis}\n\nRecommended Change:\n${currentAnalysis.change}\n\nValidation Method:\n${currentAnalysis.measurement}`,
      userSelfExplanation: currentAnalysis.interpretation,
      storeName: activeScenario.storeContext.name,
      tags: ['CRO Lab', activeScenario.surfaceLabel, 'Storefront Audit'],
    });

    setSavedSuccess(true);
    triggerConfetti();
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const surfaces: { id: StorefrontSurface | 'all'; label: string }[] = [
    { id: 'all', label: 'All Surfaces' },
    { id: 'pdp', label: 'Product Detail Page (PDP)' },
    { id: 'cart', label: 'Cart Drawer' },
    { id: 'collection', label: 'Collection & Discovery' },
    { id: 'trust', label: 'Trust & Objections' },
  ];

  return (
    <div className="lab-container animate-fade-in">
      {/* Banner */}
      <div className="lab-header-banner">
        <div className="lab-kicker">
          <Wrench size={14} /> Practical CRO Lab & Storefront Clinic
        </div>
        <h1 className="lab-title">Practice Real Storefront Auditing</h1>
        <p className="lab-subtitle">
          Develop true clinical judgment. For every challenge, separate observable evidence from
          interpretation, formulate testable hypotheses, and define rigorous validation metrics.
        </p>
      </div>

      {/* Surface Filters */}
      <div className="lab-surfaces-bar">
        {surfaces.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`lab-surface-pill ${activeSurface === s.id ? 'active' : ''}`}
            onClick={() => setActiveSurface(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Workspace Grid */}
      <div className="lab-workspace-grid">
        {/* Left: Scenario Selector */}
        <div className="lab-scenario-list">
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Storefront Scenarios ({filteredScenarios.length}):
          </div>
          {filteredScenarios.map((sc) => (
            <div
              key={sc.id}
              className={`lab-scenario-card ${sc.id === activeScenario.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedScenarioId(sc.id);
                setShowWorkedExample(false);
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-indigo" style={{ fontSize: 10 }}>{sc.surfaceLabel}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{sc.difficulty}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                {sc.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {sc.storeContext.name} — {sc.storeContext.niche}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Active Workspace */}
        <div className="lab-workspace">
          {/* Store Context Card */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="badge badge-primary">{activeScenario.surfaceLabel}</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Realistic Ecommerce Telemetry</span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              {activeScenario.title}
            </h2>
          </div>

          <div className="lab-store-badge-card">
            <div className="lab-kpi-item">
              <span className="lab-kpi-label">Store & Niche</span>
              <span className="lab-kpi-val">{activeScenario.storeContext.name}</span>
            </div>
            <div className="lab-kpi-item">
              <span className="lab-kpi-label">Monthly Traffic</span>
              <span className="lab-kpi-val">{activeScenario.storeContext.monthlyTraffic}</span>
            </div>
            <div className="lab-kpi-item">
              <span className="lab-kpi-label">Baseline CVR</span>
              <span className="lab-kpi-val">{activeScenario.storeContext.baselineCvr}</span>
            </div>
            <div className="lab-kpi-item">
              <span className="lab-kpi-label">Average Order Value</span>
              <span className="lab-kpi-val">{activeScenario.storeContext.aov}</span>
            </div>
          </div>

          {/* Observable Evidence Box */}
          <div
            style={{
              padding: '20px 24px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
              <Eye size={16} /> Directly Observed Evidence (Facts & Telemetry)
            </div>
            <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }}>
              {activeScenario.observedEvidence.map((ev, idx) => (
                <li key={idx}>{ev}</li>
              ))}
            </ul>
          </div>

          {/* 5-Step Evaluation Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="lab-step-block">
              <span className="lab-step-heading">
                Step 1: Document Observable Evidence
              </span>
              <p className="lab-step-prompt">{activeScenario.guidingPrompts.evidencePrompt}</p>
              <textarea
                className="lab-textarea"
                placeholder="State the neutral, observable facts (screen height, click rate, heatmaps)..."
                value={currentAnalysis.evidence}
                onChange={(e) => handleUpdateField('evidence', e.target.value)}
              />
            </div>

            <div className="lab-step-block">
              <span className="lab-step-heading">
                Step 2: Behavioral Interpretation (Why it Matters)
              </span>
              <p className="lab-step-prompt">{activeScenario.guidingPrompts.interpretationPrompt}</p>
              <textarea
                className="lab-textarea"
                placeholder="Explain the psychological mechanism: What is the customer thinking, feeling, or struggling with?..."
                value={currentAnalysis.interpretation}
                onChange={(e) => handleUpdateField('interpretation', e.target.value)}
              />
            </div>

            <div className="lab-step-block">
              <span className="lab-step-heading">
                Step 3: Testable Hypothesis Formulation
              </span>
              <p className="lab-step-prompt">{activeScenario.guidingPrompts.hypothesisPrompt}</p>
              <textarea
                className="lab-textarea"
                placeholder='Structure: "If we [change], then [impact], because [rationale]..."'
                value={currentAnalysis.hypothesis}
                onChange={(e) => handleUpdateField('hypothesis', e.target.value)}
              />
            </div>

            <div className="lab-step-block">
              <span className="lab-step-heading">
                Step 4: Recommended Storefront Change
              </span>
              <p className="lab-step-prompt">{activeScenario.guidingPrompts.changePrompt}</p>
              <textarea
                className="lab-textarea"
                placeholder="Describe the concrete UI, layout, or copy change you recommend for the Shopify theme..."
                value={currentAnalysis.change}
                onChange={(e) => handleUpdateField('change', e.target.value)}
              />
            </div>

            <div className="lab-step-block">
              <span className="lab-step-heading">
                Step 5: Validation Metric & Test Plan
              </span>
              <p className="lab-step-prompt">{activeScenario.guidingPrompts.measurementPrompt}</p>
              <textarea
                className="lab-textarea"
                placeholder="Identify primary conversion metric, guardrail metric, and test duration..."
                value={currentAnalysis.measurement}
                onChange={(e) => handleUpdateField('measurement', e.target.value)}
              />
            </div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveToKnowledgeBase}
            >
              <BookMarked size={16} /> Save Analysis to Personal Knowledge Base
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowWorkedExample(!showWorkedExample)}
            >
              <Lightbulb size={16} /> {showWorkedExample ? 'Hide Coach Worked Example' : 'Compare with Senior Coach Example'}
            </button>

            {savedSuccess && (
              <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 600 }}>
                ✓ Saved to Knowledge Base!
              </span>
            )}
          </div>

          {/* Coach Worked Example */}
          {showWorkedExample && (
            <div className="lab-worked-box animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: 'var(--success)' }}>
                <CheckCircle2 size={18} /> Senior CRO Coach Worked Analysis
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                <div><strong>1. Evidence:</strong> {activeScenario.workedExample.observedEvidence}</div>
                <div><strong>2. Interpretation:</strong> {activeScenario.workedExample.behavioralInterpretation}</div>
                <div><strong>3. Hypothesis:</strong> {activeScenario.workedExample.testableHypothesis}</div>
                <div><strong>4. Recommended Change:</strong> {activeScenario.workedExample.recommendedChange}</div>
                <div><strong>5. Validation:</strong> {activeScenario.workedExample.validationMethod}</div>
                <div style={{ padding: '10px 14px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Coach's Methodological Rationale:</strong> {activeScenario.workedExample.coachReasoning}
                </div>
              </div>
            </div>
          )}

          {/* Scientific Caution Box */}
          <div className="lab-caution-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--warning)', marginBottom: 4 }}>
              <AlertTriangle size={15} /> Methodological Caution
            </div>
            <div>{activeScenario.caveats}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
