import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'liquid',
  filename,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const lines = code.trim().split('\n');

  return (
    <div
      style={{
        background: '#090b10',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        margin: '16px 0',
        fontFamily: 'var(--font-mono)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}>
          <Terminal size={14} />
          <span>{filename || language.toUpperCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'transparent',
            border: '1px solid var(--border-subtle)',
            borderRadius: 4,
            padding: '3px 8px',
            fontSize: 11,
            color: copied ? 'var(--success)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
          aria-label="Copy code snippet"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Area */}
      <div style={{ padding: '12px 0', overflowX: 'auto' }}>
        <pre style={{ margin: 0, fontSize: 13, lineHeight: '1.6', color: '#e2e8f0' }}>
          <code>
            {lines.map((line, idx) => (
              <div key={idx} style={{ display: 'flex', padding: '0 16px' }}>
                {showLineNumbers && (
                  <span
                    style={{
                      width: 32,
                      color: '#475569',
                      userSelect: 'none',
                      textAlign: 'right',
                      marginRight: 16,
                      flexShrink: 0,
                      fontSize: 12,
                    }}
                  >
                    {idx + 1}
                  </span>
                )}
                <span style={{ whiteSpace: 'pre', color: highlightLine(line, language) }}>
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

// Subtle syntax coloring for code blocks
function highlightLine(line: string, lang: string): string {
  if (lang === 'liquid') {
    if (line.includes('{%') || line.includes('%}')) return '#818cf8';
    if (line.includes('{{') || line.includes('}}')) return '#38bdf8';
  }
  if (line.trim().startsWith('//') || line.trim().startsWith('<!--')) {
    return '#64748b';
  }
  if (line.includes('function ') || line.includes('const ') || line.includes('let ') || line.includes('return ')) {
    return '#f1f5f9';
  }
  return '#cbd5e1';
}
