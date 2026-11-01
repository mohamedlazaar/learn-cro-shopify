import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from '../ui/CommandPalette';
import { ToastContainer } from '../ui/Toast';
import { OnboardingModal } from '../ui/OnboardingModal';
import { ArabicGlossaryModal } from '../ui/ArabicGlossaryModal';
import { AiLearningAssistant } from '../ai/AiLearningAssistant';
import { useProgress } from '../../context/ProgressContext';
import { useAuth } from '../../context/AuthContext';

export const AppLayout: React.FC = () => {
  const { toasts, dismissToast } = useProgress();
  const { user } = useAuth();
  const location = useLocation();

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);
  const [isArabicGlossaryOpen, setIsArabicGlossaryOpen] = useState(false);

  const isOnboardingOpen = Boolean(user && !user.onboardingCompleted && !onboardingDismissed);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If on landing page "/", don't show full app sidebar/topbar
  const isLandingPage = location.pathname === '/';
  const isLessonPage = location.pathname.startsWith('/lesson/');

  if (isLandingPage) {
    return (
      <div className="landing-layout">
        <a href="#content" className="skip-link">Skip to content</a>
        <main id="content">
          <Outlet />
        </main>
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <a href="#content" className="skip-link">Skip to content</a>

      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenArabicGlossary={() => setIsArabicGlossaryOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <Topbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
          onOpenArabicGlossary={() => setIsArabicGlossaryOpen(true)}
        />

        <main id="content" className="page-content">
          <Outlet />
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Arabic Terms Glossary Modal */}
      <ArabicGlossaryModal
        isOpen={isArabicGlossaryOpen}
        onClose={() => setIsArabicGlossaryOpen(false)}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setOnboardingDismissed(true)}
      />

      {/* Floating AI Learning Mentor (hidden on lesson pages to prevent distraction) */}
      {!isLessonPage && <AiLearningAssistant />}
    </div>
  );
};
