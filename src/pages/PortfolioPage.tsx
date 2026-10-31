import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Copy,
  Printer,
  Sparkles,
  Save,
  Check,
  Building,
  TrendingUp,
  Code,
  PieChart,
  Eye,
  Edit3,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { CaseStudy } from '../types/tools';
import { CodeBlock } from '../components/ui/CodeBlock';

const DEFAULT_SAMPLE_STUDY: CaseStudy = {
  storeName: 'Nordic Apparel Co.',
  industry: 'Apparel & Fashion',
  baselineMetrics: {
    monthlySessions: 185000,
    baselineCvr: 2.1,
    aov: 78.5,
  },
  problem:
    'Mobile traffic accounted for 74% of all store visitors but converted at only 1.45% compared to 3.8% on desktop. Analysis of Hotjar session recordings and GA4 funnel drop-off revealed that 62% of mobile PDP visitors never scrolled past the image carousel to reach the primary Add to Cart button.',
  research:
    '1. Funnel Drop-off: PDP-to-Cart conversion on mobile was lagging desktop by -61.8%.\n2. User Friction: Long product descriptions and variant selectors pushed the primary CTA 1,400px below the viewport.\n3. Heatmap Data: 78% of scroll depth stopped within the first 600px of vertical space.\n4. Micro-surveys: Users reported inability to quickly select a size and check shipping estimates while reading customer reviews.',
  hypothesis:
    'Because mobile shoppers lose sight of the Add to Cart CTA while reviewing specifications, we believe implementing a high-performance, sticky bottom Add to Cart bar with instant variant selector for mobile PDP visitors will increase mobile Add to Cart rates and final purchases by reducing navigation friction.',
  implementation:
    'Engineered an IntersectionObserver-driven sticky action bar inside sections/main-product.liquid that activates with zero layout shift as soon as the primary buy-buttons scroll out of view. Included responsive size pills, live stock availability indicators, and direct AJAX cart submission via the Shopify Section Rendering API.',
  codeSnippet: `<!-- Snippet: snippets/sticky-atc-mobile.liquid -->
<div class="sticky-atc-bar" id="stickyAtcBar" aria-hidden="true">
  <div class="sticky-atc-content">
    <div class="sticky-atc-info">
      <span class="sticky-atc-title">{{ product.title | truncate: 25 }}</span>
      <span class="sticky-atc-price">{{ product.selected_or_first_available_variant.price | money }}</span>
    </div>
    <button 
      type="button" 
      class="button button--primary sticky-atc-submit"
      onclick="handleStickyAddToCart(this)"
      {% unless product.available %}disabled{% endunless %}
    >
      {% if product.available %}Add to Cart{% else %}Sold Out{% endif %}
    </button>
  </div>
</div>

<script>
  (function() {
    const mainBtn = document.querySelector('.product-form__submit');
    const stickyBar = document.getElementById('stickyAtcBar');
    if (!mainBtn || !stickyBar) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Show sticky bar only when main ATC has scrolled above viewport
      const shouldShow = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      stickyBar.classList.toggle('is-visible', shouldShow);
      stickyBar.setAttribute('aria-hidden', !shouldShow);
    }, { threshold: 0 });

    observer.observe(mainBtn);
  })();
</script>`,
  results: {
    variantCvr: 2.38,
    liftPercentage: 13.33,
    pValue: 0.012,
    annualRevenueImpact: 442981,
  },
  learnings:
    '1. Mobile thumb-zone accessibility is the single highest leverage PDP improvement for Shopify merchants with heavy mobile traffic.\n2. Native IntersectionObserver provides 60fps silky smooth transitions without polluting window.onscroll or causing layout thrashing.\n3. Variant selection in the sticky drawer eliminated 4.2 seconds from the average customer path to checkout.\n4. Follow-up test: Experimenting with dynamic free-shipping threshold gamification inside the sticky bar.',
  lastUpdated: new Date().toISOString(),
};

export const PortfolioPage: React.FC = () => {
  const { caseStudy, saveCaseStudy, capstoneDeliverables, experiments } = useProgress();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<CaseStudy>(() => {
    return caseStudy || DEFAULT_SAMPLE_STUDY;
  });

  useEffect(() => {
    if (caseStudy) {
      setFormData(caseStudy);
    }
  }, [caseStudy]);

  // Recalculate annual revenue impact whenever inputs change
  const calculatedImpact = useMemo(() => {
    const sessions = formData.baselineMetrics.monthlySessions || 0;
    const baseCvr = (formData.baselineMetrics.baselineCvr || 0) / 100;
    const varCvr = (formData.results.variantCvr || 0) / 100;
    const aov = formData.baselineMetrics.aov || 0;

    const lift = baseCvr > 0 ? ((varCvr - baseCvr) / baseCvr) * 100 : 0;
    const additionalAnnualOrders = sessions * 12 * Math.max(0, varCvr - baseCvr);
    const annualImpact = additionalAnnualOrders * aov;

    return {
      lift: parseFloat(lift.toFixed(2)),
      annualImpact: Math.round(annualImpact),
    };
  }, [formData.baselineMetrics, formData.results.variantCvr]);

  const handleSave = () => {
    const updated: CaseStudy = {
      ...formData,
      results: {
        ...formData.results,
        liftPercentage: calculatedImpact.lift,
        annualRevenueImpact: calculatedImpact.annualImpact,
      },
      lastUpdated: new Date().toISOString(),
    };
    saveCaseStudy(updated);
  };

  const handleAutoFillFromDeliverables = () => {
    const abTest = experiments[0];
    const capstone9 = capstoneDeliverables.find((d) => d.id === 9);
    const capstone10 = capstoneDeliverables.find((d) => d.id === 10);

    if (abTest) {
      setFormData((prev) => ({
        ...prev,
        hypothesis: `Because ${abTest.hypothesis.because}, we believe ${abTest.hypothesis.weBelieve} for ${abTest.hypothesis.forAudience} will ${abTest.hypothesis.willImpact} measured by ${abTest.hypothesis.targetMetric}.`,
        baselineMetrics: {
          ...prev.baselineMetrics,
          baselineCvr: abTest.baselineCvr || 2.2,
        },
      }));
    } else if (capstone9?.notes) {
      setFormData((prev) => ({
        ...prev,
        learnings: `${prev.learnings}\n\nDeliverable Note: ${capstone9.notes}`,
      }));
    }
    if (capstone10?.notes) {
      setFormData((prev) => ({
        ...prev,
        implementation: capstone10.notes || prev.implementation,
      }));
    }
    handleSave();
  };

  const generateMarkdown = () => {
    return `# CRO Case Study: ${formData.storeName} (${formData.industry})
**Date**: ${new Date(formData.lastUpdated).toLocaleDateString()}
**Annual Revenue Contribution**: $${calculatedImpact.annualImpact.toLocaleString()} (+$${(
      calculatedImpact.annualImpact / 12
    ).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo)

---

## 1. Executive Summary & Baseline Metrics
- **Store**: ${formData.storeName}
- **Industry**: ${formData.industry}
- **Monthly Qualified Traffic**: ${formData.baselineMetrics.monthlySessions.toLocaleString()} sessions
- **Baseline Conversion Rate**: ${formData.baselineMetrics.baselineCvr}%
- **Average Order Value (AOV)**: $${formData.baselineMetrics.aov.toFixed(2)}
- **Variant Conversion Rate**: ${formData.results.variantCvr}%
- **Relative Lift**: +${calculatedImpact.lift}%
- **Statistical Significance**: p = ${formData.results.pValue} (Confidence: ${(
      (1 - formData.results.pValue) *
      100
    ).toFixed(1)}%)

---

## 2. The Problem
${formData.problem}

---

## 3. Qualitative & Quantitative Research
${formData.research}

---

## 4. Hypothesis & Experiment Design
${formData.hypothesis}

---

## 5. Technical Implementation & Architecture
${formData.implementation}

${
  formData.codeSnippet
    ? '```liquid\n' + formData.codeSnippet + '\n```'
    : ''
}

---

## 6. Business Results & Financial Model
- **Pre-Test CVR**: ${formData.baselineMetrics.baselineCvr}%
- **Post-Test CVR**: ${formData.results.variantCvr}%
- **Relative Lift**: +${calculatedImpact.lift}%
- **p-Value**: ${formData.results.pValue} (< 0.05 Statistically Significant)
- **Net Additional Annual Revenue**: **$${calculatedImpact.annualImpact.toLocaleString()}**

---

## 7. Key Learnings & Strategic Takeaways
${formData.learnings}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: '1080px', margin: '0 auto' }}>
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="badge badge-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={14} /> Portfolio Builder
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Executive Case Study Generator
            </span>
          </div>
          <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            CRO Portfolio Case Study
          </h1>
          <p style={{ margin: '8px 0 0', color: 'var(--color-text-secondary)', maxWidth: '680px', fontSize: '1rem', lineHeight: 1.5 }}>
            Transform your experimentation results into a high-stakes portfolio case study that proves your capability to drive measurable millions in ecommerce revenue.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className="button button-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
          >
            {activeTab === 'editor' ? <Eye size={16} /> : <Edit3 size={16} />}
            {activeTab === 'editor' ? 'Switch to Preview' : 'Edit Case Study'}
          </button>
          <button
            onClick={handleCopyMarkdown}
            className="button button-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
          >
            {copied ? <Check size={16} color="var(--color-success)" /> : <Copy size={16} />}
            {copied ? 'Copied Markdown' : 'Copy Markdown'}
          </button>
          <button
            onClick={handlePrint}
            className="button button-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}
          >
            <Printer size={16} /> Print / PDF
          </button>
        </div>
      </div>

      {/* Editor View */}
      {activeTab === 'editor' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Quick Auto-fill Bar */}
          <div
            className="card"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              background: 'var(--color-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={18} color="var(--color-primary)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                Sync with Capstone & A/B Planner data?
              </span>
            </div>
            <button
              onClick={handleAutoFillFromDeliverables}
              className="button button-sm button-outline"
              style={{ fontSize: '0.85rem' }}
            >
              Auto-fill from Recent Deliverables
            </button>
          </div>

          {/* Section 1: Store & Baseline */}
          <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={18} color="var(--color-primary)" /> 1. Merchant Profile & Baseline Metrics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Merchant / Client Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Industry / Vertical</label>
                <input
                  type="text"
                  className="input"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Monthly Traffic (Sessions)</label>
                <input
                  type="number"
                  className="input"
                  value={formData.baselineMetrics.monthlySessions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      baselineMetrics: { ...formData.baselineMetrics, monthlySessions: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Baseline CVR (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={formData.baselineMetrics.baselineCvr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      baselineMetrics: { ...formData.baselineMetrics, baselineCvr: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Average Order Value ($)</label>
                <input
                  type="number"
                  step="0.5"
                  className="input"
                  value={formData.baselineMetrics.aov}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      baselineMetrics: { ...formData.baselineMetrics, aov: Number(e.target.value) },
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Section 2 & 3: Problem & Research */}
          <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={18} color="var(--color-primary)" /> 2 & 3. The Problem & Discovery Research
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Executive Problem Statement</label>
                <textarea
                  rows={3}
                  className="input"
                  style={{ width: '100%', resize: 'vertical' }}
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Qualitative & Quantitative Research Evidence</label>
                <textarea
                  rows={4}
                  className="input"
                  style={{ width: '100%', resize: 'vertical' }}
                  value={formData.research}
                  onChange={(e) => setFormData({ ...formData, research: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 4 & 5: Hypothesis & Code */}
          <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code size={18} color="var(--color-primary)" /> 4 & 5. Hypothesis & Technical Architecture
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Scientific Hypothesis (Because / We believe / For / Will / Measured)</label>
                <textarea
                  rows={3}
                  className="input"
                  style={{ width: '100%', resize: 'vertical' }}
                  value={formData.hypothesis}
                  onChange={(e) => setFormData({ ...formData, hypothesis: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Technical Architecture & Implementation Details</label>
                <textarea
                  rows={3}
                  className="input"
                  style={{ width: '100%', resize: 'vertical' }}
                  value={formData.implementation}
                  onChange={(e) => setFormData({ ...formData, implementation: e.target.value })}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Liquid / JavaScript Code Snippet (Optional)</label>
                <textarea
                  rows={6}
                  className="input"
                  style={{ width: '100%', resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                  value={formData.codeSnippet || ''}
                  onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 6 & 7: Results & Learnings */}
          <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="var(--color-primary)" /> 6 & 7. Statistical Results & Business Impact
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Observed Variant CVR (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={formData.results.variantCvr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      results: { ...formData.results, variantCvr: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Calculated Relative Lift (%)</label>
                <input
                  type="number"
                  className="input"
                  disabled
                  value={calculatedImpact.lift}
                  style={{ opacity: 0.8, background: 'var(--color-surface-hover)' }}
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>p-Value</label>
                <input
                  type="number"
                  step="0.001"
                  className="input"
                  value={formData.results.pValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      results: { ...formData.results, pValue: Number(e.target.value) },
                    })
                  }
                />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Annual Revenue Lift ($)</label>
                <input
                  type="text"
                  disabled
                  className="input"
                  value={`$${calculatedImpact.annualImpact.toLocaleString()}`}
                  style={{ opacity: 0.8, background: 'var(--color-surface-hover)', fontWeight: 700, color: 'var(--color-success)' }}
                />
              </div>
            </div>

            <div>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Strategic Learnings & Rollout Next Steps</label>
              <textarea
                rows={4}
                className="input"
                style={{ width: '100%', resize: 'vertical' }}
                value={formData.learnings}
                onChange={(e) => setFormData({ ...formData, learnings: e.target.value })}
              />
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={handleSave}
              className="button button-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
            >
              <Save size={16} /> Save Case Study
            </button>
          </div>
        </div>
      )}

      {/* Live Preview & Printable View */}
      {activeTab === 'preview' && (
        <div
          className="card print-container"
          style={{
            padding: '40px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
          }}
        >
          {/* Executive Header */}
          <div style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '24px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="badge badge-success" style={{ marginBottom: '12px', display: 'inline-block' }}>
                  Statistically Significant (p = {formData.results.pValue})
                </span>
                <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em', color: 'var(--color-text)' }}>
                  {formData.storeName}: Conversion Rate Optimization Case Study
                </h1>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Vertical: <strong>{formData.industry}</strong> • Documented by CRO Lead Engineer • Last Updated: {new Date(formData.lastUpdated).toLocaleDateString()}
                </p>
              </div>
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '16px 24px',
                  borderRadius: '10px',
                  textAlign: 'right',
                }}
              >
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
                  Annualized Revenue Contribution
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
                  +${calculatedImpact.annualImpact.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  +${(calculatedImpact.annualImpact / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })} / month net run-rate
                </div>
              </div>
            </div>

            {/* Scorecard grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
                marginTop: '24px',
                padding: '16px',
                background: 'var(--color-surface-hover)',
                borderRadius: '8px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Monthly Sessions</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px' }}>{formData.baselineMetrics.monthlySessions.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Baseline CVR</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px' }}>{formData.baselineMetrics.baselineCvr}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Variant CVR</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px', color: 'var(--color-success)' }}>{formData.results.variantCvr}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Relative Lift</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px', color: 'var(--color-success)' }}>+{calculatedImpact.lift}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Average Order Value</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '2px' }}>${formData.baselineMetrics.aov.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Case Study Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Section 1: The Problem */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)' }}>
                1. Executive Problem Statement
              </h2>
              <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
                {formData.problem}
              </p>
            </div>

            {/* Section 2: Research Evidence */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)' }}>
                2. Qualitative & Quantitative Research
              </h2>
              <div
                style={{
                  background: 'var(--color-surface-hover)',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text)',
                  whiteSpace: 'pre-line',
                }}
              >
                {formData.research}
              </div>
            </div>

            {/* Section 3: Hypothesis */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)' }}>
                3. Scientific Hypothesis
              </h2>
              <blockquote
                style={{
                  margin: 0,
                  padding: '16px 20px',
                  borderLeft: '4px solid var(--color-primary)',
                  background: 'rgba(99, 102, 241, 0.05)',
                  borderRadius: '0 8px 8px 0',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-text)',
                  fontStyle: 'italic',
                }}
              >
                "{formData.hypothesis}"
              </blockquote>
            </div>

            {/* Section 4: Technical Implementation */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)' }}>
                4. Engineering Implementation & Architecture
              </h2>
              <p style={{ margin: '0 0 16px', fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
                {formData.implementation}
              </p>
              {formData.codeSnippet && (
                <div style={{ marginTop: '12px' }}>
                  <CodeBlock code={formData.codeSnippet} language="liquid" />
                </div>
              )}
            </div>

            {/* Section 5: Strategic Learnings */}
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-text)' }}>
                5. Key Learnings & Strategic Roadmapping
              </h2>
              <div
                style={{
                  background: 'var(--color-surface-hover)',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  color: 'var(--color-text)',
                  whiteSpace: 'pre-line',
                }}
              >
                {formData.learnings}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
