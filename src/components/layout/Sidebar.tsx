import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Sparkles,
  Map,
  Wrench,
  BookMarked,
  Briefcase,
  Store,
  Bot,
  Target,
  CheckSquare,
  Compass,
  Calculator,
  FileCode,
  LineChart,
  Settings,
  X,
  Layers,
  Award,
  Flame,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProgress } from '../../context/ProgressContext';
import { useLanguage } from '../../context/LanguageContext';
import { getLevelProgress } from '../../services/gamification';

interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenArabicGlossary?: () => void;
}

interface NavItem {
  labelKey: string;
  path: string;
  icon: React.ReactNode;
  badgeKey?: string;
  badgeStyle?: string;
}

interface NavGroup {
  headingKey: string;
  accentColor: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const { user } = useAuth();
  const { gamification } = useProgress();
  const { t, isArabic } = useLanguage();
  const levelInfo = getLevelProgress(gamification.xp);

  const navGroups: NavGroup[] = [
    {
      headingKey: 'nav.section.learn',
      accentColor: '#a3e635',
      items: [
        { labelKey: 'nav.dashboard', path: '/dashboard', icon: <Sparkles size={16} />, badgeKey: 'nav.dashboardBadge', badgeStyle: 'badge-lime' },
        { labelKey: 'nav.curriculum', path: '/curriculum', icon: <Map size={16} /> },
        { labelKey: 'nav.croLab', path: '/cro-lab', icon: <Wrench size={16} />, badgeKey: 'nav.croLabBadge', badgeStyle: 'badge-emerald' },
        { labelKey: 'nav.knowledgeBase', path: '/knowledge-base', icon: <BookMarked size={16} /> },
      ],
    },
    {
      headingKey: 'nav.section.ai',
      accentColor: '#22d3ee',
      items: [
        { labelKey: 'nav.clientSimulator', path: '/client-simulator', icon: <Briefcase size={16} />, badgeKey: 'nav.clientSimulatorBadge', badgeStyle: 'badge-sky' },
        { labelKey: 'nav.storeSimulator', path: '/ai-store-simulator', icon: <Store size={16} /> },
        { labelKey: 'nav.aiCoach', path: '/ai-coach', icon: <Bot size={16} /> },
        { labelKey: 'nav.storeProspector', path: '/store-prospector', icon: <Target size={16} /> },
      ],
    },
    {
      headingKey: 'nav.section.tools',
      accentColor: '#fbbf24',
      items: [
        { labelKey: 'nav.auditTool', path: '/audit-tool', icon: <CheckSquare size={16} /> },
        { labelKey: 'nav.testPlanner', path: '/test-planner', icon: <Compass size={16} /> },
        { labelKey: 'nav.metrics', path: '/metrics', icon: <Calculator size={16} /> },
        { labelKey: 'nav.playground', path: '/playground', icon: <FileCode size={16} /> },
        { labelKey: 'nav.statsExplainer', path: '/stats-explainer', icon: <LineChart size={16} /> },
      ],
    },
    {
      headingKey: 'nav.section.proof',
      accentColor: '#fb7185',
      items: [
        { labelKey: 'nav.capstone', path: '/capstone', icon: <Award size={16} /> },
        { labelKey: 'nav.portfolio', path: '/portfolio', icon: <Layers size={16} /> },
        { labelKey: 'nav.settings', path: '/settings', icon: <Settings size={16} /> },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`app-sidebar ${isMobileOpen ? 'is-open' : ''}`}>
        {/* Brand Cartridge Header */}
        <div className="sidebar-brand-header">
          <Link to="/dashboard" className="sidebar-brand-link" onClick={onCloseMobile}>
            <div className="brand-icon-box">
              <Zap size={19} className="brand-sparkle" />
            </div>
            <div className="brand-text-wrap">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="brand-title">{t('app.brand')}</span>
                <span className="brand-live-dot" title="Interactive Engine Online" />
              </div>
              <span className="brand-subtitle">ALCHEMIST ARCADE // OS</span>
            </div>
          </Link>

          {isMobileOpen && (
            <button
              onClick={onCloseMobile}
              className="sidebar-close-btn"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Cartridge Decks */}
        <div className="sidebar-nav-scroll">
          {navGroups.map((group, gIdx) => (
            <div
              key={gIdx}
              className="nav-group"
              style={{ '--group-accent': group.accentColor } as React.CSSProperties}
            >
              <div className="nav-group-heading">
                <span className="nav-group-dot" />
                <span>{t(group.headingKey)}</span>
              </div>
              <div className="nav-group-items">
                {group.items.map((item, iIdx) => (
                  <NavLink
                    key={iIdx}
                    to={item.path}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `nav-item-link ${isActive ? 'is-active' : ''}`
                    }
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    <span className="nav-item-label">{t(item.labelKey)}</span>
                    {item.badgeKey && (
                      <span className={`nav-item-badge ${item.badgeStyle || ''}`}>
                        {t(item.badgeKey)}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* RPG Player Passport Widget */}
        <div className="sidebar-footer">
          <div className="level-card">
            <div className="level-card-top">
              <div className="level-avatar-badge">
                <span>L{levelInfo.currentLevel}</span>
              </div>
              <div className="level-user-info">
                <span className="level-user-name">
                  {user?.name || (isArabic ? 'بطل التحويل' : 'CRO Alchemist')}
                </span>
                <span className="level-rank-badge">{levelInfo.rank}</span>
              </div>
              <div className="level-streak-mini" title={`${gamification.streak} Day Streak`}>
                <Flame size={13} fill="#f97316" color="#f97316" />
                <span>{gamification.streak}</span>
              </div>
            </div>

            {/* Liquid Plasma Progress Bar */}
            <div className="level-progress-bar">
              <div
                className="level-progress-fill"
                style={{ width: `${Math.max(8, levelInfo.progressPercent)}%` }}
              />
            </div>

            <div className="level-card-bottom">
              <span className="xp-pill-tag">⚡ {gamification.xp} {t('app.xp')}</span>
              <span>
                {levelInfo.nextLevelXP - levelInfo.currentLevelXP} {t('app.xp')} → LVL {levelInfo.currentLevel + 1}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        .app-sidebar {
          width: var(--sidebar-width);
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          background: var(--bg-sidebar);
          border-right: 1.5px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          z-index: 999;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 6px 0 30px rgba(0, 0, 0, 0.35);
        }

        .sidebar-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(6px);
          z-index: 998;
        }

        .sidebar-brand-header {
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          border-bottom: 1.5px dashed var(--border-subtle);
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.08) 0%, transparent 100%);
        }

        .sidebar-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }

        .brand-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #a3e635 0%, #10b981 50%, #22d3ee 100%);
          border: 2px solid #090d16;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #090d16;
          box-shadow: 0 3px 0 #090d16, 0 0 18px rgba(163, 230, 53, 0.4);
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .sidebar-brand-link:hover .brand-icon-box {
          transform: rotate(-8deg) scale(1.08);
        }

        .brand-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .brand-live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a3e635;
          box-shadow: 0 0 8px #a3e635;
          display: inline-block;
        }

        .brand-subtitle {
          font-family: var(--font-mono);
          font-size: 9.5px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.06em;
          margin-top: 2px;
          white-space: nowrap;
        }

        .sidebar-close-btn {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: var(--radius-sm);
        }

        .sidebar-nav-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .sidebar-nav-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .sidebar-nav-scroll::-webkit-scrollbar-thumb {
          background: var(--border-subtle);
          border-radius: 4px;
        }

        .nav-group {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid var(--border-subtle);
          border-radius: 14px;
          padding: 10px 8px 8px;
        }

        [data-theme="light"] .nav-group {
          background: rgba(15, 23, 42, 0.02);
        }

        .nav-group-heading {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: var(--text-muted);
          padding: 0 8px 8px;
        }

        .nav-group-dot {
          width: 6px;
          height: 6px;
          border-radius: 2px;
          background: var(--group-accent, var(--accent-primary));
          box-shadow: 0 0 8px var(--group-accent, var(--accent-primary));
        }

        .nav-group-items {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .nav-item-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: 10px;
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          border: 1px solid transparent;
          transition: all 0.16s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }

        .nav-item-link:hover {
          background: var(--bg-surface-hover);
          color: var(--text-primary);
          transform: translateX(3px);
          border-color: var(--border-subtle);
        }

        [dir="rtl"] .nav-item-link:hover {
          transform: translateX(-3px);
        }

        .nav-item-link.is-active {
          background: linear-gradient(90deg, rgba(139, 92, 246, 0.22) 0%, rgba(34, 211, 238, 0.08) 100%);
          color: var(--text-primary);
          font-weight: 700;
          border-color: var(--group-accent, var(--accent-primary));
          box-shadow: 0 3px 0 rgba(0, 0, 0, 0.45), 0 0 16px rgba(139, 92, 246, 0.2);
        }

        .nav-item-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: var(--bg-app);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          flex-shrink: 0;
          transition: all 0.16s ease;
        }

        .nav-item-link.is-active .nav-item-icon {
          background: var(--group-accent, var(--accent-primary));
          color: #090d16;
          border-color: #090d16;
          box-shadow: 0 0 10px var(--group-accent, var(--accent-primary));
        }

        .nav-item-label {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nav-item-badge {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 2px 6px;
          border-radius: 6px;
        }

        .badge-lime {
          background: rgba(163, 230, 53, 0.18);
          color: #a3e635;
          border: 1px solid rgba(163, 230, 53, 0.45);
        }

        [data-theme="light"] .badge-lime {
          color: #3f6212;
        }

        .badge-accent {
          background: var(--accent-muted);
          color: var(--accent-primary);
          border: 1px solid var(--accent-glow);
        }

        .badge-emerald {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .badge-sky {
          background: rgba(34, 211, 238, 0.16);
          color: #22d3ee;
          border: 1px solid rgba(34, 211, 238, 0.35);
        }

        /* Sidebar Footer / RPG Player Passport */
        .sidebar-footer {
          padding: 12px;
          border-top: 1.5px dashed var(--border-subtle);
          background: var(--bg-surface);
        }

        .level-card {
          background: linear-gradient(145deg, var(--bg-surface-elevated) 0%, var(--bg-app) 100%);
          border: 1.5px solid var(--border-muted);
          border-radius: 14px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          box-shadow: 0 4px 0 var(--card-edge);
        }

        .level-card-top {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .level-avatar-badge {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
        }

        .level-user-info {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }

        .level-user-name {
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 800;
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .level-rank-badge {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          color: #a3e635;
          letter-spacing: 0.04em;
        }

        [data-theme="light"] .level-rank-badge {
          color: var(--accent-primary);
        }

        .level-streak-mini {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          padding: 3px 7px;
          border-radius: 999px;
          background: rgba(249, 115, 22, 0.14);
          border: 1px solid rgba(249, 115, 22, 0.35);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 800;
          color: #fb923c;
        }

        .level-progress-bar {
          height: 7px;
          background: var(--bg-app);
          border: 1px solid var(--border-subtle);
          border-radius: 999px;
          overflow: hidden;
          padding: 1px;
        }

        .level-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #8b5cf6 0%, #22d3ee 50%, #a3e635 100%);
          border-radius: 999px;
          transition: width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
        }

        .level-card-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .xp-pill-tag {
          color: var(--text-primary);
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .app-sidebar {
            transform: translateX(-100%);
          }
          [dir="rtl"] .app-sidebar,
          body.lang-ar .app-sidebar {
            transform: translateX(100%);
          }
          .app-sidebar.is-open {
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </>
  );
};
