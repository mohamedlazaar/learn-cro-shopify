import React, { useState } from 'react';
import { Languages, ChevronDown, ChevronUp, BookOpen, Info } from 'lucide-react';
import { ArabicTerm } from '../../data/arabicTerms';

interface ArabicTermsBadgeProps {
  terms: ArabicTerm[];
  title?: string;
  variant?: 'inline-pills' | 'card' | 'compact';
}

export const ArabicTermsBadge: React.FC<ArabicTermsBadgeProps> = ({
  terms,
  title = 'المصطلحات التعليمية (Learning Terms)',
  variant = 'inline-pills',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<ArabicTerm | null>(null);

  if (!terms || terms.length === 0) return null;

  return (
    <div
      style={{
        margin: '16px 0',
        borderRadius: '10px',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        background: 'rgba(99, 102, 241, 0.04)',
        padding: '12px 16px',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          >
            <Languages size={14} />
          </div>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)' }}>
            {title}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--color-primary)',
              fontWeight: 600,
            }}
          >
            {terms.length} مصطلحات
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
          <span>{isExpanded ? 'إخفاء' : 'عرض التفاصيل'}</span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Pill summary always visible or in compact mode */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '10px',
        }}
      >
        {terms.slice(0, isExpanded ? terms.length : 5).map((term) => (
          <button
            key={term.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedTerm(selectedTerm?.id === term.id ? null : term);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: selectedTerm?.id === term.id ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
              background: selectedTerm?.id === term.id ? 'rgba(99, 102, 241, 0.18)' : 'var(--color-surface)',
              color: 'var(--color-text)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ fontWeight: 600 }}>{term.en}</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, direction: 'rtl' }}>
              ({term.ar})
            </span>
          </button>
        ))}

        {!isExpanded && terms.length > 5 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-primary)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              padding: '4px',
              fontWeight: 600,
            }}
          >
            +{terms.length - 5} المزيد...
          </button>
        )}
      </div>

      {/* Selected term detail card */}
      {selectedTerm && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px 14px',
            background: 'var(--color-surface-hover)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            direction: 'rtl',
            textAlign: 'right',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', direction: 'ltr' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 700 }}>
              {selectedTerm.category.toUpperCase()}
            </span>
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text)' }}>
              {selectedTerm.en} ⟵ <span style={{ color: 'var(--color-primary)' }}>{selectedTerm.ar}</span>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {selectedTerm.arExplanation}
          </p>
        </div>
      )}

      {/* Expanded full glossary list */}
      {isExpanded && (
        <div
          style={{
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          {terms.map((term) => (
            <div
              key={term.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '10px 14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-text)' }}>
                  {term.en}
                </span>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.9rem', direction: 'rtl' }}>
                  {term.ar}
                </span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.5,
                  direction: 'rtl',
                  textAlign: 'right',
                }}
              >
                {term.arExplanation}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
