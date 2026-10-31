import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  ShoppingBag,
  Target,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  BookMarked,
  Layers,
  ChevronRight,
  Compass,
  Award,
  AlertCircle,
  Check,
} from 'lucide-react';
import { getLessonBySlug, ALL_LESSONS } from '../data/lessons';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { getLessonLanguageContent } from '../services/lessonLanguageService';
import { evaluateSelfExplanation, evaluateActiveRecall, ActiveRecallFeedback } from '../services/croCoachEvaluator';
import { registerConceptForReview } from '../services/spacedReviewService';
import { addKnowledgeEntry } from '../services/knowledgeBaseService';
import { MicroSessionFeedback } from '../types/microlearning';
import './MicroLearningSessionPage.css';

type SessionPhase = 'recall' | 'learn' | 'explain' | 'apply' | 'reflect';

export const MicroLearningSessionPage: React.FC = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const navigate = useNavigate();
  const { completeLesson, triggerConfetti } = useProgress();
  const { isArabic } = useLanguage();

  const lesson = useMemo(() => {
    return getLessonBySlug(lessonSlug || '') || ALL_LESSONS[0];
  }, [lessonSlug]);

  const langContent = useMemo(() => {
    return getLessonLanguageContent(lesson);
  }, [lesson]);

  const arData = isArabic ? langContent.arabic : null;

  // Current session phase
  const [phase, setPhase] = useState<SessionPhase>('recall');

  // Phase A: Recall state
  const [recallAttempt, setRecallAttempt] = useState('');
  const [recallRevealed, setRecallRevealed] = useState(false);
  const [recallFeedback, setRecallFeedback] = useState<ActiveRecallFeedback | null>(null);

  // Phase B: Learn progressive disclosure state
  const [activeDisclosure, setActiveDisclosure] = useState<
    'simple' | 'example' | 'why_matters' | 'terms' | null
  >(null);

  // Phase C: Explain state
  const [selfExplanation, setSelfExplanation] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<MicroSessionFeedback | null>(null);

  // Phase D: Apply 5-part form state
  const [applyAnswers, setApplyAnswers] = useState({
    issue: '',
    whyMatters: '',
    evidence: '',
    improvement: '',
    validationMetric: '',
  });
  const [showWorkedExample, setShowWorkedExample] = useState(false);

  // Phase E: Reflect state
  const [unresolvedQuestion, setUnresolvedQuestion] = useState('');
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Primary concept derived from lesson
  const primarySection = lesson.sections[0] || {
    heading: lesson.title,
    body: 'Mastering conversion dynamics and evidence-based optimization.',
  };

  const coreTakeaway =
    lesson.simpleEnglish?.keyTakeaway ||
    lesson.checklist[0] ||
    'Identify friction, formulate testable hypotheses, and validate with behavioral data.';

  // --- Handlers ---
  const handleRecallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recallAttempt.trim()) return;
    const questionText = isArabic
      ? (arData?.objectives?.[0]
          ? `بحدسك الخاص: كيف يحمي تحقيق "${arData.objectives[0]}" متجر شوبيفاي من خسارة المبيعات المباشرة؟`
          : 'ما هو أكبر عائق نفسي يسبب ارتداد المتسوقين عن الشراء؟')
      : (lesson.objectives[0]
          ? `In your own intuition, how does "${lesson.objectives[0]}" directly protect a Shopify store from lost sales?`
          : 'What causes shoppers to bounce?');

    const localizedTakeaway = isArabic
      ? (arData?.keyTakeaway || arData?.checklist?.[0] || 'التركيز على إزالة الاحتكاك وبناء الثقة وتقليل التردد قبل قرار الشراء.')
      : coreTakeaway;

    const fb = evaluateActiveRecall({
      userText: recallAttempt,
      question: questionText,
      coreTakeaway: localizedTakeaway,
      objectives: isArabic && arData?.objectives ? arData.objectives : lesson.objectives,
      isArabic,
    });
    setRecallFeedback(fb);
    setRecallRevealed(true);
    if (fb.verdict === 'correct') {
      triggerConfetti();
    }
  };

  const handleEvaluateExplanation = async () => {
    if (!selfExplanation.trim()) return;
    setEvaluating(true);
    try {
      const result = await evaluateSelfExplanation(
        selfExplanation,
        lesson.id,
        lesson.title,
        coreTakeaway
      );
      setFeedback(result);

      // Save user's explanation to their personal knowledge base
      addKnowledgeEntry({
        title: `My Understanding: ${lesson.title}`,
        category: 'explanation',
        content: selfExplanation,
        userSelfExplanation: selfExplanation,
        sourceLessonSlug: lesson.slug,
        sourceLessonTitle: lesson.title,
        tags: ['Personal Note', 'Self-Explanation'],
      });
    } finally {
      setEvaluating(false);
    }
  };

  const handleFinishSession = () => {
    // 1. Mark lesson completed in core progress
    completeLesson(lesson.id);

    // 2. Register concept in memory spaced review system
    registerConceptForReview(
      lesson.id,
      lesson.title,
      lesson.slug,
      lesson.title,
      'Curriculum Session',
      `Explain the core principle of "${lesson.title}" and why it influences Shopify buyer behavior.`,
      coreTakeaway,
      primarySection.body.slice(0, 200) + '...'
    );

    // 3. Save unresolved question if entered
    if (unresolvedQuestion.trim()) {
      addKnowledgeEntry({
        title: `Question from ${lesson.title}`,
        category: 'unresolved_question',
        content: unresolvedQuestion.trim(),
        sourceLessonSlug: lesson.slug,
        sourceLessonTitle: lesson.title,
        tags: ['To Research', 'Unresolved Question'],
      });
    }

    setSessionCompleted(true);
    triggerConfetti();
  };

  return (
    <div className="mls-container animate-fade-in">
      {/* Calm Header */}
      <div className="mls-header-bar">
        <Link to="/dashboard" className="mls-back-link">
          <ArrowLeft size={16} /> Return to Today's Practice
        </Link>

        {/* Phase Pill Navigation */}
        <div className="mls-step-nav">
          <button
            type="button"
            className={`mls-step-btn ${phase === 'recall' ? 'active' : ''}`}
            onClick={() => setPhase('recall')}
          >
            A. Recall
          </button>
          <button
            type="button"
            className={`mls-step-btn ${phase === 'learn' ? 'active' : ''}`}
            onClick={() => setPhase('learn')}
          >
            B. Learn
          </button>
          <button
            type="button"
            className={`mls-step-btn ${phase === 'explain' ? 'active' : ''}`}
            onClick={() => setPhase('explain')}
          >
            C. Explain
          </button>
          <button
            type="button"
            className={`mls-step-btn ${phase === 'apply' ? 'active' : ''}`}
            onClick={() => setPhase('apply')}
          >
            D. Apply
          </button>
          <button
            type="button"
            className={`mls-step-btn ${phase === 'reflect' ? 'active' : ''}`}
            onClick={() => setPhase('reflect')}
          >
            E. Reflect
          </button>
        </div>
      </div>

      {/* PHASE A: RECALL */}
      {phase === 'recall' && (
        <div className="mls-card animate-fade-in">
          <div className="mls-kicker">
            <Sparkles size={14} /> Stage A — Active Recall Warm-Up
          </div>

          <h2 className="mls-title">Retrieve Before You Learn</h2>
          <p className="mls-body-lead">
            Cognitive science proves that testing your memory <em>before</em> reviewing content
            primes your brain to encode information much more deeply.
          </p>

          <div
            style={{
              padding: '20px 24px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
              Recall Prompt:
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-primary)' }}>
              {lesson.objectives[0]
                ? `In your own intuition, how does "${lesson.objectives[0]}" directly protect a Shopify store from lost sales?`
                : `What is the primary reason shoppers abandon before purchasing on a Shopify storefront?`}
            </p>
          </div>

          {!recallRevealed ? (
            <form onSubmit={handleRecallSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  ⚡ 1-CLICK INTUITION STARTERS (OR TYPE YOUR OWN BELOW):
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[
                    'Removing visual friction and uncertainty helps shoppers commit to buying faster.',
                    'Clear hierarchy and mobile thumb-friendly CTAs prevent impulse drop-offs.',
                    'Testing this hypothesis protects ad spend and increases Revenue Per Session (RPS).',
                  ].map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      type="button"
                      onClick={() => setRecallAttempt(chip)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: recallAttempt === chip ? '1.5px solid #a3e635' : '1px solid var(--border-default)',
                        background: recallAttempt === chip ? 'rgba(163, 230, 53, 0.14)' : 'var(--bg-elevated)',
                        color: 'var(--text-primary)',
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      💡 {chip}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={recallAttempt}
                onChange={(e) => setRecallAttempt(e.target.value)}
                placeholder="Click a starter above or type your own intuition..."
                className="mls-textarea"
                rows={3}
              />
              <button
                type="submit"
                className="mls-btn-primary"
                style={{ width: 'fit-content' }}
                disabled={!recallAttempt.trim()}
              >
                <Check size={16} /> Check & Evaluate My Answer
              </button>
            </form>
          ) : (
            <div className="lp-recall-eval-card animate-fade-in">
              {/* User's Original Attempt */}
              <div className="lp-recall-user-quote">
                <div style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
                  Your Answer Attempt:
                </div>
                <div style={{ fontStyle: 'italic', color: 'var(--text-primary)' }}>
                  "{recallAttempt}"
                </div>
              </div>

              {/* Verdict Banner telling if answer is right */}
              {recallFeedback && (
                <div className={`lp-recall-eval-banner is-${recallFeedback.verdict}`}>
                  <div className="lp-recall-eval-title">
                    {recallFeedback.verdict === 'correct' ? (
                      <CheckCircle2 size={18} color="#10b981" />
                    ) : recallFeedback.verdict === 'partial' ? (
                      <HelpCircle size={18} color="#f59e0b" />
                    ) : (
                      <AlertCircle size={18} color="#6366f1" />
                    )}
                    <span>{recallFeedback.verdictTitle}</span>
                  </div>
                  <p className="lp-recall-eval-summary">
                    {recallFeedback.accuracySummary}
                  </p>
                </div>
              )}

              {/* Analysis: What You Nailed vs How to Improve */}
              {recallFeedback && (
                <div className="lp-recall-eval-grid">
                  <div className="lp-recall-eval-col">
                    <div className="lp-recall-eval-col-head" style={{ color: '#10b981' }}>
                      <CheckCircle2 size={15} />
                      <span>What You Got Right</span>
                    </div>
                    <ul className="lp-recall-eval-list">
                      {recallFeedback.whatYouNailed.map((point, idx) => (
                        <li key={idx}>
                          <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 3 }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lp-recall-eval-col">
                    <div className="lp-recall-eval-col-head" style={{ color: '#f59e0b' }}>
                      <Lightbulb size={15} />
                      <span>How to Elevate & Improve It</span>
                    </div>
                    <ul className="lp-recall-eval-list">
                      {recallFeedback.howToImprove.map((tip, idx) => (
                        <li key={idx}>
                          <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Improved Consultant Version */}
              {recallFeedback && (
                <div className="lp-recall-consultant-box">
                  <div className="lp-recall-consultant-label">
                    <Award size={15} />
                    <span>Senior CRO Consultant Pitch (How to articulate your idea):</span>
                  </div>
                  <p className="lp-recall-consultant-quote">
                    {recallFeedback.improvedConsultantVersion}
                  </p>
                </div>
              )}

              {/* Actions Bar: Stays on step until button click */}
              <div className="lp-recall-actions-bar">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setRecallRevealed(false)}
                >
                  <RotateCcw size={14} />
                  <span>Edit & Refine Answer</span>
                </button>

                <button
                  type="button"
                  className="mls-btn-primary"
                  onClick={() => setPhase('learn')}
                >
                  <span>Continue to Concept Learn (Stage B)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE B: LEARN */}
      {phase === 'learn' && (
        <div className="mls-card animate-fade-in">
          <div className="mls-kicker">
            <BookOpen size={14} /> Stage B — Bite-Sized Focus Concept
          </div>

          <h2 className="mls-title">{primarySection.heading}</h2>

          {/* Golden Rule Strip */}
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '14px',
              background: 'rgba(163, 230, 53, 0.12)',
              border: '1.5px solid rgba(163, 230, 53, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10.5,
                fontWeight: 800,
                color: '#a3e635',
                textTransform: 'uppercase',
              }}
            >
              ⚡ 10-SECOND GOLDEN RULE (TL;DR)
            </span>
            <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)' }}>
              {coreTakeaway}
            </p>
          </div>

          {/* Bite-Sized Storyboard Beats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {primarySection.body
              .split('\n\n')
              .filter(Boolean)
              .slice(0, 3)
              .map((para, pIdx) => {
                const sents = para.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [para];
                const lead = sents[0]?.trim() || para;
                const rest = sents.slice(1).join(' ').trim();
                const colors = ['#a3e635', '#22d3ee', '#fbbf24'];
                const badgeColor = colors[pIdx % colors.length];
                return (
                  <div
                    key={pIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 14,
                      padding: '14px 16px',
                      borderRadius: '14px',
                      background: 'var(--bg-app)',
                      border: '1.5px solid var(--border-subtle)',
                    }}
                  >
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        background: badgeColor,
                        color: '#06070b',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      0{pIdx + 1}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <p style={{ margin: 0, fontSize: 14.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.45 }}>
                        {lead}
                      </p>
                      {rest && (
                        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {rest}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Contextual Progressive Disclosure Buttons */}
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
              DEEPEN UNDERSTANDING (SELECT TO EXPAND):
            </div>
            <div className="mls-action-buttons">
              <button
                type="button"
                className={`mls-action-btn ${activeDisclosure === 'simple' ? 'active' : ''}`}
                onClick={() =>
                  setActiveDisclosure(activeDisclosure === 'simple' ? null : 'simple')
                }
              >
                <Lightbulb size={14} /> Explain More Simply
              </button>

              <button
                type="button"
                className={`mls-action-btn ${activeDisclosure === 'example' ? 'active' : ''}`}
                onClick={() =>
                  setActiveDisclosure(activeDisclosure === 'example' ? null : 'example')
                }
              >
                <ShoppingBag size={14} /> Show Shopify Example
              </button>

              <button
                type="button"
                className={`mls-action-btn ${activeDisclosure === 'why_matters' ? 'active' : ''}`}
                onClick={() =>
                  setActiveDisclosure(activeDisclosure === 'why_matters' ? null : 'why_matters')
                }
              >
                <Target size={14} /> Why This Matters
              </button>

              <button
                type="button"
                className={`mls-action-btn ${activeDisclosure === 'terms' ? 'active' : ''}`}
                onClick={() =>
                  setActiveDisclosure(activeDisclosure === 'terms' ? null : 'terms')
                }
              >
                <HelpCircle size={14} /> Clarify Terms
              </button>
            </div>
          </div>

          {/* Progressive Disclosures */}
          {activeDisclosure === 'simple' && (
            <div className="mls-disclosure-panel animate-fade-in">
              <div className="mls-disclosure-title">
                <Lightbulb size={16} /> Plain-Language Breakdown
              </div>
              <p className="mls-disclosure-text">
                {lesson.simpleEnglish?.coreIdea ||
                  `Think of this like visiting a physical store: if the aisles are cluttered and the price tags are missing, you walk out. Online, every tiny point of confusion or visual noise increases the odds the customer clicks "Back" to Google or Instagram.`}
              </p>
            </div>
          )}

          {activeDisclosure === 'example' && (
            <div className="mls-disclosure-panel animate-fade-in">
              <div className="mls-disclosure-title">
                <ShoppingBag size={16} /> Real Shopify Store Scenario
              </div>
              <p className="mls-disclosure-text">
                {lesson.visualExample?.brandScenario ||
                  `Imagine an apparel merchant selling $95 denim jackets. Mobile shoppers scroll through 8 photos, reach the bottom, but the Add-to-Cart button has scrolled away 1,800px above. By introducing a sticky bottom CTA, mobile conversions rose 14% without changing jacket prices.`}
              </p>
            </div>
          )}

          {activeDisclosure === 'why_matters' && (
            <div className="mls-disclosure-panel animate-fade-in">
              <div className="mls-disclosure-title">
                <Target size={16} /> Business & Conversion Impact
              </div>
              <p className="mls-disclosure-text">
                A 0.5% lift in conversion rate on a store generating 50,000 monthly sessions at $80 AOV
                represents an extra <strong>$20,000 in monthly revenue</strong> ($240,000/year) with
                zero additional ad spend.
              </p>
            </div>
          )}

          {activeDisclosure === 'terms' && (
            <div className="mls-disclosure-panel animate-fade-in">
              <div className="mls-disclosure-title">
                <HelpCircle size={16} /> Terminology Guide
              </div>
              <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                <li><strong>CVR:</strong> Conversion Rate (% of visitors who complete purchase).</li>
                <li><strong>AOV:</strong> Average Order Value (total revenue / total orders).</li>
                <li><strong>Micro-conversion:</strong> An intermediate milestone (e.g. Add-to-Cart or Proceed to Checkout).</li>
              </ul>
            </div>
          )}

          <div className="mls-footer-bar">
            <button
              type="button"
              className="mls-btn-secondary"
              onClick={() => setPhase('recall')}
            >
              <ArrowLeft size={16} /> Back to Recall
            </button>
            <button
              type="button"
              className="mls-btn-primary"
              onClick={() => setPhase('explain')}
            >
              Continue to Self-Explanation (Stage C) <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* PHASE C: EXPLAIN */}
      {phase === 'explain' && (
        <div className="mls-card animate-fade-in">
          <div className="mls-kicker">
            <Sparkles size={14} /> Stage C — Explain in Your Own Words
          </div>

          <h2 className="mls-title">Teach the Concept Back</h2>
          <p className="mls-body-lead">
            The Feynman Technique: If you can summarize this idea in plain language without relying
            on jargon, you truly own the knowledge.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              How would you explain "{lesson.title}" to a store owner or junior developer?
            </label>
            <textarea
              className="mls-textarea"
              rows={4}
              value={selfExplanation}
              onChange={(e) => setSelfExplanation(e.target.value)}
              placeholder="In your own words: why does this principle matter and what does it look like in practice on Shopify?"
            />
            <button
              type="button"
              className="mls-btn-primary"
              style={{ width: 'fit-content' }}
              onClick={handleEvaluateExplanation}
              disabled={evaluating || selfExplanation.trim().length < 15}
            >
              {evaluating ? 'Coach Evaluating...' : 'Get Supportive Coach Feedback'}
            </button>
          </div>

          {feedback && (
            <div
              className={`mls-coach-feedback ${feedback.score === 'needs_expansion' ? 'needs-expansion' : ''} animate-fade-in`}
            >
              <div className="mls-coach-header">
                <span className="mls-coach-title">
                  <CheckCircle2 size={16} /> Coach Assessment & Praise
                </span>
                <span className="badge badge-indigo">Saved to Your Knowledge Base</span>
              </div>

              <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {feedback.coachingHint}
              </div>

              {feedback.strengths.length > 0 && (
                <ul style={{ paddingLeft: 18, fontSize: 13, color: 'var(--text-secondary)' }}>
                  {feedback.strengths.map((str, idx) => (
                    <li key={idx}><strong>Strength:</strong> {str}</li>
                  ))}
                </ul>
              )}

              {feedback.missingPoints.length > 0 && (
                <div style={{ fontSize: 13, color: 'var(--warning)', marginTop: 4 }}>
                  💡 <strong>Next Small Step:</strong> {feedback.missingPoints.join(' ')}
                </div>
              )}
            </div>
          )}

          <div className="mls-footer-bar">
            <button
              type="button"
              className="mls-btn-secondary"
              onClick={() => setPhase('learn')}
            >
              <ArrowLeft size={16} /> Back to Learn
            </button>
            <button
              type="button"
              className="mls-btn-primary"
              onClick={() => setPhase('apply')}
              disabled={!selfExplanation.trim()}
            >
              Continue to Real Storefront Practice (Stage D) <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* PHASE D: APPLY */}
      {phase === 'apply' && (
        <div className="mls-card animate-fade-in">
          <div className="mls-kicker">
            <Target size={14} /> Stage D — Practical Storefront Application
          </div>

          <h2 className="mls-title">Evaluate a Real Shopify Scenario</h2>
          <p className="mls-body-lead">
            Apply your understanding using the rigorous 5-step CRO evaluation framework.
          </p>

          <div
            style={{
              padding: '16px 20px',
              background: 'var(--bg-app)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
              Scenario: Premium Kitchenware Shopify Store ($140 AOV, 60,000 sessions/mo)
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              On their mobile Product Detail Page, users scroll past 10 lifestyle photos before seeing
              the price and Add-to-Cart button. Mobile CVR is 1.1% compared to 2.4% on desktop.
            </p>
          </div>

          {/* 5-Step Guided Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="mls-apply-step">
              <span className="mls-apply-label">1. Directly Observable Evidence</span>
              <input
                type="text"
                className="input"
                placeholder="e.g. 10 uncompressed images push the buy box 2,200px below mobile fold..."
                value={applyAnswers.issue}
                onChange={(e) => setApplyAnswers({ ...applyAnswers, issue: e.target.value })}
              />
            </div>

            <div className="mls-apply-step">
              <span className="mls-apply-label">2. Behavioral Interpretation (Why it Matters)</span>
              <input
                type="text"
                className="input"
                placeholder="e.g. Shoppers experience decision fatigue before seeing pricing or committing..."
                value={applyAnswers.whyMatters}
                onChange={(e) => setApplyAnswers({ ...applyAnswers, whyMatters: e.target.value })}
              />
            </div>

            <div className="mls-apply-step">
              <span className="mls-apply-label">3. Proposed Testable Improvement</span>
              <input
                type="text"
                className="input"
                placeholder="e.g. Implement a swipeable image carousel with thumbnail pagination and sticky ATC bar..."
                value={applyAnswers.improvement}
                onChange={(e) => setApplyAnswers({ ...applyAnswers, improvement: e.target.value })}
              />
            </div>

            <div className="mls-apply-step">
              <span className="mls-apply-label">4. Primary & Guardrail Metrics to Validate</span>
              <input
                type="text"
                className="input"
                placeholder="e.g. Primary: Mobile ATC Rate. Guardrail: Bounce rate & Returns..."
                value={applyAnswers.validationMetric}
                onChange={(e) => setApplyAnswers({ ...applyAnswers, validationMetric: e.target.value })}
              />
            </div>
          </div>

          {/* Worked Example Toggle */}
          <div style={{ marginTop: 6 }}>
            <button
              type="button"
              className="mls-btn-secondary"
              onClick={() => setShowWorkedExample(!showWorkedExample)}
            >
              <Lightbulb size={14} /> {showWorkedExample ? 'Hide Coach Example' : 'Need Help? Show Coach Worked Example'}
            </button>
          </div>

          {showWorkedExample && (
            <div className="mls-disclosure-panel animate-fade-in">
              <div className="mls-disclosure-title">
                <CheckCircle2 size={16} /> Coach's Worked Analysis:
              </div>
              <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                <li><strong>Evidence:</strong> 10 vertical stacked images create 2,200px scroll barrier on mobile phones.</li>
                <li><strong>Behavioral Reason:</strong> Buyers lose track of the core purchase decision and experience cognitive friction navigating up and down.</li>
                <li><strong>Hypothesis & Change:</strong> Replace stacked column with 1.2-peek swipeable carousel and bottom sticky ATC bar.</li>
                <li><strong>Validation:</strong> 14-day A/B test measuring Mobile Add-to-Cart % and Revenue per Session.</li>
              </ul>
            </div>
          )}

          <div className="mls-footer-bar">
            <button
              type="button"
              className="mls-btn-secondary"
              onClick={() => setPhase('explain')}
            >
              <ArrowLeft size={16} /> Back to Explain
            </button>
            <button
              type="button"
              className="mls-btn-primary"
              onClick={() => setPhase('reflect')}
            >
              Continue to Reflection (Stage E) <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* PHASE E: REFLECT */}
      {phase === 'reflect' && (
        <div className="mls-card animate-fade-in">
          <div className="mls-kicker">
            <CheckCircle2 size={14} /> Stage E — Session Debrief & Reflection
          </div>

          <h2 className="mls-title">Great Work! Here is Your Takeaway</h2>
          <p className="mls-body-lead">
            Take a moment to consolidate what you learned today before closing this session.
          </p>

          <div
            style={{
              padding: '20px 24px',
              background: 'rgba(99, 102, 241, 0.05)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-primary)' }}>
              Key Takeaway to Remember:
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-primary)' }}>
              {coreTakeaway}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>
              Any remaining question or curiosity? (Optional — will be saved to your Personal Knowledge Base):
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g. How does this apply if the merchant has only 5,000 monthly visitors?"
              value={unresolvedQuestion}
              onChange={(e) => setUnresolvedQuestion(e.target.value)}
            />
          </div>

          {!sessionCompleted ? (
            <div style={{ marginTop: 12 }}>
              <button
                type="button"
                className="mls-btn-primary"
                onClick={handleFinishSession}
              >
                Complete Session & Schedule Spaced Review <CheckCircle2 size={16} />
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: '24px',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                animation: 'fadeIn 0.3s ease',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--success)' }}>
                Session Successfully Completed!
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Your understanding has been recorded. This concept is now scheduled in your memory
                system and will appear for a quick 2-minute active recall review tomorrow.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 6 }}>
                <Link to="/dashboard" className="mls-btn-primary">
                  Return to Today's Practice
                </Link>
                <Link to="/cro-lab" className="mls-btn-secondary">
                  Explore CRO Lab Exercises
                </Link>
                <Link to="/knowledge-base" className="mls-btn-secondary">
                  View My Knowledge Base
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
