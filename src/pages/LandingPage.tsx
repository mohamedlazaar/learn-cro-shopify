import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Flame,
  Trophy,
  Zap,
  Code2,
  Compass,
  CheckSquare,
  Calculator,
  Terminal,
  ChevronRight,
  Eye,
  Sliders,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { PHASES } from '../data/phases';
import { useAuth } from '../context/AuthContext';

const WORLD_COLORS = [
  { accent: '#a3e635', bg: 'rgba(163, 230, 53, 0.12)', border: 'rgba(163, 230, 53, 0.4)' },
  { accent: '#22d3ee', bg: 'rgba(34, 211, 238, 0.12)', border: 'rgba(34, 211, 238, 0.4)' },
  { accent: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.14)', border: 'rgba(139, 92, 246, 0.45)' },
  { accent: '#fb7185', bg: 'rgba(251, 113, 133, 0.12)', border: 'rgba(251, 113, 133, 0.4)' },
  { accent: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.4)' },
  { accent: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.4)' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithGoogleDemo, loginAsGuest } = useAuth();

  // Interactive Hero X-Ray Mode ('broken' vs 'optimized')
  const [xrayMode, setXrayMode] = useState<'broken' | 'optimized'>('optimized');

  // Interactive Funnel Synthesizer State
  const [demoMetricSessions, setDemoMetricSessions] = useState(50000);
  const [demoMetricOrders, setDemoMetricOrders] = useState(1100);
  const [demoMetricRevenue, setDemoMetricRevenue] = useState(93500);
  const [simulatedLiftPct, setSimulatedLiftPct] = useState(22);

  const demoCvr = ((demoMetricOrders / Math.max(1, demoMetricSessions)) * 100).toFixed(2);
  const demoAov = (demoMetricRevenue / Math.max(1, demoMetricOrders)).toFixed(2);
  const demoRps = (demoMetricRevenue / Math.max(1, demoMetricSessions)).toFixed(2);
  const projectedExtraMonthly = Math.round(demoMetricRevenue * (simulatedLiftPct / 100));
  const projectedExtraAnnual = projectedExtraMonthly * 12;

  const handleStartNow = async () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  const handleGoogleDemo = async () => {
    await loginWithGoogleDemo();
    navigate('/dashboard');
  };

  return (
    <div className="landing-arcade-root">
      {/* Live Telemetry Ticker Tape */}
      <div className="landing-ticker-bar" aria-hidden="true">
        <div className="landing-ticker-track">
          <span>⚡ CONVERSION ALCHEMY OS v4.2</span>
          <span>•</span>
          <span>🎮 115+ INTERACTIVE MISSIONS & LIQUID LABS</span>
          <span>•</span>
          <span>🧠 ACTIVE RECALL + FEYNMAN COACH ENGINE</span>
          <span>•</span>
          <span>🛍️ REAL SHOPIFY OS 2.0 & CHECKOUT EXTENSIONS</span>
          <span>•</span>
          <span>📈 EVAN MILLER STATISTICAL RIGOR</span>
          <span>•</span>
          <span>⚡ CONVERSION ALCHEMY OS v4.2</span>
          <span>•</span>
          <span>🎮 115+ INTERACTIVE MISSIONS & LIQUID LABS</span>
          <span>•</span>
          <span>🧠 ACTIVE RECALL + FEYNMAN COACH ENGINE</span>
          <span>•</span>
          <span>🛍️ REAL SHOPIFY OS 2.0 & CHECKOUT EXTENSIONS</span>
        </div>
      </div>

      {/* Floating Arcade Navigation Deck */}
      <header className="landing-Floating-nav">
        <Link to="/" className="landing-brand-pill">
          <div className="landing-brand-icon">
            <Zap size={18} />
          </div>
          <span className="landing-brand-name">CRO LAB</span>
          <span className="arcade-sticker" style={{ fontSize: 9.5, padding: '2px 8px' }}>
            ARCADE EDITION
          </span>
        </Link>

        <div className="landing-nav-actions">
          <Link to="/curriculum" className="btn btn-ghost btn-sm">
            <span>World Map</span>
          </Link>
          <Link to="/cro-lab" className="btn btn-ghost btn-sm">
            <span>Store Clinic</span>
          </Link>
          <Link to="/audit-tool" className="btn btn-ghost btn-sm">
            <span>60-Pt Audit</span>
          </Link>
          <button onClick={handleStartNow} className="btn btn-primary btn-sm">
            <span>INSERT COIN // ENTER LAB</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* SECTION 1: ASYMMETRIC HERO + INTERACTIVE STOREFRONT X-RAY */}
      <section className="landing-hero-stage">
        <div className="landing-hero-left">
          <div className="landing-kicker-row">
            <span className="arcade-sticker">
              <Flame size={13} /> DUOLINGO × LINEAR FOR SHOPIFY DEVS
            </span>
            <span className="arcade-sticker arcade-sticker-cyan" style={{ transform: 'rotate(1.5deg)' }}>
              ZERO BORING LECTURES
            </span>
          </div>

          <h1 className="landing-mega-title">
            Don’t Just Read About CRO.{' '}
            <span className="landing-title-highlight">
              Dissect, Code &amp; Ship It.
            </span>
          </h1>

          <p className="landing-hero-lead">
            Welcome to the first tactile conversion laboratory built for Shopify engineers.
            Diagnose live funnel leaks, re-architect Liquid &amp; Checkout extensions, train your
            synapses with active recall, and graduate with an undeniable portfolio vault.
          </p>

          <div className="landing-cta-cluster">
            <button onClick={handleStartNow} className="btn btn-primary btn-lg landing-main-cta">
              <Zap size={19} />
              <span>START QUEST #01 (FREE)</span>
              <ArrowRight size={17} />
            </button>
            <button onClick={handleGoogleDemo} className="btn btn-secondary btn-lg">
              <Sparkles size={16} color="#a3e635" />
              <span>Load Demo Engineer Profile</span>
            </button>
          </div>

          {/* Loot / Stats Bar */}
          <div className="landing-loot-strip">
            <div className="landing-loot-item">
              <span className="loot-val">2 Tracks</span>
              <span className="loot-lbl">CRO (24w) + Dev (16w)</span>
            </div>
            <div className="landing-loot-sep" />
            <div className="landing-loot-item">
              <span className="loot-val">115+ Quests</span>
              <span className="loot-lbl">Interactive Labs</span>
            </div>
            <div className="landing-loot-sep" />
            <div className="landing-loot-item">
              <span className="loot-val">5 Instruments</span>
              <span className="loot-lbl">Client-Side Tools</span>
            </div>
            <div className="landing-loot-sep" />
            <div className="landing-loot-item">
              <span className="loot-val">EN + AR</span>
              <span className="loot-lbl">Bilingual Engine</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Storefront X-Ray Surgery Card */}
        <div className="landing-xray-card cyber-corner-box">
          <div className="xray-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Eye size={15} color="#a3e635" />
              <span className="xray-topbar-title">LIVE PDP SURGERY X-RAY</span>
            </div>
            <div className="xray-toggle-group" role="group" aria-label="X-Ray Storefront State">
              <button
                type="button"
                className={`xray-toggle-btn ${xrayMode === 'broken' ? 'is-broken' : ''}`}
                onClick={() => setXrayMode('broken')}
              >
                ❌ Leaky Store (1.2%)
              </button>
              <button
                type="button"
                className={`xray-toggle-btn ${xrayMode === 'optimized' ? 'is-optimized' : ''}`}
                onClick={() => setXrayMode('optimized')}
              >
                ⚡ Alchemist Fix (3.6%)
              </button>
            </div>
          </div>

          <div className={`xray-viewport ${xrayMode}`}>
            {/* Simulated Mobile Storefront */}
            <div className="xray-phone-header">
              <span className="xray-url-pill">🔒 aura-athletics.myshopify.com/products/therma-hoodie</span>
            </div>

            <div className="xray-product-stage">
              <div className="xray-img-box">
                <span style={{ fontSize: 34 }}>🧥</span>
                <span className="xray-img-tag">
                  {xrayMode === 'broken' ? '1 Static Photo (No Zoom)' : '6 Studio Angles + 185cm Model Spec'}
                </span>
              </div>

              <div className="xray-product-meta">
                <div className="xray-rating-row">
                  {xrayMode === 'broken' ? (
                    <span className="xray-flaw-pill">⚠️ Hidden Reviews Below Fold</span>
                  ) : (
                    <span className="xray-win-pill">★★★★★ 4.9 (1,420 Verified Fit Reviews)</span>
                  )}
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 800, margin: '4px 0' }}>
                  Apex Merino Technical Hoodie
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-mono)' }}>$128.00</span>
                  {xrayMode === 'optimized' && (
                    <span className="badge badge-green" style={{ fontSize: 10 }}>FREE 2-DAY SHIPPING</span>
                  )}
                </div>
              </div>
            </div>

            {/* Diagnostic Annotations */}
            <div className="xray-annotations">
              {xrayMode === 'broken' ? (
                <>
                  <div className="xray-callout-row flaw">
                    <span className="xray-pin">FLAW #1</span>
                    <span>Shipping cost hidden until final checkout step → <strong>38% Cart Drop-off</strong></span>
                  </div>
                  <div className="xray-callout-row flaw">
                    <span className="xray-pin">FLAW #2</span>
                    <span>Variant selector uses vague codes ("SM-BLK") &amp; CTA scrolls off mobile viewport.</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="xray-callout-row win">
                    <span className="xray-pin win">FIX #1</span>
                    <span>Dynamic geolocation delivery promise + free returns micro-copy right under CTA.</span>
                  </div>
                  <div className="xray-callout-row win">
                    <span className="xray-pin win">FIX #2</span>
                    <span>Thumb-zone sticky Add-to-Cart bar + visual color swatches → <strong>+$34,200/mo lift</strong></span>
                  </div>
                </>
              )}
            </div>

            <div className={`xray-cta-mock ${xrayMode}`}>
              {xrayMode === 'broken' ? (
                <span>SUBMIT ORDER (Generic Unclear CTA)</span>
              ) : (
                <span>⚡ ADD TO BAG — SHIPS TODAY (FREE RETURNS)</span>
              )}
            </div>
          </div>

          <div className="xray-footer">
            <span>👆 Click the toggle above to inspect real heuristics taught in World 03</span>
            <button onClick={handleStartNow} className="xray-mini-link">
              Try in CRO Lab →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE FUNNEL ALCHEMY SYNTHESIZER (INTERACTIVE MIXER) */}
      <section className="landing-section-wrap">
        <div className="synthesizer-deck cyber-corner-box">
          <div className="synthesizer-header">
            <div>
              <span className="arcade-sticker arcade-sticker-amber">
                <Sliders size={12} /> INTERACTIVE TELEMETRY SYNTHESIZER
              </span>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 34px)', marginTop: 10 }}>
                The Funnel Alchemy Mixer: See What 1% Lift Actually Pays
              </h2>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>
                Drag the dials below to simulate your store’s traffic and see how conversion engineering compounds revenue without spending $1 more on ads.
              </p>
            </div>
            <Link to="/metrics" className="btn btn-secondary">
              <Calculator size={15} />
              <span>Launch Full Telemetry Lab</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="synthesizer-grid">
            {/* Left Dials */}
            <div className="synthesizer-dials">
              <div className="synth-control-box">
                <div className="synth-label-row">
                  <label>MONTHLY SESSIONS</label>
                  <span className="synth-readout">{demoMetricSessions.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={250000}
                  step={5000}
                  value={demoMetricSessions}
                  onChange={(e) => setDemoMetricSessions(Number(e.target.value))}
                  className="synth-slider"
                />
              </div>

              <div className="synth-control-box">
                <div className="synth-label-row">
                  <label>MONTHLY ORDERS</label>
                  <span className="synth-readout">{demoMetricOrders.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={8000}
                  step={50}
                  value={demoMetricOrders}
                  onChange={(e) => setDemoMetricOrders(Number(e.target.value))}
                  className="synth-slider"
                />
              </div>

              <div className="synth-control-box">
                <div className="synth-label-row">
                  <label>CURRENT GROSS REVENUE ($)</label>
                  <span className="synth-readout">${demoMetricRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={500000}
                  step={5000}
                  value={demoMetricRevenue}
                  onChange={(e) => setDemoMetricRevenue(Number(e.target.value))}
                  className="synth-slider"
                />
              </div>

              <div className="synth-control-box highlight-lift">
                <div className="synth-label-row">
                  <label style={{ color: '#a3e635' }}>⚡ SIMULATED CRO LIFT (%)</label>
                  <span className="synth-readout" style={{ color: '#a3e635' }}>+{simulatedLiftPct}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={1}
                  value={simulatedLiftPct}
                  onChange={(e) => setSimulatedLiftPct(Number(e.target.value))}
                  className="synth-slider lime"
                />
              </div>
            </div>

            {/* Right Telemetry Gauges */}
            <div className="synthesizer-monitors">
              <div className="synth-gauge-row">
                <div className="synth-gauge-card">
                  <span className="gauge-tag">CONVERSION RATE</span>
                  <div className="gauge-value">{demoCvr}%</div>
                  <span className="gauge-sub">Orders ÷ Sessions</span>
                </div>
                <div className="synth-gauge-card">
                  <span className="gauge-tag">AVG ORDER VALUE</span>
                  <div className="gauge-value">${demoAov}</div>
                  <span className="gauge-sub">Revenue ÷ Orders</span>
                </div>
                <div className="synth-gauge-card">
                  <span className="gauge-tag" style={{ color: '#22d3ee' }}>NORTH STAR: RPS</span>
                  <div className="gauge-value" style={{ color: '#22d3ee' }}>${demoRps}</div>
                  <span className="gauge-sub">Revenue Per Session</span>
                </div>
              </div>

              <div className="synth-jackpot-banner">
                <div>
                  <div className="jackpot-kicker">💰 UNLOCKED ANNUAL REVENUE BOUNTY (+{simulatedLiftPct}% LIFT)</div>
                  <div className="jackpot-amount">+${projectedExtraAnnual.toLocaleString()} / yr</div>
                  <div className="jackpot-sub">
                    That is <strong>+${projectedExtraMonthly.toLocaleString()} every single month</strong> in pure margin from your existing traffic.
                  </div>
                </div>
                <button onClick={handleStartNow} className="btn btn-primary">
                  <span>Learn How to Capture It</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 6-WORLD SKILL TREE & CARTRIDGE RACK */}
      <section className="landing-section-wrap">
        <div className="landing-section-header">
          <span className="arcade-sticker arcade-sticker-coral">
            <Compass size={13} /> THE SKILL TREE ARCHITECTURE
          </span>
          <h2 className="landing-section-title">
            Conquer Every Dimension of Shopify Conversion
          </h2>
          <p className="landing-section-sub">
            No passive video bingeing. Progress through interconnected Worlds—from behavioral telemetry to Shopify Functions, Liquid speed surgery, and statistical A/B testing.
          </p>
        </div>

        <div className="world-cartridge-grid">
          {PHASES.map((phase, idx) => {
            const palette = WORLD_COLORS[idx % WORLD_COLORS.length];
            return (
              <div
                key={phase.id}
                className="world-cartridge-card"
                onClick={() => navigate(`/curriculum/${phase.id}`)}
                style={
                  {
                    '--world-accent': palette.accent,
                    '--world-bg': palette.bg,
                    '--world-border': palette.border,
                  } as React.CSSProperties
                }
              >
                <div className="world-card-watermark">0{phase.order}</div>
                <div>
                  <div className="world-card-top">
                    <span className="world-pill">WORLD 0{phase.order}</span>
                    <span className="world-weeks">{phase.weeks}</span>
                  </div>
                  <h3 className="world-card-title">{phase.title}</h3>
                  <p className="world-card-desc">{phase.description}</p>
                </div>

                <div className="world-card-footer">
                  <span className="world-mod-count">
                    📦 {phase.moduleIds.length} Cartridges Inside
                  </span>
                  <span className="world-enter-btn">
                    <span>ENTER</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: BENTO INSTRUMENT WORKBENCH (5 PRO TOOLS) */}
      <section className="landing-section-wrap">
        <div className="landing-section-header">
          <span className="arcade-sticker arcade-sticker-cyan">
            <Terminal size={13} /> HARDWARE-GRADE LAB INSTRUMENTS
          </span>
          <h2 className="landing-section-title">
            5 Interactive CRO Synthesizers Built Right In
          </h2>
          <p className="landing-section-sub">
            Every instrument runs 100% client-side with local database persistence, ready for your real client audits.
          </p>
        </div>

        <div className="instruments-bento-grid">
          {[
            {
              tag: 'INSTRUMENT // 01',
              title: '60-Point Storefront Audit Matrix',
              desc: 'Interactive heuristic scanner across 10 store surfaces with severity scoring and instant client PDF report export.',
              icon: <CheckSquare size={22} color="#a3e635" />,
              accent: '#a3e635',
              preview: '[✓] Sticky Mobile ATC   [!] Checkout Express Pay',
              path: '/audit-tool',
              span: 'wide',
            },
            {
              tag: 'INSTRUMENT // 02',
              title: 'Evan Miller A/B Test Planner',
              desc: 'Pre-calculate statistical power, MDE sample sizes, and exact business-cycle durations.',
              icon: <Compass size={22} color="#22d3ee" />,
              accent: '#22d3ee',
              preview: '95% Conf • 80% Power → 14 Days',
              path: '/test-planner',
              span: 'normal',
            },
            {
              tag: 'INSTRUMENT // 03',
              title: 'Liquid & OS 2.0 Live Sandbox',
              desc: 'Write real Shopify Liquid templates & conversion sections with instant iframe rendering.',
              icon: <Code2 size={22} color="#fb7185" />,
              accent: '#fb7185',
              preview: '{{ product.selected_or_first_available_variant.price | money }}',
              path: '/playground',
              span: 'normal',
            },
            {
              tag: 'INSTRUMENT // 04',
              title: 'Interactive Bell Curve & P-Value Lab',
              desc: 'Manipulate normal distributions, alpha thresholds, and Type I/II error zones visually.',
              icon: <Zap size={22} color="#fbbf24" />,
              accent: '#fbbf24',
              preview: 'p = 0.018 (Statistically Significant Lift)',
              path: '/stats-explainer',
              span: 'normal',
            },
            {
              tag: 'INSTRUMENT // 05',
              title: 'AI Client Pitch & Store Simulator',
              desc: 'Roleplay high-ticket CRO retainers with realistic store owners and prospect live leads.',
              icon: <TrendingUp size={22} color="#c084fc" />,
              accent: '#c084fc',
              preview: '🤝 Deal Closed: $4,500/mo CRO Retainer',
              path: '/client-simulator',
              span: 'normal',
            },
          ].map((tool) => (
            <Link
              key={tool.title}
              to={tool.path}
              className={`instrument-bento-card ${tool.span === 'wide' ? 'is-wide' : ''}`}
              style={{ '--inst-accent': tool.accent } as React.CSSProperties}
            >
              <div className="inst-top">
                <span className="inst-tag">{tool.tag}</span>
                <div className="inst-icon-box">{tool.icon}</div>
              </div>
              <h3 className="inst-title">{tool.title}</h3>
              <p className="inst-desc">{tool.desc}</p>
              <div className="inst-terminal-preview">{tool.preview}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 5: GOLDEN HOLOGRAPHIC BOARDING PASS CTA */}
      <section className="landing-section-wrap" style={{ marginBottom: 90 }}>
        <div className="golden-ticket-cta">
          <div className="ticket-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <span className="arcade-sticker arcade-sticker-amber">
                <Trophy size={13} /> GRADUATE WITH PROOF OF WORK
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>
                PASS ID // CRO-2026-PRO
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontFamily: 'var(--font-display)' }}>
              Ready to Build Your Conversion Engineering Vault?
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 600, marginTop: 10, fontSize: 15, lineHeight: 1.6 }}>
              Ship 10 real Shopify theme deliverables, complete clinical store audits, and export a verified case study portfolio that closes high-paying clients or senior roles.
            </p>
          </div>

          <div className="ticket-perforation" aria-hidden="true" />

          <div className="ticket-right">
            <div className="ticket-barcode">||| |||| || ||||| ||| ||||</div>
            <button onClick={handleStartNow} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <span>LAUNCH MISSION CONTROL</span>
              <ArrowRight size={17} />
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              INSTANT ACCESS • NO SIGNUP FRICTION
            </span>
          </div>
        </div>
      </section>

      {/* Arcade Footer */}
      <footer className="landing-arcade-footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
          <Zap size={16} color="#a3e635" />
          <strong style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
            CRO LAB // CONVERSION ALCHEMY OS
          </strong>
        </div>
        <p style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
          Engineered for Shopify Developers &amp; Conversion Architects • Offline-First Persistence • Bilingual EN/AR
        </p>
      </footer>

      <style>{`
        .landing-arcade-root {
          min-height: 100vh;
          color: var(--text-primary);
          overflow-x: hidden;
        }

        .landing-ticker-bar {
          background: #a3e635;
          color: #090d16;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 7px 0;
          border-bottom: 2px solid #090d16;
          overflow: hidden;
          white-space: nowrap;
        }

        .landing-ticker-track {
          display: inline-flex;
          gap: 24px;
          animation: marqueeScroll 28s linear infinite;
        }

        .landing-Floating-nav {
          max-width: 1280px;
          margin: 18px auto 0;
          padding: 12px 22px;
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          border: 1.5px solid var(--border-muted);
          border-radius: 18px;
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          width: calc(100% - 32px);
        }

        .landing-brand-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: inherit;
        }

        .landing-brand-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: linear-gradient(135deg, #a3e635 0%, #22d3ee 100%);
          border: 2px solid #090d16;
          color: #090d16;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 0 #090d16;
        }

        .landing-brand-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.03em;
        }

        .landing-nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* Hero Stage */
        .landing-hero-stage {
          max-width: 1280px;
          margin: 44px auto 72px;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: center;
        }

        @media (max-width: 980px) {
          .landing-hero-stage {
            grid-template-columns: 1fr;
          }
        }

        .landing-kicker-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .landing-mega-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5.2vw, 62px);
          line-height: 1.06;
          letter-spacing: -0.035em;
          margin-bottom: 20px;
        }

        .landing-title-highlight {
          background: linear-gradient(135deg, #a3e635 0%, #22d3ee 50%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .landing-hero-lead {
          font-size: clamp(15.5px, 1.8vw, 18px);
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 620px;
          margin-bottom: 28px;
        }

        .landing-cta-cluster {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .landing-loot-strip {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          padding: 14px 20px;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
          width: fit-content;
        }

        .landing-loot-item {
          display: flex;
          flex-direction: column;
        }

        .loot-val {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .loot-lbl {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .landing-loot-sep {
          width: 1px;
          height: 28px;
          background: var(--border-subtle);
        }

        /* Interactive X-Ray Card */
        .landing-xray-card {
          background: var(--bg-surface);
          border: 2px solid var(--border-muted);
          border-radius: 22px;
          padding: 20px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .xray-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
        }

        .xray-topbar-title {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--text-primary);
        }

        .xray-toggle-group {
          display: flex;
          background: var(--bg-app);
          padding: 3px;
          border-radius: 10px;
          border: 1px solid var(--border-subtle);
          gap: 4px;
        }

        .xray-toggle-btn {
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 11px;
          font-weight: 700;
          padding: 5px 10px;
          border-radius: 7px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .xray-toggle-btn.is-broken {
          background: rgba(244, 63, 94, 0.2);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.45);
        }

        .xray-toggle-btn.is-optimized {
          background: rgba(163, 230, 53, 0.2);
          color: #a3e635;
          border: 1px solid rgba(163, 230, 53, 0.45);
        }

        [data-theme="light"] .xray-toggle-btn.is-optimized {
          color: #3f6212;
        }

        .xray-viewport {
          background: var(--bg-app);
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: border-color 0.25s ease;
        }

        .xray-viewport.optimized {
          border-color: rgba(163, 230, 53, 0.45);
          box-shadow: inset 0 0 24px rgba(163, 230, 53, 0.05);
        }

        .xray-viewport.broken {
          border-color: rgba(244, 63, 94, 0.45);
          box-shadow: inset 0 0 24px rgba(244, 63, 94, 0.05);
        }

        .xray-phone-header {
          display: flex;
          justify-content: center;
        }

        .xray-url-pill {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          background: var(--bg-surface);
          padding: 3px 10px;
          border-radius: 999px;
          border: 1px solid var(--border-subtle);
        }

        .xray-product-stage {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .xray-img-box {
          width: 84px;
          height: 84px;
          border-radius: 12px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 6px;
          text-align: center;
          flex-shrink: 0;
        }

        .xray-img-tag {
          font-size: 8.5px;
          color: var(--text-muted);
          line-height: 1.2;
          margin-top: 4px;
        }

        .xray-flaw-pill {
          font-size: 10.5px;
          font-weight: 700;
          color: #fb7185;
        }

        .xray-win-pill {
          font-size: 10.5px;
          font-weight: 700;
          color: #fbbf24;
        }

        .xray-annotations {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .xray-callout-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          padding: 8px 10px;
          border-radius: 10px;
          line-height: 1.4;
        }

        .xray-callout-row.flaw {
          background: rgba(244, 63, 94, 0.08);
          border: 1px dashed rgba(244, 63, 94, 0.35);
          color: var(--text-primary);
        }

        .xray-callout-row.win {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: var(--text-primary);
        }

        .xray-pin {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 4px;
          background: #f43f5e;
          color: #fff;
          flex-shrink: 0;
        }

        .xray-pin.win {
          background: #10b981;
          color: #090d16;
        }

        .xray-cta-mock {
          padding: 12px;
          border-radius: 10px;
          text-align: center;
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 800;
          letter-spacing: 0.03em;
        }

        .xray-cta-mock.broken {
          background: #334155;
          color: #94a3b8;
        }

        .xray-cta-mock.optimized {
          background: linear-gradient(90deg, #a3e635 0%, #10b981 100%);
          color: #090d16;
          box-shadow: 0 4px 14px rgba(163, 230, 53, 0.35);
        }

        .xray-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .xray-mini-link {
          background: none;
          border: none;
          color: var(--accent-primary);
          font-weight: 700;
          cursor: pointer;
          font-size: 12px;
        }

        /* Section Containers */
        .landing-section-wrap {
          max-width: 1280px;
          margin: 0 auto 84px;
          padding: 0 20px;
        }

        .landing-section-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .landing-section-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 4vw, 42px);
          margin: 12px 0 10px;
        }

        .landing-section-sub {
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 auto;
          font-size: 15px;
        }

        /* Synthesizer Deck */
        .synthesizer-deck {
          background: var(--bg-surface);
          border: 2px solid var(--border-muted);
          border-radius: 24px;
          padding: 32px;
          box-shadow: var(--shadow-lg);
        }

        .synthesizer-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1.5px dashed var(--border-subtle);
        }

        .synthesizer-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 28px;
          align-items: stretch;
        }

        @media (max-width: 900px) {
          .synthesizer-grid {
            grid-template-columns: 1fr;
          }
        }

        .synthesizer-dials {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .synth-control-box {
          background: var(--bg-app);
          border: 1.5px solid var(--border-subtle);
          border-radius: 14px;
          padding: 12px 16px;
        }

        .synth-control-box.highlight-lift {
          border-color: rgba(163, 230, 53, 0.45);
          background: rgba(163, 230, 53, 0.05);
        }

        .synth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .synth-readout {
          font-size: 14px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .synth-slider {
          width: 100%;
          accent-color: var(--accent-primary);
          cursor: pointer;
        }

        .synth-slider.lime {
          accent-color: #a3e635;
        }

        .synthesizer-monitors {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
        }

        .synth-gauge-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        @media (max-width: 600px) {
          .synth-gauge-row {
            grid-template-columns: 1fr;
          }
        }

        .synth-gauge-card {
          background: var(--bg-app);
          border: 1.5px solid var(--border-subtle);
          border-radius: 16px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .gauge-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: var(--text-muted);
        }

        .gauge-value {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .gauge-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .synth-jackpot-banner {
          background: linear-gradient(135deg, rgba(163, 230, 53, 0.14) 0%, rgba(34, 211, 238, 0.1) 100%);
          border: 2px solid rgba(163, 230, 53, 0.45);
          border-radius: 18px;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .jackpot-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          color: #a3e635;
        }

        [data-theme="light"] .jackpot-kicker {
          color: #3f6212;
        }

        .jackpot-amount {
          font-family: var(--font-display);
          font-size: clamp(26px, 3.5vw, 36px);
          font-weight: 800;
          color: var(--text-primary);
          margin: 4px 0;
        }

        .jackpot-sub {
          font-size: 13px;
          color: var(--text-secondary);
        }

        /* World Cartridge Grid */
        .world-cartridge-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .world-cartridge-card {
          background: var(--bg-surface);
          border: 2px solid var(--border-subtle);
          border-top: 5px solid var(--world-accent);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s ease;
        }

        .world-cartridge-card:hover {
          transform: translateY(-6px) rotate(-0.4deg);
          border-color: var(--world-accent);
        }

        .world-card-watermark {
          position: absolute;
          right: 12px;
          bottom: -10px;
          font-family: var(--font-display);
          font-size: 86px;
          font-weight: 800;
          color: var(--world-accent);
          opacity: 0.07;
          pointer-events: none;
          line-height: 1;
        }

        .world-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .world-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 999px;
          background: var(--world-bg);
          color: var(--world-accent);
          border: 1px solid var(--world-border);
        }

        .world-weeks {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .world-card-title {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .world-card-desc {
          font-size: 13.5px;
          line-height: 1.55;
          color: var(--text-secondary);
        }

        .world-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px dashed var(--border-subtle);
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
        }

        .world-enter-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--world-accent);
        }

        /* Instruments Bento Grid */
        .instruments-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .instrument-bento-card.is-wide {
          grid-column: span 2;
        }

        @media (max-width: 900px) {
          .instruments-bento-grid {
            grid-template-columns: 1fr;
          }
          .instrument-bento-card.is-wide {
            grid-column: span 1;
          }
        }

        .instrument-bento-card {
          background: var(--bg-surface);
          border: 2px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 12px;
          box-shadow: var(--shadow-md);
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .instrument-bento-card:hover {
          transform: translateY(-5px);
          border-color: var(--inst-accent);
        }

        .inst-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .inst-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 800;
          color: var(--inst-accent);
        }

        .inst-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--bg-app);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inst-title {
          font-size: 19px;
        }

        .inst-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .inst-terminal-preview {
          font-family: var(--font-mono);
          font-size: 11.5px;
          padding: 10px 12px;
          background: var(--bg-app);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          color: var(--inst-accent);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Golden Holographic Boarding Pass CTA */
        .golden-ticket-cta {
          background: linear-gradient(135deg, var(--bg-surface-elevated) 0%, var(--bg-surface) 100%);
          border: 2px solid var(--border-muted);
          border-radius: 26px;
          display: grid;
          grid-template-columns: 1fr auto 300px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }

        @media (max-width: 860px) {
          .golden-ticket-cta {
            grid-template-columns: 1fr;
          }
          .ticket-perforation {
            display: none;
          }
        }

        .ticket-left {
          padding: 40px;
        }

        .ticket-perforation {
          width: 2px;
          border-left: 3px dashed var(--border-muted);
          margin: 20px 0;
        }

        .ticket-right {
          padding: 36px 32px;
          background: rgba(139, 92, 246, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
          text-align: center;
        }

        .ticket-barcode {
          font-family: var(--font-mono);
          font-size: 20px;
          letter-spacing: 4px;
          color: var(--text-muted);
          opacity: 0.6;
        }

        .landing-arcade-footer {
          border-top: 1.5px dashed var(--border-subtle);
          padding: 36px 24px;
          text-align: center;
          background: var(--bg-surface);
        }
      `}</style>
    </div>
  );
};
