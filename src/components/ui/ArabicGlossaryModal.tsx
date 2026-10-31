import React, { useState, useMemo } from 'react';
import { Search, X, Languages, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { ARABIC_GLOSSARY, ArabicTerm } from '../../data/arabicTerms';

interface ArabicGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArabicGlossaryModal: React.FC<ArabicGlossaryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = useMemo(() => {
    return ARABIC_GLOSSARY.filter((term) => {
      if (selectedCategory !== 'all' && term.category !== selectedCategory) return false;
      if (!search.trim()) return true;

      const q = search.toLowerCase();
      return (
        term.en.toLowerCase().includes(q) ||
        term.ar.includes(q) ||
        term.arExplanation.includes(q) ||
        term.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [search, selectedCategory]);

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'الكل (All)', count: ARABIC_GLOSSARY.length },
    { id: 'cro', label: 'مفاهيم التحويل (CRO)', count: ARABIC_GLOSSARY.filter((t) => t.category === 'cro').length },
    { id: 'stats', label: 'الإحصاء والتجارب (Stats & A/B)', count: ARABIC_GLOSSARY.filter((t) => t.category === 'stats').length },
    { id: 'shopify', label: 'شوبيفاي وليكويد (Shopify)', count: ARABIC_GLOSSARY.filter((t) => t.category === 'shopify').length },
    { id: 'perf', label: 'سرعة المتجر (Performance)', count: ARABIC_GLOSSARY.filter((t) => t.category === 'perf').length },
    { id: 'ux', label: 'واجهة وتجربة المستخدم (UX)', count: ARABIC_GLOSSARY.filter((t) => t.category === 'ux').length },
    { id: 'analytics', label: 'التحليلات والبيانات (Analytics)', count: ARABIC_GLOSSARY.filter((t) => t.category === 'analytics').length },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '14px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          overflow: 'hidden',
          padding: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-surface-hover)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Languages size={20} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                قاموس مصطلحات CRO بالعربية
                <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>Bilingual Guide</span>
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                ترجمة وشرح مبسط لجميع مصطلحات تحسين معدل التحويل وشوبيفاي
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="button button-ghost button-icon"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search input */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ position: 'relative' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="ابحث بالإنجليزية أو العربية (e.g. CVR, Liquid, الدلالة الإحصائية)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input"
              style={{ paddingLeft: '40px', width: '100%', fontSize: '0.95rem' }}
              autoFocus
            />
          </div>

          {/* Categories bar */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingTop: '12px',
              scrollbarWidth: 'none',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`button button-sm ${selectedCategory === cat.id ? 'button-primary' : 'button-outline'}`}
                style={{ fontSize: '0.8rem', whiteSpace: 'nowrap', padding: '4px 10px' }}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Terms list */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {filteredTerms.length > 0 ? (
            filteredTerms.map((term) => (
              <div
                key={term.id}
                style={{
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  transition: 'border-color 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text)' }}>
                    {term.en}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-primary)', direction: 'rtl' }}>
                    {term.ar}
                  </div>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.9rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6,
                    direction: 'rtl',
                    textAlign: 'right',
                  }}
                >
                  {term.arExplanation}
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4px' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'var(--color-surface-hover)',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {term.category}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--color-text-muted)' }}>
              <Languages size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.95rem' }}>لا توجد مصطلحات مطابقة لبحثك.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface-hover)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <span>عرض {filteredTerms.length} من {ARABIC_GLOSSARY.length} مصطلح تعليمي</span>
          <span style={{ direction: 'rtl' }}>مترجم خصيصاً لمطوري شوبيفاي</span>
        </div>
      </div>
    </div>
  );
};
