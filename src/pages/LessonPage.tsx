import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Lightbulb,
  Check,
  ShoppingBag,
  ChevronRight,
  Calculator,
  Compass,
  XCircle,
  Type,
} from 'lucide-react';
import {
  getLessonBySlug,
  getLessonsByModuleId,
  getNextLessonSlug,
  getPrevLessonSlug,
} from '../data/lessons';
import { MODULES } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { CodeBlock } from '../components/ui/CodeBlock';
import { getLessonLanguageContent, translateTextContentToArabic } from '../services/lessonLanguageService';
import type { LessonSection } from '../types/curriculum';
import { registerConceptForReview } from '../services/spacedReviewService';
import './LessonPage.css';

const CALLOUT_CONFIG: Record<
  NonNullable<LessonSection['callout']>['type'],
  { label: string; icon: React.FC<{ size?: number; className?: string }>; styleClass: string }
> = {
  tip: { label: 'Key Insight', icon: Lightbulb, styleClass: 'lp-callout-tip' },
  warning: { label: 'Important Pitfall', icon: AlertTriangle, styleClass: 'lp-callout-warning' },
  note: { label: 'Formula & Metrics', icon: Calculator, styleClass: 'lp-callout-note' },
  shopify: { label: 'Shopify Implementation', icon: ShoppingBag, styleClass: 'lp-callout-shopify' },
};

/**
 * Formats inline **bold** and `code` cleanly without distracting boxes.
 */
function renderCleanInlineText(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={idx} className="lp-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

/**
 * Formats a list item line by bolding any "Label: " lead-in for effortless scanning.
 */
function renderListItemContent(rawLine: string): React.ReactNode {
  const cleaned = rawLine.replace(/^(\d+\.|[•\-*])\s+/, '').trim();
  const colonIdx = cleaned.indexOf(':');
  if (colonIdx > 0 && colonIdx < 55 && !cleaned.startsWith('**')) {
    const label = cleaned.slice(0, colonIdx + 1);
    const rest = cleaned.slice(colonIdx + 1);
    return (
      <span>
        <strong>{label}</strong>
        {renderCleanInlineText(rest)}
      </span>
    );
  }
  return <span>{renderCleanInlineText(cleaned)}</span>;
}

/**
 * Renders section prose into calm, high-legibility paragraphs and structured lists.
 */
function renderStructuredLessonProse(body: string): React.ReactNode {
  const blocks = body
    .split('\n\n')
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div className="lp-structured-prose">
      {blocks.map((block, bIdx) => {
        const lines = block
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);

        const listLines = lines.filter((l) => /^(\d+\.|[•\-*])\s+/.test(l));
        if (listLines.length > 0 && listLines.length >= lines.length - 1) {
          const introLine = !/^(\d+\.|[•\-*])\s+/.test(lines[0]) ? lines[0] : null;
          const items = introLine ? lines.slice(1) : lines;

          return (
            <div key={bIdx} className="lp-list-group">
              {introLine && (
                <p className="lp-list-intro">
                  {renderCleanInlineText(introLine)}
                </p>
              )}
              <ul className="lp-structured-list">
                {items.map((item, iIdx) => {
                  const numMatch = item.match(/^(\d+)\.\s+/);
                  const marker = numMatch ? numMatch[1] : '•';
                  return (
                    <li key={iIdx} className="lp-structured-list-item">
                      <span className="lp-structured-list-marker">{marker}</span>
                      <div style={{ flex: 1 }}>{renderListItemContent(item)}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }

        return <p key={bIdx}>{renderCleanInlineText(block)}</p>;
      })}
    </div>
  );
}

export const LessonPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    completedLessons,
    completeLesson,
    toggleLessonChecklistItem,
  } = useProgress();

  const lesson = getLessonBySlug(slug || '');
  const { isArabic } = useLanguage();

  const languageContent = useMemo(() => {
    if (!lesson) return null;
    return getLessonLanguageContent(lesson);
  }, [lesson]);

  const arData = isArabic ? languageContent?.arabic : null;
  const simpleEnData = languageContent?.simpleEnglish;

  const [readProgress, setReadProgress] = useState(0);

  // Deep concentration reader font and size preferences
  const [readingFont, setReadingFont] = useState<'focus-sans' | 'editorial-serif'>(() => {
    return (localStorage.getItem('cro_reader_font') as 'focus-sans' | 'editorial-serif') || 'focus-sans';
  });
  const [readingSize, setReadingSize] = useState<'regular' | 'large' | 'compact'>(() => {
    return (localStorage.getItem('cro_reader_size') as 'regular' | 'large' | 'compact') || 'regular';
  });

  const handleFontChange = (font: 'focus-sans' | 'editorial-serif') => {
    setReadingFont(font);
    localStorage.setItem('cro_reader_font', font);
  };

  const handleSizeToggle = () => {
    const nextSize = readingSize === 'regular' ? 'large' : readingSize === 'large' ? 'compact' : 'regular';
    setReadingSize(nextSize);
    localStorage.setItem('cro_reader_size', nextSize);
  };

  // Scroll to top on lesson switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Subtle reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const totalScroll = doc.scrollHeight - doc.clientHeight;
      if (totalScroll <= 0) {
        setReadProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      setReadProgress(Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lesson?.id]);

  if (!lesson) {
    return (
      <div className="lp-not-found-container">
        <Compass size={48} className="lp-not-found-icon" />
        <h2>Lesson Not Found</h2>
        <p>The lesson with slug &ldquo;{slug}&rdquo; could not be located in the curriculum.</p>
        <Link to="/curriculum" className="btn btn-primary" style={{ marginTop: 12 }}>
          Return to Curriculum Roadmap
        </Link>
      </div>
    );
  }

  const module = MODULES.find((m) => m.id === lesson.moduleId) || MODULES[0];
  const moduleLessons = getLessonsByModuleId(module.id);
  const currentLessonOrderInModule =
    moduleLessons.findIndex((l) => l.id === lesson.id) + 1;

  const nextSlug = getNextLessonSlug(lesson.slug);
  const prevSlug = getPrevLessonSlug(lesson.slug);

  const isCompleted = !!completedLessons[lesson.id];
  const checklistState = completedLessons[lesson.id]?.checklist || {};
  const checkedCount = lesson.checklist.filter((_, i) => checklistState[i]).length;

  const handleToggleCompletion = () => {
    completeLesson(lesson.id, checklistState);
    registerConceptForReview(
      `lesson-${lesson.id}`,
      lesson.title,
      lesson.slug,
      lesson.title,
      module.title,
      `What is the primary conversion rule taught in "${lesson.title}"?`,
      lesson.objectives[0] || lesson.title,
      simpleEnData?.coreIdea || lesson.objectives.join(' ')
    );
  };

  return (
    <article
      className={`lp-container font-${readingFont} size-${readingSize}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{ textAlign: isArabic ? 'right' : 'left' }}
    >
      {/* Subtle Top Reading Progress Line */}
      <div className="lp-reading-progress-track" aria-hidden="true">
        <div
          className="lp-reading-progress-fill"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* 1. Calm Lesson Header */}
      <header className="lp-header-card">
        <div className="lp-breadcrumb-row">
          <div className="lp-breadcrumbs">
            <Link to="/curriculum" className="lp-breadcrumb-link">
              {isArabic ? 'المنهج الدراسي' : 'Curriculum'}
            </Link>
            <ChevronRight size={13} className="lp-breadcrumb-sep" />
            <span className="lp-breadcrumb-current">{module.title}</span>
          </div>

          <div className="lp-meta-pills">
            {/* Concentration Reader Font Controls */}
            <div className="lp-reader-font-pill" role="group" aria-label="Reading typography">
              <button
                type="button"
                className={`lp-font-mode-btn ${readingFont === 'focus-sans' ? 'is-active' : ''}`}
                onClick={() => handleFontChange('focus-sans')}
                title="Focus Sans (Plus Jakarta Sans)"
              >
                Sans
              </button>
              <button
                type="button"
                className={`lp-font-mode-btn ${readingFont === 'editorial-serif' ? 'is-active' : ''}`}
                onClick={() => handleFontChange('editorial-serif')}
                title="Book Serif (Newsreader)"
              >
                Serif
              </button>
              <button
                type="button"
                className="lp-font-size-btn"
                onClick={handleSizeToggle}
                title={`Font Size: ${readingSize}`}
              >
                <Type size={12} />
                <span>{readingSize === 'regular' ? 'Aa' : readingSize === 'large' ? 'Aa+' : 'Aa-'}</span>
              </button>
            </div>

            <span className="lp-meta-pill">
              {isArabic
                ? `الدرس ${currentLessonOrderInModule} من ${moduleLessons.length}`
                : `Lesson ${currentLessonOrderInModule} of ${moduleLessons.length}`}
            </span>
            <span className="lp-meta-pill">
              <Clock size={12} />
              <span>{lesson.estimatedMinutes}m</span>
            </span>
            {isCompleted && (
              <span className="lp-meta-pill is-completed">
                <CheckCircle2 size={12} />
                <span>{isArabic ? 'مكتمل' : 'Completed'}</span>
              </span>
            )}
          </div>
        </div>

        <h1 className="lp-title">
          {isArabic && arData ? arData.title : lesson.title}
        </h1>

        <p className="lp-overview-lead">
          {isArabic && arData
            ? arData.subtitle || arData.keyTakeaway || arData.objectives[0]
            : simpleEnData?.coreIdea || lesson.objectives[0]}
        </p>

        <div className="lp-objectives-box">
          <div className="lp-objectives-label">
            {isArabic ? 'ماذا ستتعلم في هذا الدرس:' : 'What you will learn:'}
          </div>
          <ul className="lp-objectives-list">
            {(isArabic && arData ? arData.objectives : lesson.objectives).map((obj: string, idx: number) => (
              <li key={idx} className="lp-objective-item">
                <Check size={14} className="lp-objective-check" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* 2. Uninterrupted Core Lesson Sections */}
      <div className="lp-sections-stack">
        {lesson.sections.map((section, idx) => {
          const arSec = arData?.sections?.[idx];
          const sectionTitle = isArabic
            ? arSec?.heading || translateTextContentToArabic(section.heading)
            : section.heading;
          const sectionBody = isArabic
            ? arSec?.body || translateTextContentToArabic(section.body)
            : section.body;
          const calloutText = section.callout
            ? isArabic
              ? arSec?.calloutText || translateTextContentToArabic(section.callout.text)
              : section.callout.text
            : null;
          const calloutCfg = section.callout ? CALLOUT_CONFIG[section.callout.type] : null;
          const CalloutIcon = calloutCfg ? calloutCfg.icon : null;

          return (
            <section
              key={idx}
              className="lp-section-card"
              aria-labelledby={`section-heading-${idx}`}
            >
              <div className="lp-section-header">
                <span className="lp-section-index">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 id={`section-heading-${idx}`} className="lp-section-heading">
                  {sectionTitle}
                </h2>
              </div>

              <div className="lp-section-body">
                {renderStructuredLessonProse(sectionBody)}
              </div>

              {section.code && (
                <div className="lp-code-wrapper">
                  <CodeBlock
                    code={section.code}
                    language={section.language || 'liquid'}
                  />
                </div>
              )}

              {section.callout && calloutCfg && CalloutIcon && calloutText && (
                <aside className={`lp-callout-box ${calloutCfg.styleClass}`}>
                  <div className="lp-callout-header">
                    <CalloutIcon size={15} />
                    <span>{calloutCfg.label}</span>
                  </div>
                  <p className="lp-callout-text">
                    {renderCleanInlineText(calloutText)}
                  </p>
                </aside>
              )}
            </section>
          );
        })}
      </div>

      {/* 4. Actionable Summary: Mistakes to Avoid */}
      {lesson.mistakes.length > 0 && (
        <section className="lp-summary-grid" aria-label="Lesson Summary">
          <div className="lp-summary-box">
            <h3 className="lp-summary-title is-negative">
              <XCircle size={16} />
              <span>{isArabic ? 'أخطاء شائعة يجب تجنبها' : 'Common Mistakes to Avoid'}</span>
            </h3>
            <ul className="lp-summary-list">
              {(isArabic && arData?.mistakes
                ? arData.mistakes
                : lesson.mistakes
              ).map((mistake: string, mIdx: number) => (
                <li key={mIdx}>
                  <span className="lp-summary-bullet">✕</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 5. Self-Check Takeaways */}
      {lesson.checklist.length > 0 && (
        <section className="lp-checklist-card" aria-labelledby="lp-checklist-heading">
          <div className="lp-checklist-header">
            <h2 id="lp-checklist-heading" className="lp-checklist-title">
              {isArabic ? 'تأكد من استيعابك للنقاط الأساسية' : 'Key Takeaways Self-Check'}
            </h2>
            <span className="lp-checklist-counter">
              {checkedCount} / {lesson.checklist.length}
            </span>
          </div>
          <div className="lp-checklist-items">
            {lesson.checklist.map((item, idx) => {
              const checked = !!checklistState[idx];
              const displayItem = isArabic
                ? arData?.checklist?.[idx] || translateTextContentToArabic(item)
                : item;
              return (
                <label
                  key={idx}
                  className={`lp-checklist-row ${checked ? 'is-checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleLessonChecklistItem(lesson.id, idx)}
                    className="lp-checkbox-input"
                  />
                  <span className={`lp-checkbox-custom ${checked ? 'is-checked' : ''}`}>
                    {checked && <Check size={12} color="#fff" strokeWidth={3} />}
                  </span>
                  <span className="lp-checklist-label">{displayItem}</span>
                </label>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Clean Footer Navigation */}
      <footer className="lp-footer-navigation">
        <div>
          {prevSlug ? (
            <Link to={`/lesson/${prevSlug}`} className="btn btn-secondary lp-footer-btn">
              <ArrowLeft size={15} />
              <span>{isArabic ? 'الدرس السابق' : 'Previous Lesson'}</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        <div className="lp-footer-right">
          <button
            type="button"
            onClick={handleToggleCompletion}
            className={`btn ${
              isCompleted ? 'btn-secondary' : 'btn-primary'
            } lp-footer-complete-btn`}
          >
            <CheckCircle2 size={16} />
            <span>
              {isCompleted
                ? isArabic
                  ? 'تم إكمال الدرس ✓'
                  : 'Completed ✓'
                : isArabic
                ? 'إكمال الدرس'
                : 'Mark as Complete'}
            </span>
          </button>

          {nextSlug && (
            <Link to={`/lesson/${nextSlug}`} className="btn btn-primary lp-footer-btn">
              <span>{isArabic ? 'الدرس التالي' : 'Next Lesson'}</span>
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
};
