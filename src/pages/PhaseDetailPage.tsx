import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, ChevronRight, Sparkles, Award, Code2 } from 'lucide-react';
import { PHASES } from '../data/phases';
import { MODULES } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import { ProgressRing } from '../components/ui/ProgressRing';

export const PhaseDetailPage: React.FC = () => {
  const { phaseId } = useParams<{ phaseId: string }>();
  const navigate = useNavigate();
  const { completedLessons, completedQuizzes } = useProgress();

  const phase = PHASES.find((p) => p.id === phaseId) || PHASES[0];
  const phaseModules = MODULES.filter((m) => m.phaseId === phase.id);
  const phaseLessonIds = phaseModules.flatMap((m) => m.lessonIds);
  const finishedInPhase = phaseLessonIds.filter((id) => completedLessons[id]).length;
  const phaseProgress = phaseLessonIds.length > 0 ? Math.round((finishedInPhase / phaseLessonIds.length) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Tactile Back Pill */}
      <div>
        <Link to="/curriculum" className="btn btn-secondary btn-sm">
          <ArrowLeft size={14} />
          <span>Back to World Map</span>
        </Link>
      </div>

      {/* World Command Banner */}
      <div
        className="cyber-corner-box"
        style={{
          padding: '32px 36px',
          background:
            'radial-gradient(circle at 90% 20%, rgba(163, 230, 53, 0.14) 0%, transparent 45%), var(--bg-surface)',
          border: '2px solid var(--border-muted)',
          borderRadius: 24,
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 24,
            bottom: -18,
            fontFamily: 'var(--font-display)',
            fontSize: 120,
            fontWeight: 800,
            color: '#a3e635',
            opacity: 0.06,
            pointerEvents: 'none',
            lineHeight: 1,
          }}
        >
          0{phase.order}
        </div>

        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span className="arcade-sticker">WORLD 0{phase.order}</span>
            <span className="badge badge-indigo">{phase.weeks}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 36px)' }}>
            {phase.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 660, marginTop: 8, fontSize: 14.5, lineHeight: 1.6 }}>
            {phase.description}
          </p>
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
          <ProgressRing progress={phaseProgress} size={58} strokeWidth={5} />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, color: 'var(--text-muted)' }}>
              WORLD MASTERY
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
              {finishedInPhase} / {phaseLessonIds.length}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>Quests Cleared</div>
          </div>
        </div>
      </div>

      {/* Cartridges Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sparkles size={18} color="#a3e635" />
          <h3 style={{ fontSize: 20, fontFamily: 'var(--font-display)' }}>
            Select a Mission Cartridge ({phaseModules.length})
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: 18 }}>
          {phaseModules.map((module) => {
            const lessonsDone = module.lessonIds.filter((id) => completedLessons[id]).length;
            const isQuizDone = !!completedQuizzes[module.quizId];
            const isComplete = lessonsDone === module.lessonIds.length && isQuizDone;

            return (
              <div
                key={module.id}
                className="card card-interactive"
                onClick={() => navigate(`/curriculum/${phase.id}/${module.id}`)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 18,
                  borderTop: isComplete ? '5px solid #10b981' : '5px solid #8b5cf6',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        fontWeight: 800,
                        color: '#a3e635',
                        textTransform: 'uppercase',
                      }}
                    >
                      CARTRIDGE // 0{module.order}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                    >
                      <Clock size={12} />
                      <span>{module.estimatedMinutes}m</span>
                    </span>
                  </div>

                  <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{module.title}</h4>
                  <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 14 }}>
                    {module.summary}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    <span className="badge badge-indigo">{module.lessonIds.length} Quests</span>
                    <span className="badge badge-green">
                      <Code2 size={11} /> {module.exerciseIds.length} Labs
                    </span>
                    <span className="badge badge-amber">
                      <Award size={11} /> 1 Boss Quiz
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 12,
                    borderTop: '1px dashed var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    fontWeight: 800,
                    color: isComplete ? '#10b981' : 'var(--accent-primary)',
                  }}
                >
                  <span>{isComplete ? '★ MASTERED' : `LOAD (${lessonsDone}/${module.lessonIds.length} DONE)`}</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
