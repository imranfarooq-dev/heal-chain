import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AuthUser, UserRole } from '../types';

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin123!';

export interface RegisteredUser {
  name: string;
  role: 'donor' | 'recipient';
  bloodGroup: string;
}

interface AuthContextType {
  hasSeenOnboarding: boolean;
  completeOnboarding: () => void;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  signUp: (name: string, email: string, password: string, bloodGroup: string, role: 'donor' | 'recipient') => void;
  logout: () => void;
  updateUser: (updates: Partial<Pick<AuthUser, 'name' | 'bloodGroup' | 'lastDonation' | 'nextEligibleDays'>>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, RegisteredUser>>({});

  const completeOnboarding = useCallback(() => {
    setHasSeenOnboarding(true);
  }, []);

  const login = useCallback((email: string, password: string): boolean => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({
        id: 'admin-1',
        name: 'Admin',
        email: ADMIN_EMAIL,
        role: 'admin',
      });
      return true;
    }
    const registered = registeredUsers[trimmedEmail];
    if (registered) {
      setUser({
        id: '1',
        name: registered.name,
        email: trimmedEmail,
        role: registered.role,
        bloodGroup: registered.bloodGroup as AuthUser['bloodGroup'],
      });
      return true;
    }
    setUser({
      id: '1',
      name: trimmedEmail.split('@')[0],
      email: trimmedEmail,
      role: 'donor',
    });
    return true;
  }, [registeredUsers]);

  const signUp = useCallback(
    (name: string, email: string, _password: string, bloodGroup: string, role: 'donor' | 'recipient') => {
      const trimmedEmail = email.trim().toLowerCase();
      const newUser: RegisteredUser = { name: name.trim(), role, bloodGroup };
      setRegisteredUsers((prev) => ({ ...prev, [trimmedEmail]: newUser }));
      setUser({
        id: '1',
        name: name.trim(),
        email: trimmedEmail,
        role,
        bloodGroup: bloodGroup as AuthUser['bloodGroup'],
      });
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateUser = useCallback((updates: Partial<Pick<AuthUser, 'name' | 'bloodGroup' | 'lastDonation' | 'nextEligibleDays'>>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        hasSeenOnboarding,
        completeOnboarding,
        user,
        login,
        signUp,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
