import React, { useState, useEffect } from 'react';
import {
  Store,
  Sparkles,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Send,
  RotateCcw,
  Bot,
  Award,
  ChevronRight,
  ShieldAlert,
  BarChart3,
  HelpCircle,
  Shuffle,
  Clock,
  Layers,
} from 'lucide-react';
import { callPiApiChat, hasPiApiKey, DEFAULT_AI_MODEL } from '../services/aiService';
import { useProgress } from '../context/ProgressContext';

interface StoreScenario {
  id: string;
  name: string;
  niche: string;
  logoColor: string;
  monthlySessions: number;
  baselineCvr: number;
  aov: number;
  monthlyRevenue: number;
  cartAbandonmentRate: number;
  mobileTrafficPercent: number;
  lcpMobile: number;
  primaryBottleneck: string;
  overview: string;
  funnelData: {
    sessions: number;
    pdpViews: number;
    addedToCart: number;
    reachedCheckout: number;
    purchased: number;
  };
  clientBrief: string;
}

const PRESET_STORES: StoreScenario[] = [
  {
    id: 'store-1',
    name: 'LuxeAura Paris',
    niche: 'Luxury Clean Fragrance & Cosmetics',
    logoColor: '#ec4899',
    monthlySessions: 85000,
    baselineCvr: 1.35,
    aov: 115,
    monthlyRevenue: 131962,
    cartAbandonmentRate: 72.4,
    mobileTrafficPercent: 82,
    lcpMobile: 4.2,
    primaryBottleneck: 'Severe mobile PDP drop-off & lack of scent social proof above fold',
    overview: 'High-end cruelty-free perfume brand scaling heavily on TikTok and Instagram ads. Traffic is 82% mobile Gen Z/Millennial women, but conversion is lagging at 1.35% (industry benchmark: 2.6%).',
    funnelData: {
      sessions: 85000,
      pdpViews: 58000,
      addedToCart: 3944,
      reachedCheckout: 2366,
      purchased: 1148,
    },
    clientBrief: 'Founder says: "We get hundreds of thousands of impressions on TikTok, but people visit the perfume page and leave without buying. They claim they cannot smell perfume through a screen. We need a way to build confidence and get them to add to cart without heavy discounting that hurts our luxury prestige."',
  },
  {
    id: 'store-2',
    name: 'ApexGear Athletics',
    niche: 'High-Performance Activewear & Gym Apparel',
    logoColor: '#3b82f6',
    monthlySessions: 145000,
    baselineCvr: 1.85,
    aov: 78,
    monthlyRevenue: 209235,
    cartAbandonmentRate: 77.8,
    mobileTrafficPercent: 76,
    lcpMobile: 3.4,
    primaryBottleneck: 'Extreme Cart Drawer abandonment & sizing uncertainty',
    overview: 'Athleisure brand competing with Gymshark and Alo. Huge catalog of seamless leggings and compression tops. High add-to-cart rate, but 78% drop off in the slide-out cart drawer before completing checkout.',
    funnelData: {
      sessions: 145000,
      pdpViews: 104000,
      addedToCart: 11856,
      reachedCheckout: 4742,
      purchased: 2682,
    },
    clientBrief: 'E-commerce Director: "Our Add to Cart rate is healthy (8.2%), but our cart-to-checkout conversion is horrific. Customers add 2 sizes to compare, open the cart drawer, see a $9.95 shipping fee or lack of reassurance, and bounce. What A/B tests should we run inside the cart and PDP to lift checkout completion?"',
  },
  {
    id: 'store-3',
    name: 'VitalBiome Labs',
    niche: 'Clinical Nootropics & Gut Health Supplements',
    logoColor: '#10b981',
    monthlySessions: 62000,
    baselineCvr: 2.15,
    aov: 62,
    monthlyRevenue: 82646,
    cartAbandonmentRate: 64.2,
    mobileTrafficPercent: 71,
    lcpMobile: 2.8,
    primaryBottleneck: 'B2C subscription toggle friction & hidden clinical proof',
    overview: 'Doctor-formulated daily probiotic supplement. Strong repeat purchase rate, but 85% of new buyers choose the one-time $62 bottle instead of the $49/mo subscription. The subscription savings toggle is confusing and hidden on mobile.',
    funnelData: {
      sessions: 62000,
      pdpViews: 46000,
      addedToCart: 4140,
      reachedCheckout: 2484,
      purchased: 1333,
    },
    clientBrief: 'CEO: "Our business model requires recurring subscribers. Right now, 85% of purchases are one-time. The subscription widget looks clunky and users fear getting locked into charges they cannot cancel. Propose tests to increase Subscription Take Rate without tanking overall CVR."',
  },
  {
    id: 'store-4',
    name: 'NordicLoom Living',
    niche: 'Scandinavian Furniture & Modern Decor',
    logoColor: '#f59e0b',
    monthlySessions: 38000,
    baselineCvr: 0.88,
    aov: 440,
    monthlyRevenue: 147136,
    cartAbandonmentRate: 81.5,
    mobileTrafficPercent: 65,
    lcpMobile: 4.6,
    primaryBottleneck: 'High financial anxiety & lack of delivery date transparency',
    overview: 'High-ticket handmade oak dining tables and modular sofas ($300-$1,800). Conversion rate is low at 0.88%. Shoppers drop out when they realize they do not know the freight delivery timeframe and cannot see installment financing above the fold.',
    funnelData: {
      sessions: 38000,
      pdpViews: 24000,
      addedToCart: 1680,
      reachedCheckout: 672,
      purchased: 334,
    },
    clientBrief: 'Head of Growth: "Our tables are gorgeous, but spending $800+ online requires massive trust. Shoppers ask customer support repeatedly: When will this arrive? Can I pay in 4 installments? Does it fit in a small elevator? What tests can we run to answer these questions right at the buying decision?"',
  },
];

const STORAGE_STORE_EXAMS = 'cro_ai_store_exams_v1';

export const AiStoreSimulatorPage: React.FC = () => {
  const { awardXP } = useProgress() as any;
  const [selectedStore, setSelectedStore] = useState<StoreScenario>(PRESET_STORES[0]);
  const hasKey = hasPiApiKey();

  // User input fields for examination
  const [auditFindings, setAuditFindings] = useState('');
  const [hypothesis1, setHypothesis1] = useState('');
  const [hypothesis2, setHypothesis2] = useState('');
  const [hypothesis3, setHypothesis3] = useState('');
  const [clientPitchStrategy, setClientPitchStrategy] = useState('');

  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<string | null>(null);

  // Restore draft or previous grade for this store
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_STORE_EXAMS}_${selectedStore.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAuditFindings(parsed.auditFindings || '');
        setHypothesis1(parsed.hypothesis1 || '');
        setHypothesis2(parsed.hypothesis2 || '');
        setHypothesis3(parsed.hypothesis3 || '');
        setClientPitchStrategy(parsed.clientPitchStrategy || '');
        setEvaluationResult(parsed.evaluationResult || null);
      } else {
        setAuditFindings('');
        setHypothesis1('');
        setHypothesis2('');
        setHypothesis3('');
        setClientPitchStrategy('');
        setEvaluationResult(null);
      }
    } catch {}
  }, [selectedStore]);

  const handleRandomStore = () => {
    const nextStores = PRESET_STORES.filter((s) => s.id !== selectedStore.id);
    const random = nextStores[Math.floor(Math.random() * nextStores.length)];
    setSelectedStore(random);
  };

  const handleSubmitExamination = async () => {
    if (!auditFindings.trim() || !hypothesis1.trim()) {
      alert('Please fill in your Audit Findings and at least Hypothesis 1 before submitting for AI examination.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationResult(null);

    const systemPrompt = `You are an elite Chief CRO Officer and Technical Ecommerce Director with 15+ years testing on Shopify Plus.
You are conducting a strict, comprehensive examination of a student's CRO Audit and A/B Test Proposals for the brand "${selectedStore.name}" (${selectedStore.niche}).

Store Baseline Stats:
- Monthly Sessions: ${selectedStore.monthlySessions.toLocaleString()}
- Baseline CVR: ${selectedStore.baselineCvr}% | AOV: $${selectedStore.aov}
- Cart Abandonment Rate: ${selectedStore.cartAbandonmentRate}% | Mobile Traffic: ${selectedStore.mobileTrafficPercent}%
- Mobile LCP: ${selectedStore.lcpMobile}s
- Client Problem: ${selectedStore.clientBrief}

Your evaluation report MUST contain the following 5 structured sections with clear markdown headers:

### 🏆 Overall Grade & Seniority Assessment
- Score out of 100 (e.g. 88/100)
- Seniority Level rating: Junior / Mid-Level / Senior CRO Strategist / Director Level
- High-level summary of their proposal.

### 🟢 What You Did Good (Strengths)
- Bullet points highlighting sound psychological heuristics, good data understanding, and clever ideas they proposed.

### 🔴 What's Wrong, Risky, or Overlooked (Constructive Critique)
- Point out false assumptions, sample size issues, technical Shopify flaws, lack of mobile prioritization, or over-promising to the client.
- Explain *why* it is flawed from a scientific and behavioral perspective.

### 💼 How to Pitch This to This Specific Client
- Concrete advice and talking points on how to present these findings to the store founder/executives without triggering pushback.

### 🎯 Gold-Standard Benchmark Hypotheses (Director's Solution)
- The exact 2-3 top test hypotheses that an agency director would run first for this specific store, written in proper scientific format.`;

    const userSubmissionContent = `### My CRO Examination Submission for ${selectedStore.name}:

**1. Identified Friction Points & Audit Findings:**
${auditFindings}

**2. Proposed Hypotheses:**
- Hypothesis A: ${hypothesis1}
- Hypothesis B: ${hypothesis2 || 'Not provided'}
- Hypothesis C: ${hypothesis3 || 'Not provided'}

**3. Client Communication & Rollout Strategy:**
${clientPitchStrategy || 'Not provided'}`;

    try {
      const result = await callPiApiChat({
        messages: [{ role: 'user', content: userSubmissionContent }],
        systemPrompt,
        temperature: 0.6,
      });

      setEvaluationResult(result);

      // Save to localStorage
      try {
        localStorage.setItem(
          `${STORAGE_STORE_EXAMS}_${selectedStore.id}`,
          JSON.stringify({
            auditFindings,
            hypothesis1,
            hypothesis2,
            hypothesis3,
            clientPitchStrategy,
            evaluationResult: result,
            gradedAt: new Date().toISOString(),
          })
        );
      } catch {}

      // Award XP
      if (typeof awardXP === 'function') {
        awardXP(80, `Completed Real-World Store AI Exam: ${selectedStore.name}`);
      }
    } catch (err: any) {
      setEvaluationResult(
        `⚠️ Examination failed due to an error: ${err.message || 'Unknown network error'}. Please check your connection or PiAPI key.`
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleResetForm = () => {
    if (window.confirm('Reset your inputs and examination for this store?')) {
      setAuditFindings('');
      setHypothesis1('');
      setHypothesis2('');
      setHypothesis3('');
      setClientPitchStrategy('');
      setEvaluationResult(null);
      try {
        localStorage.removeItem(`${STORAGE_STORE_EXAMS}_${selectedStore.id}`);
      } catch {}
    }
  };

  return (
    <div
      className="animate-fade-in"
      style={{
        maxWidth: 1080,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* Top Header */}
      <div
        style={{
          padding: '24px 28px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #10b981, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              }}
            >
              <Store size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
                  Real-World Store AI Simulator & Examination
                </h1>
                <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Sparkles size={11} />
                  <span>AI Examination & Grading</span>
                </span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                Practice on real Shopify store profiles. Formulate your audit and hypotheses, then let the AI CRO Director evaluate your work.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={handleRandomStore} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Shuffle size={13} />
              <span>Switch Store</span>
            </button>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                background: hasKey ? 'var(--success-muted)' : 'var(--warning-muted)',
                border: `1px solid ${hasKey ? 'rgba(16, 185, 129, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
                fontSize: 12,
                fontWeight: 600,
                color: hasKey ? 'var(--success)' : 'var(--warning)',
              }}
            >
              <Sparkles size={12} />
              <span>{hasKey ? 'PiAPI Active (.env)' : 'Key Missing in .env'}</span>
            </div>
          </div>
        </div>

        {/* Store Selector Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {PRESET_STORES.map((s) => {
            const isSelected = selectedStore.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => setSelectedStore(s)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--bg-app)' : 'transparent',
                  border: `1.5px solid ${isSelected ? s.logoColor : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  transition: 'all 0.15s ease',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</span>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: s.logoColor,
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.niche}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-primary)', marginTop: 4 }}>
                  CVR: {s.baselineCvr}% · AOV: ${s.aov}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Store Briefing & Telemetry Banner */}
      <div
        style={{
          padding: '24px 28px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          borderLeft: `5px solid ${selectedStore.logoColor}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <span className="badge badge-gray">{selectedStore.niche}</span>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>
              {selectedStore.name} — Store Telemetry & Client Brief
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly Sessions</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{selectedStore.monthlySessions.toLocaleString()}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Baseline CVR</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--danger)' }}>{selectedStore.baselineCvr}%</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly Revenue</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--success)' }}>
                ${selectedStore.monthlyRevenue.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Cart Abandonment</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{selectedStore.cartAbandonmentRate}%</div>
          </div>
          <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mobile Traffic</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>{selectedStore.mobileTrafficPercent}%</div>
          </div>
          <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mobile LCP Speed</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4, color: selectedStore.lcpMobile > 3 ? 'var(--danger)' : 'var(--success)' }}>
              {selectedStore.lcpMobile}s
            </div>
          </div>
          <div style={{ padding: 12, borderRadius: 'var(--radius-sm)', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Average Order Value</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>${selectedStore.aov}</div>
          </div>
        </div>

        {/* Client Brief Text */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-app)',
            border: '1px solid var(--border-subtle)',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <AlertCircle size={15} color={selectedStore.logoColor} />
            <span>Store Overview & Merchant Bottleneck:</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 10px' }}>{selectedStore.overview}</p>
          <div style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>{selectedStore.clientBrief}</div>
        </div>
      </div>

      {/* Examination Input Workspace */}
      <div
        style={{
          padding: '28px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>
            Your Examination Proposal
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>
            Analyze the data above and write your heuristic findings and test hypotheses. The AI will evaluate your reasoning against senior CRO benchmarks.
          </p>
        </div>

        {/* Input 1: Audit Findings */}
        <div className="input-group">
          <label className="input-label" style={{ fontWeight: 600 }}>
            1. Identified Friction Points & Heuristic Root Causes:
          </label>
          <textarea
            className="input-text"
            rows={3}
            placeholder="What psychological barriers, mobile layout flaws, or data leaks did you spot in this store's funnel?..."
            value={auditFindings}
            onChange={(e) => setAuditFindings(e.target.value)}
          />
        </div>

        {/* Input 2: Hypotheses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label className="input-label" style={{ fontWeight: 600 }}>
            2. Proposed High-Impact A/B Test Hypotheses:
          </label>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            Formula: <em>If we [change], then [primary KPI] will lift by [X]%, because [consumer psychology / reduction of cognitive load].</em>
          </div>

          <input
            type="text"
            className="input-text"
            placeholder="Hypothesis 1 (Primary Test): e.g. If we add a sticky ATC with scent-profile tags..."
            value={hypothesis1}
            onChange={(e) => setHypothesis1(e.target.value)}
          />
          <input
            type="text"
            className="input-text"
            placeholder="Hypothesis 2 (Secondary Test): e.g. If we replace one-time pricing with default Subscribe & Save..."
            value={hypothesis2}
            onChange={(e) => setHypothesis2(e.target.value)}
          />
          <input
            type="text"
            className="input-text"
            placeholder="Hypothesis 3 (Alternative / Micro-test): e.g. If we add free shipping progress bar at $75..."
            value={hypothesis3}
            onChange={(e) => setHypothesis3(e.target.value)}
          />
        </div>

        {/* Input 3: Client Pitch */}
        <div className="input-group">
          <label className="input-label" style={{ fontWeight: 600 }}>
            3. Client Pitch & Objection Handling Strategy:
          </label>
          <textarea
            className="input-text"
            rows={3}
            placeholder="How will you present this to the client? How will you handle their skepticism or fears?..."
            value={clientPitchStrategy}
            onChange={(e) => setClientPitchStrategy(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <button onClick={handleResetForm} className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <RotateCcw size={13} />
            <span>Reset Inputs</span>
          </button>

          <button
            onClick={handleSubmitExamination}
            disabled={isEvaluating || !auditFindings.trim() || !hypothesis1.trim()}
            className="btn btn-primary"
            style={{
              padding: '12px 24px',
              opacity: isEvaluating || !auditFindings.trim() || !hypothesis1.trim() ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {isEvaluating ? (
              <>
                <Sparkles size={16} className="animate-spin" />
                <span>AI Director is Reviewing with {DEFAULT_AI_MODEL}...</span>
              </>
            ) : (
              <>
                <span>Submit to AI Director for Examination</span>
                <Send size={15} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Examination Results Display */}
      {evaluationResult && (
        <div
          className="animate-fade-in card"
          style={{
            padding: '32px',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--accent-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981, #6366f1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Award size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                  AI CRO Director Examination Report
                </h3>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Evaluated using {DEFAULT_AI_MODEL} on {selectedStore.name} (+80 XP Earned)
                </span>
              </div>
            </div>
            <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle2 size={12} />
              <span>Graded & Saved</span>
            </span>
          </div>

          <div
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {evaluationResult}
          </div>
        </div>
      )}
    </div>
  );
};
