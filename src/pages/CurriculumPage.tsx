import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Video,
  Code2,
  TrendingUp,
  Award,
  Zap,
  Sparkles,
  Flame,
} from 'lucide-react';
import { CRO_PHASES, DEV_PHASES } from '../data/phases';
import { CRO_MODULES, DEV_MODULES } from '../data/modules';
import { ALL_LESSONS } from '../data/lessons';
import { ALL_QUIZZES } from '../data/quizzes';
import { ALL_EXERCISES } from '../data/exercises';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { ProgressRing } from '../components/ui/ProgressRing';
import { getTermsForModuleId } from '../data/arabicTerms';
import type { TrackType } from '../types/curriculum';

const PHASE_PALETTES = [
  { accent: '#a3e635', glow: 'rgba(163, 230, 53, 0.14)', border: 'rgba(163, 230, 53, 0.45)' },
  { accent: '#22d3ee', glow: 'rgba(34, 211, 238, 0.14)', border: 'rgba(34, 211, 238, 0.45)' },
  { accent: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.16)', border: 'rgba(139, 92, 246, 0.45)' },
  { accent: '#fb7185', glow: 'rgba(251, 113, 133, 0.14)', border: 'rgba(251, 113, 133, 0.45)' },
  { accent: '#fbbf24', glow: 'rgba(251, 191, 36, 0.14)', border: 'rgba(251, 191, 36, 0.45)' },
  { accent: '#34d399', glow: 'rgba(52, 211, 153, 0.14)', border: 'rgba(52, 211, 153, 0.45)' },
];

export const CurriculumPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { completedLessons, completedQuizzes } = useProgress();
  const { isArabic } = useLanguage();

  const [activeTrack, setActiveTrack] = useState<TrackType>(() => {
    const urlTrack = searchParams.get('track') as TrackType;
    if (urlTrack === 'cro' || urlTrack === 'dev') return urlTrack;
    const saved = localStorage.getItem('cro_active_track') as TrackType;
    return saved === 'cro' ? 'cro' : 'dev';
  });

  useEffect(() => {
    const urlTrack = searchParams.get('track') as TrackType;
    if (urlTrack && (urlTrack === 'cro' || urlTrack === 'dev')) {
      setActiveTrack(urlTrack);
      localStorage.setItem('cro_active_track', urlTrack);
    }
  }, [searchParams]);

  const handleTrackChange = (track: TrackType) => {
    setActiveTrack(track);
    setSearchParams({ track });
    localStorage.setItem('cro_active_track', track);
  };

  const currentPhases = activeTrack === 'dev' ? DEV_PHASES : CRO_PHASES;
  const currentModules = activeTrack === 'dev' ? DEV_MODULES : CRO_MODULES;

  const trackLessonIds = currentModules.flatMap((m) => m.lessonIds);
  const trackLessonsDone = trackLessonIds.filter((id) => completedLessons[id]).length;
  const overallTrackProgress =
    trackLessonIds.length > 0 ? Math.round((trackLessonsDone / trackLessonIds.length) * 100) : 0;

  return (
    <div className="curr-arcade-wrap animate-fade-in">
      {/* SECTION 1: DUAL CARTRIDGE TRACK DECK */}
      <div className="curr-track-deck">
        <button
          type="button"
          onClick={() => handleTrackChange('dev')}
          className={`curr-cartridge-tab ${activeTrack === 'dev' ? 'is-active dev' : ''}`}
        >
          <div className="cartridge-icon-box dev">
            <Code2 size={18} />
          </div>
          <div className="cartridge-tab-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="cartridge-tab-title">
                {isArabic ? 'مسار مطور شوبيفاي الشامل (16 أسبوعاً)' : 'Full-Stack Shopify Engineer (16-Wk)'}
              </span>
              <span className="arcade-sticker" style={{ fontSize: 9, padding: '1px 7px' }}>
                {isArabic ? 'جديد' : 'OS 2.0 + WASM'}
              </span>
            </div>
            <span className="cartridge-tab-sub">
              {isArabic ? 'Liquid • Functions • Remix • Hydrogen' : 'Liquid • Checkout UI • Functions • Remix • Hydrogen'}
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => handleTrackChange('cro')}
          className={`curr-cartridge-tab ${activeTrack === 'cro' ? 'is-active cro' : ''}`}
        >
          <div className="cartridge-icon-box cro">
            <TrendingUp size={18} />
          </div>
          <div className="cartridge-tab-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="cartridge-tab-title">
                {isArabic ? 'مسار هندسة التحويل CRO (24 أسبوعاً)' : 'Conversion Alchemist CRO (24-Wk)'}
              </span>
              <span className="arcade-sticker arcade-sticker-cyan" style={{ fontSize: 9, padding: '1px 7px' }}>
                6 WORLDS
              </span>
            </div>
            <span className="cartridge-tab-sub">
              {isArabic ? 'الاحصاء • علم النفس • تشريح المتاجر • الاختبارات' : 'Funnel Math • Heuristics • Psychology • A/B Testing'}
            </span>
          </div>
        </button>
      </div>

      {/* SECTION 2: WORLD MAP COMMAND BANNER */}
      <div className={`curr-hero-hud cyber-corner-box ${activeTrack}`}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span className="arcade-sticker">
              <Flame size={12} />
              {activeTrack === 'dev'
                ? isArabic ? 'خارطة طريق المطور المتقدم' : '16-WEEK ENGINEERING QUEST MAP'
                : isArabic ? 'خارطة طريق احتراف التحويل' : '24-WEEK ALCHEMIST QUEST MAP'}
            </span>
            <span className="curr-telemetry-chip">
              {isArabic
                ? `${currentPhases.length} عوالم · ${currentModules.length} شريط مهام · ${trackLessonIds.length} درساً`
                : `${currentPhases.length} WORLDS · ${currentModules.length} CARTRIDGES · ${trackLessonIds.length} QUESTS`}
            </span>
          </div>

          <h1 className="curr-hero-title">
            {activeTrack === 'dev'
              ? isArabic
                ? 'إتقان تطوير متاجر شوبيفاي الحديثة (بكل أبعادها البرمجية)'
                : 'Master Modern Shopify Engineering Across Every Layer'
              : isArabic
              ? 'المنهج الكامل لهندسة تحسين معدل التحويل (CRO)'
              : 'The Complete Shopify Conversion Alchemy Map'}
          </h1>

          <p className="curr-hero-desc">
            {activeTrack === 'dev'
              ? isArabic
                ? 'خارطة طريق تطبيقية تمتد على 16 أسبوعاً لإتقان كافة جوانب شوبيفاي: محرك Liquid، بنية قوالب Online Store 2.0، الحقول المخصصة Metafields، إضافات Checkout UI ودوال WebAssembly، تطبيقات Remix، وخدمات Hydrogen & Oxygen.'
                : 'Progress through 4 interconnected engineering worlds: Liquid engine internals, Online Store 2.0 JSON architecture, Checkout UI Extensions & Rust/WASM Functions, Remix full-stack apps, and Headless Hydrogen.'
              : isArabic
              ? 'اتبع المنهج المتكامل المكون من 6 عوالم: من اقتصاديات القمع البيعي الأساسية، مروراً بأدوات التحليل، تصميم الاختبارات الإحصائية، قواعد الجوال، علم النفس السلوكي، وتجارب الشركات الكبرى.'
              : 'Conquer 6 progressive conversion worlds: funnel unit economics, behavioral telemetry, mobile surface surgery, hypothesis roadmapping, Evan Miller statistics, and enterprise experimentation.'}
          </p>
        </div>

        <div className="curr-hud-radar-box">
          <ProgressRing progress={overallTrackProgress} size={68} strokeWidth={5.5} />
          <div>
            <div className="curr-radar-label">TRACK MASTERY</div>
            <div className="curr-radar-score">
              {trackLessonsDone} / {trackLessonIds.length}
            </div>
            <div className="curr-radar-sub">
              {isArabic ? 'مهمة مكتملة' : 'Quests Cleared'}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: INTERCONNECTED WORLD ISLANDS & MODULE CASSETTES */}
      <div className="curr-worlds-timeline">
        {currentPhases.map((phase, pIdx) => {
          const palette = PHASE_PALETTES[pIdx % PHASE_PALETTES.length];
          const phaseModules = currentModules.filter((m) => m.phaseId === phase.id);
          const phaseLessonIds = phaseModules.flatMap((m) => m.lessonIds);
          const finishedInPhase = phaseLessonIds.filter((id) => completedLessons[id]).length;
          const phaseProgress =
            phaseLessonIds.length > 0 ? Math.round((finishedInPhase / phaseLessonIds.length) * 100) : 0;

          return (
            <section
              key={phase.id}
              className="curr-world-island"
              style={
                {
                  '--world-accent': palette.accent,
                  '--world-glow': palette.glow,
                  '--world-border': palette.border,
                } as React.CSSProperties
              }
            >
              {/* World Header Banner */}
              <div className="curr-world-header">
                <div className="curr-world-watermark">0{phase.order}</div>
                <div className="curr-world-header-left">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                    <span className="curr-world-pill">WORLD 0{phase.order}</span>
                    <span className="curr-world-weeks">{phase.weeks}</span>
                    {phaseProgress === 100 && (
                      <span className="arcade-sticker" style={{ fontSize: 10 }}>★ WORLD CLEARED</span>
                    )}
                  </div>
                  <h2 className="curr-world-title">{phase.title}</h2>
                  <p className="curr-world-desc">{phase.description}</p>
                </div>

                <div className="curr-world-progress-box">
                  <div style={{ textAlign: isArabic ? 'left' : 'right' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                      {finishedInPhase} / {phaseLessonIds.length}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-muted)' }}>
                      QUESTS DONE
                    </div>
                  </div>
                  <ProgressRing progress={phaseProgress} size={46} strokeWidth={4} />
                </div>
              </div>

              {/* Collectible Module Cartridges Grid */}
              <div className="curr-cassettes-grid">
                {phaseModules.map((module) => {
                  const modLessonsDone = module.lessonIds.filter((id) => completedLessons[id]).length;
                  const isModComplete =
                    modLessonsDone === module.lessonIds.length && !!completedQuizzes[module.quizId];
                  const modProgress = Math.round((modLessonsDone / Math.max(1, module.lessonIds.length)) * 100);

                  const moduleQuiz = ALL_QUIZZES.find((q) => q.id === module.quizId);
                  const moduleExercises = ALL_EXERCISES.filter((ex) => ex.moduleId === module.id);
                  const moduleLessons = ALL_LESSONS.filter((l) => l.moduleId === module.id);
                  const hasVideos = moduleLessons.some((l) => !!l.videoSource);
                  const modXP = module.lessonIds.length * 30 + moduleExercises.length * 25 + 40;

                  return (
                    <div
                      key={module.id}
                      className={`curr-cassette-card ${isModComplete ? 'is-mastered' : ''}`}
                      onClick={() => navigate(`/curriculum/${phase.id}/${module.id}`)}
                    >
                      <div className="cassette-top-stripe" />

                      <div>
                        <div className="cassette-meta-row">
                          <span className="cassette-num-tag">
                            CARTRIDGE // W{String(module.order).padStart(2, '0')}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span className="cassette-xp-tag">⚡ +{modXP} XP</span>
                            <span className="cassette-time-tag">
                              <Clock size={11} />
                              <span>{module.estimatedMinutes}m</span>
                            </span>
                          </div>
                        </div>

                        <h3 className="cassette-title">{module.title}</h3>
                        <p className="cassette-summary">{module.summary}</p>

                        {/* Hardware Loot Chips */}
                        <div className="cassette-chips-row">
                          <span className="cassette-chip lessons">
                            <Sparkles size={11} />
                            <span>{module.lessonIds.length} Quests</span>
                          </span>

                          {hasVideos && (
                            <span className="cassette-chip video">
                              <Video size={11} />
                              <span>Masterclass Video</span>
                            </span>
                          )}

                          {moduleQuiz && (
                            <span className="cassette-chip quiz">
                              <Award size={11} />
                              <span>Boss Quiz ({moduleQuiz.questions.length}Q)</span>
                            </span>
                          )}

                          {moduleExercises.length > 0 && (
                            <span className="cassette-chip labs">
                              <Code2 size={11} />
                              <span>{moduleExercises.length} Labs</span>
                            </span>
                          )}
                        </div>

                        {/* Arabic Terms Preview */}
                        {getTermsForModuleId(module.id).length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                            {getTermsForModuleId(module.id)
                              .slice(0, 3)
                              .map((term) => (
                                <span key={term.id} className="cassette-ar-pill">
                                  {term.ar}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>

                      {/* Segmented Cassette Footer */}
                      <div className="cassette-footer">
                        <div className="cassette-prog-meta">
                          <span>{isModComplete ? '★ CARTRIDGE MASTERED' : 'SYNC PROGRESS'}</span>
                          <span>{modLessonsDone}/{module.lessonIds.length}</span>
                        </div>

                        <div className="cassette-prog-track">
                          <div
                            className="cassette-prog-fill"
                            style={{ width: `${modProgress}%` }}
                          />
                        </div>

                        <div className="cassette-launch-row">
                          <span>LOAD CARTRIDGE #{module.order}</span>
                          <ChevronRight size={15} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <style>{`
        .curr-arcade-wrap {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Dual Cartridge Track Switcher */
        .curr-track-deck {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 14px;
        }

        .curr-cartridge-tab {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: var(--bg-surface);
          border: 2px solid var(--border-subtle);
          border-radius: 18px;
          cursor: pointer;
          text-align: left;
          color: var(--text-secondary);
          box-shadow: var(--shadow-sm);
          transition: all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        [dir="rtl"] .curr-cartridge-tab {
          text-align: right;
        }

        .curr-cartridge-tab:hover {
          transform: translateY(-2px);
          border-color: var(--border-muted);
          color: var(--text-primary);
        }

        .curr-cartridge-tab.is-active.dev {
          background: linear-gradient(135deg, rgba(163, 230, 53, 0.14) 0%, var(--bg-surface) 75%);
          border-color: #a3e635;
          color: var(--text-primary);
          box-shadow: 0 5px 0 var(--card-edge), 0 0 24px rgba(163, 230, 53, 0.2);
        }

        .curr-cartridge-tab.is-active.cro {
          background: linear-gradient(135deg, rgba(34, 211, 238, 0.14) 0%, var(--bg-surface) 75%);
          border-color: #22d3ee;
          color: var(--text-primary);
          box-shadow: 0 5px 0 var(--card-edge), 0 0 24px rgba(34, 211, 238, 0.2);
        }

        .cartridge-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--bg-app);
          border: 1.5px solid var(--border-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .curr-cartridge-tab.is-active .cartridge-icon-box.dev {
          background: #a3e635;
          color: #090d16;
          border-color: #090d16;
        }

        .curr-cartridge-tab.is-active .cartridge-icon-box.cro {
          background: #22d3ee;
          color: #090d16;
          border-color: #090d16;
        }

        .cartridge-tab-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .cartridge-tab-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 800;
        }

        .cartridge-tab-sub {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        /* World Map Hero HUD */
        .curr-hero-hud {
          background: var(--bg-surface);
          border: 2px solid var(--border-muted);
          border-radius: 24px;
          padding: 30px 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          box-shadow: var(--shadow-lg);
        }

        .curr-hero-hud.dev {
          background:
            radial-gradient(circle at 90% 20%, rgba(163, 230, 53, 0.12) 0%, transparent 45%),
            var(--bg-surface);
        }

        .curr-hero-hud.cro {
          background:
            radial-gradient(circle at 90% 20%, rgba(34, 211, 238, 0.12) 0%, transparent 45%),
            var(--bg-surface);
        }

        .curr-telemetry-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-secondary);
          background: var(--bg-app);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid var(--border-subtle);
        }

        .curr-hero-title {
          font-family: var(--font-display);
          font-size: clamp(24px, 3.4vw, 34px);
          letter-spacing: -0.025em;
        }

        .curr-hero-desc {
          color: var(--text-secondary);
          max-width: 740px;
          margin-top: 8px;
          font-size: 14px;
          line-height: 1.6;
        }

        .curr-hud-radar-box {
          display: flex;
          align-items: center;
          gap: 16px;
          background: var(--bg-app);
          border: 1.5px solid var(--border-muted);
          padding: 16px 22px;
          border-radius: 18px;
          box-shadow: 0 4px 0 var(--card-edge);
        }

        .curr-radar-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .curr-radar-score {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .curr-radar-sub {
          font-size: 11.5px;
          color: var(--text-secondary);
        }

        /* World Islands */
        .curr-worlds-timeline {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        .curr-world-island {
          background: var(--bg-surface);
          border: 2px solid var(--border-muted);
          border-radius: 26px;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .curr-world-header {
          padding: 26px 30px;
          background: linear-gradient(135deg, var(--world-glow) 0%, var(--bg-surface-elevated) 70%);
          border-bottom: 1.5px dashed var(--border-muted);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }

        .curr-world-watermark {
          position: absolute;
          right: 24px;
          bottom: -18px;
          font-family: var(--font-display);
          font-size: 110px;
          font-weight: 800;
          color: var(--world-accent);
          opacity: 0.07;
          pointer-events: none;
          line-height: 1;
        }

        .curr-world-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 999px;
          background: var(--world-accent);
          color: #090d16;
          box-shadow: 0 2px 0 #090d16;
        }

        .curr-world-weeks {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          color: var(--world-accent);
        }

        .curr-world-title {
          font-family: var(--font-display);
          font-size: 23px;
        }

        .curr-world-desc {
          font-size: 13.5px;
          color: var(--text-secondary);
          margin-top: 4px;
          max-width: 680px;
        }

        .curr-world-progress-box {
          display: flex;
          align-items: center;
          gap: 14px;
          background: var(--bg-app);
          padding: 10px 16px;
          border-radius: 14px;
          border: 1px solid var(--border-subtle);
          position: relative;
          z-index: 1;
        }

        /* Module Cassettes Grid */
        .curr-cassettes-grid {
          padding: 26px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 18px;
        }

        .curr-cassette-card {
          background: var(--bg-app);
          border: 1.5px solid var(--border-subtle);
          border-radius: 18px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 0 var(--card-edge);
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .curr-cassette-card:hover {
          transform: translateY(-5px);
          border-color: var(--world-accent);
          box-shadow: 0 8px 0 var(--card-edge), 0 12px 24px rgba(0, 0, 0, 0.4);
        }

        .curr-cassette-card.is-mastered {
          border-color: rgba(16, 185, 129, 0.5);
        }

        .cassette-top-stripe {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--world-accent);
          opacity: 0.85;
        }

        .cassette-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }

        .cassette-num-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 800;
          color: var(--world-accent);
        }

        .cassette-xp-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
          background: rgba(163, 230, 53, 0.14);
          color: #a3e635;
          border: 1px solid rgba(163, 230, 53, 0.35);
        }

        [data-theme="light"] .cassette-xp-tag {
          color: #3f6212;
        }

        .cassette-time-tag {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .cassette-title {
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .cassette-summary {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.55;
          margin-bottom: 14px;
        }

        .cassette-chips-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .cassette-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .cassette-chip.lessons {
          background: rgba(139, 92, 246, 0.12);
          color: #c4b5fd;
          border: 1px solid rgba(139, 92, 246, 0.3);
        }

        [data-theme="light"] .cassette-chip.lessons {
          color: var(--accent-primary);
        }

        .cassette-chip.video {
          background: rgba(244, 63, 94, 0.12);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.3);
        }

        .cassette-chip.quiz {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        [data-theme="light"] .cassette-chip.quiz {
          color: #b45309;
        }

        .cassette-chip.labs {
          background: rgba(34, 211, 238, 0.12);
          color: #22d3ee;
          border: 1px solid rgba(34, 211, 238, 0.3);
        }

        [data-theme="light"] .cassette-chip.labs {
          color: #0e7490;
        }

        .cassette-ar-pill {
          font-size: 10.5px;
          padding: 1px 7px;
          border-radius: 5px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          direction: rtl;
        }

        .cassette-footer {
          padding-top: 12px;
          border-top: 1px dashed var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cassette-prog-meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .cassette-prog-track {
          height: 6px;
          background: var(--bg-surface);
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
        }

        .cassette-prog-fill {
          height: 100%;
          background: var(--world-accent);
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .cassette-launch-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          color: var(--world-accent);
        }
      `}</style>
    </div>
  );
};
