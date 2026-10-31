import { RankTier, Badge } from '../types/user';

export const ALL_BADGES: Badge[] = [
  {
    id: 'welcome-pioneer',
    name: 'Lab Pioneer',
    description: 'Enrolled in the 24-Week CRO Master Curriculum',
    icon: 'Sparkles',
    category: 'progress',
  },
  {
    id: 'first-lesson',
    name: 'First Breakthrough',
    description: 'Completed your very first CRO lesson',
    icon: 'BookOpen',
    category: 'progress',
  },
  {
    id: 'first-audit',
    name: 'Friction Detective',
    description: 'Completed your first 5+ item store CRO audit',
    icon: 'Search',
    category: 'tool',
  },
  {
    id: 'first-ab-test',
    name: 'Hypothesis Crafter',
    description: 'Formulated and planned an A/B test with sample size calculation',
    icon: 'FlaskConical',
    category: 'tool',
  },
  {
    id: 'ten-lessons',
    name: 'Double Digits',
    description: 'Mastered 10 lessons across the curriculum',
    icon: 'Award',
    category: 'progress',
  },
  {
    id: 'math-whiz',
    name: 'Metrics Maven',
    description: 'Accurately computed CVR, AOV, and RPS formulas',
    icon: 'Calculator',
    category: 'mastery',
  },
  {
    id: 'pixel-master',
    name: 'Pixel Alchemist',
    description: 'Built and verified a Shopify Web Pixel dataLayer pipeline',
    icon: 'Code2',
    category: 'mastery',
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Optimized Shopify PDP Largest Contentful Paint (LCP)',
    icon: 'Zap',
    category: 'mastery',
  },
  {
    id: 'liquid-architect',
    name: 'Liquid Architect',
    description: 'Engineered high-converting Liquid sections (Sticky ATC / Cart Drawer)',
    icon: 'FileCode',
    category: 'mastery',
  },
  {
    id: 'streak-warrior',
    name: 'Streak Sentinel',
    description: 'Achieved an active 7-day learning streak',
    icon: 'Flame',
    category: 'streak',
  },
  {
    id: 'quiz-ace',
    name: 'Perfect Score',
    description: 'Scored 100% on a technical module quiz',
    icon: 'CheckCircle2',
    category: 'mastery',
  },
  {
    id: 'mobile-master',
    name: 'Mobile Ergonomics Guru',
    description: 'Mastered thumb-zone physics and mobile responsive optimization',
    icon: 'Smartphone',
    category: 'mastery',
  },
  {
    id: 'psychology-ace',
    name: 'Behavioral Architect',
    description: 'Mastered Kahneman System 1/2, price anchoring & decoy pricing matrices',
    icon: 'Brain',
    category: 'mastery',
  },
  {
    id: 'qa-sentinel',
    name: 'Playwright QA Sentinel',
    description: 'Automated end-to-end A/B test regression testing and SRM detection',
    icon: 'ShieldCheck',
    category: 'mastery',
  },
  {
    id: 'capstone-complete',
    name: 'CRO Theme Architect',
    description: 'Completed all 10 Capstone Deliverables & built portfolio case study',
    icon: 'Crown',
    category: 'capstone',
  },
  {
    id: 'grand-master-certified',
    name: 'Grand Master CRO Developer',
    description: 'Scored 80%+ on the 10-Scenario Grand Master Certification Exam (Module 24)',
    icon: 'Trophy',
    category: 'mastery',
  },
];

// XP required to reach each level (1-50)
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  // Level 1: 0, Level 2: 100, Level 5: ~600, Level 15: ~2800, Level 50: ~18000
  return Math.floor(75 * Math.pow(level - 1, 1.38));
}

export function getLevelFromXP(totalXP: number): number {
  let level = 1;
  while (level < 50 && totalXP >= getXPForLevel(level + 1)) {
    level++;
  }
  return level;
}

export function getRankTier(level: number): RankTier {
  if (level <= 5) return 'Novice';
  if (level <= 15) return 'Practitioner';
  if (level <= 25) return 'Specialist';
  if (level <= 40) return 'Expert';
  return 'Master';
}

export function getLevelProgress(totalXP: number): {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progressPercent: number;
  rank: RankTier;
} {
  const currentLevel = getLevelFromXP(totalXP);
  const currentLevelXPThreshold = getXPForLevel(currentLevel);
  const nextLevelXPThreshold = currentLevel >= 50 ? currentLevelXPThreshold : getXPForLevel(currentLevel + 1);
  const xpIntoCurrent = totalXP - currentLevelXPThreshold;
  const xpNeeded = nextLevelXPThreshold - currentLevelXPThreshold;

  const progressPercent = currentLevel >= 50 ? 100 : Math.min(100, Math.max(0, Math.round((xpIntoCurrent / (xpNeeded || 1)) * 100)));

  return {
    currentLevel,
    currentLevelXP: xpIntoCurrent,
    nextLevelXP: xpNeeded,
    progressPercent,
    rank: getRankTier(currentLevel),
  };
}

export function calculateDailyStreak(
  lastActivityDateStr: string,
  currentStreak: number,
  freezesLeft: number
): { newStreak: number; newFreezes: number; protectedByFreeze: boolean } {
  const todayStr = new Date().toISOString().split('T')[0];
  if (!lastActivityDateStr) {
    return { newStreak: 1, newFreezes: freezesLeft, protectedByFreeze: false };
  }

  if (lastActivityDateStr === todayStr) {
    return { newStreak: Math.max(1, currentStreak), newFreezes: freezesLeft, protectedByFreeze: false };
  }

  const today = new Date(todayStr).getTime();
  const lastDate = new Date(lastActivityDateStr).getTime();
  const diffDays = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return { newStreak: currentStreak + 1, newFreezes: freezesLeft, protectedByFreeze: false };
  } else if (diffDays === 2 && freezesLeft > 0) {
    // Protected by freeze
    return { newStreak: currentStreak + 1, newFreezes: freezesLeft - 1, protectedByFreeze: true };
  } else {
    // Streak reset
    return { newStreak: 1, newFreezes: freezesLeft, protectedByFreeze: false };
  }
}
