export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  experienceLevel: ExperienceLevel;
  role?: string;
  weeklyHoursGoal: number;
  weeklyLessonsGoal: number;
  timezone: string;
  enrolledDate: string;
  onboardingCompleted: boolean;
}

export type RankTier = 'Novice' | 'Practitioner' | 'Specialist' | 'Expert' | 'Master';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progress' | 'mastery' | 'streak' | 'capstone' | 'tool';
  unlockedAt?: string;
}

export interface GamificationState {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  freezesLeft: number;
  lastActivityDate: string;
  badges: string[];
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'xp' | 'level' | 'streak' | 'badge' | 'success' | 'info';
  xpAmount?: number;
}
