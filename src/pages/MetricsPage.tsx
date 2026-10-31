import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  INDUSTRY_BENCHMARKS,
  diagnoseStoreMetrics,
} from '../data/benchmarks';

export const MetricsPage: React.FC = () => {
  const [sessions, setSessions] = useState<number>(50000);
  const [orders, setOrders] = useState<number>(1250);
  const [revenue, setRevenue] = useState<number>(95000);
  const [cartsCreated, setCartsCreated] = useState<number>(4500);
  const [checkoutsStarted, setCheckoutsStarted] = useState<number>(2200);
  const [vertical, setVertical] = useState<string>('apparel');

  // Computed metrics
  const cvr = sessions > 0 ? (orders / sessions) * 100 : 0;
  const aov = orders > 0 ? revenue / orders : 0;
  const rps = sessions > 0 ? revenue / sessions : 0;
  const cartAbandonment = cartsCreated > 0 ? ((cartsCreated - orders) / cartsCreated) * 100 : 0;
  const checkoutAbandonment = checkoutsStarted > 0 ? ((checkoutsStarted - orders) / checkoutsStarted) * 100 : 0;

  const currentBenchmark = INDUSTRY_BENCHMARKS[vertical] || INDUSTRY_BENCHMARKS.apparel;
  const diagnostics = diagnoseStoreMetrics(cvr, aov, cartAbandonment, checkoutAbandonment, vertical);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Page Header */}
      <div
        className="cyber-corner-box"
        style={{
          padding: '28px 32px',
          borderRadius: '24px',
          background:
            'radial-gradient(circle at 88% 18%, rgba(251, 191, 36, 0.14), transparent 45%), radial-gradient(circle at 12% 85%, rgba(163, 230, 53, 0.12), transparent 50%), var(--bg-surface)',
          border: '2px solid var(--border-default)',
          boxShadow: '0 6px 0 var(--border-default), var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <span
            className="arcade-sticker"
            style={{ background: '#fbbf24', color: '#06070b', borderColor: '#06070b' }}
          >
            <Sparkles size={12} /> TELEMETRY DIAGNOSTIC REACTOR
          </span>
          <span className="badge badge-indigo" style={{ fontFamily: 'var(--font-mono)' }}>
            ECOMMERCE UNIT ECONOMICS
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
          CRO Metrics Calculator & Diagnostic Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: 680, margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Input raw store telemetry to compute conversion unit economics, benchmark against industry verticals, and pinpoint your #1 highest-leakage funnel stage.
        </p>
      </div>

      {/* Inputs Grid */}
      <div
        style={{
          padding: '24px 28px',
          background: 'var(--bg-surface)',
          border: '2px solid var(--border-default)',
          borderRadius: '20px',
          boxShadow: '0 5px 0 var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h3 style={{ fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calculator size={18} color="var(--accent-primary)" />
            <span>Store Telemetry Inputs</span>
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Store Vertical:</span>
            <select
              value={vertical}
              onChange={(e) => setVertical(e.target.value)}
              className="input-select"
              style={{ width: 'auto', minWidth: 180, fontSize: 12 }}
            >
              {Object.entries(INDUSTRY_BENCHMARKS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.vertical}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
          <div className="input-group">
            <label className="input-label">Total Sessions</label>
            <input
              type="number"
              className="input-text"
              value={sessions}
              onChange={(e) => setSessions(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Orders Placed</label>
            <input
              type="number"
              className="input-text"
              value={orders}
              onChange={(e) => setOrders(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Gross Revenue ($)</label>
            <input
              type="number"
              className="input-text"
              value={revenue}
              onChange={(e) => setRevenue(Math.max(0, parseFloat(e.target.value) || 0))}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Carts Created</label>
            <input
              type="number"
              className="input-text"
              value={cartsCreated}
              onChange={(e) => setCartsCreated(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
          <div className="input-group">
            <label className="input-label">Checkouts Started</label>
            <input
              type="number"
              className="input-text"
              value={checkoutsStarted}
              onChange={(e) => setCheckoutsStarted(Math.max(0, parseInt(e.target.value) || 0))}
            />
          </div>
        </div>
      </div>

      {/* Calculated Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {/* CVR */}
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Conversion Rate (CVR)
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
            {cvr.toFixed(2)}%
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Formula: (Orders / Sessions) × 100
          </div>
        </div>

        {/* AOV */}
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Average Order Value (AOV)
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
            ${aov.toFixed(2)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Formula: Revenue / Orders
          </div>
        </div>

        {/* RPS */}
        <div className="card" style={{ border: '1px solid var(--accent-glow)', background: 'rgba(99, 102, 241, 0.05)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
            Revenue Per Session (RPS)
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
            ${rps.toFixed(2)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Formula: CVR × AOV
          </div>
        </div>

        {/* Cart Abandonment */}
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Cart Abandonment
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: cartAbandonment > 75 ? 'var(--danger)' : 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
            {cartAbandonment.toFixed(1)}%
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Formula: (Carts - Orders) / Carts
          </div>
        </div>

        {/* Checkout Abandonment */}
        <div className="card">
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Checkout Abandonment
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: checkoutAbandonment > 50 ? 'var(--danger)' : 'var(--text-primary)', fontFamily: 'var(--font-heading)', marginTop: 4 }}>
            {checkoutAbandonment.toFixed(1)}%
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
            Formula: (Checkouts - Orders) / Checkouts
          </div>
        </div>
      </div>

      {/* Benchmark Comparison Table */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface-active)' }}>
          <h3 style={{ fontSize: 16 }}>Benchmark Comparison ({currentBenchmark.vertical})</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px 24px' }}>Metric</th>
                <th style={{ padding: '12px 16px' }}>Your Store</th>
                <th style={{ padding: '12px 16px' }}>Industry Average</th>
                <th style={{ padding: '12px 16px' }}>Top 10% Stores</th>
                <th style={{ padding: '12px 24px' }}>Performance Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 24px', fontWeight: 600 }}>Conversion Rate (CVR)</td>
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>{cvr.toFixed(2)}%</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{currentBenchmark.cvrAverage}%</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{currentBenchmark.cvrTop10}%</td>
                <td style={{ padding: '14px 24px' }}>
                  <span className={`badge ${cvr >= currentBenchmark.cvrAverage ? 'badge-green' : 'badge-amber'}`}>
                    {cvr >= currentBenchmark.cvrTop10 ? 'Top 10%' : cvr >= currentBenchmark.cvrAverage ? 'Healthy' : 'Below Average'}
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 24px', fontWeight: 600 }}>Average Order Value (AOV)</td>
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>${aov.toFixed(2)}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>${currentBenchmark.aovAverage}</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>${currentBenchmark.aovTop10}</td>
                <td style={{ padding: '14px 24px' }}>
                  <span className={`badge ${aov >= currentBenchmark.aovAverage ? 'badge-green' : 'badge-amber'}`}>
                    {aov >= currentBenchmark.aovTop10 ? 'Top 10%' : aov >= currentBenchmark.aovAverage ? 'Healthy' : 'Below Average'}
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 24px', fontWeight: 600 }}>Cart Abandonment Rate</td>
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>{cartAbandonment.toFixed(1)}%</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{currentBenchmark.cartAbandonmentAverage}%</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>&lt; 60%</td>
                <td style={{ padding: '14px 24px' }}>
                  <span className={`badge ${cartAbandonment <= currentBenchmark.cartAbandonmentAverage ? 'badge-green' : 'badge-red'}`}>
                    {cartAbandonment <= currentBenchmark.cartAbandonmentAverage ? 'Healthy' : 'High Abandonment'}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '14px 24px', fontWeight: 600 }}>Checkout Abandonment Rate</td>
                <td style={{ padding: '14px 16px', fontWeight: 700 }}>{checkoutAbandonment.toFixed(1)}%</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>{currentBenchmark.checkoutAbandonmentAverage}%</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-secondary)' }}>&lt; 38%</td>
                <td style={{ padding: '14px 24px' }}>
                  <span className={`badge ${checkoutAbandonment <= currentBenchmark.checkoutAbandonmentAverage ? 'badge-green' : 'badge-red'}`}>
                    {checkoutAbandonment <= currentBenchmark.checkoutAbandonmentAverage ? 'Healthy' : 'Critical Leak'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* "What To Fix First" Diagnostic Recommendation Engine */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h3 style={{ fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color="var(--accent-primary)" />
          <span>Diagnostic Engine: What to Fix First</span>
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {diagnostics.map((diag, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                borderLeft: diag.severity === 'critical'
                  ? '4px solid var(--danger)'
                  : diag.severity === 'warning'
                  ? '4px solid var(--warning)'
                  : '4px solid var(--success)',
                padding: '20px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span
                  className={`badge ${
                    diag.severity === 'critical'
                      ? 'badge-red'
                      : diag.severity === 'warning'
                      ? 'badge-amber'
                      : 'badge-green'
                  }`}
                >
                  {diag.severity.toUpperCase()}
                </span>
                <h4 style={{ fontSize: 16 }}>{diag.metric}</h4>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Current: {diag.currentValue} (Benchmark: {diag.benchmarkValue})
                </span>
              </div>

              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 14 }}>
                {diag.diagnosis}
              </p>

              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Recommended Engineering Fixes:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {diag.recommendations.map((rec, rIdx) => (
                    <div key={rIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12.5, color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} color="var(--accent-primary)" style={{ marginTop: 2, flexShrink: 0 }} />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
