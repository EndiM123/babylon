import { createClient } from '@supabase/supabase-js';

// Access environment variables with fallbacks to prevent runtime errors
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://hglijpoyicrsxleoeroy.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbGlqcG95aWNyc3hsZW9lcm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNDI3NDcsImV4cCI6MjA2MzkxODc0N30.A7rwL2DO2uDxqarNyLMKgw734-w3XRp96L-3MaIWAh4';

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
