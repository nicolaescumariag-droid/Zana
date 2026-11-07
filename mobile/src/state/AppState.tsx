import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockUser } from '@/mocks/user';

// Local prototype state only — no persistence, no network, no real health data.
export type PlanAnswers = {
  family: string[];
  health: string[];
  checks: string[];
  other: Partial<Record<'family' | 'health' | 'checks', string>>;
  when: Record<string, string>;
};

export const emptyAnswers: PlanAnswers = { family: [], health: [], checks: [], other: {}, when: {} };

type AppState = {
  user: typeof mockUser;
  setUser: (u: Partial<typeof mockUser>) => void;
  answers: PlanAnswers;
  setAnswers: (fn: (a: PlanAnswers) => PlanAnswers) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState(mockUser);
  const [answers, setAnswers] = useState<PlanAnswers>(emptyAnswers);
  const value = useMemo<AppState>(
    () => ({ user, setUser: (u) => setUserState((prev) => ({ ...prev, ...u })), answers, setAnswers }),
    [user, answers],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside AppStateProvider');
  return v;
}
