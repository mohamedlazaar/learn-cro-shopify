import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Code,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Store,
  Zap,
  Brain,
  ExternalLink,
  Award,
  ArrowRight,
  Flame,
  Check,
  AlertCircle,
  Database,
  Calculator,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Module, Phase, Exercise } from '../../types/curriculum';
import { getLessonDirectExercise } from '../../data/lessonExercises';
import { getQuizByModuleId } from '../../data/quizzes';
import { useProgress } from '../../context/ProgressContext';

interface LessonPracticalMissionProps {
  lesson: Lesson;
  module: Module;
  phase: Phase;
  isArabic: boolean;
}

export const LessonPracticalMission: React.FC<LessonPracticalMissionProps> = ({
  lesson,
  module,
  phase,
  isArabic,
}) => {
  const { completeExercise } = useProgress();

  // 1. Get directly related exercise with self-contained real data for THIS specific lesson
  const directExercise: Exercise = getLessonDirectExercise(lesson, module);

  // 2. Module quiz for active recall
  const moduleQuiz = getQuizByModuleId(module.id);
  const quizQuestion = moduleQuiz?.questions ? moduleQuiz.questions[0] : null;

  // Local storage keys
  const storageKeyMission = `cro_mission_done_${lesson.id}`;
  const storageKeyRecall = `cro_recall_ans_${lesson.id}`;
  const storageKeyExercise = `cro_exercise_solved_${directExercise.id}`;

  const [missionDone, setMissionDone] = useState<boolean>(() => {
    return localStorage.getItem(storageKeyMission) === 'true';
  });

  const [exerciseSolved, setExerciseSolved] = useState<boolean>(() => {
    return localStorage.getItem(storageKeyExercise) === 'true';
  });

  // Math inputs state if exercise type is math
  const [mathInputs, setMathInputs] = useState<Record<string, string>>({});
  const [mathFeedback, setMathFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Multiple choice selection state
  const [selectedMcqIndex, setSelectedMcqIndex] = useState<number | null>(null);
  const [showMcqExplanation, setShowMcqExplanation] = useState<boolean>(false);

  // Active recall state
  const [selectedRecallIndex, setSelectedRecallIndex] = useState<number | null>(() => {
    const saved = localStorage.getItem(storageKeyRecall);
    return saved !== null ? parseInt(saved, 10) : null;
  });

  const [showRecallExplanation, setShowRecallExplanation] = useState<boolean>(() => {
    return localStorage.getItem(storageKeyRecall) !== null;
  });

  const handleToggleMission = () => {
    const nextState = !missionDone;
    setMissionDone(nextState);
    localStorage.setItem(storageKeyMission, String(nextState));

    if (nextState) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleVerifyMath = () => {
    if (!directExercise.targetValues) return;

    let allCorrect = true;
    const tolerance = directExercise.tolerance || 0.05;

    for (const [key, targetVal] of Object.entries(directExercise.targetValues)) {
      const userVal = parseFloat(mathInputs[key] || '');
      const expected = typeof targetVal === 'number' ? targetVal : parseFloat(targetVal);

      if (isNaN(userVal)) {
        allCorrect = false;
        break;
      }

      const diff = Math.abs(userVal - expected);
      if (diff > Math.abs(expected * tolerance) + 0.001) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      setExerciseSolved(true);
      localStorage.setItem(storageKeyExercise, 'true');
      setMathFeedback({
        isCorrect: true,
        message: isArabic
          ? 'حساباتك صحيحة ودقيقة 100%! تم التحقق من النتائج واكتساب +25 XP'
          : '100% Correct calculations! Telemetry verified and +25 XP earned.',
      });
      completeExercise(directExercise.id, directExercise.xp, mathInputs);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.75 },
      });
    } else {
      setMathFeedback({
        isCorrect: false,
        message: isArabic
          ? 'تحقق من الأرقام المدخلة وقارنها بالمعادلة في نص المسألة، ثم حاول مرة أخرى.'
          : 'Double-check your values against the formula and try again.',
      });
    }
  };

  const handleSelectMcq = (index: number) => {
    setSelectedMcqIndex(index);
    setShowMcqExplanation(true);

    if (directExercise.correctIndex !== undefined && index === directExercise.correctIndex) {
      setExerciseSolved(true);
      localStorage.setItem(storageKeyExercise, 'true');
      completeExercise(directExercise.id, directExercise.xp, { selectedIndex: index });
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.75 },
      });
    }
  };

  const handleSelectRecall = (index: number) => {
    setSelectedRecallIndex(index);
    setShowRecallExplanation(true);
    localStorage.setItem(storageKeyRecall, String(index));

    if (quizQuestion && index === quizQuestion.correctIndex) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.85 },
      });
    }
  };

  // Generate tailored 5-minute practical task based on lesson context
  const getTailoredMission = () => {
    const titleLower = lesson.title.toLowerCase();
    const slugLower = lesson.slug.toLowerCase();

    if (titleLower.includes('pdp') || titleLower.includes('product page') || slugLower.includes('pdp')) {
      return {
        title: isArabic ? 'مهمة فحص صفحة المنتج: كشف الاحتكاك على الموبايل' : '5-Min Practical Task: Mobile PDP Friction Audit',
        instructions: isArabic ? [
          'افتح متجر تجريبي أو متجراً من Store Prospector على شاشة الهاتف.',
          'مرر لأسفل وتأكد: هل يختفي زر الشراء؟ هل يوجد شريط شراء ثابت (Sticky Buy Bar) يتبعك؟',
          'افحص عينات الألوان والمقاسات: هل هي صور وعينات بصرية واضحة أم قوائم منسدلة رمادية مملة؟',
        ] : [
          'Open any Shopify store on mobile view (DevTools Ctrl+Shift+M or phone).',
          'Scroll down the product page: does the Buy Button vanish? Is there a Sticky Add-to-Cart bar?',
          'Inspect variant pickers: are they visual clickable swatches or boring grey dropdowns?',
        ],
        whyItLocksMemory: isArabic
          ? 'رؤية الخطأ في متجر حقيقي يرسخ المفهوم في عقلك 10 أضعاف مجرد قراءة النص!'
          : 'Seeing this friction on a live store cements the design principle 10x deeper than reading.'
      };
    }

    if (titleLower.includes('liquid') || titleLower.includes('code') || slugLower.includes('liquid') || slugLower.includes('theme')) {
      return {
        title: isArabic ? 'مهمة التفتيش البرمجي: فحص كود القالب المباشر' : '5-Min Code Mission: Inspect Liquid & Elements',
        instructions: isArabic ? [
          'افتح متصفحك واضغط زر الفأرة الأيمن > فحص العنصر (Inspect Element) على أي صفحة شوبيفاي.',
          'اكتب في نافذة Console: window.Shopify أو inspect {{ product.title }} لمعاينة كائنات القالب.',
          'ابحث في مجلد sections في ثيمك التجريبي عن القسم المقابل وطبّق تغييراً صغيراً في HTML/CSS.',
        ] : [
          'Open Chrome DevTools (Right Click > Inspect) on any active Shopify store.',
          'In the Console tab, type `Shopify.theme` or check the loaded scripts and global drops.',
          'Open your local development store and test rendering this specific Liquid snippet or section.',
        ],
        whyItLocksMemory: isArabic
          ? 'كتابة الكود وفحصه في المتصفح ينقل المهارة من الذاكرة المؤقتة إلى يديك وأصابعك!'
          : 'Running the inspector transforms abstract syntax into muscle memory.'
      };
    }

    return {
      title: isArabic ? 'مهمة فحص المفهوم وتطبيقه' : '5-Min Diagnostic Inspection',
      instructions: isArabic ? [
        'افتح أداة Store Prospector من القائمة الجانبية واختر متجراً من المتاجر المقترحة.',
        'افحص الصفحة المعنية بهذا الدرس وابحث عن وجود هذا المفهوم أو غيابه.',
        'سجل ملاحظة سريعة في صندوق الملاحظات بالأسفل: كيف يمكنك تقديم هذا الحل للعميل؟',
      ] : [
        'Open Store Prospector from the sidebar and pick any live merchant store.',
        'Audit their storefront against the core principle taught in this lesson.',
        'Jot down a 1-sentence diagnostic note: what would you improve to lift their revenue?',
      ],
      whyItLocksMemory: isArabic
        ? 'الربط المباشر بين الدرس ومشاكل المتاجر الحقيقية هو ما يجعلك خبيراً يطلبك أصحاب المتاجر.'
        : 'Connecting the lesson directly to real merchant pain builds consulting instincts.'
    };
  };

  const mission = getTailoredMission();

  return (
    <section className="lp-practical-mission-section" aria-label="Practical Application & Memory Retention">
      {/* Retention Science Header */}
      <div className="lp-retention-science-banner">
        <div className="lp-retention-icon-box">
          <Brain size={20} className="lp-brain-pulse" />
        </div>
        <div style={{ flex: 1 }}>
          <div className="lp-retention-title">
            <span className="lp-retention-badge">
              <Zap size={12} />
              {isArabic ? 'تطبيق عملي فوري بدون متجر خارجي' : '100% Self-Contained Practical Application'}
            </span>
            <span>
              {isArabic
                ? 'تطبيق الدرس ببيانات واقعية مدمجة (لا تحتاج لمتجر خارجي أو زوار حقيقيين)'
                : 'Complete This Lesson with Pre-Packaged Real Store Data (Zero External Dependencies)'}
            </span>
          </div>
          <p className="lp-retention-desc">
            {isArabic
              ? 'نعلم أنك قد لا تملك متجراً به آلاف الزوار حالياً! لذلك قمنا بتوفير بيانات حقيقية مجهولة الهوية وكود جاهز أدناه، ليكون التمرين مرتبطاً بهذا الدرس 100% وممكناً للحل فوراً داخل الصفحة.'
              : 'You do NOT need to own a live high-traffic store! We have pre-packaged anonymized real merchant data and starter code below so this exercise directly reinforces this exact lesson.'}
          </p>
        </div>
      </div>

      {/* Grid of Action Pillars */}
      <div className="lp-mission-grid">
        {/* Step 1: Lesson-Specific Exercise with Real Dataset */}
        <div className={`lp-mission-card ${exerciseSolved ? 'is-completed' : ''}`}>
          <div className="lp-mission-card-head">
            <div className="lp-step-pill">Direct Lesson Exercise</div>
            <Calculator size={18} color="#6366f1" />
            <h3 className="lp-mission-card-title">{directExercise.title}</h3>
          </div>

          <p className="lp-mission-why">
            {isArabic
              ? 'تمرين مخصص ومباشر لهذا الدرس: جميع الأرقام والبيانات موفرة أدناه لتطبيق المفهوم فوراً.'
              : 'Directly reinforces this lesson with real-world data provided right on this screen.'}
          </p>

          {/* Pre-Packaged Real Store Dataset Inspector */}
          {directExercise.dataset && (
            <div className="lp-dataset-box">
              <div className="lp-dataset-head">
                <Database size={13} color="#10b981" />
                <span>
                  {isArabic
                    ? 'البيانات الواقعية المجهزة للتطبيق (Pre-Loaded Real Store Telemetry):'
                    : 'Pre-Packaged Real Store Telemetry (No live store required):'}
                </span>
              </div>
              <div className="lp-dataset-content">
                {directExercise.datasetDescription && (
                  <div className="lp-dataset-desc">{directExercise.datasetDescription}</div>
                )}
                <pre className="lp-dataset-pre">
                  {JSON.stringify(directExercise.dataset, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Exercise Prompt */}
          <div className="lp-exercise-prompt-text">{directExercise.prompt}</div>

          {/* In-Lesson Interactive Solver: Math Type */}
          {directExercise.type === 'math' && directExercise.targetValues && (
            <div className="lp-inlesson-solver">
              <div className="lp-solver-inputs-grid">
                {Object.keys(directExercise.targetValues).map((key) => (
                  <div key={key} className="lp-solver-input-group">
                    <label className="lp-solver-label">
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                    </label>
                    <input
                      type="number"
                      step="any"
                      className="lp-solver-input"
                      placeholder="e.g. 2.5"
                      value={mathInputs[key] || ''}
                      onChange={(e) =>
                        setMathInputs((prev) => ({ ...prev, [key]: e.target.value }))
                      }
                      disabled={exerciseSolved}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                <button
                  type="button"
                  className={`btn ${exerciseSolved ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={handleVerifyMath}
                  disabled={exerciseSolved}
                >
                  <CheckCircle2 size={15} />
                  <span>
                    {exerciseSolved
                      ? isArabic ? 'تم التحقق بنجاح ✓' : 'Solved & Verified ✓'
                      : isArabic ? 'التحقق من صحة الحساب (+25 XP)' : 'Verify Calculation (+25 XP)'}
                  </span>
                </button>

                <Link
                  to={`/exercises/${directExercise.slug}`}
                  className="lp-jump-workspace-link"
                  title="Open full workspace view"
                >
                  <span>{isArabic ? 'فتح في مساحة التمارين الكاملة' : 'Open in Workspace'}</span>
                  <ExternalLink size={12} />
                </Link>
              </div>

              {mathFeedback && (
                <div className={`lp-solver-feedback ${mathFeedback.isCorrect ? 'is-success' : 'is-error'}`}>
                  {mathFeedback.isCorrect ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{mathFeedback.message}</span>
                </div>
              )}
            </div>
          )}

          {/* In-Lesson Interactive Solver: Multiple Choice Type */}
          {directExercise.type === 'multiple-choice' && directExercise.options && (
            <div className="lp-inlesson-solver">
              <div className="lp-mcq-options-list">
                {directExercise.options.map((option, oIdx) => {
                  const isSelected = selectedMcqIndex === oIdx;
                  const isCorrect = oIdx === directExercise.correctIndex;
                  let optClass = 'lp-recall-opt';

                  if (showMcqExplanation) {
                    if (isCorrect) optClass += ' is-correct';
                    else if (isSelected) optClass += ' is-wrong';
                  } else if (isSelected) {
                    optClass += ' is-selected';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      className={optClass}
                      onClick={() => handleSelectMcq(oIdx)}
                      disabled={showMcqExplanation}
                    >
                      <span className="lp-recall-opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="lp-recall-opt-text">{option}</span>
                    </button>
                  );
                })}
              </div>

              {showMcqExplanation && (
                <div className="lp-recall-feedback is-success" style={{ marginTop: 12 }}>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
                    <strong>{isArabic ? 'الشرح التحليلي:' : 'Explanation:'} </strong>
                    {directExercise.explanation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* In-Lesson Interactive Solver: Code Type */}
          {directExercise.type === 'code' && (
            <div className="lp-inlesson-solver">
              {directExercise.starterCode && (
                <div className="lp-starter-code-preview">
                  <div className="lp-starter-code-tag">Starter Code:</div>
                  <pre className="lp-starter-code-pre">{directExercise.starterCode}</pre>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                <Link
                  to={`/exercises/${directExercise.slug}`}
                  className="btn btn-primary"
                >
                  <Code size={15} />
                  <span>{isArabic ? 'تشغيل الكود في Monaco Editor التفاعلي' : 'Open in Live Monaco Code Sandbox'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: 5-Minute Practical Store Mission */}
        <div className={`lp-mission-card ${missionDone ? 'is-completed' : ''}`}>
          <div className="lp-mission-card-head">
            <div className="lp-step-pill">5-Min Real Mission</div>
            <Target size={18} color="#10b981" />
            <h3 className="lp-mission-card-title">{mission.title}</h3>
          </div>

          <p className="lp-mission-why">{mission.whyItLocksMemory}</p>

          <div className="lp-mission-steps-list">
            {mission.instructions.map((step, sIdx) => (
              <div key={sIdx} className="lp-mission-step-row">
                <span className="lp-mission-step-num">{sIdx + 1}</span>
                <span className="lp-mission-step-text">{step}</span>
              </div>
            ))}
          </div>

          <div className="lp-mission-action-bar">
            <button
              type="button"
              className={`lp-mission-checkbox-btn ${missionDone ? 'is-checked' : ''}`}
              onClick={handleToggleMission}
            >
              <div className="lp-mission-check-box">
                {missionDone && <Check size={14} strokeWidth={3} />}
              </div>
              <span>
                {missionDone
                  ? isArabic ? '✓ أكملت الفحص الميداني (+25 XP)' : '✓ Audit Mission Completed (+25 XP)'
                  : isArabic ? 'أكملت فحص هذا العنصر' : 'I inspected this on a real store (+25 XP)'}
              </span>
            </button>

            <Link to="/store-prospector" className="lp-mission-prospector-link" title="Open Store Prospector to inspect live stores">
              <Store size={14} />
              <span>{isArabic ? 'فتح Store Prospector' : 'Find Stores'}</span>
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      </div>

      {/* Step 3: 60-Second Active Recall Question */}
      {quizQuestion && (
        <div className="lp-recall-card">
          <div className="lp-recall-head">
            <div className="lp-step-pill" style={{ background: '#f59e0b', color: '#000' }}>Quick Recall</div>
            <Flame size={18} color="#f59e0b" />
            <h3 className="lp-recall-title">
              {isArabic ? 'اختبار التثبيت السريع (60 ثانية): اختبر استرجاع المعلومة' : '60-Second Active Recall: Test Your Retrieval Memory'}
            </h3>
          </div>

          <p className="lp-recall-question-text">{quizQuestion.question}</p>

          <div className="lp-recall-options-grid">
            {quizQuestion.options.map((option, optIdx) => {
              const isSelected = selectedRecallIndex === optIdx;
              const isCorrect = optIdx === quizQuestion.correctIndex;
              let optionClass = 'lp-recall-opt';

              if (showRecallExplanation) {
                if (isCorrect) optionClass += ' is-correct';
                else if (isSelected) optionClass += ' is-wrong';
              } else if (isSelected) {
                optionClass += ' is-selected';
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  className={optionClass}
                  onClick={() => handleSelectRecall(optIdx)}
                  disabled={showRecallExplanation}
                >
                  <span className="lp-recall-opt-letter">{String.fromCharCode(65 + optIdx)}</span>
                  <span className="lp-recall-opt-text">{option}</span>
                  {showRecallExplanation && isCorrect && (
                    <CheckCircle2 size={16} color="#10b981" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                  )}
                  {showRecallExplanation && isSelected && !isCorrect && (
                    <AlertCircle size={16} color="#ef4444" style={{ marginLeft: 'auto', flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>

          {showRecallExplanation && (
            <div className={`lp-recall-feedback ${selectedRecallIndex === quizQuestion.correctIndex ? 'is-success' : 'is-info'}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                {selectedRecallIndex === quizQuestion.correctIndex ? (
                  <>
                    <Award size={16} color="#10b981" />
                    <span style={{ color: '#10b981' }}>
                      {isArabic ? 'إجابة صحيحة وممتازة! (+15 XP تثبيت الذاكرة)' : 'Brilliant! Correct Retrieval (+15 XP Retention)'}
                    </span>
                  </>
                ) : (
                  <>
                    <HelpCircle size={16} color="#f59e0b" />
                    <span style={{ color: '#f59e0b' }}>
                      {isArabic ? 'توضيح مهم لتصحيح المفهوم:' : 'Key Learning Clarification:'}
                    </span>
                  </>
                )}
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                {quizQuestion.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
