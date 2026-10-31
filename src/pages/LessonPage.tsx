import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  Check,
  FileText,
  ExternalLink,
  ShoppingBag,
  BookOpen,
  ChevronRight,
  Calculator,
  Compass,
  Video,
  Target,
  Layers,
  ChevronDown,
  ChevronUp,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getLessonBySlug,
  getLessonsByModuleId,
  getNextLessonSlug,
  getPrevLessonSlug,
} from '../data/lessons';
import { MODULES } from '../data/modules';
import { PHASES } from '../data/phases';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ArabicTermsBadge } from '../components/ui/ArabicTermsBadge';
import { findArabicTermsInText } from '../data/arabicTerms';
import { LessonVisualExampleCard } from '../components/ui/LessonVisualExampleCard';
import { LessonVisualExplainer } from '../components/ui/LessonVisualExplainer';
import { getLessonVisualExample } from '../data/lessonVisualExamples';
import { LessonAiChat } from '../components/ai/LessonAiChat';
import { LessonPracticalMission } from '../components/ui/LessonPracticalMission';
import { LessonPartPracticeCard } from '../components/ui/LessonPartPracticeCard';
import { getLessonLanguageContent, translateTextContentToArabic } from '../services/lessonLanguageService';
import type { LessonSection } from '../types/curriculum';
import { registerConceptForReview } from '../services/spacedReviewService';
import { addKnowledgeEntry } from '../services/knowledgeBaseService';
import './LessonPage.css';

const CALLOUT_CONFIG: Record<
  NonNullable<LessonSection['callout']>['type'],
  { label: string; icon: React.FC<{ size?: number; className?: string }>; styleClass: string }
> = {
  tip: { label: 'Senior CRO Tip', icon: Lightbulb, styleClass: 'lp-callout-tip' },
  warning: { label: 'Critical Pitfall & Risk', icon: AlertTriangle, styleClass: 'lp-callout-warning' },
  note: { label: 'Unit Economics & Math', icon: Calculator, styleClass: 'lp-callout-note' },
  shopify: { label: 'Shopify Architecture Blueprint', icon: ShoppingBag, styleClass: 'lp-callout-shopify' },
};

type LessonTabType = 'guide' | 'practice' | 'lab' | 'ai' | 'notes';

/**
 * Formats inline **bold** and `code` cleanly without distracting neon boxes.
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
 * Renders section prose into calm, high-legibility paragraphs and structured lists
 * so complex technical explanations are easy to read and never feel like a wall of text.
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
            <div key={bIdx} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {introLine && (
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
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
    completedExercises,
    completeLesson,
    toggleLessonChecklistItem,
    lessonNotes,
    saveLessonNote,
  } = useProgress();

  const lesson = getLessonBySlug(slug || '');
  const { isArabic } = useLanguage();

  const languageContent = useMemo(() => {
    if (!lesson) return null;
    return getLessonLanguageContent(lesson);
  }, [lesson]);

  const arData = isArabic ? languageContent?.arabic : null;
  const simpleEnData = languageContent?.simpleEnglish;

  // ---- State & Refs ----
  const [activeTab, setActiveTab] = useState<LessonTabType>('guide');
  const [noteContent, setNoteContent] = useState(
    lesson ? lessonNotes[lesson.id]?.content || '' : ''
  );
  const [lastSyncedLessonId, setLastSyncedLessonId] = useState(lesson?.id);
  const [expandedHelpers, setExpandedHelpers] = useState<Record<number, boolean>>({});
  const [noteSaved, setNoteSaved] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Sync note content and reset UI states when navigating between lessons
  if (lesson && lesson.id !== lastSyncedLessonId) {
    setLastSyncedLessonId(lesson.id);
    setNoteContent(lessonNotes[lesson.id]?.content || '');
    setActiveTab('guide');
    setExpandedHelpers({});
  }

  // Scroll to top on lesson switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Reading scroll progress
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

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (activeTab !== 'guide') return;
    const elements = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.sectionIndex);
            if (!isNaN(index)) setActiveSection(index);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lesson?.id, lesson?.sections, activeTab]);

  const scrollToSection = useCallback((idx: number) => {
    const target = sectionRefs.current[idx];
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }, []);

  const visualExample = useMemo(
    () => (lesson ? getLessonVisualExample(lesson) : null),
    [lesson]
  );

  const arabicTerms = useMemo(() => {
    if (!lesson) return [];
    const text = [
      lesson.title,
      ...lesson.objectives,
      ...lesson.sections.map((s) => s.heading + ' ' + s.body),
    ].join(' ');
    return findArabicTermsInText(text);
  }, [lesson]);

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
  const phase = PHASES.find((p) => p.id === module.phaseId) || PHASES[0];
  const moduleLessons = getLessonsByModuleId(module.id);
  const currentLessonOrderInModule =
    moduleLessons.findIndex((l) => l.id === lesson.id) + 1;

  const nextSlug = getNextLessonSlug(lesson.slug);
  const prevSlug = getPrevLessonSlug(lesson.slug);

  const isCompleted = !!completedLessons[lesson.id];
  const checklistState = completedLessons[lesson.id]?.checklist || {};
  const checkedCount = lesson.checklist.filter((_, i) => checklistState[i]).length;

  const totalPracticeCount = lesson.sections.filter((s) => s.practice).length;
  const solvedPracticeCount = lesson.sections.reduce((acc, s, idx) => {
    const partExId = s.practice?.id || `part-practice-${lesson.id}-${idx}`;
    return acc + (completedExercises[partExId] ? 1 : 0);
  }, 0);

  const handleSaveNote = () => {
    saveLessonNote(lesson.id, noteContent);
    setNoteSaved(true);
    if (noteContent.trim()) {
      addKnowledgeEntry({
        title: `Notes: ${lesson.title}`,
        category: 'explanation',
        content: noteContent.trim(),
        sourceLessonSlug: lesson.slug,
        sourceLessonTitle: lesson.title,
        tags: ['Lesson Note', module.title],
      });
    }
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleToggleCompletion = () => {
    completeLesson(lesson.id, checklistState);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.75 },
    });

    registerConceptForReview(
      lesson.id,
      lesson.title,
      lesson.slug,
      lesson.title,
      module.title,
      `Explain the core principle of "${lesson.title}" and how it directly improves Shopify conversion rate or buyer confidence.`,
      lesson.simpleEnglish?.keyTakeaway ||
        lesson.checklist[0] ||
        lesson.objectives[0] ||
        'Apply evidence-based CRO.',
      lesson.sections[0]?.body?.slice(0, 220) + '...'
    );
  };

  /**
   * Renders a single lesson section in a calm, distraction-free, linear flow:
   * 1. Key Concept Takeaway Banner
   * 2. Clean Editorial Prose & Lists
   * 3. Senior Callout Box
   * 4. Production Code Block
   * 5. Optional Clean Helper (Plain English & Real Shopify Store Example)
   */
  const renderMasterclassSectionContent = (section: LessonSection, idx: number) => {
    const arSec = arData?.sections[idx];
    const bodyDisplay = isArabic && arSec?.body ? arSec.body : section.body;
    const callout = section.callout
      ? CALLOUT_CONFIG[section.callout.type] || CALLOUT_CONFIG.note
      : null;
    const calloutTextDisplay =
      isArabic && arSec?.calloutText ? arSec.calloutText : section.callout?.text;

    const firstSentence =
      (bodyDisplay.split('\n\n')[0] || '').match(/[^.!?؟]+[.!?؟]+(\s|$)|[^.!?؟]+$/)?.[0]?.trim() ||
      lesson.objectives[idx] ||
      lesson.objectives[0];

    const sectionTakeaway = isArabic
      ? arSec?.simpleExplanation || firstSentence
      : lesson.simpleEnglish?.sectionSummaries?.[idx]?.simpleSummary || firstSentence;

    const isHelperOpen = !!expandedHelpers[idx];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* 1. Key Concept Takeaway Strip */}
        {sectionTakeaway && (
          <div className="lp-tldr-banner">
            <div className="lp-tldr-icon">
              <Lightbulb size={16} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="lp-tldr-kicker">
                {isArabic ? 'الخلاصة الأساسية لهذا القسم' : 'KEY CONCEPT TAKEAWAY'}
              </div>
              <p className="lp-tldr-text">{renderCleanInlineText(sectionTakeaway)}</p>
            </div>
          </div>
        )}

        {/* 2. Calm, Structured Editorial Prose & Lists */}
        {renderStructuredLessonProse(bodyDisplay)}

        {/* 3. Senior Callout Box */}
        {section.callout && callout && (
          <aside className={`lp-callout-box ${callout.styleClass}`} aria-label={callout.label}>
            <div className="lp-callout-header">
              <callout.icon size={16} className="lp-callout-icon" />
              <span className="lp-callout-badge-title">
                {isArabic ? 'ملاحظة هندسية وتطبيقية' : callout.label}
              </span>
            </div>
            <div className="lp-callout-content">
              {renderCleanInlineText(calloutTextDisplay || '')}
            </div>
          </aside>
        )}

        {/* 4. Production Code Block */}
        {section.code && (
          <div className="lp-code-container">
            <div className="lp-code-topbar">
              <div className="lp-code-dots" aria-hidden="true">
                <span className="lp-dot-red" />
                <span className="lp-dot-amber" />
                <span className="lp-dot-green" />
              </div>
              <span className="lp-code-lang-tag">{section.language || 'liquid'}</span>
            </div>
            <CodeBlock
              code={section.code}
              language={section.language || 'liquid'}
              showLineNumbers={true}
            />
          </div>
        )}

        {/* 5. Optional Clean Helper (Plain English & Real Shopify Store Example) */}
        <div className="lp-helper-drawer">
          <button
            type="button"
            className="lp-helper-toggle"
            onClick={() =>
              setExpandedHelpers((prev) => ({ ...prev, [idx]: !prev[idx] }))
            }
            aria-expanded={isHelperOpen}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <Sparkles size={15} color="var(--accent-primary)" />
              <span>
                {isArabic
                  ? '💡 هل تريد شرحاً مبسطاً ومثالاً واقعياً من متجر شوبيفاي؟'
                  : '💡 Plain-English Breakdown & Real Shopify Store Scenario'}
              </span>
            </span>
            {isHelperOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {isHelperOpen && (
            <div className="lp-helper-body animate-fade-in">
              <div className="lp-helper-col">
                <div className="lp-helper-col-title">
                  <Lightbulb size={13} />
                  <span>{isArabic ? 'بأبسط العبارات' : 'In Plain Everyday Language'}</span>
                </div>
                <p className="lp-helper-col-text">
                  {isArabic
                    ? arSec?.simpleExplanation ||
                      'الفكرة ببساطة هي إزالة أي حيرة أو عائق يواجه المتسوق وجعل خطوة الشراء التالية واضحة وسريعة.'
                    : lesson.simpleEnglish?.coreIdea ||
                      'Eliminate visual confusion and make the next buying action effortless for the shopper.'}
                </p>
              </div>

              <div className="lp-helper-col">
                <div className="lp-helper-col-title">
                  <ShoppingBag size={13} />
                  <span>{isArabic ? 'تطبيق واقعي في شوبيفاي' : 'Real Shopify Store Scenario'}</span>
                </div>
                <p className="lp-helper-col-text">
                  {isArabic
                    ? translateTextContentToArabic(
                        lesson.visualExample?.brandScenario ||
                          lesson.deepDive?.realWorldScenario ||
                          'On a high-traffic mobile Shopify store, applying this pattern removes hesitation above the fold and directly increases Add-to-Cart progression.'
                      )
                    : lesson.visualExample?.brandScenario ||
                      lesson.deepDive?.realWorldScenario ||
                      'On a high-traffic mobile Shopify store, applying this pattern removes hesitation above the fold and directly increases Add-to-Cart progression.'}
                </p>
              </div>

              <div className="lp-helper-col">
                <div className="lp-helper-col-title">
                  <Target size={13} />
                  <span>{isArabic ? 'الأثر على الأرباح' : 'Why It Matters Financially'}</span>
                </div>
                <p className="lp-helper-col-text">
                  {isArabic
                    ? translateTextContentToArabic(
                        lesson.deepDive?.clientPitchTip ||
                          'Even a +0.3% lift in conversion rate on 50,000 monthly sessions at $80 AOV generates +$12,000/month in incremental revenue with zero extra ad spend.'
                      )
                    : lesson.deepDive?.clientPitchTip ||
                      'Even a +0.3% lift in conversion rate on 50,000 monthly sessions at $80 AOV generates +$12,000/month in incremental revenue with zero extra ad spend.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const leakyDesc =
    (isArabic && arData?.mistakes?.[0] ? arData.mistakes[0] : null) ||
    visualExample?.baseline?.description ||
    lesson.mistakes[0] ||
    'Unclear visual hierarchy and hidden friction force shoppers to hunt for answers and abandon the session.';

  const alchemistDesc =
    (isArabic && arData?.checklist?.[0] ? arData.checklist[0] : null) ||
    visualExample?.optimized?.description ||
    lesson.checklist[0] ||
    lesson.objectives[0] ||
    'Clear visual hierarchy, fast server-rendered Liquid, and immediate risk-reversal build instant buyer confidence.';

  return (
    <div
      className={`lp-clean-wrapper animate-fade-in ${isArabic ? 'is-arabic-mode' : ''}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      key={lesson.id}
    >
      {/* Top Reading Progress Bar */}
      <div className="lp-reading-bar-track" aria-hidden="true">
        <div className="lp-reading-bar-fill" style={{ width: `${readProgress}%` }} />
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="lp-nav-breadcrumbs" aria-label="Breadcrumb">
        <Link to="/curriculum" className="lp-breadcrumb-link">
          {isArabic ? 'خارطة طريق المنهج' : 'Curriculum'}
        </Link>
        <ChevronRight size={13} className="lp-breadcrumb-sep" />
        <Link to={`/curriculum/${phase.id}/${module.id}`} className="lp-breadcrumb-link">
          {isArabic
            ? `المرحلة ${phase.order} · ${module.title}`
            : `Phase ${phase.order} · ${module.title}`}
        </Link>
        <ChevronRight size={13} className="lp-breadcrumb-sep" />
        <span className="lp-breadcrumb-active">
          {isArabic
            ? `الدرس ${currentLessonOrderInModule} من ${moduleLessons.length}`
            : `Lesson ${currentLessonOrderInModule} of ${moduleLessons.length}`}
        </span>
      </nav>

      {/* Module Lesson Switcher Strip */}
      {moduleLessons.length > 1 && (
        <div className="lp-module-strip" role="navigation" aria-label="Module Lessons">
          <div className="lp-module-strip-head">
            <span>
              {isArabic
                ? `دروس الوحدة ${module.order}: ${module.title}`
                : `Module ${module.order}: ${module.title} (${moduleLessons.length} Lessons)`}
            </span>
          </div>

          <div className="lp-module-lessons-row">
            {moduleLessons.map((mLesson, mIdx) => {
              const isCurrent = mLesson.id === lesson.id;
              const isDone = !!completedLessons[mLesson.id];
              return (
                <Link
                  key={mLesson.id}
                  to={`/lesson/${mLesson.slug}`}
                  className={`lp-module-lesson-Tab ${isCurrent ? 'is-current' : ''}`}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.75 }}>
                    {mIdx + 1}.
                  </span>
                  <span>{mLesson.title}</span>
                  {isDone && <CheckCircle2 size={13} color="var(--success)" />}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Calm Masterclass Header */}
      <header className="lp-clean-header">
        <div className="lp-header-meta">
          <span className="lp-meta-pill lp-meta-phase">
            Phase {phase.order} · Module {module.order}
          </span>
          <span className="lp-meta-pill lp-meta-time">
            <Clock size={12} />
            <span>~{lesson.estimatedMinutes} min masterclass</span>
          </span>
          <span className="lp-meta-pill lp-meta-xp">+20 XP</span>
          {isCompleted && (
            <span className="lp-meta-pill lp-meta-completed">
              <CheckCircle2 size={13} />
              <span>{isArabic ? 'مكتمل ✓' : 'Completed ✓'}</span>
            </span>
          )}
        </div>

        <h1 className="lp-clean-title">
          {isArabic && arData?.title ? arData.title : lesson.title}
        </h1>
        <p className="lp-clean-subtitle">
          {isArabic && arData?.subtitle
            ? arData.subtitle
            : `${module.title} — Shopify CRO & Engineering Masterclass`}
        </p>
      </header>

      {/* =========================================================
          FOCUS VIEW TABS NAVIGATION (ELIMINATES CLUTTER)
          ========================================================= */}
      <nav className="lp-focus-tabs-nav" role="tablist" aria-label="Lesson View Navigation">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'guide'}
          className={`lp-focus-tab-btn ${activeTab === 'guide' ? 'is-active' : ''}`}
          onClick={() => {
            setActiveTab('guide');
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
        >
          <BookOpen size={16} />
          <span>{isArabic ? '📖 دليل الدرس والشرح' : '📖 Lesson Guide'}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'practice'}
          className={`lp-focus-tab-btn ${activeTab === 'practice' ? 'is-active' : ''}`}
          onClick={() => {
            setActiveTab('practice');
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
        >
          <Target size={16} />
          <span>{isArabic ? '🎯 الاختبار والتطبيق' : '🎯 Practice & Quiz'}</span>
          {totalPracticeCount > 0 && (
            <span className="lp-tab-badge">
              {solvedPracticeCount}/{totalPracticeCount}
            </span>
          )}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'lab'}
          className={`lp-focus-tab-btn ${activeTab === 'lab' ? 'is-active' : ''}`}
          onClick={() => {
            setActiveTab('lab');
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
        >
          <ShoppingBag size={16} />
          <span>{isArabic ? '🛍️ مختبر المتجر' : '🛍️ Storefront Lab'}</span>
          <span className="lp-tab-badge lp-tab-badge-highlight">
            {isArabic ? 'تفاعلي' : 'Interactive'}
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ai'}
          className={`lp-focus-tab-btn ${activeTab === 'ai' ? 'is-active' : ''}`}
          onClick={() => {
            setActiveTab('ai');
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
        >
          <Sparkles size={16} />
          <span>{isArabic ? '🤖 المساعد الذكي' : '🤖 AI Mentor'}</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'notes'}
          className={`lp-focus-tab-btn ${activeTab === 'notes' ? 'is-active' : ''}`}
          onClick={() => {
            setActiveTab('notes');
            window.scrollTo({ top: 180, behavior: 'smooth' });
          }}
        >
          <FileText size={16} />
          <span>{isArabic ? '📝 ملاحظاتي' : '📝 My Notes'}</span>
          {noteContent.trim() && <span className="lp-tab-dot" />}
        </button>
      </nav>

      {/* =========================================================
          TAB 1: LESSON GUIDE (CALM, EDITORIAL READING EXPERIENCE)
          ========================================================= */}
      {activeTab === 'guide' && (
        <div className="lp-tab-panel animate-fade-in">
          {/* Executive Concept & Objectives Card */}
          <section className="lp-guide-intro-card" aria-labelledby="lp-guide-intro-heading">
            <div className="lp-guide-intro-header">
              <div className="lp-guide-intro-icon">
                <BookOpen size={18} />
              </div>
              <div>
                <h2 id="lp-guide-intro-heading" className="lp-guide-intro-title">
                  {isArabic
                    ? 'الخلاصة التنفيذية وما ستتعلمه'
                    : 'Executive Concept & What You Will Master'}
                </h2>
                <p className="lp-guide-intro-sub">
                  {isArabic
                    ? arData?.keyTakeaway || 'المبادئ الأساسية، الكود التطبيقي، والأثر المباشر على أرباح المتجر'
                    : simpleEnData?.coreIdea ||
                      lesson.simpleEnglish?.coreIdea ||
                      'Core mental models, Shopify architecture, and practical conversion execution'}
                </p>
              </div>
            </div>

            <div className="lp-guide-objectives-grid">
              {(isArabic && arData?.objectives ? arData.objectives : lesson.objectives).map(
                (obj, i) => (
                  <div key={i} className="lp-guide-objective-item">
                    <span className="lp-guide-obj-num">{i + 1}</span>
                    <span className="lp-guide-obj-text">{renderCleanInlineText(obj)}</span>
                  </div>
                )
              )}
            </div>

            {/* Expandable Key Terminology Reference Pill */}
            {simpleEnData?.simplifiedTerms &&
              simpleEnData.simplifiedTerms.length > 0 &&
              !isArabic && (
                <details className="lp-guide-terms-details">
                  <summary className="lp-guide-terms-summary">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <HelpCircle size={14} />
                      <span>Key Terminology in this Lesson ({simpleEnData.simplifiedTerms.length})</span>
                    </span>
                    <span className="lp-details-arrow">▼</span>
                  </summary>
                  <div className="lp-simplified-terms-grid" style={{ marginTop: 12 }}>
                    {simpleEnData.simplifiedTerms.map((term, tIdx) => (
                      <div key={tIdx} className="lp-simplified-term-item">
                        <div className="lp-simplified-term-name">{term.term}</div>
                        <div className="lp-simplified-term-desc">{term.simpleMeaning}</div>
                        {term.analogy && (
                          <div className="lp-simplified-term-analogy">{term.analogy}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </details>
              )}

            {/* Bilingual Arabic Terms Badge */}
            {arabicTerms.length > 0 && !isArabic && (
              <div style={{ paddingTop: 4 }}>
                <ArabicTermsBadge
                  terms={arabicTerms}
                  title="المصطلحات التعليمية للدرس (Lesson Terms in Arabic)"
                />
              </div>
            )}
          </section>

          {/* Real Interactive Visual Blueprint & Architectural Explainer */}
          <LessonVisualExplainer lesson={lesson} isArabic={isArabic} />

          {/* Sticky Section Quick Jump Bar */}
          {lesson.sections.length > 1 && (
            <nav className="lp-toc-bar" aria-label="Table of contents">
              <div className="lp-toc-label">{isArabic ? 'أقسام الشرح:' : 'IN THIS LESSON:'}</div>
              <div className="lp-toc-pills">
                {lesson.sections.map((sec, i) => {
                  const arHeading = arData?.sections[i]?.heading;
                  const headingText = isArabic && arHeading ? arHeading : sec.heading;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`lp-toc-pill ${activeSection === i ? 'is-active' : ''}`}
                      onClick={() => scrollToSection(i)}
                    >
                      <span className="lp-toc-num">{i + 1}.</span>
                      <span className="lp-toc-text">{headingText}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          )}

          {/* Main Educational Sections (Clean, focused reading) */}
          <main className="lp-sections-flow">
            {lesson.sections.map((section, idx) => {
              const arSec = arData?.sections[idx];
              const headingDisplay =
                isArabic && arSec?.heading ? arSec.heading : section.heading;

              return (
                <article
                  key={idx}
                  ref={(el) => {
                    sectionRefs.current[idx] = el;
                  }}
                  data-section-index={idx}
                  className="lp-section-card"
                >
                  <div className="lp-section-kicker">
                    <span className="lp-section-kicker-badge">
                      {lesson.sections.length > 1
                        ? isArabic
                          ? `القسم ${idx + 1} من ${lesson.sections.length}`
                          : `Part ${idx + 1} of ${lesson.sections.length}`
                        : isArabic
                        ? 'الشرح التقني الرئيسي'
                        : 'Core Masterclass'}
                    </span>
                  </div>

                  <h2 className="lp-section-heading">{headingDisplay}</h2>

                  {renderMasterclassSectionContent(section, idx)}
                </article>
              );
            })}
          </main>

          {/* Masterclass Real-World Shopify Implementation Playbook */}
          {lesson.deepDive && (
            <section className="lp-playbook-card" aria-label="Masterclass Implementation Playbook">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="lp-objectives-icon-wrap">
                  <Layers size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--accent-primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {isArabic
                      ? 'دليل التطبيق العملي خطوة بخطوة على شوبيفاي'
                      : 'REAL-WORLD SHOPIFY EXECUTION PLAYBOOK'}
                  </div>
                  <h2 style={{ fontSize: 19, fontWeight: 800, margin: '2px 0 0' }}>
                    {lesson.deepDive.title}
                  </h2>
                </div>
              </div>

              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                {lesson.deepDive.overview}
              </p>

              {/* Step-by-Step Technical Playbook */}
              <div className="lp-playbook-steps">
                {lesson.deepDive.technicalPlaybook.map((step, sIdx) => (
                  <div key={sIdx} className="lp-playbook-step">
                    <span className="lp-structured-list-marker">{sIdx + 1}</span>
                    <div style={{ flex: 1 }}>{renderListItemContent(step)}</div>
                  </div>
                ))}
              </div>

              {/* Client / Executive Pitch */}
              {lesson.deepDive.clientPitchTip && (
                <div
                  style={{
                    padding: '14px 18px',
                    borderRadius: '12px',
                    background: 'var(--bg-app)',
                    borderLeft: '4px solid var(--accent-secondary)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-primary)',
                  }}
                >
                  <strong style={{ display: 'block', fontSize: 12, color: 'var(--accent-secondary)', marginBottom: 4 }}>
                    {isArabic
                      ? '💡 كيف تشرح قيمة هذا التحسين لصاحب المتجر أو العميل:'
                      : '💡 How to Pitch This Optimization to a Store Founder or Client:'}
                  </strong>
                  {lesson.deepDive.clientPitchTip}
                </div>
              )}
            </section>
          )}

          {/* Embedded Video Walkthrough (if available) */}
          {lesson.videoSource && (
            <section className="lp-video-card" aria-label="Learning Video Source">
              <div className="lp-video-header">
                <div className="lp-video-icon-wrap">
                  <Video size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      flexWrap: 'wrap',
                      marginBottom: 4,
                    }}
                  >
                    <span className="badge badge-indigo">
                      {isArabic ? 'فيديو تطبيقي مكمل' : 'Supplemental Video Walkthrough'}
                    </span>
                    {lesson.videoSource.channel && (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'var(--accent-primary)',
                        }}
                      >
                        {lesson.videoSource.channel}
                      </span>
                    )}
                    {lesson.videoSource.duration && (
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        ⏱ {lesson.videoSource.duration}
                      </span>
                    )}
                  </div>
                  <h2 className="lp-video-title">{lesson.videoSource.title}</h2>
                </div>
              </div>

              <div className="lp-video-iframe-container">
                <iframe
                  src={lesson.videoSource.embedUrl}
                  title={lesson.videoSource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="lp-video-iframe"
                />
              </div>
            </section>
          )}

          {/* Further Reading */}
          {lesson.furtherReading.length > 0 && (
            <section className="lp-reading-section">
              <div className="lp-reading-header">
                <BookOpen size={14} />
                <span>
                  {isArabic
                    ? 'المصادر والتوثيق الرسمي لشوبيفاي'
                    : 'Official Documentation & Further Reading'}
                </span>
              </div>
              <div className="lp-reading-links">
                {lesson.furtherReading.map((fr, i) => (
                  <a
                    key={i}
                    href={fr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lp-reading-link"
                  >
                    <span>{fr.title}</span>
                    <ExternalLink size={12} />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Calm Next Action Banner */}
          <div className="lp-guide-next-banner">
            <div className="lp-guide-next-info">
              <div className="lp-guide-next-kicker">
                <Sparkles size={15} />
                <span>{isArabic ? 'أكملت قراءة محتوى الدرس!' : 'CORE READING COMPLETE'}</span>
              </div>
              <h3 className="lp-guide-next-title">
                {isArabic
                  ? 'هل أنت مستعد لاختبار فهمك وتطبيق ما تعلمته؟'
                  : 'Ready to test your understanding on real Shopify scenarios?'}
              </h3>
              <p className="lp-guide-next-desc">
                {isArabic
                  ? 'انتقل إلى تبويب التحديات والاختبارات لتأكيد إتقانك لكل قسم وتطبيق المهمة العملية على متجرك.'
                  : 'Jump into the Practice tab to solve the section quizzes, review costly pitfalls to avoid, and check off your mastery checklist.'}
              </p>
            </div>
            <div className="lp-guide-next-actions">
              <button
                type="button"
                className="btn btn-primary lp-guide-action-btn"
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
              >
                <Target size={16} />
                <span>{isArabic ? 'ابدأ الاختبار والتحديات →' : 'Start Practice & Quizzes →'}</span>
              </button>

              <button
                type="button"
                className={`btn ${isCompleted ? 'btn-secondary' : 'btn-outline'} lp-guide-action-btn`}
                onClick={handleToggleCompletion}
              >
                <CheckCircle2 size={16} />
                <span>
                  {isCompleted
                    ? isArabic
                      ? 'الدرس مكتمل ✓'
                      : 'Lesson Completed ✓'
                    : isArabic
                    ? 'تأكيد إكمال الدرس (+20 XP)'
                    : 'Mark as Complete (+20 XP)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: PRACTICE & QUIZ (FOCUSED REINFORCEMENT)
          ========================================================= */}
      {activeTab === 'practice' && (
        <div className="lp-tab-panel animate-fade-in">
          {/* Section-by-Section Comprehension Checks */}
          <section className="lp-practice-block">
            <div className="lp-practice-block-head">
              <div className="lp-objectives-icon-wrap">
                <Target size={18} />
              </div>
              <div>
                <h2 className="lp-practice-block-title">
                  {isArabic
                    ? 'اختبارات الفهم لكل قسم (تطبيق واقعي)'
                    : 'Section Comprehension Checks'}
                </h2>
                <p className="lp-practice-block-sub">
                  {isArabic
                    ? 'أجب عن أسئلة كل قسم لتأكيد فهمك العملي للمفاهيم واكتساب نقاط الخبرة.'
                    : 'Test your understanding of each section before modifying production themes.'}
                </p>
              </div>
            </div>

            <div className="lp-practice-list">
              {lesson.sections.map((section, sIdx) => {
                if (!section.practice) return null;
                const secTitle =
                  isArabic && arData?.sections[sIdx]?.heading
                    ? arData.sections[sIdx].heading
                    : section.heading;

                return (
                  <div key={sIdx} className="lp-practice-unit">
                    <div className="lp-practice-unit-head">
                      <span className="lp-practice-unit-badge">Part {sIdx + 1}</span>
                      <span className="lp-practice-unit-title">{secTitle}</span>
                    </div>
                    <LessonPartPracticeCard
                      lesson={lesson}
                      section={section}
                      sectionIndex={sIdx}
                      totalSections={lesson.sections.length}
                      isArabic={isArabic}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Common Mistakes & Pitfalls to Avoid */}
          {lesson.mistakes.length > 0 && (
            <section className="lp-mistakes-card" aria-labelledby="lp-mistakes-heading">
              <div className="lp-mistakes-header">
                <AlertTriangle size={18} className="lp-mistakes-icon" />
                <div>
                  <h2 id="lp-mistakes-heading" className="lp-mistakes-title">
                    {isArabic && arData?.mistakesHead
                      ? arData.mistakesHead
                      : 'Common Engineering & CRO Pitfalls to Avoid'}
                  </h2>
                  <p className="lp-mistakes-sub">
                    {isArabic
                      ? 'أخطاء شائعة تضر بنسبة التحويل أو تفسد نتائج الاختبارات'
                      : 'Mistakes that frequently hurt conversion rates or invalidate A/B test results'}
                  </p>
                </div>
              </div>

              <div className="lp-mistakes-grid">
                {(isArabic && arData?.mistakes ? arData.mistakes : lesson.mistakes).map(
                  (mistake, i) => (
                    <div key={i} className="lp-mistake-item">
                      <div className="lp-mistake-bullet">&#x2715;</div>
                      <div className="lp-mistake-body">{renderCleanInlineText(mistake)}</div>
                    </div>
                  )
                )}
              </div>
            </section>
          )}

          {/* Interactive Comprehension & Launch Checklist */}
          <section className="lp-checklist-card" aria-labelledby="lp-checklist-heading">
            <div className="lp-checklist-header">
              <div className="lp-checklist-icon-wrap">
                <Sparkles size={16} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 id="lp-checklist-heading" className="lp-checklist-title">
                  {isArabic && arData?.checklistHead
                    ? arData.checklistHead
                    : 'Mastery & Implementation Checklist'}
                </h2>
                <p className="lp-checklist-sub">
                  {isArabic
                    ? 'تحقق من إتقانك للمهارات الأساسية في هذا الدرس'
                    : 'Check off each competency to verify your mastery before moving to the next lesson'}
                </p>
              </div>
              <div className="lp-checklist-count">
                {checkedCount} / {lesson.checklist.length} Verified
              </div>
            </div>

            <div className="lp-checklist-items">
              {(isArabic && arData?.checklist ? arData.checklist : lesson.checklist).map(
                (item, idx) => {
                  const isChecked = !!checklistState[idx];
                  return (
                    <div
                      key={idx}
                      className={`lp-check-row ${isChecked ? 'is-checked' : ''}`}
                      onClick={() => toggleLessonChecklistItem(lesson.id, idx)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          toggleLessonChecklistItem(lesson.id, idx);
                        }
                      }}
                    >
                      <div className="lp-check-square">
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="lp-check-label">{renderCleanInlineText(item)}</span>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* Practical Real-Store Mission */}
          <LessonPracticalMission
            lesson={lesson}
            module={module}
            phase={phase}
            isArabic={isArabic}
          />
        </div>
      )}

      {/* =========================================================
          TAB 3: STOREFRONT LAB (INTERACTIVE BEFORE/AFTER TEARDOWN)
          ========================================================= */}
      {activeTab === 'lab' && (
        <div className="lp-tab-panel animate-fade-in">
          {/* Before vs. After Storefront Snapshot */}
          <div className="lp-xray-compare-grid">
            <div className="lp-xray-card is-leaky">
              <div className="lp-xray-header">
                <span className="lp-xray-badge">
                  <XCircle size={12} />
                  {isArabic ? 'قبل التحسين (تسرب المبيعات)' : 'Common Storefront Leak (Before)'}
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                {renderCleanInlineText(leakyDesc)}
              </p>
            </div>

            <div className="lp-xray-card is-alchemist">
              <div className="lp-xray-header">
                <span className="lp-xray-badge">
                  <CheckCircle2 size={12} />
                  {isArabic ? 'بعد تطبيق هندسة CRO' : 'Masterclass Solution (After)'}
                </span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)', margin: 0 }}>
                {renderCleanInlineText(alchemistDesc)}
              </p>
            </div>
          </div>

          {/* Real Interactive Visual Blueprint & Architectural Explainer */}
          <LessonVisualExplainer lesson={lesson} isArabic={isArabic} />

          {/* Interactive Visual Storefront Sandbox */}
          {visualExample && (
            <section className="lp-sandbox-standalone">
              <LessonVisualExampleCard example={visualExample} />
            </section>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 4: AI MENTOR (INTERACTIVE CHAT)
          ========================================================= */}
      {activeTab === 'ai' && (
        <div className="lp-tab-panel animate-fade-in">
          <div className="lp-ai-mentor-container">
            <LessonAiChat lesson={lesson} module={module} phase={phase} />
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: PERSONAL STUDY NOTES & VAULT
          ========================================================= */}
      {activeTab === 'notes' && (
        <div className="lp-tab-panel animate-fade-in">
          <section className="lp-notes-card" aria-labelledby="lp-notes-heading">
            <div className="lp-notes-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileText size={16} className="lp-notes-icon" />
                <div>
                  <h2 id="lp-notes-heading" className="lp-notes-title">
                    {isArabic
                      ? 'ملاحظاتك الخاصة وخلاصة الدرس (تُحفظ في قاعدة المعرفة)'
                      : 'Personal Study Notes (Saved to Knowledge Vault)'}
                  </h2>
                  <p style={{ fontSize: 12.5, color: 'var(--text-muted)', margin: '2px 0 0' }}>
                    {isArabic
                      ? 'دون استنتاجاتك، أكوادك البرمجية، أو فرضيات الاختبار الخاصة بمتجرك.'
                      : 'Write your takeaways, Liquid snippets, or hypothesis ideas. Automatically saved.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSaveNote}
                className={`btn btn-sm ${noteSaved ? 'btn-primary' : 'btn-secondary'}`}
              >
                {noteSaved
                  ? isArabic
                    ? '✓ تم الحفظ'
                    : '✓ Saved to Vault'
                  : isArabic
                  ? 'حفظ الملاحظات'
                  : 'Save Notes'}
              </button>
            </div>
            <textarea
              className="lp-notes-input"
              rows={12}
              placeholder={
                isArabic
                  ? 'اكتب ملاحظاتك، أكوادك البرمجية، أو النقاط التي تريد مراجعتها لاحقاً...'
                  : 'Write your takeaways, Liquid snippets, or implementation reminders for this lesson...'
              }
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
          </section>
        </div>
      )}

      {/* =========================================================
          UNIVERSAL FOOTER NAVIGATION (PREV / COMPLETE / NEXT)
          ========================================================= */}
      <footer className="lp-footer-navigation">
        <div>
          {prevSlug ? (
            <Link to={`/lesson/${prevSlug}`} className="btn btn-secondary lp-footer-btn">
              <ArrowLeft size={14} />
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
                  : 'Lesson Completed ✓'
                : isArabic
                ? 'تأكيد إكمال الدرس (+20 XP)'
                : 'Mark as Complete (+20 XP)'}
            </span>
          </button>

          {nextSlug && (
            <Link to={`/lesson/${nextSlug}`} className="btn btn-primary lp-footer-btn">
              <span>{isArabic ? 'الدرس التالي' : 'Next Lesson'}</span>
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};
