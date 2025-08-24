import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IS_SUPABASE_ENABLED, SUPABASE_ANON_KEY, SUPABASE_URL } from './config';

let supabase: SupabaseClient | null = null;

if (IS_SUPABASE_ENABLED) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    realtime: { params: { eventsPerSecond: 10 } }
  });
}

export default supabase;
