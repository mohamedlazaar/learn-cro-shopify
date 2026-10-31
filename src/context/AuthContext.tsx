import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types/user';
import { defaultProfile } from '../services/db';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  loginWithGoogleDemo: () => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  completeOnboarding: (prefs: Partial<UserProfile>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'cro_lab_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse auth user', e);
    }
    // Default active profile to ensure full offline functionality out of the box
    return defaultProfile;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const loginWithEmail = async (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: name || email.split('@')[0] || 'Shopify Developer',
      email,
      experienceLevel: 'intermediate',
      weeklyHoursGoal: 6,
      weeklyLessonsGoal: 4,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      enrolledDate: new Date().toISOString(),
      onboardingCompleted: true,
    };
    setUser(newUser);
  };

  const loginWithGoogleDemo = async () => {
    const newUser: UserProfile = {
      id: 'usr_google_demo',
      name: 'Elena Rostova',
      email: 'elena.shopify.cro@gmail.com',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      experienceLevel: 'intermediate',
      weeklyHoursGoal: 8,
      weeklyLessonsGoal: 5,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
      enrolledDate: new Date().toISOString(),
      onboardingCompleted: true,
    };
    setUser(newUser);
  };

  const loginAsGuest = () => {
    setUser(defaultProfile);
  };

  const logout = () => {
    setUser(null);
  };

  const completeOnboarding = (prefs: Partial<UserProfile>) => {
    setUser((prev) => {
      const base = prev || defaultProfile;
      return {
        ...base,
        ...prefs,
        onboardingCompleted: true,
      };
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithEmail,
        loginWithGoogleDemo,
        loginAsGuest,
        logout,
        completeOnboarding,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
