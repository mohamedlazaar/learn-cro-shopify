import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LanguageProvider } from './context/LanguageContext';
import { AppLayout } from './components/layout/AppLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { PhaseDetailPage } from './pages/PhaseDetailPage';
import { ModuleDetailPage } from './pages/ModuleDetailPage';
import { LessonPage } from './pages/LessonPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { ExerciseWorkspace } from './pages/ExerciseWorkspace';
import { QuizPage } from './pages/QuizPage';
import { AuditToolPage } from './pages/AuditToolPage';
import { TestPlannerPage } from './pages/TestPlannerPage';
import { MetricsPage } from './pages/MetricsPage';
import { PlaygroundPage } from './pages/PlaygroundPage';
import { StatsExplainerPage } from './pages/StatsExplainerPage';
import { CapstonePage } from './pages/CapstonePage';
import { PortfolioPage } from './pages/PortfolioPage';
import { NotesPage } from './pages/NotesPage';
import { SettingsPage } from './pages/SettingsPage';
import { AiCoachPage } from './pages/AiCoachPage';
import { AiStoreSimulatorPage } from './pages/AiStoreSimulatorPage';
import { StoreProspectorPage } from './pages/StoreProspectorPage';
import { ClientSimulatorPage } from './pages/ClientSimulatorPage';
import { MicroLearningSessionPage } from './pages/MicroLearningSessionPage';
import { CroLabPage } from './pages/CroLabPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ProgressProvider>
            <BrowserRouter>
              <Routes>
                {/* AppLayout handles both Landing (full-width) and App views */}
                <Route element={<AppLayout />}>
                  {/* Landing Page */}
                  <Route path="/" element={<LandingPage />} />

                  {/* Core Learning & Coach Views */}
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/session/:lessonSlug" element={<MicroLearningSessionPage />} />
                  <Route path="/cro-lab" element={<CroLabPage />} />
                  <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
                  <Route path="/curriculum" element={<CurriculumPage />} />
                  <Route path="/curriculum/:phaseId" element={<PhaseDetailPage />} />
                  <Route path="/curriculum/:phaseId/:moduleId" element={<ModuleDetailPage />} />
                  <Route path="/lesson/:slug" element={<LessonPage />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/exercises/:slug" element={<ExerciseWorkspace />} />
                  <Route path="/quiz/:slug" element={<QuizPage />} />

                  {/* AI Intelligence Suite */}
                  <Route path="/ai-coach" element={<AiCoachPage />} />
                  <Route path="/ai-store-simulator" element={<AiStoreSimulatorPage />} />
                  <Route path="/store-prospector" element={<StoreProspectorPage />} />
                  <Route path="/client-simulator" element={<ClientSimulatorPage />} />
                  <Route path="/lead-finder" element={<Navigate to="/store-prospector" replace />} />

                  {/* Interactive Tools */}
                  <Route path="/audit-tool" element={<AuditToolPage />} />
                  <Route path="/test-planner" element={<TestPlannerPage />} />
                  <Route path="/metrics" element={<MetricsPage />} />
                  <Route path="/playground" element={<PlaygroundPage />} />
                  <Route path="/stats-explainer" element={<StatsExplainerPage />} />

                  {/* Proof of Work & Preferences */}
                  <Route path="/capstone" element={<CapstonePage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/notes" element={<Navigate to="/knowledge-base" replace />} />
                  <Route path="/settings" element={<SettingsPage />} />

                  {/* 404 catch-all redirect */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ProgressProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
