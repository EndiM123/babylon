import { SupabaseClient } from '@supabase/supabase-js';

declare module '*/supabaseClient' {
  const supabase: SupabaseClient;
  export default supabase;
}

declare global {
  interface Window {
    supabase: SupabaseClient;
  }
}
