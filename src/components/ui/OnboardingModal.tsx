import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, Target, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { ExperienceLevel } from '../../types/user';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { user, completeOnboarding } = useAuth();
  const { triggerConfetti } = useProgress();

  const [step, setStep] = useState(1);
  const [level, setLevel] = useState<ExperienceLevel>(user?.experienceLevel || 'intermediate');
  const [hours, setHours] = useState<number>(user?.weeklyHoursGoal || 6);

  if (!isOpen) return null;

  const handleFinish = () => {
    completeOnboarding({
      experienceLevel: level,
      weeklyHoursGoal: hours,
      weeklyLessonsGoal: Math.max(3, Math.round(hours * 0.75)),
    });
    triggerConfetti();
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-muted)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 24px 16px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--accent-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 18 }}>Personalize Your CRO Curriculum</h3>
            <p style={{ fontSize: 12 }}>Step {step} of 3</p>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: 24 }}>
          {step === 1 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                What is your Shopify & Frontend background?
              </div>
              <p style={{ fontSize: 13, marginBottom: 16 }}>
                We calibrate exercise hints and technical depth to your current level.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  {
                    id: 'beginner',
                    title: 'Junior Theme Developer',
                    desc: 'Know HTML/CSS/Liquid basics; new to statistical A/B testing and Web Pixels.',
                  },
                  {
                    id: 'intermediate',
                    title: 'Mid-Level Shopify Developer',
                    desc: 'Comfortable with custom theme architecture, Section Rendering, and basic analytics.',
                  },
                  {
                    id: 'advanced',
                    title: 'Senior / Full-Stack Engineer',
                    desc: 'Experienced with Checkout Extensibility, Hydrogen, or Shopify Functions.',
                  },
                ].map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setLevel(opt.id as ExperienceLevel)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: level === opt.id ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      background: level === opt.id ? 'var(--accent-muted)' : 'var(--bg-app)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {opt.title}
                      </span>
                      {level === opt.id && <Check size={16} color="var(--accent-primary)" />}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                      {opt.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                What is your weekly study time commitment?
              </div>
              <p style={{ fontSize: 13, marginBottom: 20 }}>
                A 16-week pace requires consistent weekly momentum to maintain streaks and build mastery.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                  { hours: 4, pace: 'Moderate', lessons: '3 lessons / wk' },
                  { hours: 6, pace: 'Recommended', lessons: '4-5 lessons / wk' },
                  { hours: 10, pace: 'Intensive', lessons: 'Full module / wk' },
                ].map((opt) => (
                  <div
                    key={opt.hours}
                    onClick={() => setHours(opt.hours)}
                    style={{
                      padding: '16px 12px',
                      textAlign: 'center',
                      borderRadius: 'var(--radius-sm)',
                      border: hours === opt.hours ? '2px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                      background: hours === opt.hours ? 'var(--accent-muted)' : 'var(--bg-app)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                      {opt.hours}h
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-primary)', margin: '4px 0' }}>
                      {opt.pace}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                      {opt.lessons}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>
                Your 16-Week Personalized Roadmap Is Ready!
              </div>
              <p style={{ fontSize: 13, marginBottom: 16 }}>
                Here is how your learning schedule distributes across the 4 core phases:
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  background: 'var(--bg-app)',
                  padding: 14,
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Phase 1: Foundations (W1–4)</span>
                  <span style={{ color: 'var(--accent-primary)' }}>Funnel & Web Pixels</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Phase 2: Experimentation (W5–8)</span>
                  <span style={{ color: 'var(--accent-primary)' }}>Stats & Edge A/B Tests</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Phase 3: Optimization (W9–12)</span>
                  <span style={{ color: 'var(--accent-primary)' }}>PDP & Cart Drawers</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ fontWeight: 600 }}>Phase 4: Scale (W13–16)</span>
                  <span style={{ color: 'var(--accent-primary)' }}>Capstone Theme Build</span>
                </div>
              </div>

              <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={14} />
                <span>Total commitment: ~{hours * 16} hours to full professional certification.</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-surface-active)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-secondary btn-sm"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="btn btn-primary"
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="btn btn-primary"
            >
              <Sparkles size={14} />
              <span>Launch My CRO Journey</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
