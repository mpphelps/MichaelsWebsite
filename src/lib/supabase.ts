import { createClient } from '@supabase/supabase-js';

// Create a single Supabase client instance to be shared across the app
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);