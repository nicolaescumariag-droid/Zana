import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import { mockUser } from '@/mocks/user';

// Local prototype state only — no persistence, no network, no real health data.
type AppState = {
  user: typeof mockUser;
  setUser: (u: Partial<typeof mockUser>) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState(mockUser);
  const value = useMemo<AppState>(
    () => ({ user, setUser: (u) => setUserState((prev) => ({ ...prev, ...u })) }),
    [user],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside AppStateProvider');
  return v;
}
