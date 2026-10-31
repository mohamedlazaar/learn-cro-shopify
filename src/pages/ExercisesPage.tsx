import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wrench,
  CheckCircle2,
  Filter,
  ChevronRight,
  Sparkles,
  Flame,
  Zap,
  Code2,
  Calculator,
  SearchCheck,
  FileCode2,
  Layers,
  Award,
  RotateCcw,
} from 'lucide-react';
import { ALL_EXERCISES } from '../data/exercises';
import { MODULES } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import { useLanguage } from '../context/LanguageContext';
import { ExerciseType } from '../types/curriculum';

const TYPE_META: Record<
  ExerciseType,
  { label: string; labelAr: string; color: string; icon: React.ReactNode }
> = {
  'multiple-choice': {
    label: 'Diagnostic Quiz',
    labelAr: 'اختبار تشخيصي',
    color: '#a3e635',
    icon: <Sparkles size={13} />,
  },
  'fill-blank': {
    label: 'Syntax Matrix',
    labelAr: 'مصفوفة الصياغة',
    color: '#22d3ee',
    icon: <Layers size={13} />,
  },
  code: {
    label: 'Web Pixel Code',
    labelAr: 'كود بيكسل الويب',
    color: '#38bdf8',
    icon: <Code2 size={13} />,
  },
  liquid: {
    label: 'Shopify Liquid',
    labelAr: 'شوبيفاي ليكويد',
    color: '#fbbf24',
    icon: <FileCode2 size={13} />,
  },
  audit: {
    label: 'Heuristic Audit',
    labelAr: 'تدقيق إرشادي',
    color: '#fb7185',
    icon: <SearchCheck size={13} />,
  },
  math: {
    label: 'CRO Unit Math',
    labelAr: 'حسابات التحويل',
    color: '#c084fc',
    icon: <Calculator size={13} />,
  },
  writeup: {
    label: 'Hypothesis Spec',
    labelAr: 'صياغة الفرضية',
    color: '#f472b6',
    icon: <Award size={13} />,
  },
  build: {
    label: 'Architecture Build',
    labelAr: 'بناء معماري',
    color: '#34d399',
    icon: <Wrench size={13} />,
  },
};

export const ExercisesPage: React.FC = () => {
  const navigate = useNavigate();
  const { completedExercises } = useProgress();
  const { isArabic } = useLanguage();

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = ALL_EXERCISES.filter((ex) => {
    if (typeFilter !== 'all' && ex.type !== typeFilter) return false;
    if (difficultyFilter !== 'all' && ex.difficulty !== difficultyFilter) return false;
    const isDone = !!completedExercises[ex.id];
    if (statusFilter === 'completed' && !isDone) return false;
    if (statusFilter === 'pending' && isDone) return false;
    return true;
  });

  const allTypes: ExerciseType[] = [
    'multiple-choice',
    'fill-blank',
    'code',
    'liquid',
    'audit',
    'math',
    'writeup',
    'build',
  ];

  const solvedCount = Object.keys(completedExercises).length;
  const totalCount = ALL_EXERCISES.length;
  const solvedPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 48 }}>
      {/* Arcade Bounty Board Hero Banner */}
      <div
        className="cyber-corner-box"
        style={{
          position: 'relative',
          padding: '28px 32px',
          borderRadius: '24px',
          background:
            'radial-gradient(circle at 90% 15%, rgba(163, 230, 53, 0.14), transparent 45%), radial-gradient(circle at 15% 85%, rgba(34, 211, 238, 0.12), transparent 50%), var(--bg-surface)',
          border: '2px solid var(--border-default)',
          boxShadow: '0 6px 0 var(--border-default), var(--shadow-md)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
              <span
                className="arcade-sticker"
                style={{
                  background: '#a3e635',
                  color: '#06070b',
                  borderColor: '#06070b',
                }}
              >
                <Zap size={12} /> {isArabic ? 'لوحة مهام التدريب العملي' : 'CHALLENGE BOUNTY ARCADE'}
              </span>
              <span className="badge badge-indigo" style={{ fontFamily: 'var(--font-mono)' }}>
                {solvedCount} / {totalCount} {isArabic ? 'مهمة مكتملة' : 'BOUNTIES CLAIMED'}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                marginBottom: 10,
                lineHeight: 1.12,
              }}
            >
              {isArabic
                ? 'ترسانة التحديات التقنية ومعمل الكود'
                : 'Technical CRO Bounty Board & Code Arena'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
              {isArabic
                ? 'احترف هندسة التحويل عبر تحديات عملية حقيقية: معادلات إحصائية، أكواد Web Pixels، تحسين سرعة Liquid LCP، والتدقيق الإرشادي للمتاجر.'
                : 'Claim XP bounties by solving real-world Shopify engineering quests: statistical significance math, Web Pixel telemetry, Liquid LCP optimizations, and heuristic teardown audits.'}
            </p>
          </div>

          {/* Bounty Radar HUD Card */}
          <div
            style={{
              minWidth: 230,
              padding: '18px 22px',
              borderRadius: '18px',
              background: 'var(--bg-elevated)',
              border: '1.5px solid var(--border-strong)',
              boxShadow: '0 4px 0 var(--border-default)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                }}
              >
                {isArabic ? 'معدل إنجاز المهام' : 'BOUNTY CLEARANCE'}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 18,
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                }}
              >
                {solvedPct}%
              </span>
            </div>

            <div className="progress-bar-track" style={{ height: 10 }}>
              <div className="progress-bar-fill" style={{ width: `${solvedPct}%` }} />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
              }}
            >
              <span>{solvedCount} CLAIMED</span>
              <span>{totalCount - solvedCount} ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Arcade Filter Deck */}
      <div
        style={{
          padding: '20px 24px',
          background: 'var(--bg-surface)',
          border: '2px solid var(--border-default)',
          borderRadius: '20px',
          boxShadow: '0 4px 0 var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Top Row: Difficulty + Status Pills + Reset */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
          }}
        >
          {/* Difficulty Tactile Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginRight: 4,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Flame size={13} color="var(--warning)" />
              {isArabic ? 'الصعوبة:' : 'THREAT LEVEL:'}
            </span>

            {[
              { id: 'all', label: isArabic ? 'الكل' : 'ALL TIERS', color: 'var(--accent-primary)' },
              { id: 'easy', label: isArabic ? 'سهل (+15 XP)' : 'RECON (+15 XP)', color: '#10b981' },
              { id: 'medium', label: isArabic ? 'متوسط (+30 XP)' : 'TACTICAL (+30 XP)', color: '#f59e0b' },
              { id: 'hard', label: isArabic ? 'صعب (+50 XP)' : 'BOSS (+50 XP)', color: '#f43f5e' },
            ].map((tier) => {
              const active = difficultyFilter === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setDifficultyFilter(tier.id)}
                  style={{
                    padding: '6px 13px',
                    borderRadius: '999px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: active ? `1.5px solid ${tier.color}` : '1.5px solid var(--border-default)',
                    background: active ? 'var(--bg-elevated)' : 'transparent',
                    color: active ? tier.color : 'var(--text-secondary)',
                    boxShadow: active ? `0 3px 0 ${tier.color}44` : 'none',
                    transform: active ? 'translateY(-1px)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tier.label}
                </button>
              );
            })}
          </div>

          {/* Status Toggle Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: isArabic ? 'كل الحالات' : 'ALL BOUNTIES' },
              { id: 'pending', label: isArabic ? 'غير مكتمل' : 'UNCLAIMED' },
              { id: 'completed', label: isArabic ? 'مكتمل' : 'CLAIMED ✓' },
            ].map((st) => {
              const active = statusFilter === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => setStatusFilter(st.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: active ? '1.5px solid var(--accent-secondary)' : '1.5px solid var(--border-subtle)',
                    background: active ? 'rgba(34, 211, 238, 0.12)' : 'var(--bg-elevated)',
                    color: active ? 'var(--accent-secondary)' : 'var(--text-muted)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {st.label}
                </button>
              );
            })}

            {(typeFilter !== 'all' || difficultyFilter !== 'all' || statusFilter !== 'all') && (
              <button
                onClick={() => {
                  setTypeFilter('all');
                  setDifficultyFilter('all');
                  setStatusFilter('all');
                }}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: 11, padding: '6px 10px' }}
              >
                <RotateCcw size={12} />
                {isArabic ? 'إعادة ضبط' : 'Reset'}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Cartridge Type Selector Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexWrap: 'wrap',
            paddingTop: 12,
            borderTop: '1px dashed var(--border-default)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 800,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginRight: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Filter size={12} />
            {isArabic ? 'نوع التحدي:' : 'CARTRIDGE CLASS:'}
          </span>

          <button
            onClick={() => setTypeFilter('all')}
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              fontWeight: 800,
              cursor: 'pointer',
              border: typeFilter === 'all' ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-default)',
              background: typeFilter === 'all' ? 'var(--accent-primary-subtle)' : 'var(--bg-elevated)',
              color: typeFilter === 'all' ? 'var(--accent-primary)' : 'var(--text-secondary)',
            }}
          >
            {isArabic ? `الكل (${ALL_EXERCISES.length})` : `ALL CLASSES (${ALL_EXERCISES.length})`}
          </button>

          {allTypes.map((t) => {
            const meta = TYPE_META[t];
            const active = typeFilter === t;
            return (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 12px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: active ? `1.5px solid ${meta.color}` : '1px solid var(--border-default)',
                  background: active ? `${meta.color}18` : 'var(--bg-elevated)',
                  color: active ? meta.color : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                }}
              >
                {meta.icon}
                <span>{isArabic ? meta.labelAr : meta.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bounty Cartridges Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
          gap: 20,
        }}
      >
        {filtered.map((ex, idx) => {
          const isDone = !!completedExercises[ex.id];
          const mod = MODULES.find((m) => m.id === ex.moduleId);
          const meta = TYPE_META[ex.type] || TYPE_META['multiple-choice'];

          const diffColor =
            ex.difficulty === 'easy'
              ? '#10b981'
              : ex.difficulty === 'medium'
              ? '#f59e0b'
              : '#f43f5e';

          const flamesCount = ex.difficulty === 'easy' ? 1 : ex.difficulty === 'medium' ? 2 : 3;

          return (
            <div
              key={ex.id}
              className="card card-interactive"
              onClick={() => navigate(`/exercises/${ex.slug}`)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 0,
                overflow: 'hidden',
                border: isDone ? '2px solid var(--success)' : '2px solid var(--border-default)',
                boxShadow: isDone
                  ? '0 5px 0 rgba(16, 185, 129, 0.35)'
                  : '0 5px 0 var(--border-default)',
              }}
            >
              {/* Top Cartridge Spine */}
              <div
                style={{
                  padding: '12px 18px',
                  background: isDone
                    ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.16), transparent)'
                    : 'var(--bg-elevated)',
                  borderBottom: '1.5px dashed var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      padding: '3px 9px',
                      borderRadius: '999px',
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      background: `${meta.color}18`,
                      color: meta.color,
                      border: `1px solid ${meta.color}55`,
                    }}
                  >
                    {meta.icon}
                    {isArabic ? meta.labelAr : meta.label}
                  </span>

                  {/* Flame Difficulty Indicator */}
                  <span
                    title={`Difficulty: ${ex.difficulty}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 2,
                      padding: '2px 7px',
                      borderRadius: '999px',
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      color: diffColor,
                      background: `${diffColor}15`,
                      border: `1px solid ${diffColor}40`,
                    }}
                  >
                    {Array.from({ length: flamesCount }).map((_, i) => (
                      <Flame key={i} size={10} fill={diffColor} />
                    ))}
                    <span style={{ marginLeft: 3 }}>{ex.difficulty}</span>
                  </span>
                </div>

                {/* XP Bounty Crystal */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '3px 9px',
                    borderRadius: '8px',
                    background: isDone ? 'var(--success-subtle)' : 'var(--accent-primary-subtle)',
                    color: isDone ? 'var(--success)' : 'var(--accent-primary)',
                    border: isDone
                      ? '1px solid rgba(16, 185, 129, 0.4)'
                      : '1px solid var(--border-accent)',
                  }}
                >
                  {isDone ? '✓ ' : '+'}
                  {ex.xp} XP
                </span>
              </div>

              {/* Bounty Body */}
              <div style={{ padding: '18px 20px', flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: 6,
                  }}
                >
                  BOUNTY #{String(idx + 1).padStart(2, '0')} • MOD {mod?.order ?? 1}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    fontWeight: 800,
                    marginBottom: 10,
                    lineHeight: 1.3,
                    color: 'var(--text-primary)',
                  }}
                >
                  {ex.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {ex.prompt.length > 135 ? `${ex.prompt.substring(0, 135)}...` : ex.prompt}
                </p>
              </div>

              {/* Perforated Bounty Ticket Stub Footer */}
              <div
                style={{
                  padding: '12px 20px',
                  background: 'var(--bg-elevated)',
                  borderTop: '1.5px dashed var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '60%',
                  }}
                >
                  {mod?.title}
                </span>

                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: isDone ? 'var(--success)' : 'var(--accent-primary)',
                  }}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 size={13} />
                      {isArabic ? 'مراجعة الحل' : 'INSPECT SOLUTION'}
                    </>
                  ) : (
                    <>
                      {isArabic ? 'ابدأ المهمة' : 'LAUNCH ARENA'}
                      <ChevronRight size={14} />
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
