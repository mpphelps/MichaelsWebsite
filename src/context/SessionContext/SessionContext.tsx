import type { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { supabase } from '../../lib/supabase';

interface SessionContextProps {
  session: Session | null;
  sessionLoading: boolean;
  sessionUserEmail: string | null;
}

const SessionContext = createContext<SessionContextProps>({
  session: null,
  sessionLoading: true,
  sessionUserEmail: null,
});

const SessionProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionUserEmail, setSessionUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionLoading(false);
      setSessionUserEmail(session?.user?.email || null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setSessionLoading(false);
      setSessionUserEmail(session?.user?.email || null);
    });
    return () => subscription.unsubscribe();
  }, []); // Empty dependency array since this should only run once

  const contextValue = { session, sessionLoading, sessionUserEmail };

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export { SessionContext, SessionProvider };
