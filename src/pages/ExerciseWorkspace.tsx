import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle2, Clock, Wrench } from 'lucide-react';
import { getExerciseBySlug } from '../data/exercises';
import { MODULES } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import { MathExercise } from '../components/exercises/MathExercise';
import { MultipleChoice } from '../components/exercises/MultipleChoice';
import { CodeExercise } from '../components/exercises/CodeExercise';
import { LiquidExercise } from '../components/exercises/LiquidExercise';
import { AuditExercise } from '../components/exercises/AuditExercise';
import { WriteupExercise } from '../components/exercises/WriteupExercise';
import { FillBlankExercise } from '../components/exercises/FillBlankExercise';
import { BuildExercise } from '../components/exercises/BuildExercise';
import { ArabicTermsBadge } from '../components/ui/ArabicTermsBadge';
import { findArabicTermsInText } from '../data/arabicTerms';

export const ExerciseWorkspace: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { completedExercises, completeExercise } = useProgress();

  const exercise = getExerciseBySlug(slug || '');

  if (!exercise) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Exercise Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>The requested exercise slug does not exist.</p>
        <Link to="/exercises" className="btn btn-primary" style={{ marginTop: 16 }}>
          Back to Exercises Catalog
        </Link>
      </div>
    );
  }

  const module = MODULES.find((m) => m.id === exercise.moduleId);
  const completedRecord = completedExercises[exercise.id];
  const isCompleted = !!completedRecord;

  const arabicTerms = useMemo(() => {
    const text = `${exercise.title} ${exercise.prompt}`;
    return findArabicTermsInText(text);
  }, [exercise]);

  const handleSuccess = (xp: number, submission: any) => {
    completeExercise(exercise.id, xp, submission);
  };

  const renderExerciseRunner = () => {
    const commonProps = {
      exercise,
      onSuccess: handleSuccess,
      isCompleted,
      initialSubmission: completedRecord?.submission,
    };

    switch (exercise.type) {
      case 'math':
        return <MathExercise {...commonProps} />;
      case 'multiple-choice':
        return <MultipleChoice {...commonProps} />;
      case 'code':
        return <CodeExercise {...commonProps} />;
      case 'liquid':
        return <LiquidExercise {...commonProps} />;
      case 'audit':
        return <AuditExercise {...commonProps} />;
      case 'writeup':
        return <WriteupExercise {...commonProps} />;
      case 'fill-blank':
        return <FillBlankExercise {...commonProps} />;
      case 'build':
        return <BuildExercise {...commonProps} />;
      default:
        return <div>Exercise runner not configured for type {exercise.type}</div>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
        <Link to="/exercises" style={{ color: 'inherit', textDecoration: 'none' }}>Exercises</Link>
        <span>/</span>
        {module && (
          <>
            <Link to={`/curriculum/${module.phaseId}/${module.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              Module {module.order}
            </Link>
            <span>/</span>
          </>
        )}
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{exercise.type.toUpperCase()}</span>
      </div>

      {/* Header Banner */}
      <div
        style={{
          padding: '24px 28px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          borderLeft: isCompleted ? '4px solid var(--success)' : '4px solid var(--accent-primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="badge badge-gray">{exercise.type}</span>
          <span
            className={`badge ${
              exercise.difficulty === 'easy'
                ? 'badge-green'
                : exercise.difficulty === 'medium'
                ? 'badge-amber'
                : 'badge-red'
            }`}
          >
            {exercise.difficulty}
          </span>
          <span className="badge badge-indigo">+{exercise.xp} XP</span>
          {isCompleted && (
            <>
              <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={12} />
                <span>Solved</span>
              </span>
              {completedRecord?.completedAt && (
                <span className="badge badge-gray">
                  Saved: {new Date(completedRecord.completedAt).toLocaleDateString()}
                </span>
              )}
            </>
          )}
        </div>

        <h1 style={{ fontSize: 24, letterSpacing: '-0.02em', marginBottom: 10 }}>{exercise.title}</h1>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {exercise.prompt}
        </p>

        {arabicTerms.length > 0 && (
          <ArabicTermsBadge
            terms={arabicTerms}
            title="مصطلحات هذا النشاط بالعربية (Activity Terms in Arabic)"
          />
        )}
      </div>

      {/* Interactive Workspace Runner */}
      <div
        style={{
          padding: '28px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {renderExerciseRunner()}
      </div>
    </div>
  );
};
