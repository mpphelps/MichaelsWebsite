import type { Session } from '@supabase/supabase-js';
import React from 'react';
import { createContext } from 'react';

interface SessionContextProps {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

const SessionContext = createContext<SessionContextProps>({
  session: null,
  setSession: () => {}, // This will be replaced by the actual setState from useState
});

const SessionProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [session, setSession] = React.useState<Session | null>(null);

  const contextValue = { session, setSession };

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export { SessionContext, SessionProvider };
