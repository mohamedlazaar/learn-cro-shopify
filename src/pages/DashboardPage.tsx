import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  Wrench,
  BookMarked,
  Brain,
  ChevronDown,
  ChevronUp,
  Coffee,
  Lightbulb,
  Check,
  Briefcase,
  Award,
  AlertCircle,
  HelpCircle,
  Zap,
  Flame,
  CheckSquare,
  BatteryCharging,
  BatteryLow,
  Layers,
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ALL_LESSONS } from '../data/lessons';
import { CRO_LAB_SCENARIOS } from '../data/croLabScenarios';
import {
  getDueReviews,
  recordReviewAttempt,
  SpacedReviewItem,
} from '../services/spacedReviewService';
import { loadKnowledgeBase } from '../services/knowledgeBaseService';
import { evaluateActiveRecall, ActiveRecallFeedback } from '../services/croCoachEvaluator';
import { getLessonLanguageContent } from '../services/lessonLanguageService';
import { getLevelProgress } from '../services/gamification';
import './DashboardPage.css';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { completedLessons, gamification, triggerConfetti } = useProgress();
  const { t, isArabic } = useLanguage();

  const levelInfo = getLevelProgress(gamification.xp);
  const completedCount = Object.keys(completedLessons).length;

  // Energy Mode: standard (12-15 min) or low-energy (5 min)
  const [isLowEnergy, setIsLowEnergy] = useState<boolean>(() => {
    return localStorage.getItem('cro_energy_mode') === 'low';
  });

  const handleToggleEnergy = (mode: 'standard' | 'low') => {
    setIsLowEnergy(mode === 'low');
    localStorage.setItem('cro_energy_mode', mode);
  };

  // Spaced review state
  const [dueReviews, setDueReviews] = useState<SpacedReviewItem[]>(() => getDueReviews());
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [showReviewAnswer, setShowReviewAnswer] = useState(false);
  const [reviewAnswerInput, setReviewAnswerInput] = useState('');
  const [reviewFeedback, setReviewFeedback] = useState<ActiveRecallFeedback | null>(null);

  // Skill tree expanded state (default open so the creative map is immediately visible!)
  const [isCurriculumExpanded, setIsCurriculumExpanded] = useState(true);

  // Determine next uncompleted lesson
  const nextLesson = useMemo(() => {
    const uncompleted = ALL_LESSONS.find((l) => !completedLessons[l.id]);
    return uncompleted || ALL_LESSONS[0];
  }, [completedLessons]);

  // Featured CRO Lab scenario
  const featuredLab = CRO_LAB_SCENARIOS[0];

  // Knowledge base stats
  const kbCount = useMemo(() => loadKnowledgeBase().length, []);

  // Handle active recall review rating
  const handleReviewOutcome = (outcome: 'struggled' | 'recalled' | 'mastered') => {
    const current = dueReviews[activeReviewIndex];
    if (!current) return;

    recordReviewAttempt(current.id, outcome, reviewAnswerInput);
    triggerConfetti();

    setShowReviewAnswer(false);
    setReviewAnswerInput('');
    setReviewFeedback(null);

    if (activeReviewIndex < dueReviews.length - 1) {
      setActiveReviewIndex((prev) => prev + 1);
    } else {
      setDueReviews(getDueReviews());
      setActiveReviewIndex(0);
    }
  };

  const currentReview = dueReviews[activeReviewIndex];

  // The 6 Pedagogical Learning Worlds
  const stages = [
    {
      num: 1,
      accent: '#a3e635',
      titleEn: 'CRO Fundamentals & Conversion Psychology',
      titleAr: 'أسس تحسين التحويل وعلم النفس الإدراكي للمتسوق',
      weeks: isArabic ? 'العالم 01' : 'WORLD 01',
      count: isArabic ? '12 مهمة' : '12 Quests',
      slug: 'lesson-1',
    },
    {
      num: 2,
      accent: '#22d3ee',
      titleEn: 'Customer Research & Behavioral Evidence',
      titleAr: 'أبحاث العملاء وجمع الأدلة السلوكية والخرائط الحرارية',
      weeks: isArabic ? 'العالم 02' : 'WORLD 02',
      count: isArabic ? '10 مهام' : '10 Quests',
      slug: 'lesson-3',
    },
    {
      num: 3,
      accent: '#8b5cf6',
      titleEn: 'Storefront Surface Surgery (PDP, Cart, Mobile)',
      titleAr: 'تشريح واجهات المتجر (صفحة المنتج، سلة الشراء، الجوال)',
      weeks: isArabic ? 'العالم 03' : 'WORLD 03',
      count: isArabic ? '14 مهمة' : '14 Quests',
      slug: 'lesson-9',
    },
    {
      num: 4,
      accent: '#fb7185',
      titleEn: 'Hypothesis Engineering, Prioritization & Roadmaps',
      titleAr: 'بناء الفرضيات، أطر الأولويات وخارطة طريق التجارب',
      weeks: isArabic ? 'العالم 04' : 'WORLD 04',
      count: isArabic ? '12 مهمة' : '12 Quests',
      slug: 'lesson-5',
    },
    {
      num: 5,
      accent: '#fbbf24',
      titleEn: 'Measurement, Statistics & Experimentation Rigor',
      titleAr: 'الإحصاء التجاري، حجم العينات وقواعد الدقة العلمية',
      weeks: isArabic ? 'العالم 05' : 'WORLD 05',
      count: isArabic ? '14 مهمة' : '14 Quests',
      slug: 'lesson-6',
    },
    {
      num: 6,
      accent: '#34d399',
      titleEn: 'Integrated Real-World Storefront Case Studies',
      titleAr: 'تطبيقات عملية متكاملة ومشاريع حقيقية على شوبيفاي',
      weeks: isArabic ? 'العالم 06' : 'WORLD 06',
      count: isArabic ? '14 مهمة' : '14 Quests',
      slug: 'lesson-13',
    },
  ];

  const nextLang = getLessonLanguageContent(nextLesson);
  const arTitle = nextLang.arabic?.title;
  const arObj = nextLang.arabic?.objectives?.[0];

  return (
    <div className="tp-dashboard animate-fade-in">
      {/* SECTION 1: ALCHEMIST COMMAND DECK & BRAIN BATTERY REACTOR */}
      <div className="tp-coach-header cyber-corner-box">
        <div className="tp-coach-left">
          <div className="tp-coach-kicker-row">
            <span className="arcade-sticker">
              <Zap size={12} /> {isArabic ? 'لوحة قيادة الخيميائي' : 'MISSION CONTROL // HUD'}
            </span>
            <span className="tp-rank-chip">
              🏆 {levelInfo.rank} (LVL {levelInfo.currentLevel})
            </span>
          </div>

          <h1 className="tp-coach-title">
            {isLowEnergy
              ? isArabic
                ? 'وضع البطارية الهادئة مفعل ☕'
                : 'Cozy Low-Battery Mode Active ☕'
              : isArabic
              ? `${t('dash.welcome')}، ${user?.name || 'يا بطل التحويل'} ⚡`
              : `${t('dash.welcome')}, ${user?.name || 'Alchemist'} ⚡`}
          </h1>

          <p className="tp-coach-subtitle">
            {isLowEnergy
              ? isArabic
                ? 'تمرين استرجاع خفيف مدته 5 دقائق فقط. الاستمرارية الهادئة تبني الاحتراف.'
                : 'One gentle 5-minute synapse spark. Zero pressure—consistency beats intensity.'
              : t('dash.subtitle')}
          </p>

          {/* Mini Telemetry Pills */}
          <div className="tp-mini-telemetry-row">
            <div className="tp-stat-chip">
              <Flame size={14} color="#f97316" fill="#f97316" />
              <span><strong>{gamification.streak}d</strong> {isArabic ? 'حماس' : 'Streak'}</span>
            </div>
            <div className="tp-stat-chip">
              <Sparkles size={14} color="#a3e635" />
              <span><strong>{gamification.xp}</strong> XP</span>
            </div>
            <div className="tp-stat-chip">
              <CheckCircle2 size={14} color="#22d3ee" />
              <span><strong>{completedCount}</strong> {isArabic ? 'مهمة منجزة' : 'Quests Cleared'}</span>
            </div>
            <div className="tp-stat-chip">
              <BookMarked size={14} color="#c084fc" />
              <span><strong>{kbCount}</strong> {isArabic ? 'ملاحظات' : 'Vault Notes'}</span>
            </div>
          </div>
        </div>

        {/* Interactive Brain Battery Reactor Switcher */}
        <div className="tp-battery-widget">
          <div className="tp-battery-header">
            <span>{isArabic ? 'طاقة التركيز اليوم' : 'BRAIN BATTERY MODE'}</span>
            <div className="tp-battery-cells" aria-hidden="true">
              <span className={`cell on ${isLowEnergy ? 'amber' : 'lime'}`} />
              <span className={`cell on ${isLowEnergy ? 'amber' : 'lime'}`} />
              <span className={`cell ${!isLowEnergy ? 'on lime' : ''}`} />
              <span className={`cell ${!isLowEnergy ? 'on lime' : ''}`} />
            </div>
          </div>

          <div className="tp-energy-toggle" role="radiogroup" aria-label="Learning Mode">
            <button
              type="button"
              className={`tp-energy-btn ${!isLowEnergy ? 'active-lime' : ''}`}
              onClick={() => handleToggleEnergy('standard')}
            >
              <BatteryCharging size={14} />
              <span>{isArabic ? 'قياسي (12 د)' : 'Overdrive (12m)'}</span>
            </button>
            <button
              type="button"
              className={`tp-energy-btn ${isLowEnergy ? 'active-amber' : ''}`}
              onClick={() => handleToggleEnergy('low')}
            >
              <BatteryLow size={14} />
              <span>{isArabic ? 'خفيف (5 د)' : 'Cozy (5m)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: TODAY'S BOSS QUEST BOARDING PASS (HOLOGRAPHIC TICKET) */}
      <div className="tp-quest-ticket">
        <div className="tp-ticket-main">
          <div className="tp-hero-top">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span className="arcade-sticker arcade-sticker-cyan">
                {isLowEnergy
                  ? isArabic ? '⚡ مهمة سريعة (5 دقائق)' : '⚡ 5-MIN MICRO-SPARK'
                  : isArabic ? '🎯 المهمة الرئيسية اليوم' : '🎯 TODAY’S FEATURED QUEST'}
              </span>
              <span className="badge badge-indigo">
                +50 XP BOUNTY
              </span>
            </div>

            <div className="tp-duration-badge">
              <Clock size={14} />
              <span>
                {isLowEnergy
                  ? isArabic ? '~5 دقائق' : '~5 MIN'
                  : `${nextLesson.estimatedMinutes || 12} ${isArabic ? 'دقيقة' : 'MIN'}`}
              </span>
            </div>
          </div>

          <div>
            <h2 className="tp-hero-title">
              {isArabic && arTitle ? arTitle : nextLesson.title}
            </h2>
            <p className="tp-hero-desc">
              {isArabic && arObj
                ? `الهدف التطبيقي: ${arObj}`
                : nextLesson.objectives[0]
                ? `Mission Objective: ${nextLesson.objectives[0]}`
                : 'Diagnose observable storefront friction, teach the concept back in plain words, and run clinical surgery on a Shopify store.'}
            </p>
          </div>

          {/* 3 Visual Quest Checkpoints */}
          <div className="tp-quest-checkpoints">
            <div className="tp-checkpoint-pill">
              <span className="cp-num">01</span>
              <span>{isArabic ? 'استدعاء نشط' : 'Active Recall Spark'}</span>
            </div>
            <span className="cp-arrow">→</span>
            <div className="tp-checkpoint-pill">
              <span className="cp-num">02</span>
              <span>{isArabic ? 'تقنية فاينمان' : 'Feynman Teach-Back'}</span>
            </div>
            <span className="cp-arrow">→</span>
            <div className="tp-checkpoint-pill">
              <span className="cp-num">03</span>
              <span>{isArabic ? 'تطبيق متجر' : 'Storefront Surgery'}</span>
            </div>
          </div>

          <div className="tp-ticket-actions">
            <Link to={`/session/${nextLesson.slug}`} className="btn btn-primary btn-lg">
              <Zap size={18} />
              <span>{t('dash.startRecommended')}</span>
              <ArrowRight size={17} />
            </Link>

            <Link to={`/lesson/${nextLesson.slug}`} className="btn btn-secondary">
              <BookOpen size={15} />
              <span>{isArabic ? 'المرجع الكامل للدرس' : 'Open Full Blueprint Doc'}</span>
            </Link>
          </div>
        </div>

        {/* Perforated Tear-Off Ticket Stub */}
        <div className="tp-ticket-perforation" aria-hidden="true" />

        <div className="tp-ticket-stub">
          <div className="stub-label">QUEST CARTRIDGE</div>
          <div className="stub-code">#{nextLesson.slug.toUpperCase()}</div>
          <div className="stub-ring-box">
            <span style={{ fontSize: 28 }}>🧪</span>
          </div>
          <div className="stub-meta">
            {isArabic ? 'تقييم فوري + حفظ بالذاكرة' : 'INSTANT AI COACH + SPACED MEMORY'}
          </div>
          <div className="stub-barcode" aria-hidden="true">|| |||| | ||| ||||</div>
        </div>
      </div>

      {/* SECTION 3: SYNAPSE MEMORY ARCADE (3D STACKED FLASHCARD DECK) */}
      <div className="tp-review-card cyber-corner-box">
        <div className="tp-review-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div className="tp-synapse-icon">
              <Brain size={19} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  {t('dash.dueReviewsTitle')}
                </h2>
                <span className="arcade-sticker" style={{ fontSize: 10, padding: '2px 8px' }}>
                  {dueReviews.length} CARDS DUE
                </span>
              </div>
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>
                {t('dash.dueReviewsSubtitle')}
              </span>
            </div>
          </div>
        </div>

        {dueReviews.length === 0 ? (
          <div className="tp-review-empty">
            <div className="tp-empty-trophy">🎉</div>
            <h3 style={{ fontSize: 17, marginBottom: 4 }}>
              {isArabic ? 'ذاكرتك في قمة نشاطها اليوم!' : 'All Synapses Charged & Up to Date!'}
            </h3>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
              {t('dash.noReviewsDue')}
            </p>
          </div>
        ) : currentReview ? (
          <div className="tp-flashcard-stack">
            <div className="tp-review-item-box animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <span className="badge badge-indigo">⚡ {currentReview.category}</span>
                <span className="tp-card-counter">
                  {isArabic
                    ? `بطاقة ${activeReviewIndex + 1} من ${dueReviews.length}`
                    : `FLASHCARD ${activeReviewIndex + 1} // ${dueReviews.length}`}
                </span>
              </div>

              <div className="tp-flashcard-question">
                {currentReview.retrievalQuestion}
              </div>

              {!showReviewAnswer ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <input
                    type="text"
                    className="input"
                    placeholder={
                      isArabic
                        ? 'اكتب ما تتذكره هنا قبل قلب البطاقة (يقوي الذاكرة طويلة المدى 3x)...'
                        : 'Type your intuition before flipping the card (3x stronger memory encoding)...'
                    }
                    value={reviewAnswerInput}
                    onChange={(e) => setReviewAnswerInput(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: 'fit-content' }}
                    onClick={() => {
                      if (reviewAnswerInput.trim()) {
                        const fb = evaluateActiveRecall({
                          userText: reviewAnswerInput,
                          question: currentReview.retrievalQuestion,
                          coreTakeaway: currentReview.keyTakeaway,
                          isArabic,
                        });
                        setReviewFeedback(fb);
                        if (fb.verdict === 'correct') {
                          triggerConfetti();
                        }
                      } else {
                        setReviewFeedback(null);
                      }
                      setShowReviewAnswer(true);
                    }}
                  >
                    <Check size={15} />
                    <span>{isArabic ? 'اقلب البطاقة وقيم إجابتي' : 'Flip Flashcard & Evaluate Recall'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="animate-fade-in">
                  {reviewFeedback && (
                    <div className="lp-recall-eval-card" style={{ padding: 18, gap: 14 }}>
                      <div className="lp-recall-user-quote" style={{ padding: '8px 12px' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 2 }}>
                          {isArabic ? 'إجابتك المسترجعة:' : 'Your Recalled Attempt:'}
                        </div>
                        <div style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: 13 }}>
                          "{reviewAnswerInput}"
                        </div>
                      </div>

                      <div className={`lp-recall-eval-banner is-${reviewFeedback.verdict}`} style={{ padding: '12px 14px' }}>
                        <div className="lp-recall-eval-title" style={{ fontSize: 14 }}>
                          {reviewFeedback.verdict === 'correct' ? (
                            <CheckCircle2 size={16} color="#10b981" />
                          ) : reviewFeedback.verdict === 'partial' ? (
                            <HelpCircle size={16} color="#f59e0b" />
                          ) : (
                            <AlertCircle size={16} color="#8b5cf6" />
                          )}
                          <span>{reviewFeedback.verdictTitle}</span>
                        </div>
                        <p className="lp-recall-eval-summary" style={{ fontSize: 13 }}>
                          {reviewFeedback.accuracySummary}
                        </p>
                      </div>

                      <div className="lp-recall-eval-grid">
                        <div className="lp-recall-eval-col" style={{ padding: 12 }}>
                          <div className="lp-recall-eval-col-head" style={{ color: '#10b981', fontSize: 11.5 }}>
                            <CheckCircle2 size={13} />
                            <span>{isArabic ? 'ما أصبت فيه' : 'What You Nailed'}</span>
                          </div>
                          <ul className="lp-recall-eval-list" style={{ fontSize: 12 }}>
                            {reviewFeedback.whatYouNailed.map((point, idx) => (
                              <li key={idx}>
                                <Check size={12} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="lp-recall-eval-col" style={{ padding: 12 }}>
                          <div className="lp-recall-eval-col-head" style={{ color: '#f59e0b', fontSize: 11.5 }}>
                            <Lightbulb size={13} />
                            <span>{isArabic ? 'كيف تطور إجابتك' : 'How to Level Up'}</span>
                          </div>
                          <ul className="lp-recall-eval-list" style={{ fontSize: 12 }}>
                            {reviewFeedback.howToImprove.map((tip, idx) => (
                              <li key={idx}>
                                <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="lp-recall-consultant-box" style={{ padding: '12px 14px' }}>
                        <div className="lp-recall-consultant-label" style={{ fontSize: 11 }}>
                          <Award size={13} />
                          <span>{isArabic ? 'الصيغة الاحترافية المحسنة:' : 'Elevated Consultant Pitch:'}</span>
                        </div>
                        <p className="lp-recall-consultant-quote" style={{ fontSize: 13 }}>
                          {reviewFeedback.improvedConsultantVersion}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="tp-flashcard-back-reveal">
                    <strong>{isArabic ? 'الخلاصة العلمية المعتمدة:' : 'Verified Core Principle:'}</strong> {currentReview.keyTakeaway}
                    <div style={{ marginTop: 6, color: 'var(--text-secondary)' }}>
                      {currentReview.explanation}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11.5, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
                      {isArabic ? 'قيم قوة تذكرك لجدولة المراجعة القادمة:' : 'RATE YOUR SYNAPSE STRENGTH TO SCHEDULE NEXT REVIEW:'}
                    </div>
                    <div className="tp-outcome-btns">
                      <button
                        type="button"
                        className="tp-outcome-btn struggled"
                        onClick={() => handleReviewOutcome('struggled')}
                      >
                        <span>😵 {isArabic ? 'غائمة (إعادة غداً)' : 'Foggy (Repeat 1d)'}</span>
                      </button>
                      <button
                        type="button"
                        className="tp-outcome-btn recalled"
                        onClick={() => handleReviewOutcome('recalled')}
                      >
                        <span>⚡ {isArabic ? 'جيدة (بعد 5 أيام)' : 'Solid Recall (5d)'}</span>
                      </button>
                      <button
                        type="button"
                        className="tp-outcome-btn mastered"
                        onClick={() => handleReviewOutcome('mastered')}
                      >
                        <span>🧠 {isArabic ? 'إتقان تام (بعد 21 يوماً)' : 'God-Tier Mastery (21d)'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* SECTION 4: INTERACTIVE WORKBENCH BENTO GRID (4 CREATIVE LAB TILES) */}
      <div className="tp-bento-workbench">
        {/* Tile 1: CRO Surgery Lab */}
        <Link to="/cro-lab" className="tp-bento-tile tile-lime">
          <div className="bento-top">
            <span className="bento-tag">CLINICAL LAB // 01</span>
            <div className="bento-icon-wrap lime">
              <Wrench size={18} />
            </div>
          </div>
          <div>
            <h3 className="bento-title">{featuredLab.title}</h3>
            <p className="bento-desc">
              {isArabic
                ? `تدرب على خطوات التدقيق الخمس المثبتة على متجر ${featuredLab.storeContext.name} (${featuredLab.surfaceLabel}).`
                : `Run the 5-step clinical audit on ${featuredLab.storeContext.name} (${featuredLab.surfaceLabel}).`}
            </p>
          </div>
          <div className="bento-footer">
            <span>{isArabic ? 'دخول عيادة التحويل' : 'Enter Storefront Surgery'}</span>
            <ArrowRight size={15} />
          </div>
        </Link>

        {/* Tile 2: Second Brain Zettelkasten */}
        <Link to="/knowledge-base" className="tp-bento-tile tile-cyan">
          <div className="bento-top">
            <span className="bento-tag">SECOND BRAIN // 02</span>
            <div className="bento-icon-wrap cyan">
              <BookMarked size={18} />
            </div>
          </div>
          <div>
            <h3 className="bento-title">
              {isArabic ? `${kbCount} بطاقة معرفية محفوظة` : `${kbCount} Zettelkasten Vault Cards`}
            </h3>
            <p className="bento-desc">
              {isArabic
                ? 'راجع المفاهيم المشروحة بأسلوبك، وملاحظات المتاجر، والأسئلة المحفوظة للرجوع السريع.'
                : 'Your personal library of Feynman explanations, storefront observations, and heuristics.'}
            </p>
          </div>
          <div className="bento-footer">
            <span>{isArabic ? 'تصفح خزنة المعرفة' : 'Open Knowledge Vault'}</span>
            <ArrowRight size={15} />
          </div>
        </Link>

        {/* Tile 3: AI Client Retainer Quest */}
        <Link to="/client-simulator" className="tp-bento-tile tile-coral">
          <div className="bento-top">
            <span className="bento-tag">ROLEPLAY ARENA // 03</span>
            <div className="bento-icon-wrap coral">
              <Briefcase size={18} />
            </div>
          </div>
          <div>
            <h3 className="bento-title">
              {isArabic ? 'محاكي التعاقد مع عملاء شوبيفاي' : 'AI Client Pitch & Retainer Quest'}
            </h3>
            <p className="bento-desc">
              {isArabic
                ? 'تأهيل المتاجر، إرسال رسائل التدقيق، والتفاوض المباشر لإغلاق عقود تحسين التحويل.'
                : 'Qualify leads, audit broken PDPs, pitch store founders, and close $4k+/mo retainers.'}
            </p>
          </div>
          <div className="bento-footer">
            <span>{isArabic ? 'ابدأ محاكاة العميل' : 'Launch Client Quest'}</span>
            <ArrowRight size={15} />
          </div>
        </Link>

        {/* Tile 4: 60-Point Audit Scanner */}
        <Link to="/audit-tool" className="tp-bento-tile tile-amber">
          <div className="bento-top">
            <span className="bento-tag">DIAGNOSTIC MATRIX // 04</span>
            <div className="bento-icon-wrap amber">
              <CheckSquare size={18} />
            </div>
          </div>
          <div>
            <h3 className="bento-title">
              {isArabic ? 'أداة الفحص الشامل (60 معياراً)' : '60-Point Storefront Heuristic Scanner'}
            </h3>
            <p className="bento-desc">
              {isArabic
                ? 'افحص أي متجر شوبيفاي عبر 10 واجهات أساسية واستخرج تقريراً احترافياً.'
                : 'Grade any live Shopify store across 10 conversion surfaces with instant report export.'}
            </p>
          </div>
          <div className="bento-footer">
            <span>{isArabic ? 'تشغيل الفاحص' : 'Open Audit Matrix'}</span>
            <ArrowRight size={15} />
          </div>
        </Link>
      </div>

      {/* SECTION 5: THE 6-WORLD SKILL TREE MAP */}
      <div className="tp-curriculum-collapsible">
        <button
          type="button"
          className="tp-curriculum-trigger"
          onClick={() => setIsCurriculumExpanded(!isCurriculumExpanded)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="tp-map-icon-badge">
              <Compass size={18} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{t('dash.roadmapTitle')}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
                {isArabic
                  ? '6 عوالم تدريبية مترابطة من الأساسيات إلى التجارب المتقدمة'
                  : '6 interconnected conversion worlds — click any world to jump in'}
              </div>
            </div>
          </div>
          <div className="tp-expand-pill">
            <span>{isCurriculumExpanded ? (isArabic ? 'طي الخريطة' : 'Collapse Map') : (isArabic ? 'عرض الخريطة' : 'Expand Map')}</span>
            {isCurriculumExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {isCurriculumExpanded && (
          <div className="tp-curriculum-body animate-fade-in">
            <div className="tp-worlds-grid">
              {stages.map((st) => (
                <Link
                  key={st.num}
                  to={`/session/${st.slug}`}
                  className="tp-world-node-card"
                  style={{ '--node-accent': st.accent } as React.CSSProperties}
                >
                  <div className="tp-world-watermark">0{st.num}</div>
                  <div className="tp-world-top">
                    <span className="tp-world-badge">{st.weeks}</span>
                    <span className="tp-world-count">{st.count}</span>
                  </div>
                  <div className="tp-world-title">
                    {isArabic ? st.titleAr : st.titleEn}
                  </div>
                  <div className="tp-world-action">
                    <span>{isArabic ? 'ابدأ العالم' : 'Enter World'}</span>
                    <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 8, display: 'flex', justifyContent: 'center' }}>
              <Link to="/curriculum" className="btn btn-secondary">
                <Layers size={15} />
                <span>{t('dash.viewFullRoadmap')}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
