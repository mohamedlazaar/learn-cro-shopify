import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GamificationState, ToastMessage } from '../types/user';
import { StoreAudit, Experiment, CapstoneDeliverable, CaseStudy } from '../types/tools';
import {
  loadStateFromDB,
  saveStateToDB,
  defaultInitialState,
  AppDatabaseSchema,
  mergeStates,
  exportAppStateJSON,
  importAppStateJSON,
} from '../services/db';
import {
  getLevelFromXP,
  calculateDailyStreak,
  ALL_BADGES,
} from '../services/gamification';
import { DEFAULT_CAPSTONE_DELIVERABLES } from '../data/capstoneDeliverables';

interface ProgressContextType {
  completedLessons: Record<string, { completedAt: string; checklist: Record<number, boolean> }>;
  completedExercises: Record<string, { completedAt: string; submission?: any; xpEarned: number }>;
  completedQuizzes: Record<string, {
    completedAt: string;
    score: number;
    attempts: number;
    xpEarned: number;
    userAnswers?: Record<number, number>;
    totalQuestions?: number;
  }>;
  gamification: GamificationState;
  audits: StoreAudit[];
  experiments: Experiment[];
  capstoneDeliverables: CapstoneDeliverable[];
  caseStudy: CaseStudy | null;
  lessonNotes: Record<string, { content: string; updatedAt: string }>;
  toasts: ToastMessage[];

  // Actions
  completeLesson: (lessonId: string, checklist?: Record<number, boolean>) => void;
  toggleLessonChecklistItem: (lessonId: string, index: number) => void;
  completeExercise: (exerciseId: string, xp: number, submission?: any) => void;
  completeQuiz: (quizId: string, score: number, totalQuestions: number, userAnswers?: Record<number, number>) => void;
  saveLessonNote: (lessonId: string, content: string) => void;
  saveAuditStore: (store: StoreAudit) => void;
  toggleAuditCheckItem: (storeId: string, itemId: string, checked: boolean) => void;
  updateAuditItemNote: (storeId: string, itemId: string, note: string) => void;
  saveExperiment: (experiment: Experiment) => void;
  deleteExperiment: (id: string) => void;
  updateCapstoneDeliverable: (id: number, updates: Partial<CapstoneDeliverable>) => void;
  saveCaseStudy: (caseStudy: CaseStudy) => void;
  dismissToast: (id: string) => void;
  triggerConfetti: () => void;
  resetProgress: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppDatabaseSchema>(() => {
    // Initial sync load from localStorage if available
    try {
      const raw = localStorage.getItem('cro_lab_state_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...defaultInitialState,
          ...parsed,
          capstoneDeliverables: parsed.capstoneDeliverables?.length ? parsed.capstoneDeliverables : DEFAULT_CAPSTONE_DELIVERABLES,
        };
      }
    } catch {}
    return {
      ...defaultInitialState,
      capstoneDeliverables: DEFAULT_CAPSTONE_DELIVERABLES,
    };
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Async load from IndexedDB on mount
  useEffect(() => {
    loadStateFromDB().then((dbState) => {
      setState((curr) => {
        const merged = mergeStates(curr, dbState);
        return {
          ...merged,
          capstoneDeliverables: merged.capstoneDeliverables?.length ? merged.capstoneDeliverables : DEFAULT_CAPSTONE_DELIVERABLES,
        };
      });
    });
  }, []);

  // Sync back to IndexedDB and LocalStorage on state change
  useEffect(() => {
    saveStateToDB(state);
  }, [state]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast_' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#818cf8', '#ec4899'],
      });
    } catch {}
  }, []);

  const awardXP = useCallback(
    (amount: number, reason: string, toastType: ToastMessage['type'] = 'xp') => {
      setState((prev) => {
        const newXP = prev.gamification.xp + amount;
        const oldLevel = prev.gamification.level;
        const newLevel = getLevelFromXP(newXP);

        // Calculate streak
        const streakResult = calculateDailyStreak(
          prev.gamification.lastActivityDate,
          prev.gamification.streak,
          prev.gamification.freezesLeft
        );

        const newBadges = [...prev.gamification.badges];

        // Check badge unlocks
        if (newXP >= 100 && !newBadges.includes('first-lesson')) {
          newBadges.push('first-lesson');
        }
        if (Object.keys(prev.completedLessons).length + 1 >= 10 && !newBadges.includes('ten-lessons')) {
          newBadges.push('ten-lessons');
        }
        if (streakResult.newStreak >= 7 && !newBadges.includes('streak-warrior')) {
          newBadges.push('streak-warrior');
        }

        const updatedState: AppDatabaseSchema = {
          ...prev,
          gamification: {
            ...prev.gamification,
            xp: newXP,
            level: newLevel,
            streak: streakResult.newStreak,
            longestStreak: Math.max(prev.gamification.longestStreak, streakResult.newStreak),
            freezesLeft: streakResult.newFreezes,
            lastActivityDate: new Date().toISOString().split('T')[0],
            badges: newBadges,
          },
        };

        if (newLevel > oldLevel) {
          triggerConfetti();
          addToast({
            title: `Level Up! Reached Level ${newLevel}! 🎉`,
            message: `Congratulations! Your CRO developer rank has progressed.`,
            type: 'level',
            xpAmount: amount,
          });
        } else {
          addToast({
            title: `+${amount} XP Earned!`,
            message: reason,
            type: toastType,
            xpAmount: amount,
          });
        }

        return updatedState;
      });
    },
    [addToast, triggerConfetti]
  );

  const completeLesson = useCallback(
    (lessonId: string, checklist: Record<number, boolean> = {}) => {
      const isAlreadyCompleted = !!state.completedLessons[lessonId];
      setState((prev) => ({
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [lessonId]: {
            completedAt: new Date().toISOString(),
            checklist,
          },
        },
      }));

      if (!isAlreadyCompleted) {
        awardXP(20, 'Lesson Completed');
      } else {
        addToast({
          title: 'Lesson Progress Saved',
          message: 'Your checklist progress has been updated.',
          type: 'info',
        });
      }
    },
    [state.completedLessons, awardXP, addToast]
  );

  const toggleLessonChecklistItem = useCallback(
    (lessonId: string, index: number) => {
      setState((prev) => {
        const existing = prev.completedLessons[lessonId] || {
          completedAt: new Date().toISOString(),
          checklist: {},
        };
        const updatedChecklist = {
          ...existing.checklist,
          [index]: !existing.checklist[index],
        };
        return {
          ...prev,
          completedLessons: {
            ...prev.completedLessons,
            [lessonId]: {
              ...existing,
              checklist: updatedChecklist,
            },
          },
        };
      });
    },
    []
  );

  const completeExercise = useCallback(
    (exerciseId: string, xp: number, submission?: any) => {
      const alreadyDone = !!state.completedExercises[exerciseId];
      setState((prev) => ({
        ...prev,
        completedExercises: {
          ...prev.completedExercises,
          [exerciseId]: {
            completedAt: new Date().toISOString(),
            submission,
            xpEarned: xp,
          },
        },
      }));

      if (!alreadyDone) {
        awardXP(xp, 'Exercise Solved!');
      } else {
        addToast({
          title: 'Exercise Resubmitted',
          message: 'Your updated solution has been verified and saved.',
          type: 'success',
        });
      }
    },
    [state.completedExercises, awardXP, addToast]
  );

  const completeQuiz = useCallback(
    (quizId: string, score: number, totalQuestions: number, userAnswers?: Record<number, number>) => {
      const existing = state.completedQuizzes[quizId];
      const attempts = (existing?.attempts || 0) + 1;
      const passRate = (score / totalQuestions) * 100;
      const isFirstAttempt = attempts === 1;

      setState((prev) => ({
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [quizId]: {
            completedAt: new Date().toISOString(),
            score,
            attempts,
            xpEarned: isFirstAttempt && passRate >= 60 ? 40 : existing?.xpEarned || 0,
            userAnswers: userAnswers || existing?.userAnswers,
            totalQuestions,
          },
        },
      }));

      if (isFirstAttempt && passRate >= 60) {
        awardXP(40, `Passed Module Quiz (${score}/${totalQuestions})!`);
      }

      if (score === totalQuestions) {
        triggerConfetti();
        // Award quiz ace badge
        setState((prev) => ({
          ...prev,
          gamification: {
            ...prev.gamification,
            badges: prev.gamification.badges.includes('quiz-ace')
              ? prev.gamification.badges
              : [...prev.gamification.badges, 'quiz-ace'],
          },
        }));
      }
    },
    [state.completedQuizzes, awardXP, triggerConfetti]
  );

  const saveLessonNote = useCallback((lessonId: string, content: string) => {
    setState((prev) => ({
      ...prev,
      lessonNotes: {
        ...prev.lessonNotes,
        [lessonId]: {
          content,
          updatedAt: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const saveAuditStore = useCallback((store: StoreAudit) => {
    setState((prev) => {
      const existingIndex = prev.audits.findIndex((a) => a.id === store.id);
      let updated: StoreAudit[];
      if (existingIndex >= 0) {
        updated = [...prev.audits];
        updated[existingIndex] = store;
      } else {
        updated = [store, ...prev.audits];
      }
      return { ...prev, audits: updated };
    });
  }, []);

  const toggleAuditCheckItem = useCallback((storeId: string, itemId: string, checked: boolean) => {
    setState((prev) => {
      let store = prev.audits.find((a) => a.id === storeId);
      if (!store) {
        store = {
          id: storeId,
          storeName: 'Active Store Audit',
          checkedItemIds: {},
          notes: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      const updatedStore: StoreAudit = {
        ...store,
        checkedItemIds: {
          ...store.checkedItemIds,
          [itemId]: checked,
        },
        updatedAt: new Date().toISOString(),
      };

      const existingIndex = prev.audits.findIndex((a) => a.id === storeId);
      const newAudits = existingIndex >= 0
        ? prev.audits.map((a, i) => (i === existingIndex ? updatedStore : a))
        : [updatedStore, ...prev.audits];

      // Check for first audit badge
      const totalChecked = Object.values(updatedStore.checkedItemIds).filter(Boolean).length;
      let newBadges = prev.gamification.badges;
      if (totalChecked >= 5 && !newBadges.includes('first-audit')) {
        newBadges = [...newBadges, 'first-audit'];
      }

      return {
        ...prev,
        audits: newAudits,
        gamification: {
          ...prev.gamification,
          badges: newBadges,
        },
      };
    });
  }, []);

  const updateAuditItemNote = useCallback((storeId: string, itemId: string, note: string) => {
    setState((prev) => {
      let store = prev.audits.find((a) => a.id === storeId);
      if (!store) {
        store = {
          id: storeId,
          storeName: 'Active Store Audit',
          checkedItemIds: {},
          notes: {},
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      const updatedStore: StoreAudit = {
        ...store,
        notes: {
          ...store.notes,
          [itemId]: note,
        },
        updatedAt: new Date().toISOString(),
      };
      const existingIndex = prev.audits.findIndex((a) => a.id === storeId);
      const newAudits = existingIndex >= 0
        ? prev.audits.map((a, i) => (i === existingIndex ? updatedStore : a))
        : [updatedStore, ...prev.audits];

      return { ...prev, audits: newAudits };
    });
  }, []);

  const saveExperiment = useCallback(
    (exp: Experiment) => {
      setState((prev) => {
        const existingIdx = prev.experiments.findIndex((e) => e.id === exp.id);
        const updated = existingIdx >= 0
          ? prev.experiments.map((e, idx) => (idx === existingIdx ? exp : e))
          : [exp, ...prev.experiments];

        let badges = prev.gamification.badges;
        if (!badges.includes('first-ab-test')) {
          badges = [...badges, 'first-ab-test'];
        }

        return {
          ...prev,
          experiments: updated,
          gamification: { ...prev.gamification, badges },
        };
      });
      awardXP(30, 'Experiment Plan Created');
    },
    [awardXP]
  );

  const deleteExperiment = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      experiments: prev.experiments.filter((e) => e.id !== id),
    }));
  }, []);

  const updateCapstoneDeliverable = useCallback(
    (id: number, updates: Partial<CapstoneDeliverable>) => {
      setState((prev) => {
        const updatedList = prev.capstoneDeliverables.map((item) => {
          if (item.id === id) {
            const wasCompleted = item.status === 'completed';
            const willBeCompleted = updates.status === 'completed';
            return {
              ...item,
              ...updates,
              completedAt: willBeCompleted && !wasCompleted ? new Date().toISOString() : item.completedAt,
            };
          }
          return item;
        });

        const completedCount = updatedList.filter((d) => d.status === 'completed').length;
        let badges = [...prev.gamification.badges];

        if (completedCount === 10 && !badges.includes('capstone-complete')) {
          badges.push('capstone-complete');
          triggerConfetti();
          addToast({
            title: '🏆 Master Capstone Completed!',
            message: 'All 10 deliverables shipped! CRO Master Architect unlocked.',
            type: 'badge',
            xpAmount: 200,
          });
        }

        return {
          ...prev,
          capstoneDeliverables: updatedList,
          gamification: {
            ...prev.gamification,
            badges,
          },
        };
      });

      if (updates.status === 'completed') {
        awardXP(200, `Capstone Deliverable #${id} Shipped!`);
      }
    },
    [awardXP, triggerConfetti, addToast]
  );

  const saveCaseStudy = useCallback((caseStudy: CaseStudy) => {
    setState((prev) => ({ ...prev, caseStudy }));
    addToast({
      title: 'Portfolio Case Study Saved',
      message: 'Your case study narrative and metrics have been synced.',
      type: 'success',
    });
  }, [addToast]);

  const resetProgress = useCallback(() => {
    setState({
      ...defaultInitialState,
      capstoneDeliverables: DEFAULT_CAPSTONE_DELIVERABLES,
    });
    localStorage.removeItem('cro_lab_state_v1');
    addToast({
      title: 'Progress Reset',
      message: 'All learning progress has been reset to beginning state.',
      type: 'info',
    });
  }, [addToast]);

  const exportJSON = useCallback(() => {
    return exportAppStateJSON(state);
  }, [state]);

  const importJSON = useCallback(
    (jsonStr: string): boolean => {
      try {
        const imported = importAppStateJSON(jsonStr);
        setState(imported);
        addToast({
          title: 'Data Successfully Restored',
          message: 'Your curriculum progress, notes, and tools data were restored.',
          type: 'success',
        });
        return true;
      } catch (e) {
        addToast({
          title: 'Import Failed',
          message: 'Invalid JSON format. Please ensure valid export file.',
          type: 'danger' as any,
        });
        return false;
      }
    },
    [addToast]
  );

  return (
    <ProgressContext.Provider
      value={{
        completedLessons: state.completedLessons,
        completedExercises: state.completedExercises,
        completedQuizzes: state.completedQuizzes,
        gamification: state.gamification,
        audits: state.audits,
        experiments: state.experiments,
        capstoneDeliverables: state.capstoneDeliverables,
        caseStudy: state.caseStudy,
        lessonNotes: state.lessonNotes,
        toasts,
        completeLesson,
        toggleLessonChecklistItem,
        completeExercise,
        completeQuiz,
        saveLessonNote,
        saveAuditStore,
        toggleAuditCheckItem,
        updateAuditItemNote,
        saveExperiment,
        deleteExperiment,
        updateCapstoneDeliverable,
        saveCaseStudy,
        dismissToast,
        triggerConfetti,
        resetProgress,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
