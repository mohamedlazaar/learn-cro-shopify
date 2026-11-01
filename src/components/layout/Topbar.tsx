import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flame, Shield, Sun, Moon, Search, Menu, Languages, Zap } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLevelProgress } from '../../services/gamification';
import { ALL_LESSONS } from '../../data/lessons';
import { ProgressRing } from '../ui/ProgressRing';

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleMobileSidebar: () => void;
  onOpenArabicGlossary?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onOpenCommandPalette,
  onToggleMobileSidebar,
  onOpenArabicGlossary,
}) => {
  const { gamification, completedLessons } = useProgress();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, isArabic, t } = useLanguage();
  const location = useLocation();
  const isLessonFocusMode = location.pathname.startsWith('/lesson/');

  const levelInfo = getLevelProgress(gamification.xp);
  const totalLessons = ALL_LESSONS.length;
  const finishedLessonsCount = Object.keys(completedLessons).length;
  const overallCurriculumProgress = Math.round((finishedLessonsCount / totalLessons) * 100);

  return (
    <header className="app-topbar">
      {/* Left: Mobile Menu + Tactile Spotlight Terminal Keycap */}
      <div className="topbar-left">
        <button
          onClick={onToggleMobileSidebar}
          className="mobile-menu-btn"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={onOpenCommandPalette}
          className="topbar-search-btn"
          title={`${t('app.search')} (⌘K)`}
        >
          <span className="search-icon-badge">
            <Search size={13} />
          </span>
          <span className="search-text">{t('app.search')}</span>
          <kbd className="search-kbd">{t('app.searchKbd')}</kbd>
        </button>
      </div>

      {/* Right: HUD Pills — Language, Radar Ring, Combo Streak, XP Reactor, Theme */}
      <div className="topbar-right">
        {/* Tactile Bilingual Switcher */}
        <div className="bilingual-switch-pill" role="group" aria-label="Language Selector">
          <button
            type="button"
            className={`lang-pill-btn ${language === 'en' ? 'is-active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            <span className="lang-flag">🇺🇸</span>
            <span className="lang-name">EN</span>
          </button>
          <button
            type="button"
            className={`lang-pill-btn ${language === 'ar' ? 'is-active' : ''}`}
            onClick={() => setLanguage('ar')}
            aria-pressed={language === 'ar'}
          >
            <span className="lang-flag">🇸🇦</span>
            <span className="lang-name">العربية</span>
          </button>
        </div>

        {!isLessonFocusMode && (
          <>
            {/* Mastery Radar Ring */}
            <div
              className="topbar-progress-pill"
              title={`${finishedLessonsCount} / ${totalLessons} ${t('dash.lessons')} ${t('app.curriculumDone')}`}
            >
              <ProgressRing progress={overallCurriculumProgress} size={24} strokeWidth={3} />
              <span className="progress-text">
                {finishedLessonsCount}/{totalLessons}
              </span>
            </div>

            {/* Combo Streak Reactor */}
            <div
              className="topbar-streak-pill"
              title={`${gamification.streak} ${t('app.streak')}`}
            >
              <Flame size={15} className="streak-flame" />
              <span className="streak-number">{gamification.streak}d</span>
              {gamification.freezesLeft > 0 && (
                <span className="streak-freeze" title={t('app.freeze')}>
                  <Shield size={11} />
                </span>
              )}
            </div>

            {/* Level & XP Crystal Pill */}
            <div className="topbar-level-pill">
              <Zap size={13} className="level-sparkle" />
              <span className="level-label">
                LVL {levelInfo.currentLevel}
              </span>
              <span className="level-xp-text">{gamification.xp} {t('app.xp')}</span>
            </div>

            {/* Arabic Terms Glossary Trigger */}
            {onOpenArabicGlossary && !isArabic && (
              <button
                onClick={onOpenArabicGlossary}
                className="topbar-glossary-btn"
                title="قاموس المصطلحات العربية (Arabic Terms)"
              >
                <Languages size={14} />
                <span className="glossary-btn-text">Glossary</span>
              </button>
            )}
          </>
        )}

        {/* Day / Night Risograph Theme Switch */}
        <button
          onClick={toggleTheme}
          className="topbar-theme-btn"
          aria-label={theme === 'dark' ? t('app.themeLight') : t('app.themeDark')}
          title={theme === 'dark' ? t('app.themeLight') : t('app.themeDark')}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      <style>{`
        .app-topbar {
          height: var(--topbar-height);
          background: var(--bg-glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1.5px dashed var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 900;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          gap: 16px;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .mobile-menu-btn {
          display: none;
          background: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          color: var(--text-primary);
          cursor: pointer;
          padding: 7px;
          border-radius: var(--radius-sm);
          box-shadow: 0 2px 0 var(--card-edge);
        }

        .topbar-search-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--bg-surface-elevated);
          border: 1.5px solid var(--border-muted);
          border-radius: 12px;
          padding: 6px 12px 6px 8px;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 3px 0 var(--card-edge);
          transition: all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .topbar-search-btn:hover {
          border-color: var(--accent-primary);
          color: var(--text-primary);
          transform: translateY(-1px);
          box-shadow: 0 4px 0 var(--card-edge), 0 0 16px rgba(139, 92, 246, 0.25);
        }

        .topbar-search-btn:active {
          transform: translateY(1px);
          box-shadow: 0 1px 0 var(--card-edge);
        }

        .search-icon-badge {
          width: 24px;
          height: 24px;
          border-radius: 7px;
          background: var(--accent-muted);
          color: var(--accent-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-kbd {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 6px;
          background: var(--bg-app);
          border: 1px solid var(--border-muted);
          color: var(--neon-lime);
          box-shadow: 0 2px 0 rgba(0, 0, 0, 0.4);
        }

        [data-theme="light"] .search-kbd {
          color: var(--accent-primary);
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Bilingual Toggle Pill */
        .bilingual-switch-pill {
          display: flex;
          align-items: center;
          background: var(--bg-surface-elevated);
          border: 1.5px solid var(--border-muted);
          border-radius: 12px;
          padding: 3px;
          gap: 3px;
          box-shadow: 0 3px 0 var(--card-edge);
        }

        .lang-pill-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .lang-pill-btn:hover {
          color: var(--text-primary);
        }

        .lang-pill-btn.is-active {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: #ffffff;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
        }

        .lang-flag {
          font-size: 12px;
          line-height: 1;
        }

        .topbar-progress-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1.5px solid var(--border-muted);
          padding: 4px 11px;
          border-radius: 12px;
          box-shadow: 0 3px 0 var(--card-edge);
        }

        .progress-text {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .topbar-streak-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.16) 0%, rgba(234, 88, 12, 0.06) 100%);
          border: 1.5px solid rgba(249, 115, 22, 0.4);
          padding: 5px 11px;
          border-radius: 12px;
          box-shadow: 0 3px 0 var(--card-edge);
        }

        .streak-flame {
          color: #f97316;
          fill: #f97316;
          filter: drop-shadow(0 0 6px rgba(249, 115, 22, 0.5));
        }

        .streak-number {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 800;
          color: #fb923c;
        }

        [data-theme="light"] .streak-number {
          color: #c2410c;
        }

        .streak-freeze {
          color: #38bdf8;
          display: flex;
          align-items: center;
        }

        .topbar-level-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(163, 230, 53, 0.14) 0%, rgba(16, 185, 129, 0.08) 100%);
          border: 1.5px solid rgba(163, 230, 53, 0.4);
          padding: 5px 12px;
          border-radius: 12px;
          box-shadow: 0 3px 0 var(--card-edge);
        }

        .level-sparkle {
          color: #a3e635;
          fill: #a3e635;
        }

        [data-theme="light"] .level-sparkle {
          color: #4d7c0f;
          fill: #4d7c0f;
        }

        .level-label {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .level-xp-text {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #a3e635;
          font-weight: 700;
        }

        [data-theme="light"] .level-xp-text {
          color: #3f6212;
        }

        .topbar-glossary-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 12px;
          background: var(--accent-muted);
          border: 1.5px solid var(--accent-glow);
          color: #c4b5fd;
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 3px 0 var(--card-edge);
          transition: all 0.15s ease;
        }

        [data-theme="light"] .topbar-glossary-btn {
          color: var(--accent-primary);
        }

        .topbar-glossary-btn:hover {
          transform: translateY(-1px);
          border-color: var(--accent-primary);
        }

        .topbar-theme-btn {
          background: var(--bg-surface-elevated);
          border: 1.5px solid var(--border-muted);
          border-radius: 12px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--neon-amber);
          cursor: pointer;
          box-shadow: 0 3px 0 var(--card-edge);
          transition: all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .topbar-theme-btn:hover {
          transform: translateY(-2px) rotate(12deg);
          border-color: var(--neon-amber);
        }

        @media (max-width: 900px) {
          .app-topbar { padding: 0 16px; }
          .mobile-menu-btn { display: flex; }
          .progress-text { display: none; }
          .level-xp-text { display: none; }
        }

        @media (max-width: 640px) {
          .search-text, .search-kbd { display: none; }
          .topbar-progress-pill { display: none; }
          .lang-name { display: none; }
        }
      `}</style>
    </header>
  );
};
