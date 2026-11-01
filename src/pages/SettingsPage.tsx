import React, { useState, useRef } from 'react';
import {
  Settings,
  User,
  Moon,
  Sun,
  Download,
  Upload,
  AlertTriangle,
  HardDrive,
  Target,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Key,
  XCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { hasPiApiKey, testPiApiConnection, DEFAULT_AI_MODEL } from '../services/aiService';

export const SettingsPage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    completedLessons,
    completedExercises,
    completedQuizzes,
    audits,
    experiments,
    resetProgress,
    exportJSON,
    importJSON,
  } = useProgress();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileName, setProfileName] = useState(user?.name || 'Shopify Developer');
  const [role, setRole] = useState(user?.role || 'Shopify Developer');
  const [weeklyGoal, setWeeklyGoal] = useState(user?.weeklyLessonsGoal || 5);
  const [expLevel, setExpLevel] = useState(user?.experienceLevel || 'intermediate');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // PiAPI .env status & connection test state
  const isAiConfigured = hasPiApiKey();
  const [aiTesting, setAiTesting] = useState(false);
  const [aiTestResult, setAiTestResult] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleTestAiConnection = async () => {
    setAiTesting(true);
    setAiTestResult(null);
    const res = await testPiApiConnection();
    setAiTesting(false);
    setAiTestResult(res);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      role,
      weeklyLessonsGoal: weeklyGoal,
      experienceLevel: expLevel as any,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportJSON = () => {
    const jsonStr = exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cro-lab-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        importJSON(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all CRO Lab progress? This will clear all completed lessons, quizzes, badges, and tool state. (We recommend exporting a JSON backup first).'
    );
    if (confirmed) {
      resetProgress();
    }
  };

  return (
    <div className="container" style={{ padding: '32px 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <span className="badge badge-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Settings size={14} /> Preferences
          </span>
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
          Settings & Local Data
        </h1>
        <p style={{ margin: '8px 0 0', color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
          Manage your developer profile, learning pace, theme aesthetics, and offline database backups.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Profile Card */}
        <form onSubmit={handleSaveProfile} className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={18} color="var(--color-primary)" /> Developer Profile & Goals
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Display Name</label>
              <input
                type="text"
                className="input"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Primary Goal / Role</label>
              <select
                className="input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Shopify Developer">Shopify Theme / App Developer</option>
                <option value="Freelance CRO Consultant">Freelance CRO Consultant</option>
                <option value="Agency Optimization Lead">Agency Optimization Lead</option>
                <option value="eCommerce Founder">eCommerce Store Founder</option>
              </select>
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Weekly Lesson Target</label>
              <select
                className="input"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Number(e.target.value))}
              >
                <option value={3}>Casual (3 lessons / week)</option>
                <option value={5}>Standard (5 lessons / week)</option>
                <option value={8}>Accelerated (8 lessons / week)</option>
                <option value={12}>Full-Time Sprint (12 lessons / week)</option>
              </select>
            </div>
            <div>
              <label className="form-label" style={{ fontSize: '0.85rem' }}>Technical Background</label>
              <select
                className="input"
                value={expLevel}
                onChange={(e) => setExpLevel(e.target.value as any)}
              >
                <option value="beginner">Junior / Learning Liquid</option>
                <option value="intermediate">Intermediate Shopify Developer</option>
                <option value="advanced">Senior / Tech Lead</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
            {savedSuccess && (
              <span style={{ fontSize: '0.85rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> Saved!
              </span>
            )}
            <button type="submit" className="button button-primary" style={{ fontSize: '0.9rem' }}>
              Save Profile Changes
            </button>
          </div>
        </form>

        {/* Appearance Card */}
        <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {theme === 'dark' ? <Moon size={18} color="var(--color-primary)" /> : <Sun size={18} color="var(--color-warning)" />} Appearance & Theme
          </h3>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {theme === 'dark' ? 'Linear Dark Theme (Default)' : 'High Contrast Light Theme'}
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                CRO Lab uses tailored HSL color tokens optimized for extended coding and audit sessions.
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="button button-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </div>

        {/* PiAPI AI Engine Configuration */}
        <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="var(--color-primary)" /> PiAPI AI Intelligence Engine
            </h3>
            <span
              className="badge"
              style={{
                background: isAiConfigured ? 'var(--success-muted)' : 'var(--bg-app)',
                color: isAiConfigured ? 'var(--success)' : 'var(--text-muted)',
                border: `1px solid ${isAiConfigured ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
              }}
            >
              {isAiConfigured ? `Active in .env (${DEFAULT_AI_MODEL})` : 'Offline Heuristic Mode'}
            </span>
          </div>

          <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            PiAPI AI features (AI Coach, Store Simulator, and Study Mentor) are powered by the <code>{DEFAULT_AI_MODEL}</code> model.
            For maximum security and reliability, your API key is configured exclusively via your project's <code>.env</code> file.
          </p>

          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              background: 'var(--color-surface-hover)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Key size={15} color="var(--color-primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Configured in:</span>
                <code style={{ fontSize: '0.82rem', padding: '2px 8px', background: 'var(--bg-app)', borderRadius: 4 }}>
                  .env / Vercel &rarr; PIAPI_API_KEY
                </code>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  padding: '2px 10px',
                  borderRadius: '999px',
                  background: isAiConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                  color: isAiConfigured ? 'var(--success)' : 'var(--warning)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {isAiConfigured ? (
                  <>
                    <CheckCircle2 size={13} /> Active in Environment
                  </>
                ) : (
                  <>
                    <AlertTriangle size={13} /> Missing in Environment
                  </>
                )}
              </span>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {isAiConfigured ? (
                <span>
                  Your PiAPI key is actively detected from the project environment. Requests are routed securely via TLS encryption to PiAPI's completion gateway.
                </span>
              ) : (
                <span>
                  To enable live AI completions, configure <code>PIAPI_API_KEY</code> in <code>.env</code> or your Vercel Project Settings:
                  <pre style={{ margin: '6px 0 0', padding: '8px', background: 'var(--bg-app)', borderRadius: 4, fontFamily: 'monospace' }}>
                    PIAPI_API_KEY=your_key_here
                  </pre>
                </span>
              )}
            </div>
          </div>

          {aiTestResult && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                background: aiTestResult.success ? 'var(--success-muted)' : 'var(--danger-muted)',
                border: `1px solid ${aiTestResult.success ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: aiTestResult.success ? 'var(--success)' : 'var(--danger)',
                marginBottom: '16px',
              }}
            >
              {aiTestResult.success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
              <span>{aiTestResult.message}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={handleTestAiConnection}
              disabled={aiTesting || !isAiConfigured}
              className="button button-outline"
              style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={13} className={aiTesting ? 'animate-spin' : ''} />
              <span>{aiTesting ? 'Testing API...' : 'Test .env Connection'}</span>
            </button>
          </div>
        </div>

        {/* Database & Storage Status */}
        <div className="card" style={{ padding: '24px', background: 'var(--color-surface)' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HardDrive size={18} color="var(--color-primary)" /> Storage Engine & Metrics
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              padding: '16px',
              background: 'var(--color-surface-hover)',
              borderRadius: '8px',
              marginBottom: '20px',
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Lessons Read</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{Object.keys(completedLessons).length} / 76</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Exercises Solved</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{Object.keys(completedExercises).length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Quizzes Passed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{Object.keys(completedQuizzes).length} / 16</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Audits Saved</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{audits.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>A/B Experiments</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '2px' }}>{experiments.length}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                Data Portability (Zero-Cloud Offline Storage)
              </div>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)', maxWidth: '500px' }}>
                All your progress, code solutions, and test plans live securely in your browser's IndexedDB and localStorage. Export a JSON backup to move between devices.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button
                onClick={handleImportClick}
                className="button button-outline"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <Upload size={15} /> Import Backup
              </button>
              <button
                onClick={handleExportJSON}
                className="button button-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
              >
                <Download size={15} /> Export JSON Backup
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div
          className="card"
          style={{
            padding: '24px',
            background: 'var(--color-surface)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 12px', color: 'var(--color-danger, #ef4444)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} /> Danger Zone
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            Permanently clear all learning records, lesson checks, quizzes, and tool state. This action cannot be undone unless you have a JSON backup.
          </p>
          <button
            onClick={handleReset}
            className="button button-danger"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <RefreshCw size={15} /> Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
};
