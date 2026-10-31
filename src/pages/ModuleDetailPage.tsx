import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Wrench,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Zap,
  Trophy,
  Flame,
} from 'lucide-react';
import { MODULES } from '../data/modules';
import { PHASES } from '../data/phases';
import { getLessonsByModuleId } from '../data/lessons';
import { getExercisesByModuleId } from '../data/exercises';
import { getQuizByModuleId } from '../data/quizzes';
import { useProgress } from '../context/ProgressContext';
import { ProgressRing } from '../components/ui/ProgressRing';
import { ArabicTermsBadge } from '../components/ui/ArabicTermsBadge';
import { getTermsForModuleId } from '../data/arabicTerms';

export const ModuleDetailPage: React.FC = () => {
  const { phaseId, moduleId } = useParams<{ phaseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { completedLessons, completedExercises, completedQuizzes } = useProgress();

  const module = MODULES.find((m) => m.id === moduleId) || MODULES[0];
  const phase = PHASES.find((p) => p.id === (phaseId || module.phaseId)) || PHASES[0];

  const lessons = getLessonsByModuleId(module.id);
  const exercises = getExercisesByModuleId(module.id);
  const quiz = getQuizByModuleId(module.id);

  const lessonsDoneCount = lessons.filter((l) => completedLessons[l.id]).length;
  const isQuizDone = quiz ? !!completedQuizzes[quiz.id] : false;
  const quizScore = quiz ? completedQuizzes[quiz.id]?.score : undefined;

  const totalPartPractices = lessons.reduce((acc, l) => acc + (l.sections?.length || 0), 0);
  const completedPartPracticesCount = lessons.reduce((acc, l) => {
    return (
      acc +
      (l.sections || []).filter((s, sIdx) => {
        const partExId = s.practice?.id || `part-practice-${l.id}-${sIdx}`;
        return !!completedExercises[partExId];
      }).length
    );
  }, 0);

  const totalModuleXP =
    lessons.length * 20 +
    totalPartPractices * 10 +
    exercises.reduce((acc, ex) => acc + ex.xp, 0) +
    (quiz ? 40 : 0);
  const progressPercent = Math.round((lessonsDoneCount / Math.max(1, lessons.length)) * 100);

  const moduleTerms = useMemo(() => {
    return getTermsForModuleId(module.id);
  }, [module.id]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Tactile Breadcrumb Strip */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 12.5,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)',
          background: 'var(--bg-surface)',
          padding: '8px 14px',
          borderRadius: 999,
          border: '1px solid var(--border-subtle)',
          width: 'fit-content',
        }}
      >
        <Link to="/curriculum" style={{ color: 'inherit', textDecoration: 'none' }}>
          WORLD MAP
        </Link>
        <span>/</span>
        <Link to={`/curriculum/${phase.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          WORLD 0{phase.order}
        </Link>
        <span>/</span>
        <span style={{ color: '#a3e635', fontWeight: 800 }}>CARTRIDGE 0{module.order}</span>
      </div>

      {/* Mission Cartridge Briefing HUD */}
      <div
        className="cyber-corner-box"
        style={{
          padding: '30px 34px',
          background:
            'radial-gradient(circle at 88% 15%, rgba(139, 92, 246, 0.16) 0%, transparent 45%), var(--bg-surface)',
          border: '2px solid var(--border-muted)',
          borderRadius: 24,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
            <span className="arcade-sticker">CARTRIDGE #{module.order}</span>
            <span className="badge badge-indigo">
              {phase.title} ({phase.weeks})
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3.2vw, 34px)' }}>
            {module.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: 14.5, lineHeight: 1.6, maxWidth: 680 }}>
            {module.summary}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
              marginTop: 18,
              fontFamily: 'var(--font-mono)',
              fontSize: 11.5,
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 8,
                background: 'var(--bg-app)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Clock size={13} color="#22d3ee" />
              <span>~{module.estimatedMinutes}m runtime</span>
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 8,
                background: 'var(--bg-app)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <Zap size={13} color="#c084fc" />
              <span>
                {completedPartPracticesCount}/{totalPartPractices} Checkpoints Solved
              </span>
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 8,
                background: 'rgba(163, 230, 53, 0.14)',
                border: '1px solid rgba(163, 230, 53, 0.4)',
                color: '#a3e635',
                fontWeight: 800,
              }}
            >
              <Flame size={13} />
              <span>+{totalModuleXP} XP BOUNTY</span>
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'var(--bg-app)',
            padding: '16px 22px',
            borderRadius: 18,
            border: '1.5px solid var(--border-muted)',
            boxShadow: '0 4px 0 var(--card-edge)',
          }}
        >
          <ProgressRing progress={progressPercent} size={58} strokeWidth={5} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--text-muted)' }}>
              QUEST CHAIN
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
              {lessonsDoneCount} / {lessons.length}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>Quests Done</div>
          </div>
        </div>
      </div>

      {/* Bilingual Learning Terms Guide */}
      {moduleTerms.length > 0 && (
        <ArabicTermsBadge
          terms={moduleTerms}
          title="مصطلحات هذه الوحدة التعليمية (Key Learning Terms in Arabic)"
        />
      )}

      {/* 1. Connected Quest Chain (Core Lessons) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={18} color="#a3e635" />
          <h3 style={{ fontSize: 19, fontFamily: 'var(--font-display)' }}>
            Stage 1: Quest Chain ({lessons.length} Interactive Quests)
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lessons.map((lesson, idx) => {
            const isCompleted = !!completedLessons[lesson.id];
            const totalParts = lesson.sections?.length || 1;
            const doneParts = (lesson.sections || []).filter((s, sIdx) => {
              const partExId = s.practice?.id || `part-practice-${lesson.id}-${sIdx}`;
              return !!completedExercises[partExId];
            }).length;

            return (
              <div
                key={lesson.id}
                className="card card-interactive"
                onClick={() => navigate(`/lesson/${lesson.slug}`)}
                style={{
                  padding: '18px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  borderLeft: isCompleted ? '5px solid #10b981' : '5px solid #8b5cf6',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: isCompleted ? '#10b981' : 'var(--bg-app)',
                      border: '1.5px solid var(--border-muted)',
                      color: isCompleted ? '#090d16' : 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      fontWeight: 800,
                      flexShrink: 0,
                      boxShadow: '0 2px 0 var(--card-edge)',
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : `0${idx + 1}`}
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--text-primary)' }}>
                      {lesson.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        marginTop: 4,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        flexWrap: 'wrap',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span>⏱ ~{lesson.estimatedMinutes}m</span>
                      <span>•</span>
                      <span style={{ color: '#22d3ee', fontWeight: 700 }}>
                        {totalParts} Checkpoints
                      </span>
                      <span>•</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          maxWidth: 360,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {lesson.objectives[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  {doneParts > 0 && (
                    <span className="badge badge-green">
                      {doneParts}/{totalParts} Solved
                    </span>
                  )}
                  <span className="badge badge-indigo">⚡ +{20 + totalParts * 10} XP</span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Hands-on Lab Challenges */}
      {exercises.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Wrench size={18} color="#22d3ee" />
            <h3 style={{ fontSize: 19, fontFamily: 'var(--font-display)' }}>
              Stage 2: Hands-On Lab Bounties ({exercises.length})
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
            {exercises.map((ex) => {
              const isDone = !!completedExercises[ex.id];
              return (
                <div
                  key={ex.id}
                  className="card card-interactive"
                  onClick={() => navigate(`/exercises/${ex.slug}`)}
                  style={{
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: isDone ? '4px solid #10b981' : '4px solid #22d3ee',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span className="badge badge-gray">{ex.type}</span>
                      <span className="badge badge-indigo">⚡ +{ex.xp} XP</span>
                    </div>
                    <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{ex.title}</h4>
                    <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 14 }}>
                      {ex.prompt.substring(0, 115)}...
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      borderTop: '1px dashed var(--border-subtle)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      fontWeight: 800,
                      color: isDone ? '#10b981' : '#22d3ee',
                    }}
                  >
                    <span>{isDone ? '✓ BOUNTY CLAIMED' : 'LAUNCH LAB CHALLENGE'}</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Boss Arena Quiz Card */}
      {quiz && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Trophy size={18} color="#fbbf24" />
            <h3 style={{ fontSize: 19, fontFamily: 'var(--font-display)' }}>
              Stage 3: Cartridge Boss Arena
            </h3>
          </div>

          <div
            className="card card-interactive"
            onClick={() => navigate(`/quiz/${quiz.slug}`)}
            style={{
              padding: '24px 28px',
              background:
                'linear-gradient(135deg, rgba(251, 191, 36, 0.12) 0%, var(--bg-surface) 70%)',
              border: '2px solid rgba(251, 191, 36, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span className="arcade-sticker arcade-sticker-amber">
                  BOSS BATTLE // {quiz.questions.length} QUESTIONS
                </span>
                <span className="badge badge-indigo">⚡ +40 XP</span>
              </div>
              <h4 style={{ fontSize: 20, fontFamily: 'var(--font-display)' }}>{quiz.title}</h4>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginTop: 4 }}>
                Defeat the cartridge boss with instant technical explanations on every question.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {isQuizDone && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 800, color: '#10b981' }}>
                    ★ CLEARED: {quizScore}/{quiz.questions.length}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Boss Defeated</div>
                </div>
              )}
              <button className="btn btn-primary">
                <span>{isQuizDone ? 'Rematch Boss Quiz' : 'Enter Boss Arena'}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
