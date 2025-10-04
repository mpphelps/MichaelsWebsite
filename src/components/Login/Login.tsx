import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSessionContext } from '../../context/SessionContext/useSessionContext';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const { session, sessionLoading } = useSessionContext();

  if (sessionLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={[]} view="sign_in" />;
  }

  return <button onClick={() => supabase.auth.signOut()}>logout</button>;
}
