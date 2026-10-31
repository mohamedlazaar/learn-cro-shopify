import React, { useState, useEffect } from 'react';
import {
  FileCode,
  Play,
  RotateCcw,
  Share2,
  Bookmark,
  Layers,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';
import { PLAYGROUND_PRESETS } from '../data/playgroundPresets';
import { renderLiquid, defaultMockStore } from '../services/liquidEngine';

type ActiveTab = 'liquid' | 'css' | 'js' | 'mockStore';

export const PlaygroundPage: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(PLAYGROUND_PRESETS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('liquid');

  const [liquid, setLiquid] = useState(PLAYGROUND_PRESETS[0].liquid);
  const [css, setCss] = useState(PLAYGROUND_PRESETS[0].css);
  const [js, setJs] = useState(PLAYGROUND_PRESETS[0].js);

  const [copiedUrl, setCopiedUrl] = useState(false);

  // Load preset
  const handleSelectPreset = (presetId: string) => {
    const found = PLAYGROUND_PRESETS.find((p) => p.id === presetId);
    if (found) {
      setSelectedPresetId(found.id);
      setLiquid(found.liquid);
      setCss(found.css);
      setJs(found.js);
    }
  };

  // Render combined HTML inside iframe
  const renderedLiquidHTML = renderLiquid(liquid, defaultMockStore);

  const fullIframeDocument = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #090a0f;
      color: #f8fafc;
      padding: 16px;
      line-height: 1.5;
    }
    ${css}
  </style>
</head>
<body>
  ${renderedLiquidHTML}
  <script>
    try {
      ${js}
    } catch(err) {
      console.error('Playground JS error:', err);
    }
  </script>
</body>
</html>
`;

  const handleShare = () => {
    try {
      const payload = { liquid, css, js };
      const encoded = encodeURIComponent(JSON.stringify(payload));
      window.location.hash = `snippet=${encoded}`;
      navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {}
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span className="badge badge-indigo">Theme Dev Sandbox</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Simulated Liquid Engine</span>
          </div>
          <h1 style={{ fontSize: 28, letterSpacing: '-0.02em' }}>Shopify Liquid & Front-End Playground</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 680, marginTop: 4, fontSize: 14 }}>
            Write and prototype custom Liquid blocks with live mock store objects (product, cart, shop), responsive CSS, and JavaScript.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Preset Selector */}
          <select
            value={selectedPresetId}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="input-select"
            style={{ width: 'auto', minWidth: 200, fontSize: 12 }}
          >
            {PLAYGROUND_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>

          <button onClick={handleShare} className="btn btn-secondary btn-sm">
            {copiedUrl ? <Check size={14} color="var(--success)" /> : <Share2 size={14} />}
            <span>{copiedUrl ? 'Link Copied!' : 'Share Snippet'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 18, minHeight: 560 }}>
        {/* Left: Code Editor Tabs */}
        <div
          style={{
            background: '#090b10',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Tabs bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid var(--border-subtle)',
              padding: '0 8px',
            }}
          >
            {[
              { id: 'liquid', label: 'Liquid' },
              { id: 'css', label: 'CSS' },
              { id: 'js', label: 'JavaScript' },
              { id: 'mockStore', label: 'Mock Store Data' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                style={{
                  padding: '10px 14px',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column' }}>
            {activeTab === 'liquid' && (
              <textarea
                value={liquid}
                onChange={(e) => setLiquid(e.target.value)}
                spellCheck={false}
                placeholder="Enter Shopify Liquid code (e.g. {{ product.title }}, {% if cart.total_price > 5000 %})..."
                style={{
                  width: '100%',
                  flex: 1,
                  minHeight: 460,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#38bdf8',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  resize: 'none',
                }}
              />
            )}

            {activeTab === 'css' && (
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                spellCheck={false}
                placeholder="/* Enter custom styles */"
                style={{
                  width: '100%',
                  flex: 1,
                  minHeight: 460,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#a78bfa',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  resize: 'none',
                }}
              />
            )}

            {activeTab === 'js' && (
              <textarea
                value={js}
                onChange={(e) => setJs(e.target.value)}
                spellCheck={false}
                placeholder="// Enter JavaScript logic"
                style={{
                  width: '100%',
                  flex: 1,
                  minHeight: 460,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fde047',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  resize: 'none',
                }}
              />
            )}

            {activeTab === 'mockStore' && (
              <pre
                style={{
                  margin: 0,
                  padding: 8,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: '#94a3b8',
                  overflowY: 'auto',
                  flex: 1,
                  minHeight: 460,
                }}
              >
                {JSON.stringify(defaultMockStore, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Right: Live Sandboxed Iframe Preview */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '10px 16px',
              background: 'var(--bg-surface-active)',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Eye size={14} color="var(--accent-primary)" />
              <span>LIVE SHOPIFY THEME SIMULATOR</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              Sandboxed Iframe
            </span>
          </div>

          <div style={{ flex: 1, minHeight: 460, background: '#090a0f' }}>
            <iframe
              srcDoc={fullIframeDocument}
              title="Shopify Theme Preview"
              sandbox="allow-scripts"
              style={{
                width: '100%',
                height: '100%',
                minHeight: 460,
                border: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
