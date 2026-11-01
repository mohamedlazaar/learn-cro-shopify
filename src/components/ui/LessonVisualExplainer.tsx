import React, { useState } from 'react';
import {
  Sparkles,
  Smartphone,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Zap,
  Activity,
  Flame,
  Star,
  Lock,
} from 'lucide-react';
import { Lesson } from '../../types/curriculum';
import './LessonVisualExplainer.css';

interface LessonVisualExplainerProps {
  lesson: Lesson;
  isArabic?: boolean;
}

type ExplainerType =
  | 'pdp_mobile'
  | 'funnel'
  | 'economics'
  | 'cart_drawer'
  | 'liquid_pipeline'
  | 'thumb_zone'
  | 'ab_testing_stats';

function resolveExplainerType(slug: string, title: string): ExplainerType {
  const s = slug.toLowerCase();
  const t = title.toLowerCase();

  if (
    s.includes('pdp') ||
    s.includes('product-page') ||
    s.includes('above-the-fold') ||
    t.includes('pdp') ||
    t.includes('product detail') ||
    s.includes('variant') ||
    s.includes('swatch')
  ) {
    return 'pdp_mobile';
  }
  if (
    s.includes('funnel') ||
    s.includes('benchmark') ||
    s.includes('journey') ||
    s.includes('drop-off') ||
    t.includes('funnel') ||
    t.includes('drop-off')
  ) {
    return 'funnel';
  }
  if (
    s.includes('what-cro-actually-is') ||
    s.includes('metric') ||
    s.includes('rps') ||
    s.includes('margin') ||
    s.includes('economic') ||
    s.includes('pricing') ||
    s.includes('discount') ||
    t.includes('metric') ||
    t.includes('rps') ||
    t.includes('unit economic')
  ) {
    return 'economics';
  }
  if (
    s.includes('cart') ||
    s.includes('drawer') ||
    s.includes('upsell') ||
    s.includes('threshold') ||
    t.includes('cart')
  ) {
    return 'cart_drawer';
  }
  if (
    s.includes('thumb') ||
    s.includes('ergonomic') ||
    s.includes('mobile-first') ||
    t.includes('thumb')
  ) {
    return 'thumb_zone';
  }
  if (
    s.includes('ab-test') ||
    s.includes('testing') ||
    s.includes('statistic') ||
    s.includes('significance') ||
    t.includes('testing') ||
    t.includes('experiment')
  ) {
    return 'ab_testing_stats';
  }
  if (
    s.includes('liquid') ||
    s.includes('architecture') ||
    s.includes('theme') ||
    s.includes('cli') ||
    s.includes('function') ||
    s.includes('extensibility') ||
    s.includes('api') ||
    t.includes('liquid') ||
    t.includes('architecture')
  ) {
    return 'liquid_pipeline';
  }

  return 'pdp_mobile';
}

export const LessonVisualExplainer: React.FC<LessonVisualExplainerProps> = ({
  lesson,
  isArabic = false,
}) => {
  const explainerType = resolveExplainerType(lesson.slug, lesson.title);

  // Common UI State
  const [viewMode, setViewMode] = useState<'optimized' | 'baseline'>('optimized');
  const [selectedHotspot, setSelectedHotspot] = useState<number>(1);
  const [selectedSwatch, setSelectedSwatch] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Jet Black');
  const [cartProgressAdded, setCartProgressAdded] = useState<boolean>(false);
  const [selectedFunnelIndex, setSelectedFunnelIndex] = useState<number>(2);
  const [selectedEconScenario, setSelectedEconScenario] = useState<'discount' | 'bundle'>('bundle');
  const [showThumbHeatmap, setShowThumbHeatmap] = useState<boolean>(true);

  // Hotspot explanations for PDP Mobile
  const pdpHotspots = [
    {
      id: 1,
      title: isArabic ? 'شارة الثقة ومراجعات العملاء' : 'Social Proof & Verified Ratings',
      desc: isArabic
        ? 'وضع تقييم النجوم (4.9 ★) وأكثر من 1,400 مراجعة فوق عنوان المنتج مباشرة يقلل من الشك الأولي في أول ثانيتين.'
        : 'Placing star ratings (4.9 ★) and 1,400+ verified customer reviews above the title creates instant baseline trust in the first 2 seconds.',
      impact: isArabic ? '+14% بقاء في الصفحة' : '+14% Time on Page',
    },
    {
      id: 2,
      title: isArabic ? 'وضوح السعر وخيارات التقسيط' : 'Price Clarity & Installment Terms',
      desc: isArabic
        ? 'عرض السعر بعد التخفيض ($68) مع إمكانية التقسيط عبر Shop Pay ($17 × 4) يزيل صدمة السعر ويسرع قرار الشراء.'
        : 'Displaying the discounted price ($68) alongside interest-free installments ($17/mo via Shop Pay) removes sticker shock on mobile.',
      impact: isArabic ? '+18% نقل إلى السلة' : '+18% Add-to-Cart Initiation',
    },
    {
      id: 3,
      title: isArabic ? 'أزرار الخيارات السريعة المريحة' : 'Frictionless Tap Swatches',
      desc: isArabic
        ? 'استخدام أزرار مربعة متباعدة للألوان والمقاسات بدلاً من القوائم المنسدلة الصعبة يمنع الخطأ في النقر بالأصابع.'
        : 'Spacious tap pills for size and color replace clunky dropdowns, eliminating thumb-miss errors and selection friction.',
      impact: isArabic ? '-32% خطأ في الاختيار' : '-32% Selection Abandonment',
    },
    {
      id: 4,
      title: isArabic ? 'حافز الإلحاح والكمية المتبقية' : 'Verified Scarcity Trigger',
      desc: isArabic
        ? 'إشعار توفر المنتج الفعلي (⚡ بقي 3 قطع فقط) يمنح المتسوق سبباً منطقياً لإنهاء الشراء الآن بدلاً من التأجيل.'
        : 'Real-time inventory counter (⚡ Only 3 left in stock) creates ethical urgency, giving shoppers a reason to buy now rather than delay.',
      impact: isArabic ? '+22% سرعة الشراء' : '+22% Session Velocity',
    },
    {
      id: 5,
      title: isArabic ? 'زر الشراء الثابت في منطقة الإبهام' : 'Thumb-Zone Sticky Buy Bar',
      desc: isArabic
        ? 'تثبيت زر الشراء بعرض كامل الشاشة أسفل شاشة الهاتف يجعله دائماً في متناول الإبهام دون الحاجة للتمرير للأعلى.'
        : 'A full-width primary button locked to the bottom viewport keeps the purchase action permanently within natural one-handed thumb reach.',
      impact: isArabic ? '+27% نقر للشراء' : '+27% Direct ATC Clicks',
    },
  ];

  return (
    <section className="lve-container animate-fade-in" aria-label="Interactive Visual Explainer">
      {/* 1. Header Bar */}
      <div className="lve-header">
        <div className="lve-header-main">
          <span className="lve-scenario-tag">
            <Smartphone size={12} />
            <span>
              {explainerType === 'pdp_mobile'
                ? isArabic ? 'مخطط بصري: صفحة المنتج للهاتف (PDP)' : 'Visual Example: Mobile PDP Architecture'
                : explainerType === 'funnel'
                ? isArabic ? 'مخطط بصري: مسار الشراء ومعدلات التسرب' : 'Visual Example: Ecommerce Funnel Waterfall'
                : explainerType === 'economics'
                ? isArabic ? 'مخطط بصري: معادلة الأرباح وهامش المساهمة' : 'Visual Example: Unit Economics & Margins'
                : explainerType === 'cart_drawer'
                ? isArabic ? 'مخطط بصري: معمارية سلة الشراء الجانبية' : 'Visual Example: Slide-Out Cart Drawer'
                : explainerType === 'thumb_zone'
                ? isArabic ? 'مخطط بصري: خريطة الوصول الحراري للإبهام' : 'Visual Example: Mobile Thumb Zone'
                : explainerType === 'ab_testing_stats'
                ? isArabic ? 'مخطط بصري: منحنى الدلالة الإحصائية' : 'Visual Example: Statistical Significance'
                : isArabic ? 'مخطط بصري: بنية Liquid وسرعة التحميل' : 'Visual Example: Shopify Liquid Pipeline'}
            </span>
          </span>
          <h2 className="lve-title">
            {isArabic
              ? 'الشرح البصري التطبيقي'
              : 'Visual Explanation'}
          </h2>
          <p className="lve-subtitle">
            {isArabic
              ? 'قارن بين النموذج المحسن والنمط المعيب لفهم التطبيق العملي.'
              : 'Compare the optimized layout with the flawed baseline to see how this works in practice.'}
          </p>
        </div>

        {/* View Toggle */}
        <div className="lve-toggle-group" role="group" aria-label="Visual view mode">
          <button
            type="button"
            className={`lve-toggle-btn ${viewMode === 'optimized' ? 'is-active is-success' : ''}`}
            onClick={() => setViewMode('optimized')}
          >
            <CheckCircle2 size={13} />
            <span>{isArabic ? 'النموذج المحسن' : 'Optimized'}</span>
          </button>
          <button
            type="button"
            className={`lve-toggle-btn ${viewMode === 'baseline' ? 'is-active is-danger' : ''}`}
            onClick={() => setViewMode('baseline')}
          >
            <XCircle size={13} />
            <span>{isArabic ? 'النمط المعيب' : 'Before (Baseline)'}</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Canvas Area */}
      <div className="lve-stage">
        {/* =========================================================
            MODEL A: MOBILE PDP ARCHITECTURE & THUMB-ZONE
            ========================================================= */}
        {explainerType === 'pdp_mobile' && (
          <>
            <div className="lve-phone-wrapper">
              <div className="lve-phone-frame">
                <div className="lve-phone-notch">
                  <div className="lve-notch-cam" />
                </div>

                <div className="lve-phone-screen">
                  {/* Top Announcement Bar */}
                  <div
                    style={{
                      background: viewMode === 'optimized' ? '#8b5cf6' : '#334155',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '4px 10px',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                    }}
                  >
                    <Zap size={11} />
                    <span>
                      {viewMode === 'optimized'
                        ? isArabic ? 'شحن سريع مجاني لجميع الطلبات فوق 75$' : '⚡ Free Express Delivery on Orders $75+'
                        : isArabic ? 'خصم 10% باستخدام الكود' : '10% OFF USE CODE: SAVE10'}
                    </span>
                  </div>

                  {/* Hotspot 1 Pin: Social Proof */}
                  {viewMode === 'optimized' && (
                    <button
                      type="button"
                      className={`lve-hotspot-pin ${selectedHotspot === 1 ? 'is-active' : ''}`}
                      style={{ top: 38, left: 16 }}
                      onClick={() => setSelectedHotspot(1)}
                      title="Pin 1: Social Proof"
                    >
                      1
                    </button>
                  )}

                  {/* Image Gallery Mockup */}
                  <div
                    style={{
                      height: 160,
                      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 16,
                          background: 'rgba(139, 92, 246, 0.2)',
                          border: '1.5px solid rgba(139, 92, 246, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 6px',
                          color: 'var(--accent-primary)',
                        }}
                      >
                        <Sparkles size={28} />
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                        {selectedColor} · High-Res 4K Image
                      </span>
                    </div>

                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        fontSize: 9,
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 4,
                        background: viewMode === 'optimized' ? '#10b981' : '#f43f5e',
                        color: '#fff',
                        textTransform: 'uppercase',
                      }}
                    >
                      {viewMode === 'optimized' ? 'Verified Best Seller' : 'No Reviews'}
                    </span>
                  </div>

                  {/* Product Details Section */}
                  <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {/* Social Proof Star Ratings */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                      <div style={{ display: 'flex', color: '#fbbf24' }}>
                        <Star size={11} fill="#fbbf24" />
                        <Star size={11} fill="#fbbf24" />
                        <Star size={11} fill="#fbbf24" />
                        <Star size={11} fill="#fbbf24" />
                        <Star size={11} fill="#fbbf24" />
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>4.9</span>
                      <span style={{ color: 'var(--text-muted)' }}>(1,842 reviews)</span>
                    </div>

                    {/* Product Title */}
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25 }}>
                      Apex Performance Merino Hoodie
                    </div>

                    {/* Hotspot 2 Pin: Price & Installments */}
                    {viewMode === 'optimized' && (
                      <button
                        type="button"
                        className={`lve-hotspot-pin ${selectedHotspot === 2 ? 'is-active' : ''}`}
                        style={{ top: 240, right: 16 }}
                        onClick={() => setSelectedHotspot(2)}
                        title="Pin 2: Price & Installments"
                      >
                        2
                      </button>
                    )}

                    {/* Price + Save Badge */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>$68.00</span>
                      <span style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        $88.00
                      </span>
                      {viewMode === 'optimized' && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                          }}
                        >
                          Save $20 (23%)
                        </span>
                      )}
                    </div>

                    {/* Installments Pill */}
                    {viewMode === 'optimized' && (
                      <div
                        style={{
                          fontSize: 10,
                          color: 'var(--text-secondary)',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '4px 8px',
                          borderRadius: 6,
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        Or 4 interest-free payments of <strong>$17.00</strong> with <strong>Shop Pay</strong>
                      </div>
                    )}

                    {/* Hotspot 3 Pin: Swatches */}
                    {viewMode === 'optimized' && (
                      <button
                        type="button"
                        className={`lve-hotspot-pin ${selectedHotspot === 3 ? 'is-active' : ''}`}
                        style={{ top: 325, left: 16 }}
                        onClick={() => setSelectedHotspot(3)}
                        title="Pin 3: Swatches"
                      >
                        3
                      </button>
                    )}

                    {/* Color Swatches */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700 }}>
                        <span style={{ color: 'var(--text-muted)' }}>COLOR:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedColor}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {['Jet Black', 'Slate Grey', 'Olive'].map((col) => (
                          <button
                            key={col}
                            type="button"
                            onClick={() => setSelectedColor(col)}
                            style={{
                              padding: '4px 8px',
                              borderRadius: 6,
                              fontSize: 10,
                              fontWeight: 600,
                              cursor: 'pointer',
                              border: selectedColor === col ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                              background: selectedColor === col ? 'var(--accent-muted)' : 'transparent',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {col}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Size Swatches */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700 }}>
                        <span style={{ color: 'var(--text-muted)' }}>SIZE:</span>
                        <span style={{ color: 'var(--text-primary)' }}>{selectedSwatch} (True to Size)</span>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {['S', 'M', 'L', 'XL'].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSwatch(size)}
                            style={{
                              flex: 1,
                              padding: '5px 0',
                              borderRadius: 6,
                              fontSize: 11,
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: selectedSwatch === size ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                              background: selectedSwatch === size ? 'var(--accent-muted)' : 'transparent',
                              color: 'var(--text-primary)',
                            }}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Hotspot 4 Pin: Urgency */}
                    {viewMode === 'optimized' && (
                      <button
                        type="button"
                        className={`lve-hotspot-pin ${selectedHotspot === 4 ? 'is-active' : ''}`}
                        style={{ top: 410, right: 16 }}
                        onClick={() => setSelectedHotspot(4)}
                        title="Pin 4: Urgency"
                      >
                        4
                      </button>
                    )}

                    {/* Stock Alert */}
                    {viewMode === 'optimized' && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 10.5,
                          fontWeight: 700,
                          color: '#f59e0b',
                        }}
                      >
                        <Flame size={12} fill="#f59e0b" />
                        <span>High demand: Only 3 units left in size {selectedSwatch}</span>
                      </div>
                    )}
                  </div>

                  {/* Hotspot 5 Pin: Sticky Buy Button */}
                  {viewMode === 'optimized' && (
                    <button
                      type="button"
                      className={`lve-hotspot-pin ${selectedHotspot === 5 ? 'is-active' : ''}`}
                      style={{ bottom: 25, left: 24 }}
                      onClick={() => setSelectedHotspot(5)}
                      title="Pin 5: Sticky Buy Button"
                    >
                      5
                    </button>
                  )}

                  {/* Sticky Thumb-Zone Button */}
                  <div
                    style={{
                      marginTop: 'auto',
                      padding: '10px 14px',
                      background: 'var(--bg-surface)',
                      borderTop: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: 10,
                        border: 'none',
                        background: viewMode === 'optimized' ? '#10b981' : '#3b82f6',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                      }}
                    >
                      <ShoppingCart size={15} />
                      <span>{isArabic ? 'إضافة إلى السلة — 68.00$' : 'ADD TO BAG — $68.00'}</span>
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10, fontSize: 9.5, color: 'var(--text-muted)' }}>
                      <span>🔒 256-Bit Encrypted</span>
                      <span>·</span>
                      <span>🔄 30-Day Free Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Inspector Details for PDP */}
            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Hotspot Pin #{selectedHotspot}</span>
                <span className="lve-inspector-title">
                  {pdpHotspots[selectedHotspot - 1]?.title}
                </span>
              </div>
              <p className="lve-inspector-desc">
                {pdpHotspots[selectedHotspot - 1]?.desc}
              </p>
              <div className="lve-inspector-impact">
                🚀 <strong>Expected Conversion Lift:</strong>{' '}
                {pdpHotspots[selectedHotspot - 1]?.impact}
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
                  {isArabic ? 'انقر لمعاينة بقية نقاط التحويل:' : 'Inspect other PDP Hotspots:'}
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {pdpHotspots.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setSelectedHotspot(h.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 6,
                        border: selectedHotspot === h.id ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                        background: selectedHotspot === h.id ? 'var(--accent-muted)' : 'var(--bg-surface)',
                        color: 'var(--text-primary)',
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Pin #{h.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            MODEL B: FULL-FUNNEL CONVERSION WATERFALL
            ========================================================= */}
        {explainerType === 'funnel' && (
          <>
            <div className="lve-funnel-container">
              {[
                { stage: '1. Store Visits (Ads & Organic)', count: '100,000', drop: '0%', fill: '100%', reason: 'Traffic acquisition entry point' },
                { stage: '2. Product View (PDP)', count: viewMode === 'optimized' ? '54,000' : '38,000', drop: viewMode === 'optimized' ? '-46%' : '-62%', fill: viewMode === 'optimized' ? '54%' : '38%', reason: 'Collection page navigation and search clarity' },
                { stage: '3. Add-to-Cart (ATC)', count: viewMode === 'optimized' ? '14,500' : '6,800', drop: viewMode === 'optimized' ? '-73%' : '-82%', fill: viewMode === 'optimized' ? '27%' : '18%', reason: 'Above-the-fold clarity, trust badges, installment options' },
                { stage: '4. Initiated Checkout', count: viewMode === 'optimized' ? '6,800' : '2,900', drop: viewMode === 'optimized' ? '-53%' : '-57%', fill: viewMode === 'optimized' ? '13%' : '8%', reason: 'Cart drawer free shipping threshold & one-click checkout' },
                { stage: '5. Completed Transactions', count: viewMode === 'optimized' ? '3,400' : '1,450', drop: viewMode === 'optimized' ? '-50%' : '-50%', fill: viewMode === 'optimized' ? '7%' : '3.8%', reason: 'Friction-free one-page checkout and payment variety' },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`lve-funnel-step ${selectedFunnelIndex === idx ? 'is-selected' : ''}`}
                  onClick={() => setSelectedFunnelIndex(idx)}
                >
                  <div className="lve-funnel-step-icon">
                    <Activity size={16} />
                  </div>
                  <div className="lve-funnel-step-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="lve-funnel-step-title">{step.stage}</span>
                      <span className="lve-funnel-step-stats">
                        <strong>{step.count}</strong> visitors
                      </span>
                    </div>
                    <div className="lve-funnel-bar-track">
                      <div
                        className="lve-funnel-bar-fill"
                        style={{
                          width: step.fill,
                          background: viewMode === 'optimized' ? 'linear-gradient(90deg, #8b5cf6, #10b981)' : '#f43f5e',
                        }}
                      />
                    </div>
                  </div>
                  {idx > 0 && (
                    <span className="lve-funnel-drop-badge">{step.drop} drop-off</span>
                  )}
                </div>
              ))}
            </div>

            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Waterfall Analysis</span>
                <span className="lve-inspector-title">
                  {isArabic ? 'تحليل تسرب مسار الشراء' : 'Funnel Leakage & Cash Lift'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
                <div>
                  <strong>CVR Result:</strong>{' '}
                  <span style={{ color: viewMode === 'optimized' ? 'var(--success)' : 'var(--danger)', fontWeight: 800 }}>
                    {viewMode === 'optimized' ? '3.40% (+134% Lift)' : '1.45% Baseline'}
                  </span>
                </div>
                <div>
                  <strong>Total Monthly Revenue:</strong>{' '}
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>
                    {viewMode === 'optimized' ? '$238,000 / month' : '$101,500 / month'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
                  {isArabic
                    ? 'بنفس الميزانية الإعلانية بالضبط وبدون دفع أي دولار إضافي لجوجل أو ميتا، تطبيق التحسين يضاعف الأرباح الصافية بمقدار +136,500$ شهرياً.'
                    : 'With the exact same $30,000 ad budget, plugging leaks at step 3 and 4 generates +$136,500 in extra cash every single month.'}
                </div>
              </div>
              <div className="lve-inspector-impact">
                💡 <strong>Senior Insight:</strong> Never dump ad traffic onto un-audited PDPs. A 1% increase in ATC rate compounds into a 30%+ increase in final net cash.
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            MODEL C: UNIT ECONOMICS & PROFIT MARGIN MATRIX
            ========================================================= */}
        {explainerType === 'economics' && (
          <>
            <div className="lve-economics-grid">
              {/* Card 1: 20% Discount Trap */}
              <div className={`lve-econ-card ${selectedEconScenario === 'discount' ? 'is-loser' : ''}`} onClick={() => setSelectedEconScenario('discount')}>
                <div className="lve-econ-head">
                  <span className="lve-econ-name">20% Discount Trap</span>
                  <span className="lve-econ-tag" style={{ background: 'rgba(244, 63, 94, 0.2)', color: 'var(--danger)' }}>
                    Fails Margin Test
                  </span>
                </div>
                <div className="lve-econ-bars">
                  <div className="lve-econ-row">
                    <span>Retail Price:</span>
                    <strong>$80.00 (-$20)</strong>
                  </div>
                  <div className="lve-econ-row">
                    <span>Product COGS:</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$40.00</span>
                  </div>
                  <div className="lve-econ-row">
                    <span>Ad CAC per Order:</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$30.00</span>
                  </div>
                  <div className="lve-econ-row">
                    <span>Shipping & Packaging:</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$8.00</span>
                  </div>
                  <div className="lve-econ-row">
                    <span>Payment Processing (3%):</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$2.40</span>
                  </div>
                </div>
                <div className="lve-econ-profit-box" style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--danger)' }}>NET PROFIT PER ORDER:</span>
                  <strong style={{ fontSize: 16, color: 'var(--danger)' }}>-$0.40 (LOSS)</strong>
                </div>
              </div>

              {/* Card 2: Tiered Threshold Bundle */}
              <div className={`lve-econ-card ${selectedEconScenario === 'bundle' ? 'is-winner' : ''}`} onClick={() => setSelectedEconScenario('bundle')}>
                <div className="lve-econ-head">
                  <span className="lve-econ-name">Tiered Bundle Builder</span>
                  <span className="lve-econ-tag" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                    CRO Alchemist Winner
                  </span>
                </div>
                <div className="lve-econ-bars">
                  <div className="lve-econ-row">
                    <span>Average Order Value:</span>
                    <strong style={{ color: 'var(--success)' }}>$110.00 (+37%)</strong>
                  </div>
                  <div className="lve-econ-row">
                    <span>Product COGS (2 units):</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$52.00</span>
                  </div>
                  <div className="lve-econ-row">
                    <span>Ad CAC per Order:</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$30.00 (Fixed)</span>
                  </div>
                  <div className="lve-econ-row">
                    <span>Consolidated Shipping:</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$9.00</span>
                  </div>
                  <div className="lve-econ-row">
                    <span>Payment Processing:</span>
                    <span style={{ color: 'var(--text-muted)' }}>-$3.30</span>
                  </div>
                </div>
                <div className="lve-econ-profit-box" style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--success)' }}>NET PROFIT PER ORDER:</span>
                  <strong style={{ fontSize: 16, color: 'var(--success)' }}>+$15.70 (+100%)</strong>
                </div>
              </div>
            </div>

            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Unit Economics Law</span>
                <span className="lve-inspector-title">
                  {isArabic ? 'معادلة الربح الصافي الحقيقي' : 'The North Star Metric: RPS'}
                </span>
              </div>
              <p className="lve-inspector-desc">
                {isArabic
                  ? 'عندما تمنح خصماً 20%، فإن تكلفة البضاعة وتكلفة الإعلانات والشحن لا تنخفض! هذا يمحو 100% من أرباحك الصافية. في المقابل، تحفيز العميل على إضافة قطعة ثانية للوصول للشحن المجاني يضاعف الأرباح الصافية فوراً.'
                  : 'Fixed costs (COGS, Ad CAC, Shipping) do not scale down when you offer a discount. A 20% price cut erases 100% of your net margin! Tiered thresholds protect contribution margin and turn break-even stores into cash flow machines.'}
              </p>
              <div className="lve-inspector-impact">
                📊 <strong>RPS Equation:</strong> RPS = (CVR ÷ 100) × AOV. Never optimize CVR alone if AOV drops faster than conversion climbs.
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            MODEL D: SLIDE-OUT CART DRAWER ARCHITECTURE
            ========================================================= */}
        {explainerType === 'cart_drawer' && (
          <>
            <div style={{ background: 'var(--bg-app)', border: '1.5px solid var(--border-subtle)', borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Dynamic Free Shipping Bar */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 8 }}>
                  <span>
                    {cartProgressAdded
                      ? isArabic ? '🎉 مبروك! حصلت على الشحن المجاني السريع' : '🎉 You unlocked Free Express Shipping!'
                      : isArabic ? 'أضف 17$ للحصول على الشحن المجاني' : 'Add $17.00 more to unlock Free Express Shipping'}
                  </span>
                  <span style={{ color: 'var(--accent-primary)' }}>{cartProgressAdded ? '$75/$75' : '$58/$75'}</span>
                </div>
                <div style={{ width: '100%', height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: cartProgressAdded ? '100%' : '77%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #8b5cf6, #10b981)',
                      transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>
              </div>

              {/* Cart Item Row */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', background: 'var(--bg-surface)', padding: 12, borderRadius: 12, border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingCart size={18} color="var(--accent-primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Performance Hoodie</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Black / M · $58.00</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: 14 }}>$58.00</span>
              </div>

              {/* Interactive In-Cart Upsell Widget */}
              <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px dashed var(--accent-primary)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Sparkles size={16} color="var(--accent-primary)" />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Waterproof Care Spray</div>
                    <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Protect fabric · $17.00</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCartProgressAdded((prev) => !prev)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: cartProgressAdded ? 'var(--danger-muted)' : 'var(--accent-primary)',
                    color: cartProgressAdded ? 'var(--danger)' : '#fff',
                    fontWeight: 700,
                    fontSize: 11,
                    cursor: 'pointer',
                  }}
                >
                  {cartProgressAdded ? 'Remove' : '+ Add for $17'}
                </button>
              </div>

              {/* Checkout Bar */}
              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 12,
                  border: 'none',
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                }}
              >
                <Lock size={15} />
                <span>Checkout Now ({cartProgressAdded ? '$75.00' : '$58.00'})</span>
              </button>
            </div>

            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Cart Drawer Mechanics</span>
                <span className="lve-inspector-title">
                  {isArabic ? 'هندسة سلة الشراء الجانبية' : 'Instant AOV Expansion'}
                </span>
              </div>
              <p className="lve-inspector-desc">
                {isArabic
                  ? 'بدلاً من إعادة توجيه العميل لصفحة سلة منفصلة، سلة الشراء الجانبية تفتح فوراً في 60ms باستخدام Section Rendering API. وشريط الشحن المجاني التفاعلي يحفز 38% من المشترين على إضافة منتج إضافي.'
                  : 'Redirecting shoppers to a separate cart page creates a 40% bounce bottleneck. Slide-out cart drawers load instantly via Section Rendering API and use progress thresholds to trigger one-click upsells.'}
              </p>
              <div className="lve-inspector-impact">
                🚀 <strong>AOV Lift:</strong> Threshold progress bars increase average order value by +18% to +26% across 50,000+ customer sessions.
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            MODEL E: SHOPIFY LIQUID & EDGE PIPELINE
            ========================================================= */}
        {explainerType === 'liquid_pipeline' && (
          <>
            <div className="lve-pipeline-flow">
              {[
                { num: 1, title: 'Edge CDN Request (Cloudflare)', desc: 'Mobile visitor requests PDP. Edge cache checks for pre-warmed HTML.' },
                { num: 2, title: 'Server-Side Liquid Evaluation (under 80ms)', desc: 'Shopify Core evaluates Liquid templates, section settings, and blocks on server.' },
                { num: 3, title: 'Zero-CLS First Contentful Paint (under 1.1s)', desc: 'Browser receives pure server-rendered semantic HTML with critical inline CSS.' },
                { num: 4, title: 'Section Rendering API on Interaction', desc: 'When user changes variants or adds to cart, only the specific section re-renders.' },
                { num: 5, title: 'Asynchronous Web Pixels Telemetry', desc: 'Analytics dispatch via Web Workers without delaying checkout interaction.' },
              ].map((step) => (
                <div key={step.num} className="lve-pipeline-step">
                  <div className="lve-pipeline-num">{step.num}</div>
                  <div className="lve-pipeline-text">
                    <div className="lve-pipeline-heading">
                      <span>{step.title}</span>
                    </div>
                    <p className="lve-pipeline-sub">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Architecture Blueprint</span>
                <span className="lve-inspector-title">
                  {isArabic ? 'معمارية أداء المتجر' : 'Why Server Liquid Beats Heavy JS'}
                </span>
              </div>
              <p className="lve-inspector-desc">
                {isArabic
                  ? 'كل 100 ميلي ثانية تأخير في استجابة صفحة المتجر تكلف 1% خسارة في المبيعات. الاعتماد على معالجة Liquid في السيرفر يمنح المتجر سرعة قصوى بدون اهتزاز في العناصر (CLS = 0).'
                  : 'Every 100ms of theme latency drops conversions by 1%. Server-rendered Liquid achieves sub-second Largest Contentful Paint (LCP) and zero layout shift, ensuring shoppers never experience jumpy buttons.'}
              </p>
              <div className="lve-inspector-impact">
                ⚡ <strong>Speed Impact:</strong> Passing Core Web Vitals (LCP under 1.8s, CLS under 0.05) directly increases checkout progression by +12%.
              </div>
            </div>
          </>
        )}

        {/* =========================================================
            MODEL F: MOBILE THUMB ZONE HEATMAP
            ========================================================= */}
        {explainerType === 'thumb_zone' && (
          <>
            <div className="lve-phone-wrapper">
              <div className="lve-phone-frame">
                <div className="lve-phone-notch">
                  <div className="lve-notch-cam" />
                </div>
                <div className="lve-phone-screen" style={{ minHeight: 380, position: 'relative' }}>
                  {showThumbHeatmap && (
                    <div className="lve-heatmap-overlay">
                      <div className="lve-heat-red">
                        <span>🔴 Hard-to-Reach Zone (Top 25% — Hand Shift Required)</span>
                      </div>
                      <div className="lve-heat-yellow">
                        <span>🟡 Stretch Zone (Middle 35% — Thumb Extension)</span>
                      </div>
                      <div className="lve-heat-green">
                        <span>🟢 Natural Thumb Zone (Bottom 40% — Effortless 1-Hand Reach)</span>
                      </div>
                    </div>
                  )}

                  <div style={{ padding: 16, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Top Navigation & Brand Logo</div>
                    <div style={{ fontSize: 13, fontWeight: 700, textAlign: 'center', color: 'var(--text-primary)' }}>
                      Product Imagery & Details
                    </div>
                    <div style={{ padding: '12px 16px', background: '#10b981', color: '#fff', borderRadius: 10, textAlign: 'center', fontWeight: 800, fontSize: 13 }}>
                      Primary CTA: Sticky Add to Cart
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Mobile Ergonomics</span>
                <span className="lve-inspector-title">
                  {isArabic ? 'قانون منطقة الإبهام للهاتف' : 'The Steven Hoober Thumb Zone'}
                </span>
              </div>
              <p className="lve-inspector-desc">
                {isArabic
                  ? '75% من مستخدمي الهواتف يتصفحون بيد واحدة باستخدام إبهامهم فقط. وضع زر الشراء في المنطقة الخضراء السفلية يزيل أي إجهاد جسدي ويجعل الشراء فورياً.'
                  : 'Over 75% of smartphone users navigate with a single thumb. Forcing users to stretch to the top screen edge creates physical friction. Locking buy buttons to the bottom 40% natural zone eliminates drop-off.'}
              </p>
              <div className="lve-inspector-impact">
                📱 <strong>Ergonomics Rule:</strong> Primary checkout triggers belong exclusively in the green natural thumb zone.
              </div>
              <button
                type="button"
                onClick={() => setShowThumbHeatmap((prev) => !prev)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--border-subtle)',
                  background: showThumbHeatmap ? 'var(--accent-muted)' : 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: 'fit-content',
                }}
              >
                {showThumbHeatmap
                  ? isArabic ? 'إخفاء طبقة خريطة الإبهام' : 'Hide Thumb Heatmap Overlay'
                  : isArabic ? 'إظهار طبقة خريطة الإبهام' : 'Show Thumb Heatmap Overlay'}
              </button>
            </div>
          </>
        )}

        {/* =========================================================
            MODEL G: A/B TESTING STATISTICAL CONFIDENCE
            ========================================================= */}
        {explainerType === 'ab_testing_stats' && (
          <>
            <div style={{ background: 'var(--bg-app)', border: '1.5px solid var(--border-subtle)', borderRadius: 20, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)' }}>
                  Variant Distribution & Confidence Interval (95%)
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: '3px 8px', borderRadius: 6, background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', fontWeight: 800 }}>
                  P-Value = 0.018 (Significant)
                </span>
              </div>

              {/* Visual Simulated Curve Comparison */}
              <div style={{ height: 160, display: 'flex', alignItems: 'flex-end', gap: 8, padding: '10px 0', borderBottom: '2px solid var(--border-subtle)' }}>
                {/* Control Distribution */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '80%', height: 90, background: 'rgba(148, 163, 184, 0.25)', borderTop: '3px solid #94a3b8', borderRadius: '8px 8px 0 0' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>Control (2.1% CVR)</span>
                </div>
                {/* Variant B Distribution */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: '80%', height: 140, background: 'rgba(16, 185, 129, 0.25)', borderTop: '3px solid #10b981', borderRadius: '8px 8px 0 0' }} />
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#10b981' }}>Variant B (2.9% CVR Winner)</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)' }}>
                <span>Sample Size: <strong>14,200 sessions / variant</strong></span>
                <span>Statistical Power: <strong>84.2%</strong></span>
              </div>
            </div>

            <div className="lve-inspector-panel">
              <div className="lve-inspector-head">
                <span className="lve-inspector-badge">Statistical Rigor</span>
                <span className="lve-inspector-title">
                  {isArabic ? 'شروط إعلان الفائز إحصائياً' : 'The 95% Confidence Rule'}
                </span>
              </div>
              <p className="lve-inspector-desc">
                {isArabic
                  ? 'لا توقف اختبار التحويل قبل تحقيق عينة إحصائية كافية (عادة أسبوعين كاملين لتغطية أيام الأسبوع وعطلات نهاية الأسبوع) مع وصول P-value لأقل من 0.05 لمنع النتائج الزائفة.'
                  : 'Never stop an experiment early based on 3 days of data. You must reach predetermined sample size, test through 2 full business cycles (weekdays + weekends), and achieve P-value below 0.05 before declaring a winner.'}
              </p>
              <div className="lve-inspector-impact">
                🎯 <strong>Rigor Rule:</strong> False positives waste engineering resources. Always verify statistical significance before shipping code to production.
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
