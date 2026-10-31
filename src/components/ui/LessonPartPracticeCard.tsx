import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  AlertCircle,
  RotateCcw,
  Award,
  Zap,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SectionPractice, Lesson, LessonSection } from '../../types/curriculum';
import { useProgress } from '../../context/ProgressContext';
import './LessonPartPracticeCard.css';

interface LessonPartPracticeCardProps {
  lesson: Lesson;
  section: LessonSection;
  sectionIndex: number;
  totalSections: number;
  isArabic?: boolean;
}

export const LessonPartPracticeCard: React.FC<LessonPartPracticeCardProps> = ({
  lesson,
  section,
  sectionIndex,
  totalSections,
  isArabic = false,
}) => {
  const practice: SectionPractice | undefined = section.practice;
  const { completedExercises, completeExercise } = useProgress();

  if (!practice) return null;

  const exerciseId = practice.id || `part-practice-${lesson.id}-${sectionIndex}`;
  const isCompletedInContext = !!completedExercises[exerciseId];

  // Local storage backup for fast offline persistence
  const storageKey = `cro_part_solved_${exerciseId}`;
  const [isSolved, setIsSolved] = useState<boolean>(() => {
    return isCompletedInContext || localStorage.getItem(storageKey) === 'true';
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(() => {
    const saved = localStorage.getItem(`${storageKey}_selection`);
    if (saved !== null) return parseInt(saved, 10);
    return isCompletedInContext ? practice.correctIndex : null;
  });

  const [submitted, setSubmitted] = useState<boolean>(() => {
    return isCompletedInContext || localStorage.getItem(storageKey) === 'true';
  });

  const [showHint, setShowHint] = useState<boolean>(false);

  // Sync if context updates
  useEffect(() => {
    if (completedExercises[exerciseId]) {
      setIsSolved(true);
      setSubmitted(true);
      if (selectedIndex === null) {
        setSelectedIndex(practice.correctIndex);
      }
    }
  }, [completedExercises[exerciseId], exerciseId, practice.correctIndex, selectedIndex]);

  const questionText = isArabic && practice.arQuestion ? practice.arQuestion : practice.question;
  const optionsList = isArabic && practice.arOptions && practice.arOptions.length > 0
    ? practice.arOptions
    : practice.options;
  const explanationText = isArabic && practice.arExplanation ? practice.arExplanation : practice.explanation;
  const hintText = isArabic && practice.arHint ? practice.arHint : practice.hint;

  const isCorrect = selectedIndex === practice.correctIndex;

  const handleSelectOption = (idx: number) => {
    if (submitted && isSolved) return; // Locked once solved
    setSelectedIndex(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedIndex === null) return;
    setSubmitted(true);

    if (selectedIndex === practice.correctIndex) {
      setIsSolved(true);
      localStorage.setItem(storageKey, 'true');
      localStorage.setItem(`${storageKey}_selection`, String(selectedIndex));

      // Trigger celebration
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
      });

      // Award XP via Progress Context
      completeExercise(exerciseId, practice.xp || 10, {
        lessonId: lesson.id,
        sectionIndex,
        selectedIndex,
      });
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedIndex(null);
    setIsSolved(false);
    localStorage.removeItem(storageKey);
    localStorage.removeItem(`${storageKey}_selection`);
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div
      className={`lpp-card ${isSolved ? 'is-solved' : ''}`}
      aria-label={`Part ${sectionIndex + 1} Practice Exercise`}
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Header Bar */}
      <div className="lpp-header">
        <div className="lpp-header-left">
          <div className="lpp-icon-badge">
            <Zap size={15} />
          </div>
          <div>
            <div className="lpp-kicker">
              {isArabic
                ? `تمرين تطبيقي · الجزء ${sectionIndex + 1} من ${totalSections}`
                : `Part ${sectionIndex + 1} Practice · Active Check`}
            </div>
            <h3 className="lpp-title">
              {isArabic
                ? 'تحدي الاستيعاب والتطبيق العملي'
                : 'Implementation & Comprehension Challenge'}
            </h3>
          </div>
        </div>

        <div className="lpp-header-badges">
          <span className="lpp-xp-pill">
            <Sparkles size={12} />
            <span>+{practice.xp || 10} XP</span>
          </span>
          {isSolved && (
            <span className="lpp-solved-pill">
              <CheckCircle2 size={13} />
              <span>{isArabic ? 'تم الإتقان' : 'Mastered'}</span>
            </span>
          )}
        </div>
      </div>

      {/* Question Prompt */}
      <div className="lpp-question-prompt">
        <p>{questionText}</p>
      </div>

      {/* Hint Toggle (if available) */}
      {hintText && (
        <div className="lpp-hint-wrapper">
          <button
            type="button"
            className="lpp-hint-btn"
            onClick={() => setShowHint((prev) => !prev)}
            aria-expanded={showHint}
          >
            <Lightbulb size={13} />
            <span>
              {showHint
                ? isArabic ? 'إخفاء التلميح' : 'Hide Hint'
                : isArabic ? 'هل تحتاج إلى تلميح للمساعدة؟' : 'Need a senior engineer hint?'}
            </span>
          </button>
          {showHint && (
            <div className="lpp-hint-box animate-fade-in">
              <span className="lpp-hint-tag">{isArabic ? '💡 تلميح:' : '💡 Hint:'}</span>
              <p>{hintText}</p>
            </div>
          )}
        </div>
      )}

      {/* Options List */}
      <div className="lpp-options-grid" role="radiogroup">
        {optionsList.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const showAnswerFeedback = submitted;
          const isThisCorrect = idx === practice.correctIndex;

          let optionStatusClass = '';
          if (showAnswerFeedback) {
            if (isThisCorrect) {
              optionStatusClass = 'is-correct-answer';
            } else if (isSelected && !isThisCorrect) {
              optionStatusClass = 'is-wrong-answer';
            }
          } else if (isSelected) {
            optionStatusClass = 'is-selected';
          }

          return (
            <div
              key={idx}
              className={`lpp-option-item ${optionStatusClass}`}
              onClick={() => handleSelectOption(idx)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  handleSelectOption(idx);
                }
              }}
            >
              <div className="lpp-option-prefix">
                {showAnswerFeedback && isThisCorrect ? (
                  <Check size={14} className="lpp-check-icon" />
                ) : (
                  <span>{letters[idx] || idx + 1}</span>
                )}
              </div>
              <div className="lpp-option-text">{option}</div>
            </div>
          );
        })}
      </div>

      {/* Feedback Alert Box */}
      {submitted && (
        <div
          className={`lpp-feedback-card animate-fade-in ${
            isCorrect ? 'is-success' : 'is-error'
          }`}
        >
          <div className="lpp-feedback-header">
            {isCorrect ? (
              <CheckCircle2 size={18} className="lpp-feedback-icon" />
            ) : (
              <AlertCircle size={18} className="lpp-feedback-icon" />
            )}
            <strong className="lpp-feedback-title">
              {isCorrect
                ? isArabic
                  ? 'إجابة ممتازة وصحيحة! تم احتساب النقاط (+10 XP) 🎉'
                  : 'Spot On! Technical Mastery Confirmed (+10 XP) 🎉'
                : isArabic
                ? 'محاولة جيدة، لكن هذا الخيار ليس الحل الأمثل هندسياً.'
                : 'Not quite. That approach introduces risks or misses the core mechanism.'}
            </strong>
          </div>
          <div className="lpp-feedback-body">
            <p>{explanationText}</p>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="lpp-footer">
        <div>
          {submitted && !isCorrect && (
            <button
              type="button"
              className="btn btn-sm btn-secondary lpp-retry-btn"
              onClick={() => {
                setSubmitted(false);
              }}
            >
              <RotateCcw size={13} />
              <span>{isArabic ? 'إعادة المحاولة' : 'Try Again'}</span>
            </button>
          )}

          {isSolved && (
            <button
              type="button"
              className="lpp-reset-link"
              onClick={handleReset}
              title={isArabic ? 'إعادة تعيين التمرين' : 'Reset to test yourself again'}
            >
              <RotateCcw size={12} />
              <span>{isArabic ? 'إعادة الاختبار' : 'Retake Exercise'}</span>
            </button>
          )}
        </div>

        <div>
          {!isSolved && (
            <button
              type="button"
              className={`btn btn-sm ${
                selectedIndex !== null ? 'btn-primary' : 'btn-secondary disabled'
              } lpp-submit-btn`}
              onClick={handleCheckAnswer}
              disabled={selectedIndex === null}
            >
              <Check size={14} />
              <span>{isArabic ? 'تحقق من الإجابة' : 'Check Answer'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
