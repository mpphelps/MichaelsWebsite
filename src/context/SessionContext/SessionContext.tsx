import type { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { supabase } from '../../lib/supabase';
import { userRoleFetcher } from '../../utilities/fetcher';
import type { UserRole } from '../../types/userRole';
import useSWR from 'swr';

interface SessionContextValue {
  session: Session | null;
  sessionLoading: boolean;
  sessionUserEmail: string | null;
  userRole: string | null;
  userRoleLoading: boolean;
  userRoleError: Error | null;
}

const SessionContext = createContext<SessionContextValue>({
  session: null,
  sessionLoading: true,
  sessionUserEmail: null,
  userRole: '',
  userRoleLoading: true,
  userRoleError: null,
});

// https://www.youtube.com/watch?v=PdEutzhsrws - advanced RLS security
const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
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

  // revalidate only when session user id changes
  const { data, error: userRoleError, isLoading: userRoleLoading } = useSWR<UserRole>(session?.user.id, userRoleFetcher);

  console.log('User role in SessionProvider:', data?.role);

  const contextValue: SessionContextValue = { session, sessionLoading, sessionUserEmail, userRole: data?.role ?? null, userRoleLoading, userRoleError };

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export { SessionContext, SessionProvider };
