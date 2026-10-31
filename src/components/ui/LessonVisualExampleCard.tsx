import React, { useState } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
  Code2,
  Eye,
  ShoppingCart,
  Zap,
  Check,
  Smartphone,
  ChevronDown,
  Info,
} from 'lucide-react';
import { LessonVisualExample } from '../../types/curriculum';
import { CodeBlock } from './CodeBlock';

interface Props {
  example: LessonVisualExample;
}

export const LessonVisualExampleCard: React.FC<Props> = ({ example }) => {
  const [activeTab, setActiveTab] = useState<'optimized' | 'baseline'>('optimized');
  const [showCode, setShowCode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('Medium / Black');
  const [upsellAdded, setUpsellAdded] = useState(false);

  const currentMockup = activeTab === 'optimized' ? example.optimized : example.baseline;

  return (
    <div
      style={{
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-muted)',
        background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-app) 100%)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          padding: '18px 24px',
          background: 'rgba(99, 102, 241, 0.08)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              <Sparkles size={12} />
              <span>{example.badge || 'REAL-WORLD VISUAL CASE EXAMPLE'}</span>
            </span>
            <span
              style={{
                fontSize: 12,
                color: 'var(--text-muted)',
                background: 'var(--bg-surface)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              🏢 {example.brandScenario}
            </span>
          </div>

          {/* Before / After Toggle Controls */}
          <div
            style={{
              display: 'flex',
              background: 'var(--bg-app)',
              padding: 3,
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <button
              onClick={() => setActiveTab('baseline')}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: activeTab === 'baseline' ? 'var(--danger-muted)' : 'transparent',
                color: activeTab === 'baseline' ? 'var(--danger)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              <XCircle size={13} />
              <span>Baseline (Common Flaws)</span>
            </button>
            <button
              onClick={() => setActiveTab('optimized')}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: activeTab === 'optimized' ? 'var(--success-muted)' : 'transparent',
                color: activeTab === 'optimized' ? 'var(--success)' : 'var(--text-muted)',
                transition: 'all 0.15s ease',
              }}
            >
              <CheckCircle2 size={13} />
              <span>CRO-Optimized Winner</span>
            </button>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
            {example.title}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Hypothesis & Test Objective: </strong>
            {example.hypothesis}
          </p>
        </div>
      </div>

      {/* Metrics Lift Grid */}
      {example.metrics && example.metrics.length > 0 && (
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {example.metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-app)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                {m.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                  {m.before}
                </span>
                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {m.after}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: m.lift.startsWith('+') ? 'var(--success)' : 'var(--danger)',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto',
                  }}
                >
                  {m.lift.startsWith('+') ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  <span>{m.lift}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Visual Simulation Canvas & Inspector */}
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          {/* Left Column: Simulated Shopify Viewport Preview */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-muted)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Eye size={14} />
                <span>Simulated Store Viewport ({activeTab === 'optimized' ? 'Winning Pattern' : 'Flawed Baseline'})</span>
              </span>
              <span
                style={{
                  fontSize: 11,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: activeTab === 'optimized' ? 'var(--success-muted)' : 'var(--danger-muted)',
                  color: activeTab === 'optimized' ? 'var(--success)' : 'var(--danger)',
                  fontWeight: 700,
                }}
              >
                {currentMockup.tag}
              </span>
            </div>

            {/* Browser / Device Frame */}
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                border: activeTab === 'optimized' ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1.5px solid rgba(239, 68, 68, 0.4)',
                background: 'var(--bg-app)',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Browser Address Bar */}
              <div
                style={{
                  padding: '8px 12px',
                  background: 'var(--bg-surface)',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 11,
                  color: 'var(--text-muted)',
                }}
              >
                <div style={{ display: 'flex', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                </div>
                <div
                  style={{
                    flex: 1,
                    background: 'var(--bg-app)',
                    padding: '3px 10px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-subtle)',
                    fontSize: 11,
                    color: 'var(--text-secondary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  https://store.myshopify.com/products/{example.visualType === 'cart' ? 'cart' : 'apex-performance-gear'}
                </div>
              </div>

              {/* Rendered Visual Elements Stage */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Visual Header / State Title */}
                <div style={{ borderBottom: '1px dashed var(--border-subtle)', paddingBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                    {currentMockup.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {currentMockup.description}
                  </div>
                </div>

                {/* Rendered Mockup UI Elements */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {currentMockup.elements.map((el, i) => {
                    const isSuccess = el.variant === 'success' || el.variant === 'primary';
                    const isDanger = el.variant === 'danger';
                    const isWarning = el.variant === 'warning';

                    if (el.type === 'progress') {
                      return (
                        <div
                          key={i}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-subtle)',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                            <span>{el.label}</span>
                            <span style={{ color: 'var(--accent-primary)' }}>{el.subtext}</span>
                          </div>
                          <div style={{ width: '100%', height: 6, borderRadius: 3, background: 'var(--bg-app)', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: upsellAdded ? '100%' : '75%',
                                height: '100%',
                                background: 'linear-gradient(90deg, #6366f1, #10b981)',
                                transition: 'width 0.4s ease',
                              }}
                            />
                          </div>
                        </div>
                      );
                    }

                    if (el.type === 'variant') {
                      return (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>
                            {el.label}
                          </span>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {['Small / White', 'Medium / Black', 'Large / Black'].map((v) => (
                              <button
                                key={v}
                                onClick={() => setSelectedVariant(v)}
                                style={{
                                  padding: '5px 10px',
                                  fontSize: 11,
                                  borderRadius: '6px',
                                  border: selectedVariant === v ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                                  background: selectedVariant === v ? 'var(--accent-muted)' : 'var(--bg-surface)',
                                  color: selectedVariant === v ? 'var(--text-primary)' : 'var(--text-secondary)',
                                  cursor: 'pointer',
                                }}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    if (el.type === 'button') {
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (el.label.includes('Upsell')) setUpsellAdded(!upsellAdded);
                          }}
                          style={{
                            padding: '12px 18px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            background: isDanger
                              ? '#ef4444'
                              : isSuccess
                              ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                              : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                            color: '#fff',
                            boxShadow: isSuccess ? '0 4px 14px rgba(16, 185, 129, 0.35)' : '0 4px 12px rgba(0, 0, 0, 0.2)',
                            transition: 'transform 0.15s ease',
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>{el.label}</span>
                          {el.subtext && <span style={{ opacity: 0.85, fontSize: 11 }}>({el.subtext})</span>}
                        </button>
                      );
                    }

                    if (el.type === 'alert' || el.type === 'badge') {
                      return (
                        <div
                          key={i}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            background: isDanger
                              ? 'var(--danger-muted)'
                              : isWarning
                              ? 'var(--warning-muted)'
                              : isSuccess
                              ? 'var(--success-muted)'
                              : 'var(--bg-surface)',
                            border: isDanger
                              ? '1px solid rgba(239, 68, 68, 0.3)'
                              : isWarning
                              ? '1px solid rgba(245, 158, 11, 0.3)'
                              : isSuccess
                              ? '1px solid rgba(16, 185, 129, 0.3)'
                              : '1px solid var(--border-subtle)',
                            color: isDanger
                              ? 'var(--danger)'
                              : isWarning
                              ? 'var(--warning)'
                              : isSuccess
                              ? 'var(--success)'
                              : 'var(--text-primary)',
                          }}
                        >
                          {isDanger ? <XCircle size={14} /> : <Zap size={14} />}
                          <span style={{ fontWeight: 600 }}>{el.label}</span>
                          {el.subtext && <span style={{ color: 'var(--text-secondary)', marginLeft: 'auto', fontSize: 11 }}>{el.subtext}</span>}
                        </div>
                      );
                    }

                    return (
                      <div
                        key={i}
                        style={{
                          padding: '10px 12px',
                          borderRadius: '6px',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{el.label}</div>
                          {el.subtext && <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{el.subtext}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Critique Points & Conversion Mechanisms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: activeTab === 'optimized' ? 'var(--success)' : 'var(--danger)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 10,
                }}
              >
                {activeTab === 'optimized' ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Why This Pattern Converts (The Psychology)</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    <span>The Conversion Leaks (Where Revenue Dies)</span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {currentMockup.critiqueOrBenefits.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: activeTab === 'optimized' ? 'var(--success-muted)' : 'var(--danger-muted)',
                        color: activeTab === 'optimized' ? 'var(--success)' : 'var(--danger)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {activeTab === 'optimized' ? '✓' : '✕'}
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Developer Takeaway & Implementation Notes */}
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid var(--accent-glow)',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Info size={14} />
                <span>Shopify Developer Implementation Note</span>
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                {example.developerNotes}
              </p>
            </div>
          </div>
        </div>

        {/* Code Implementation Snippet Toggle */}
        {example.codeSnippet && (
          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => setShowCode(!showCode)}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12.5,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'all 0.15s ease',
              }}
            >
              <Code2 size={15} color="var(--accent-primary)" />
              <span>{showCode ? 'Hide Production Code' : `View Production Code: ${example.codeSnippet.title}`}</span>
              <ChevronDown
                size={14}
                style={{
                  transform: showCode ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.2s ease',
                  marginLeft: 'auto',
                }}
              />
            </button>

            {showCode && (
              <div style={{ marginTop: 10 }}>
                <CodeBlock
                  code={example.codeSnippet.code}
                  language={example.codeSnippet.language}
                  showLineNumbers={true}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
