import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { getQuizBySlug } from '../data/quizzes';
import { MODULES } from '../data/modules';
import { useProgress } from '../context/ProgressContext';
import { ArabicTermsBadge } from '../components/ui/ArabicTermsBadge';
import { findArabicTermsInText } from '../data/arabicTerms';

export const QuizPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { completedQuizzes, completeQuiz, triggerConfetti } = useProgress();

  const quiz = getQuizBySlug(slug || '');
  const module = quiz ? MODULES.find((m) => m.id === quiz.moduleId) : undefined;
  const existingRecord = quiz ? completedQuizzes[quiz.id] : undefined;

  const draftKey = quiz ? `cro_quiz_draft_${quiz.id}` : '';

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (existingRecord) return 0;
    if (draftKey) {
      try {
        const draft = localStorage.getItem(draftKey);
        if (draft) {
          const parsed = JSON.parse(draft);
          if (typeof parsed.currentIndex === 'number') return parsed.currentIndex;
        }
      } catch {}
    }
    return 0;
  });

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(() => {
    if (existingRecord?.userAnswers) return existingRecord.userAnswers;
    if (draftKey) {
      try {
        const draft = localStorage.getItem(draftKey);
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed.selectedAnswers) return parsed.selectedAnswers;
        }
      } catch {}
    }
    return {};
  });

  const [isAnswerRevealed, setIsAnswerRevealed] = useState<Record<number, boolean>>(() => {
    if (existingRecord) {
      const revealed: Record<number, boolean> = {};
      quiz?.questions.forEach((_, idx) => { revealed[idx] = true; });
      return revealed;
    }
    if (draftKey) {
      try {
        const draft = localStorage.getItem(draftKey);
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed.isAnswerRevealed) return parsed.isAnswerRevealed;
        }
      } catch {}
    }
    return {};
  });

  const [isFinished, setIsFinished] = useState(() => {
    if (existingRecord) {
      // If there's no ongoing draft, default to finished view
      try {
        const draft = draftKey ? localStorage.getItem(draftKey) : null;
        if (!draft) return true;
      } catch {}
      return true;
    }
    return false;
  });

  // Keep draft updated in localStorage when taking the quiz
  useEffect(() => {
    if (!isFinished && quiz && draftKey) {
      try {
        localStorage.setItem(
          draftKey,
          JSON.stringify({ currentIndex, selectedAnswers, isAnswerRevealed })
        );
      } catch {}
    }
  }, [currentIndex, selectedAnswers, isAnswerRevealed, isFinished, draftKey, quiz]);

  if (!quiz) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2>Quiz Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>The requested quiz slug does not exist.</p>
        <Link to="/curriculum" className="btn btn-primary" style={{ marginTop: 16 }}>
          Back to Curriculum
        </Link>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];
  const currentSelected = selectedAnswers[currentIndex];
  const isCurrentRevealed = !!isAnswerRevealed[currentIndex];

  const handleSelectOption = (optIdx: number) => {
    if (isCurrentRevealed) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIdx }));
    setIsAnswerRevealed((prev) => ({ ...prev, [currentIndex]: true }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev: number) => prev + 1);
    } else {
      // Finish quiz
      let calculatedCorrect = 0;
      for (let i = 0; i < totalQuestions; i++) {
        if (selectedAnswers[i] === quiz.questions[i].correctIndex) {
          calculatedCorrect++;
        }
      }
      setIsFinished(true);
      if (draftKey) {
        try {
          localStorage.removeItem(draftKey);
        } catch {}
      }
      completeQuiz(quiz.id, calculatedCorrect, totalQuestions, selectedAnswers);
    }
  };

  const handleRetake = () => {
    if (draftKey) {
      try {
        localStorage.removeItem(draftKey);
      } catch {}
    }
    setSelectedAnswers({});
    setIsAnswerRevealed({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  // Compute score from selected answers
  let correctCount = 0;
  for (let i = 0; i < totalQuestions; i++) {
    if (selectedAnswers[i] === quiz.questions[i].correctIndex) {
      correctCount++;
    }
  }

  // If existing record has a higher or previously recorded score and no answers selected yet
  if (existingRecord && Object.keys(selectedAnswers).length === 0) {
    correctCount = existingRecord.score;
  }

  const passScore = Math.ceil(totalQuestions * 0.6);
  const isPassed = correctCount >= passScore;
  const isMastered = correctCount === totalQuestions;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const questionTerms = useMemo(() => {
    if (!currentQuestion) return [];
    const text = `${currentQuestion.question} ${currentQuestion.options.join(' ')} ${currentQuestion.explanation}`;
    return findArabicTermsInText(text);
  }, [currentQuestion]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Breadcrumb Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
        <Link to="/curriculum" style={{ color: 'inherit', textDecoration: 'none' }}>Curriculum</Link>
        <span>/</span>
        <Link to={`/curriculum/${module?.phaseId}/${module?.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          Module {module?.order}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{quiz.title}</span>
      </div>

      {!isFinished ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Header & Progress Bar */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="badge badge-indigo">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {existingRecord ? 'Retake Attempt' : 'First Attempt (+40 XP)'}
              </span>
            </div>
            {/* Progress line */}
            <div style={{ height: 4, background: 'var(--bg-surface-active)', borderRadius: 999, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  background: 'var(--accent-primary)',
                  width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                  transition: 'width 0.25s ease',
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div
            style={{
              padding: '28px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <h2 style={{ fontSize: 19, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              {currentQuestion.question}
            </h2>

            {/* Arabic Learning Terms Helper */}
            {questionTerms.length > 0 && (
              <ArabicTermsBadge
                terms={questionTerms}
                title="مصطلحات هذا السؤال بالعربية (Question Terms in Arabic)"
              />
            )}

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentQuestion.options.map((option, idx) => {
                const isSelected = currentSelected === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                let border = '1px solid var(--border-subtle)';
                let background = 'var(--bg-app)';

                if (isCurrentRevealed) {
                  if (isCorrect) {
                    border = '1.5px solid var(--success)';
                    background = 'var(--success-muted)';
                  } else if (isSelected && !isCorrect) {
                    border = '1.5px solid var(--danger)';
                    background = 'var(--danger-muted)';
                  }
                } else if (isSelected) {
                  border = '1.5px solid var(--accent-primary)';
                  background = 'var(--accent-muted)';
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border,
                      background,
                      cursor: isCurrentRevealed ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        border: '2px solid var(--border-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Explanation on reveal */}
            {isCurrentRevealed && (
              <div
                style={{
                  padding: 16,
                  borderRadius: 'var(--radius-md)',
                  background: currentSelected === currentQuestion.correctIndex ? 'var(--success-muted)' : 'var(--danger-muted)',
                  border: `1px solid ${currentSelected === currentQuestion.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {currentSelected === currentQuestion.correctIndex ? (
                    <>
                      <CheckCircle2 size={16} color="var(--success)" />
                      <span style={{ color: 'var(--success)' }}>Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} color="var(--danger)" />
                      <span style={{ color: 'var(--danger)' }}>Incorrect</span>
                    </>
                  )}
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next / Submit Button */}
            {isCurrentRevealed && (
              <button
                onClick={handleNext}
                className="btn btn-primary"
                style={{ alignSelf: 'flex-end', marginTop: 10 }}
              >
                <span>{currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Final Score'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished & Results Review */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Score Card */}
          <div
            className="card"
            style={{
              padding: '36px 28px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
              border: `1px solid ${isPassed ? 'rgba(16, 185, 129, 0.35)' : 'rgba(239, 68, 68, 0.35)'}`,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: isPassed ? 'var(--success-muted)' : 'var(--danger-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Trophy
                size={32}
                color={isPassed ? 'var(--success)' : 'var(--danger)'}
              />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
                <span className={`badge ${isPassed ? 'badge-green' : 'badge-red'}`}>
                  {isPassed ? (isMastered ? 'Mastered (100%)' : 'Passed') : 'Review Needed'}
                </span>
                {existingRecord?.attempts && (
                  <span className="badge badge-gray">
                    Attempt #{existingRecord.attempts}
                  </span>
                )}
                {existingRecord?.completedAt && (
                  <span className="badge badge-gray">
                    Saved: {new Date(existingRecord.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: 24, marginBottom: 6 }}>
                {isMastered
                  ? 'Flawless 100%! Quiz Mastered! 🎉'
                  : isPassed
                  ? 'Quiz Passed! Great Job!'
                  : 'Quiz Needs Review'}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
                You scored <strong style={{ color: 'var(--text-primary)' }}>{correctCount} out of {totalQuestions}</strong> questions correctly ({percentage}%).
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={handleRetake} className="btn btn-secondary">
                <RotateCcw size={14} />
                <span>Retake Quiz</span>
              </button>
              {module && (
                <Link to={`/curriculum/${module.phaseId}/${module.id}`} className="btn btn-primary">
                  <span>Back to Module</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* Breakdown Review of Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={18} color="var(--accent-primary)" />
                <span>Question & Answer Breakdown</span>
              </h3>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {correctCount} of {totalQuestions} Correct
              </span>
            </div>

            {quiz.questions.map((q, qIdx) => {
              const userAnswer = selectedAnswers[qIdx];
              const isUserCorrect = userAnswer === q.correctIndex;
              const hasAnswered = userAnswer !== undefined;

              return (
                <div
                  key={qIdx}
                  style={{
                    padding: '20px 22px',
                    background: 'var(--bg-surface)',
                    border: `1px solid ${
                      !hasAnswered
                        ? 'var(--border-subtle)'
                        : isUserCorrect
                        ? 'rgba(16, 185, 129, 0.3)'
                        : 'rgba(239, 68, 68, 0.3)'
                    }`,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <h4 style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>
                      <span style={{ color: 'var(--text-muted)', marginRight: 6 }}>{qIdx + 1}.</span>
                      {q.question}
                    </h4>
                    {hasAnswered && (
                      <span
                        className={`badge ${isUserCorrect ? 'badge-green' : 'badge-red'}`}
                        style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        {isUserCorrect ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        <span>{isUserCorrect ? 'Correct' : 'Incorrect'}</span>
                      </span>
                    )}
                  </div>

                  {/* Options List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = optIdx === q.correctIndex;
                      let bg = 'var(--bg-app)';
                      let border = '1px solid var(--border-subtle)';
                      let color = 'var(--text-secondary)';

                      if (isCorrect) {
                        bg = 'var(--success-muted)';
                        border = '1px solid var(--success)';
                        color = 'var(--text-primary)';
                      } else if (isSelected && !isCorrect) {
                        bg = 'var(--danger-muted)';
                        border = '1px solid var(--danger)';
                        color = 'var(--text-primary)';
                      }

                      return (
                        <div
                          key={optIdx}
                          style={{
                            padding: '10px 14px',
                            borderRadius: 'var(--radius-sm)',
                            background: bg,
                            border,
                            fontSize: 13,
                            color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 10,
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 700, fontSize: 12 }}>
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                            {isSelected && (
                              <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.85 }}>
                                (Your Answer)
                              </span>
                            )}
                            {isCorrect && !isSelected && (
                              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--success)' }}>
                                (Correct Answer)
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-surface-active)',
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <strong style={{ color: 'var(--text-primary)' }}>Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
